const dialog = document.getElementById('loginDialog');
const toast = document.getElementById('toast');
document.querySelectorAll('[data-open-login]').forEach((button) => button.addEventListener('click', () => dialog.showModal()));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const password = document.getElementById('loginPassword').value;
  if (email === 'member@tradminoritas.id' && password === 'TM2026!') {
    sessionStorage.setItem('tmDemoMember', 'Andi Mahendra'); window.location.href = 'member.html';
  } else document.getElementById('loginError').textContent = 'Email atau password demo belum sesuai.';
});
const inputs = ['balance', 'risk', 'stopLoss'].map((id) => document.getElementById(id));
function calculateLot() {
  const [balance, risk, stopLoss] = inputs.map((input) => Math.max(0, Number(input.value) || 0));
  const riskAmount = balance * risk / 100;
  const lots = stopLoss ? riskAmount / (stopLoss * 10) : 0;
  document.getElementById('riskAmount').textContent = `$${riskAmount.toFixed(2)}`;
  document.getElementById('lotAmount').textContent = `${lots.toFixed(2)} lot`;
}
inputs.forEach((input) => input.addEventListener('input', calculateLot));
document.querySelector('.menu-button').addEventListener('click', (event) => {
  const nav = document.querySelector('.nav-links'); const open = nav.style.display === 'flex';
  nav.style.cssText = open ? '' : 'display:flex;position:absolute;top:70px;right:17px;background:#1d1d1a;padding:18px;flex-direction:column;z-index:4;box-shadow:0 12px 30px #0008;';
  event.currentTarget.setAttribute('aria-expanded', String(!open));
});

const floatingVipButton = document.querySelector('.vip-float');
const heroSection = document.querySelector('.hero');
if (floatingVipButton && heroSection && 'IntersectionObserver' in window) {
  floatingVipButton.classList.add('is-hidden');
  new IntersectionObserver(([entry]) => {
    floatingVipButton.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.15 }).observe(heroSection);
}
