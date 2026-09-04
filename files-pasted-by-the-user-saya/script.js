const dialog = document.getElementById('loginDialog');
const toast = document.getElementById('toast');

document.querySelectorAll('[data-open-login]').forEach((button) => {
  button.addEventListener('click', () => dialog.showModal());
});

document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;

  if (email === 'member@tradminoritas.id' && password === 'TM2026!') {
    sessionStorage.setItem('tmDemoMember', 'Andi Mahendra');
    window.location.href = 'member.html';
  } else {
    document.getElementById('loginError').textContent = 'Email atau password demo belum sesuai.';
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


/* =========================================================
   PARTNER RESMI — FOTO + VERIFIED + COPY BARU
   ========================================================= */

const partners = [
  {
    name: 'Kent Vilandka',
    handle: '@kokokentminority',
    since: 'Official Partner since August 2025',
    url: 'https://www.tiktok.com/@kokokentminority',
    photo: 'https://unavatar.io/tiktok/kokokentminority'
  },
  {
    name: 'Siswandi Waluyo',
    handle: '@omsisminority',
    since: 'Official Partner since August 2025',
    url: 'https://www.tiktok.com/@omsisminority',
    photo: 'https://unavatar.io/tiktok/omsisminority'
  },
  {
    name: 'David Zen Geraldy',
    handle: '@mrzenminority',
    since: 'Official Partner since August 2025',
    url: 'https://www.tiktok.com/@mrzenminority',
    photo: 'https://unavatar.io/tiktok/mrzenminority'
  }
];

const partnerList = document.querySelector('.partner-list');

if (partnerList) {
  partnerList.innerHTML = partners.map((partner, index) => `
    <article class="partner-card">
      <div class="partner-avatar">
        <img
          src="${partner.photo}"
          alt="Foto ${partner.name}"
          loading="lazy"
          onerror="this.style.display='none';this.parentElement.classList.add('no-photo')">
        <span>${String(index + 1).padStart(2, '0')}</span>
      </div>

      <div class="partner-info">
        <div class="partner-kicker">OFFICIAL PARTNER</div>
        <h3>
          ${partner.name}
          <span class="verified-badge" aria-label="Verified partner">✓</span>
        </h3>
        <p>${partner.since}</p>
        <small>${partner.handle}</small>
      </div>

      <a
        class="partner-visit"
        href="${partner.url}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Kunjungi ${partner.name} di TikTok">
        <span>Kunjungi TikTok</span>
        <b aria-hidden="true">→</b>
      </a>
    </article>
  `).join('');
}


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
