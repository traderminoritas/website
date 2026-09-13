const SESSION_SECONDS = 60 * 60;
const VIDEO_URL_SECONDS = 3 * 60 * 60;

const ALLOWED_ORIGIN = "https://voluble-kheer-28b9b9.netlify.app";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const corsHeaders = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, HEAD, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") {
      if (origin !== ALLOWED_ORIGIN) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (origin && origin !== ALLOWED_ORIGIN) return new Response("Forbidden", { status: 403 });

    if (url.pathname === "/auth" && request.method === "POST") {
      try {
        const body = await request.json();
        if (body.username !== env.VIP_USERNAME || body.password !== env.VIP_PASSWORD) {
          return json({ success: false, error: "Invalid credentials" }, 401, corsHeaders);
        }
        const exp = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
        const payload = `session|${exp}`;
        const signature = await sign(payload, env.VIP_TOKEN_SECRET);
        const token = `${base64url(payload)}.${signature}`;
        return json({ success: true, token, expiresAt: exp }, 200, corsHeaders);
      } catch {
        return json({ success: false, error: "Invalid request" }, 400, corsHeaders);
      }
    }

    if (url.pathname === "/video-url" && request.method === "GET") {
      const sessionToken = getBearerToken(request);
      if (!sessionToken) return json({ success: false, error: "Unauthorized" }, 401, corsHeaders);
      const sessionValid = await verifySession(sessionToken, env.VIP_TOKEN_SECRET);
      if (!sessionValid) return json({ success: false, error: "Session expired" }, 401, corsHeaders);
      const file = url.searchParams.get("file");
      if (!file || !/^[^/]+\.mp4$/i.test(file)) return json({ success: false, error: "Invalid video file" }, 400, corsHeaders);
      const key = `videos/${file}`;
      const object = await env.VIP_BUCKET.head(key);
      if (!object) return json({ success: false, error: "Video not found" }, 404, corsHeaders);
      const exp = Math.floor(Date.now() / 1000) + VIDEO_URL_SECONDS;
      const payload = `video|${key}|${exp}`;
      const signature = await sign(payload, env.VIP_TOKEN_SECRET);
      const videoUrl = `${url.origin}/video/${encodeURIComponent(file)}?exp=${exp}&sig=${encodeURIComponent(signature)}`;
      return json({ success: true, url: videoUrl, expiresAt: exp }, 200, corsHeaders);
    }

    if (url.pathname.startsWith("/video/")) {
      if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD", ...corsHeaders } });
      const filename = decodeURIComponent(url.pathname.slice("/video/".length));
      if (!/^[^/]+\.mp4$/i.test(filename)) return new Response("Not Found", { status: 404, headers: corsHeaders });
      const exp = Number(url.searchParams.get("exp"));
      const sig = url.searchParams.get("sig");
      if (!exp || !sig) return new Response("Unauthorized", { status: 401, headers: corsHeaders });
      if (Math.floor(Date.now() / 1000) > exp) return new Response("Video URL Expired", { status: 401, headers: corsHeaders });
      const key = `videos/${filename}`;
      const payload = `video|${key}|${exp}`;
      const valid = await verifySignature(payload, sig, env.VIP_TOKEN_SECRET);
      if (!valid) return new Response("Invalid Signature", { status: 403, headers: corsHeaders });

      const object = await env.VIP_BUCKET.get(key, { onlyIf: request.headers, range: request.headers });
      if (object === null) return new Response("Video Not Found", { status: 404, headers: corsHeaders });

      const headers = new Headers(corsHeaders);
      object.writeHttpMetadata(headers);
      headers.set("ETag", object.httpEtag);
      headers.set("Accept-Ranges", "bytes");
      headers.set("Cache-Control", "private, no-store");
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
      headers.set("Vary", "Origin");

      if (object.range) {
        const offset = object.range.offset;
        const length = object.range.length ?? (object.size - offset);
        const end = offset + length - 1;
        headers.set("Content-Range", `bytes ${offset}-${end}/${object.size}`);
        headers.set("Content-Length", String(length));
        return new Response(request.method === "HEAD" ? null : object.body, { status: 206, headers });
      }
      headers.set("Content-Length", String(object.size));
      return new Response(request.method === "HEAD" ? null : object.body, { status: 200, headers });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};

async function sign(text, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(text));
  return base64urlBytes(new Uint8Array(signature));
}
async function verifySignature(text, signature, secret) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  try {
    return await crypto.subtle.verify("HMAC", key, base64urlToBytes(signature), new TextEncoder().encode(text));
  } catch { return false; }
}
async function verifySession(token, secret) {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const payload = decodeBase64url(parts[0]);
    const [type, expText] = payload.split("|");
    if (type !== "session") return false;
    const exp = Number(expText);
    if (!exp || Math.floor(Date.now() / 1000) > exp) return false;
    return await verifySignature(payload, parts[1], secret);
  } catch { return false; }
}
function getBearerToken(request) {
  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.slice(7).trim();
}
function base64url(text) { return base64urlBytes(new TextEncoder().encode(text)); }
function base64urlBytes(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64urlToBytes(text) {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, char => char.charCodeAt(0));
}
function decodeBase64url(text) { return new TextDecoder().decode(base64urlToBytes(text)); }
function json(data, status, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...headers } });
}
