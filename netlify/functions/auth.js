
const AUTH_ORIGIN = "https://tm-vip-auth.bossrobot-id.workers.dev";

export default async (request) => {
  const incomingUrl = new URL(request.url);
  const path = incomingUrl.searchParams.get("path") || "";

  
const allowedPaths = new Set([
  "login",
  "logout",
  "me",
  "vip",
  "video-token",
  "change-password",
  "admin/members",
]);

function isAllowedPath(path) {
  return (
    allowedPaths.has(path) ||
    /^admin\/members\/\d+\/status$/.test(path) ||
    /^admin\/members\/\d+\/reset-password$/.test(path) ||
    /^owner\/members\/\d+\/role$/.test(path)
  );
}


  if (!isAllowedPath(path)) {
    return Response.json(
      { error: "Endpoint tidak diizinkan." },
      { status: 404 }
    );
  }

  if (!["GET", "POST", "PATCH", "OPTIONS"].includes(request.method)) {
    return Response.json(
      { error: "Method tidak diizinkan." },
      { status: 405 }
    );
  }

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const cookie = request.headers.get("cookie");

  if (contentType) headers.set("content-type", contentType);
  if (cookie) headers.set("cookie", cookie);

  const upstreamUrl = `${AUTH_ORIGIN}/${path}`;

  const upstream = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    body: ["GET", "HEAD", "OPTIONS"].includes(request.method)
      ? undefined
      : await request.arrayBuffer(),
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  const upstreamType = upstream.headers.get("content-type");
  const setCookie = upstream.headers.get("set-cookie");

  if (upstreamType) responseHeaders.set("content-type", upstreamType);
  if (setCookie) responseHeaders.set("set-cookie", setCookie);
  responseHeaders.set("cache-control", "no-store");

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
};
