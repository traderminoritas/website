const dialog = document.getElementById('loginDialog');
const toast = document.getElementById('toast');

document.querySelectorAll('[data-open-login]').forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const TM_AUTH_WORKER = 'https://tm-vip-auth.bossrobot-id.workers.dev';

document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  const error = document.getElementById('loginError');
  const submit = document.querySelector('#loginForm button[type=submit]');
  error.textContent = '';
  if (submit) {
    submit.disabled = true;
    submit.dataset.originalText = submit.innerHTML;
    submit.innerHTML = 'Memeriksa akses…';
  }

  try {
    const response = await fetch(`${TM_AUTH_WORKER}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: email, password })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok || !data.member) {
      throw new Error(data.error || 'Email atau password tidak sesuai.');
    }
    if (!data.member.isVip) {
      await fetch(`${TM_AUTH_WORKER}/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
      throw new Error('Akun dikenali, tetapi akses VIP belum aktif. Hubungi admin.');
    }

    const vipResponse = await fetch(`${TM_AUTH_WORKER}/vip`, {
      method: 'GET',
      credentials: 'include'
    });
    const vipData = await vipResponse.json().catch(() => ({}));
    if (!vipResponse.ok || !vipData.ok) {
      await fetch(`${TM_AUTH_WORKER}/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
      throw new Error(vipData.error || 'Akses VIP belum aktif.');
    }

    sessionStorage.setItem('tmVipMemberName', data.member.username || data.member.email || email);
    window.location.href = 'member.html';
  } catch (err) {
    error.textContent = err.message || 'Login gagal. Silakan coba lagi.';
  } finally {
    if (submit) {
      submit.disabled = false;
      submit.innerHTML = submit.dataset.originalText || 'Masuk ke dashboard <span>→</span>';
    }
  }
});

const inputs = ['balance', 'risk', 'stopLoss']
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function calculateLot() {
  const [balance, risk, stopLoss] =
    inputs.map((input) => Math.max(0, Number(input.value) || 0));

  const riskAmount = balance * risk / 100;
  const lots = stopLoss ? riskAmount / (stopLoss * 10) : 0;

  document.getElementById('riskAmount').textContent = `$${riskAmount.toFixed(2)}`;
  document.getElementById('lotAmount').textContent = `${lots.toFixed(2)} lot`;
}

inputs.forEach((input) => input.addEventListener('input', calculateLot));

const menuButton = document.querySelector('.menu-button');
if (menuButton) {
  menuButton.addEventListener('click', (event) => {
    const nav = document.querySelector('.nav-links');
    const open = nav.style.display === 'flex';

    nav.style.cssText = open
      ? ''
      : 'display:flex;position:absolute;top:70px;right:17px;background:#1d1d1a;padding:18px;flex-direction:column;z-index:4;box-shadow:0 12px 30px #0008;';

    event.currentTarget.setAttribute('aria-expanded', String(!open));
  });
}


/* =========================================================
   NOMOR SECTION — KONSISTEN 01, 02, 03, dst.
   ========================================================= */

const sectionNumbers = [
  ['.video-section .video-copy .eyebrow', '02 — Mulai dari realita'],
  ['.proof-gallery .section-head .eyebrow', '03 — Dibangun dari realita'],
  ['.features .section-head .eyebrow', '04 — Ekosistem member'],
  ['.tool-section .eyebrow', '05 — Trading tools'],
  ['.membership .membership-copy .eyebrow', '06 — Membership'],
  ['.partners .section-head .eyebrow', '07 — Partner resmi'],
  ['.testimonials .section-head .eyebrow', '08 — Cerita member'],
  ['.faq .eyebrow', '09 — FAQ'],
  ['.member-assets .section-head .eyebrow', '10 — Apa yang Anda dapatkan']
];

sectionNumbers.forEach(([selector, text]) => {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
});


/* Partner cards remain in index.html so all five partners are preserved. */


/* =========================================================
   FOOTER — KANAL RESMI, EMAIL DIHAPUS
   ========================================================= */

const footerLinks = document.querySelector('.footer-links');

if (footerLinks) {
  footerLinks.innerHTML = `
    <a href="https://t.me/traderminoritasofficial"
       target="_blank"
       rel="noopener noreferrer">Telegram</a>

    <a href="https://www.tiktok.com/@traderminoritas"
       target="_blank"
       rel="noopener noreferrer">TikTok</a>

    <a href="https://www.youtube.com/@traderminoritas/shorts"
       target="_blank"
       rel="noopener noreferrer">YouTube</a>
  `;
}


/* =========================================================
   FLOATING VIP
   ========================================================= */

const floatingVipButton = document.querySelector('.vip-float');
const heroSection = document.querySelector('.hero');

if (floatingVipButton) {
  floatingVipButton.innerHTML = '<span>✦ Gabung VIP</span><b aria-hidden="true">→</b>';
  floatingVipButton.setAttribute('aria-label', 'Gabung VIP');
}


if (floatingVipButton && heroSection && 'IntersectionObserver' in window) {
  floatingVipButton.classList.add('is-hidden');

  new IntersectionObserver(([entry]) => {
    floatingVipButton.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.15 }).observe(heroSection);
}
