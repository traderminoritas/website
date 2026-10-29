const WORKER_URL = 'https://tm-vip-video.bossrobot-id.workers.dev';
const AUTH_URL = '/.netlify/functions/auth';

// Validate the browser session against the shared D1-backed auth service.
(async function validateVipSession() {
  try {
    const response = await fetch(`${AUTH_URL}?path=me`, { credentials: 'include' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.authenticated || !data.member || !data.member.isVip) {
      await fetch(`${AUTH_URL}?path=logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
      location.replace('index.html');
      return;
    }
    sessionStorage.setItem('tmVipMemberName', data.member.username || data.member.email || 'Member VIP');
  } catch (_) {
    location.replace('index.html');
  }
})();
/* =========================================================
   PENGATURAN AKUN — GANTI PASSWORD
   ========================================================= */
(function addChangePasswordUI(){
  const logoutButton = document.getElementById('logout');
  if (!logoutButton || document.getElementById('tmChangePasswordButton')) return;

  const style = document.createElement('style');
  style.textContent = `
    #tmChangePasswordButton{width:100%;margin:8px 0;padding:11px 14px;border:1px solid rgba(216,180,94,.45);border-radius:10px;background:rgba(216,180,94,.08);color:inherit;font:inherit;cursor:pointer;text-align:left}
    #tmPasswordOverlay{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:20px;background:rgba(0,0,0,.72);backdrop-filter:blur(5px)}
    #tmPasswordOverlay.open{display:flex}
    #tmPasswordPanel{width:min(100%,430px);padding:26px;border:1px solid rgba(216,180,94,.35);border-radius:18px;background:#111;color:#f7f4ed;box-shadow:0 24px 80px #0008}
    #tmPasswordPanel h2{margin:0 0 7px;font-size:22px}#tmPasswordPanel p{margin:0 0 20px;color:#b8b5ad;font-size:13px;line-height:1.5}
    #tmPasswordPanel label{display:block;margin:13px 0 6px;font-size:13px;color:#dedbd3}
    #tmPasswordPanel input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #45423a;border-radius:9px;background:#191919;color:#fff;font:inherit;outline:none}
    #tmPasswordPanel input:focus{border-color:#d8b45e}#tmPasswordActions{display:flex;gap:10px;margin-top:20px}
    #tmPasswordActions button{flex:1;padding:12px;border-radius:9px;font:inherit;cursor:pointer}
    #tmPasswordCancel{border:1px solid #48443b;background:transparent;color:#eee}#tmPasswordSubmit{border:0;background:#d8b45e;color:#17130a;font-weight:700}
    #tmPasswordMessage{min-height:18px;margin-top:12px;font-size:13px;color:#e8bd78}
  `;
  document.head.appendChild(style);

  const button = document.createElement('button');
  button.id = 'tmChangePasswordButton';
  button.type = 'button';
  button.textContent = '🔐  Ubah Password';
  logoutButton.parentElement.insertBefore(button, logoutButton);

  const overlay = document.createElement('div');
  overlay.id = 'tmPasswordOverlay';
  overlay.innerHTML = `
    <section id="tmPasswordPanel" role="dialog" aria-modal="true" aria-labelledby="tmPasswordTitle">
      <h2 id="tmPasswordTitle">Ubah Password</h2>
      <p>Masukkan password saat ini, lalu buat password baru minimal 12 karakter.</p>
      <form id="tmPasswordForm">
        <label for="tmCurrentPassword">Password saat ini</label>
        <input id="tmCurrentPassword" type="password" autocomplete="current-password" required maxlength="128">
        <label for="tmNewPassword">Password baru</label>
        <input id="tmNewPassword" type="password" autocomplete="new-password" required minlength="12" maxlength="128">
        <label for="tmConfirmPassword">Ulangi password baru</label>
        <input id="tmConfirmPassword" type="password" autocomplete="new-password" required minlength="12" maxlength="128">
        <div id="tmPasswordMessage" aria-live="polite"></div>
        <div id="tmPasswordActions"><button id="tmPasswordCancel" type="button">Batal</button><button id="tmPasswordSubmit" type="submit">Simpan Password</button></div>
      </form>
    </section>`;
  document.body.appendChild(overlay);

  const form = overlay.querySelector('#tmPasswordForm');
  const message = overlay.querySelector('#tmPasswordMessage');
  const submit = overlay.querySelector('#tmPasswordSubmit');
  function close(){ overlay.classList.remove('open'); form.reset(); message.textContent=''; }
  button.addEventListener('click',()=>{ overlay.classList.add('open'); overlay.querySelector('#tmCurrentPassword').focus(); });
  overlay.querySelector('#tmPasswordCancel').addEventListener('click',close);
  overlay.addEventListener('click',e=>{ if(e.target===overlay) close(); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&overlay.classList.contains('open')) close(); });
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const currentPassword=overlay.querySelector('#tmCurrentPassword').value;
    const newPassword=overlay.querySelector('#tmNewPassword').value;
    const confirmPassword=overlay.querySelector('#tmConfirmPassword').value;
    message.textContent='';
    if(newPassword.length<12){message.textContent='Password baru minimal 12 karakter.';return;}
    if(newPassword!==confirmPassword){message.textContent='Konfirmasi password baru tidak sama.';return;}
    if(currentPassword===newPassword){message.textContent='Gunakan password baru yang berbeda.';return;}
    submit.disabled=true;submit.textContent='Menyimpan…';
    try{
      const response=await fetch(`${AUTH_URL}?path=change-password`,{
        method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({currentPassword,newPassword})
      });
      const data=await response.json().catch(()=>({}));
      if(!response.ok||!data.ok) throw new Error(data.error||'Password gagal diganti.');
      message.textContent='Password berhasil diganti.';
      message.style.color='#9bd5a4';
      form.reset();
      setTimeout(close,1200);
    }catch(err){message.style.color='#f0a0a0';message.textContent=err.message||'Terjadi kesalahan. Coba lagi.';}
    finally{submit.disabled=false;submit.textContent='Simpan Password';}
  });
})();

const officialLogoStyles=document.createElement('style');officialLogoStyles.textContent="aside .brand>b{font-size:0!important;background:#111 url('https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/Trader%20MInoritas%20logo.png') center/90% auto no-repeat!important;border-color:rgba(216,180,94,.45)!important}";document.head.appendChild(officialLogoStyles);
const pages=document.querySelectorAll('.page'),side=document.getElementById('side'),crumb=document.getElementById('crumb');
function openPage(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));crumb.textContent='DASHBOARD / '+id.toUpperCase().replace('LEARN','MODUL VIP').replace('JOURNAL','JOURNAL & BACKTEST');side.classList.remove('open');scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>openPage(b.dataset.page));document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>openPage(b.dataset.jump));document.getElementById('menu').onclick=()=>side.classList.toggle('open');document.getElementById('logout').onclick=async()=>{
  try { await fetch(`${AUTH_URL}?path=logout`, { method: 'POST', credentials: 'include' }); }
  catch (_) {}
  sessionStorage.removeItem('tmVipMemberName');
  sessionStorage.removeItem('tmVipToken');
  sessionStorage.removeItem('tmDemoMember');
  location.href='index.html';
};
const tool={lot:{type:'POSITION SIZING',title:'Lot Size Calculator',desc:'Tentukan posisi berdasarkan batas risiko Anda.',fields:[['Modal akun','balance',1000],['Risiko per transaksi (%)','risk',1],['Stop loss (pips)','sl',30]],calc:v=>[['RISIKO MAKSIMUM','$'+(v.balance*v.risk/100).toFixed(2)],['UKURAN POSISI',(v.balance*v.risk/100/(v.sl*10||1)).toFixed(2)+' lot']]},rr:{type:'RISK ANALYSIS',title:'Risk / Reward Calculator',desc:'Bandingkan potensi kerugian dan target sebelum entry.',fields:[['Entry price','entry',1.085],['Stop loss','stop',1.08],['Take profit','tp',1.0975]],calc:v=>[['RISIKO',Math.abs(v.entry-v.stop).toFixed(4)],['RISK : REWARD','1 : '+(Math.abs(v.tp-v.entry)/(Math.abs(v.entry-v.stop)||1)).toFixed(2)]]},comp:{type:'GROWTH PLAN',title:'Compounding Calculator',desc:'Visualisasikan pertumbuhan modal dengan target realistis.',fields:[['Modal awal','capital',1000],['Target per bulan (%)','rate',5],['Durasi (bulan)','months',12]],calc:v=>[['PROYEKSI MODAL','$'+(v.capital*Math.pow(1+v.rate/100,v.months)).toFixed(2)],['PERTUMBUHAN','$'+(v.capital*Math.pow(1+v.rate/100,v.months)-v.capital).toFixed(2)]]}};
function render(type='lot'){let t=tool[type];

document.getElementById('calcType').textContent=t.type;document.getElementById('calcTitle').textContent=t.title;document.getElementById('calcDesc').textContent=t.desc;let box=document.getElementById('calcForm');box.innerHTML='<div class="calc-fields">'+t.fields.map(f=>`<label>${f[0]}<input id="${f[1]}" type="number" step="any" value="${f[2]}"></label>`).join('')+'</div><div class="calc-result" id="resultBox"></div>';let update=()=>{let v=Object.fromEntries(t.fields.map(f=>[f[1],+document.getElementById(f[1]).value||0]));document.getElementById('resultBox').innerHTML=t.calc(v).map(r=>`<div><small>${r[0]}</small><b>${r[1]}</b></div>`).join('')};t.fields.forEach(f=>document.getElementById(f[1]).oninput=update);update()};document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{render(b.dataset.tool);document.querySelectorAll('.toolcards article').forEach(a=>a.classList.remove('selected'));b.closest('article').classList.add('selected')});render();
const modal=document.getElementById('modal'),toast=document.getElementById('toast');if(document.getElementById('close'))document.getElementById('close').onclick=()=>modal.close();document.getElementById('profileForm').onsubmit=e=>e.preventDefault();document.getElementById('profileForm').querySelector('button').onclick=()=>{toastMessage('Profile tersimpan di sesi demo.')};


/* =========================================================
   MODUL VIP — VIDEO LIBRARY
   Source: VIP video library
   No categories applied; preserve source order.
   ========================================================= */
const vipVideos = [
  ['Introduction Class','qu_wCOW0wNI'],
  ['Forex by The Numbers: Rahasia Menghitung Pip, Profit & Resiko Seperti Pro','X3PwOoXoOSk'],
  ['Metode/Strategi Part 1','xoq6ayL8ntM'],
  ['Backtest & Forward Test','aAimxdsn9aE'],
  ['Money Management','3SGEVLCbivc'],
  ['Metode/Strategi Part 2','MzTC-A4bKkY'],
  ['Ngosan (Ngobrol Santai) - 21 September 2025','Lu4tYAVNDyk'],
  ['Foundation - 28 September 2025','NET4ByGlbbI'],
  ['Dow Theory Part 1 - 5 Oktober 2025','Lr5y2XsXCqU'],
  ['Dow Theory Part 2 - 12 Oktober 2025','8I9SWn_tYEU'],
  ['Support & Resistance - 19 Oktober 2025','tNn2_2NaJ_Y'],
  ['Candlestick - 26 Oktober 2025','1AmBp9nKQBU'],
  ['Chart Pattern - 9 November 2025','d6H62mJjeck'],
  ['Trader Minoritas - Divergence - 16 November 2025','UkNXZPl4PBY'],
  ['Trader Minoritas - Bollinger Bands - 30 November 2025','n4rdoF146d4'],
  ['Trader Minoritas - Survival First, Profit Later: Blueprint Anti-MC - 7 Desember 2025','n6sy7LXEX_w'],
  ['Trader Minoritas - EA AUTO TP & SL (LAUNCHING) - 21 Desember 2025','DBoUe1w4ACs'],
  ['Trader Minoritas - Ngosan 4 Januari 2026','RTEy6_KfF6I'],
  ['Trader Minoritas - Trading Psychology 11 Januari 2026','PNPABTuDkOE'],
  ['Trader Minoritas - Ngosan 25 Januari 2026','--0qQtLqQTo'],
  ['New Beginning (OMEGA MINORITAS LAUNCHING) 1 Februari 2026','OWpD4OcAtuA'],
  ['New EDGE - 22 February 2026','S68M4VIktUo'],
  ['NEW EDGE 2 - 15 Maret 2026','PeA1MhlfO70'],
  ['New Project - Trader Minoritas 29 Maret 2026','DQCk-V-lVRs'],
  ['GRAND LAUNCHING EA GLOBAL AUTO TP & SL','vYLmWhyN-QQ'],
  ['Sharing by Member VIP Trader Minoritas - Darcey','v1Q2my4ZHHU'],
  ['Breakout Trading Strategy - Om Sis','ocYXHDNQO6E'],
  ['Sharing by Member (Bang Tama) - 24 Mei 2026 - Trader Minoritas','Y89ranVJFUM'],
  ['Ngosan - 7 Juni 2026 (Trader Minoritas)','1CWNqNPVPu4'],
  ['Wonders of the World - Trader Minoritas 21 Juni 2026','snhCfyWgJeo'],
  ['Anniversary Preparation - 5 July 2026','-Y6rFugbCyc'],
  ['Scalping Edge Sharing 61% winrate by Member (Mr. Tama) & Announcement','wI1G9lRvTeQ'],
  ['Ngobrol Santai Berkualitas, Review Strategy, Update EA, dll - 9 Agustus 2026','7VynpmhQZgQ'],
  ['GRAND LAUNCHING - TRADER MINORITAS CHRONO HEATMAP','AJN-i0xh4h8'],
  ['Ngosan (Ngobrol Santai) - Update 6 September 2026','NJfw71NKDYE']
] .map(([title,id],i)=>({number:String(i+1).padStart(2,'0'),title,id}));
vipVideos[0].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/01-introduction-class.jpg';
vipVideos[1].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/02-forex-by-the-numbers.jpg';
vipVideos[2].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/03-metode%26strategi-part1.jpg';
vipVideos[3].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/04-backtest%26forwardtest.jpg';
vipVideos[4].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/05-money-management.jpg';
vipVideos[5].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/06-metode%26strategi-part2.jpg';
vipVideos[6].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/07-ngosan.jpg';
vipVideos[7].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/08-foundation.jpg';
vipVideos[8].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/09-dow-theory-part1.jpg';
vipVideos[9].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/10-dow-theory-part2.jpg';
vipVideos[10].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/11-support-resistance.jpg';
vipVideos[11].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/12-candlestick.jpg';
vipVideos[12].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/13-chartpattern.jpg';
vipVideos[13].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/14-divergence.jpg';
vipVideos[14].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/15-bollingerbands.jpg';
vipVideos[15].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/16-survival-first-profit-later.jpg';
vipVideos[16].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/17-EA-Auto-TP-SL-Launching.jpg';
vipVideos[17].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/18-ngosan.jpg';
vipVideos[18].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/19-trading-psychology.jpg';
vipVideos[19].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/20-ngosan.jpg';
vipVideos[20].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/21-new-beginning.jpg';
vipVideos[21].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/22-new-edge.jpg';
vipVideos[22].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/23-new-edge-2.jpg';
vipVideos[23].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/24-new-project.jpg';
vipVideos[24].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/25-grand-launching-EA-global-auto-tp-sl.jpg';
vipVideos[25].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/26-sharing-by-member-vip-darcey.jpg';
vipVideos[26].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/27-breakout-omsis.jpg';
vipVideos[27].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/28-sharing-by-member-bangtama.jpg';
vipVideos[28].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/29-ngosan.jpg';
vipVideos[29].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/30-wonders-of-the-world.jpg';
vipVideos[30].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/31-anniversary-preparation.jpg';
vipVideos[31].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/32-scalping-edge-sharing-61%25winrate-mr.tama.jpg';
vipVideos[32].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/33-ngobrol-santai-berkualitas.jpg';
vipVideos[33].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/34-grand-launching-chrono-heatmap.jpg';
vipVideos[34].thumb='https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/35-ngosan.jpg';


const videoLibrary=document.getElementById('videoLibrary');
const videoModal=document.getElementById('videoModal');
const videoFrame=document.getElementById('videoFrame');
const videoModalTitle=document.getElementById('videoModalTitle');
const closeVideo=document.getElementById('closeVideo');
const modalComplete=document.getElementById('modalComplete');
const videoControls=document.getElementById('videoControls');
const videoPlay=document.getElementById('videoPlay');
const videoSeek=document.getElementById('videoSeek');
const videoTime=document.getElementById('videoTime');
const videoMute=document.getElementById('videoMute');
const videoVolume=document.getElementById('videoVolume');
const videoFullscreen=document.getElementById('videoFullscreen');
const videoFrameWrap=document.querySelector('.video-frame-wrap');
let activeVideoId=null,videoPlayer=videoFrame,videoTimer=null;
let videoPlaybackRate=1;

let lastPositionSaveAt=0;

function getVideoPositionKey(id){
  return 'tmVipPosition_'+id;
}

function saveCurrentVideoPosition(){
  if(!videoPlayer || !activeVideoId) return;

  const current=videoPlayer.currentTime;
  const duration=videoPlayer.duration;

  if(!Number.isFinite(current) || current<0) return;

  const key=getVideoPositionKey(activeVideoId);

  // Jika video hampir selesai, mulai lagi dari awal
  // saat dibuka kembali.
  if(Number.isFinite(duration) && duration>0 && current>=duration-2){
    localStorage.removeItem(key);
    return;
  }

  localStorage.setItem(key,String(Math.floor(current)));
  lastPositionSaveAt=current;
}

// Simpan posisi berkala, saat pause, dan saat video selesai.
videoPlayer?.addEventListener('timeupdate',()=>{
  if(videoPlayer.currentTime-lastPositionSaveAt>=5){
    saveCurrentVideoPosition();
  }
});

videoPlayer?.addEventListener('pause',saveCurrentVideoPosition);
videoPlayer?.addEventListener('ended',()=>{
  if(activeVideoId){
    localStorage.removeItem(getVideoPositionKey(activeVideoId));
  }
});

let videoSpeedButton=null;
let videoControlsHideTimer=null;

// Auto-hide the custom player controls while the video is playing.
(function setupAutoHideControls(){
  if(!videoControls || document.getElementById('tmAutoHideVideoControls'))return;
  const style=document.createElement('style');
  style.id='tmAutoHideVideoControls';
  style.textContent=`
    #videoControls{opacity:1;transform:translateY(0);transition:opacity .22s ease,transform .22s ease;}
    #videoControls.tm-controls-hidden{opacity:0;transform:translateY(10px);pointer-events:none;}
    .video-frame-wrap{cursor:default;}
    @media (prefers-reduced-motion:reduce){#videoControls{transition:none;}}
  `;
  document.head.appendChild(style);

  const showControls=()=>{
    videoControls.classList.remove('tm-controls-hidden');
    clearTimeout(videoControlsHideTimer);
    if(videoPlayer && !videoPlayer.paused){
      videoControlsHideTimer=setTimeout(()=>videoControls.classList.add('tm-controls-hidden'),2500);
    }
  };
  const hideControls=()=>{
    clearTimeout(videoControlsHideTimer);
    videoControlsHideTimer=null;
    if(videoPlayer && !videoPlayer.paused)videoControls.classList.add('tm-controls-hidden');
  };
  const handleActivity=()=>showControls();
  videoFrameWrap?.addEventListener('mousemove',handleActivity,{passive:true});
  videoFrameWrap?.addEventListener('pointermove',handleActivity,{passive:true});
  videoFrameWrap?.addEventListener('touchstart',handleActivity,{passive:true});
  videoControls.addEventListener('mouseenter',()=>showControls());
  videoControls.addEventListener('focusin',()=>showControls());
  videoControls.addEventListener('mouseleave',()=>{if(videoPlayer&&!videoPlayer.paused)hideControls();});
  videoControls.addEventListener('focusout',()=>{if(videoPlayer&&!videoPlayer.paused)showControls();});
  videoPlayer?.addEventListener('play',showControls);
  videoPlayer?.addEventListener('pause',()=>{clearTimeout(videoControlsHideTimer);videoControlsHideTimer=null;videoControls.classList.remove('tm-controls-hidden');});
  videoPlayer?.addEventListener('ended',()=>{clearTimeout(videoControlsHideTimer);videoControlsHideTimer=null;videoControls.classList.remove('tm-controls-hidden');});
  window.tmShowVideoControls=showControls;
})();

// Compact playback-speed control, injected into the existing custom player controls.
if(videoControls && !document.getElementById('videoSpeed')){
  videoSpeedButton=document.createElement('button');
  videoSpeedButton.type='button';
  videoSpeedButton.id='videoSpeed';
  videoSpeedButton.textContent='1×';
  videoSpeedButton.setAttribute('aria-label','Kecepatan pemutaran 1×');
  videoSpeedButton.title='Kecepatan pemutaran';
  videoSpeedButton.style.cssText='min-width:42px;height:34px;padding:0 8px;border:1px solid rgba(212,175,55,.38);border-radius:7px;background:rgba(20,20,18,.92);color:#f1d27a;font:600 12px/1 Arial,sans-serif;cursor:pointer;';
  const speedRates=[0.5,0.75,1,1.25,1.5,1.75,2];
  videoSpeedButton.addEventListener('click',()=>{
    const i=speedRates.indexOf(videoPlaybackRate);
    videoPlaybackRate=speedRates[(i+1)%speedRates.length];
    if(videoPlayer)videoPlayer.playbackRate=videoPlaybackRate;
    videoSpeedButton.textContent=`${videoPlaybackRate}×`;
    videoSpeedButton.setAttribute('aria-label',`Kecepatan pemutaran ${videoPlaybackRate}×`);
  });
  videoControls.insertBefore(videoSpeedButton,videoFullscreen||null);
}

function formatTime(sec){sec=Math.max(0,Math.floor(sec||0));const h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60),s=String(sec%60).padStart(2,'0');return h?`${h}:${String(m).padStart(2,'0')}:${s}`:`${m}:${s}`}
function syncVideoControls(){
  if(!videoPlayer)return;
  const duration=videoPlayer.duration||0,current=videoPlayer.currentTime||0;
  if(videoSeek)videoSeek.value=duration?Math.round(current/duration*1000):0;
  if(videoTime)videoTime.textContent=`${formatTime(current)} / ${formatTime(duration)}`;
  if(videoVolume)videoVolume.value=Math.round((videoPlayer.muted?0:videoPlayer.volume*100));
  if(videoMute)videoMute.textContent=(videoPlayer.muted||videoPlayer.volume===0)?'🔇':'🔊';
  if(videoPlay)videoPlay.textContent=videoPlayer.paused?'▶':'❚❚';
}
function startVideoTimer(){clearInterval(videoTimer);videoTimer=setInterval(syncVideoControls,500)}
function stopVideoTimer(){clearInterval(videoTimer);videoTimer=null}
async function getSignedVideoUrl(file){
  // Mint a short-lived token from the auth Worker using the HttpOnly session cookie.
  const tokenResponse = await fetch(`${AUTH_URL}?path=video-token`, {
    method: 'POST',
    credentials: 'include'
  });
  const tokenData = await tokenResponse.json().catch(() => ({}));
  if (tokenResponse.status === 401) {
    throw new Error('Sesi login sudah berakhir. Silakan login kembali.');
  }
  if (tokenResponse.status === 403) {
    throw new Error('Akses VIP tidak aktif. Hubungi admin.');
  }
  if (!tokenResponse.ok || !tokenData.ok || !tokenData.videoToken) {
    throw new Error(tokenData.error || 'Gagal memverifikasi akses VIP.');
  }

  const res = await fetch(`${WORKER_URL}/video-url?file=${encodeURIComponent(file)}`, {
    headers: { Authorization: `Bearer ${tokenData.videoToken}` }
  });
  if (res.status === 401) {
    throw new Error('Token video kedaluwarsa. Silakan coba putar video lagi.');
  }
  if (res.status === 403) {
    throw new Error('Akses VIP tidak aktif. Hubungi admin.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success || !data.url) {
    throw new Error(data.error || 'Gagal mendapatkan akses video.');
  }
  return data.url;
}
async function createR2Player(file){
  if(!videoPlayer)return;
  window.tmShowVideoControls?.();
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.load();
  videoPlayer.dataset.file=file;
  if(videoPlay)videoPlay.textContent='…';
  try{
    const signedUrl=await getSignedVideoUrl(file);
    if(activeVideoId!==file.replace(/\.mp4$/i,''))return;

const positionKey=getVideoPositionKey(activeVideoId);
const savedPosition=Number(localStorage.getItem(positionKey)||0);

lastPositionSaveAt=0;

// Pasang listener sebelum video dimuat agar posisi
// bisa dipulihkan setelah durasi video diketahui.
videoPlayer.addEventListener('loadedmetadata',function restorePosition(){
  if(!videoPlayer || !activeVideoId) return;

  const duration=videoPlayer.duration;

  if(
    Number.isFinite(duration) &&
    savedPosition>0 &&
    savedPosition<duration-2
  ){
    videoPlayer.currentTime=savedPosition;
  }

  lastPositionSaveAt=savedPosition;
},{once:true});

videoPlayer.src=signedUrl;
videoPlayer.playbackRate=videoPlaybackRate;
videoPlayer.load();
await videoPlayer.play().catch(()=>{});

    startVideoTimer();
    syncVideoControls();
  }catch(err){
    stopVideoTimer();
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
    if(videoTime)videoTime.textContent=err.message||'Video gagal dimuat.';
    if(videoPlay)videoPlay.textContent='▶';
    toastMessage(err.message||'Video gagal dimuat.');
  }
}
function closeVipVideo(){
  clearTimeout(videoControlsHideTimer);
  videoControlsHideTimer=null;
  videoControls?.classList.remove('tm-controls-hidden');
   saveCurrentVideoPosition();
  stopVideoTimer();
  if(videoPlayer){videoPlayer.pause();videoPlayer.removeAttribute('src');videoPlayer.load();}
  if(document.fullscreenElement)document.exitFullscreen?.().catch?.(()=>{});
  exitCssFullscreen();
  videoModal?.close();activeVideoId=null;
}

if(videoLibrary){
  const completed=()=>JSON.parse(localStorage.getItem('tmVipCompleted')||'[]');
  const isDone=id=>completed().includes(id);
  const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  function renderVideoLibrary(){
    videoLibrary.innerHTML=vipVideos.map(v=>{
      const done=isDone(v.id);
      return `<article class="video-card ${done?'is-complete':''}"><button class="video-thumb" data-video-id="${v.id}" data-video-title="${esc(v.title)}">${v.thumb?`<img src="${v.thumb}" alt="" loading="lazy">`:`<div class="video-thumb-art" aria-hidden="true"><span>TRADER<br>MINORITAS</span><strong>${v.number}</strong></div>`}<span class="video-play">▶</span><b>${v.number}</b></button><div class="video-card-body"><div class="video-card-label"><small>MODUL VIP · VIDEO ${v.number}</small>${done?'<span class="complete-badge">✓ SELESAI</span>':''}</div><h3>${esc(v.title)}</h3><div class="video-actions"><button class="watch-video" data-video-id="${v.id}" data-video-title="${esc(v.title)}">Tonton video <span>→</span></button><button class="complete-video ${done?'done':''}" data-complete-id="${v.id}">${done?'✓ Sudah selesai':'○ Tandai selesai'}</button></div></div></article>`;
    }).join('');
  }
  function markComplete(id){
    const list=completed(),alreadyDone=list.includes(id),next=alreadyDone?list.filter(item=>item!==id):[...list,id];
    localStorage.setItem('tmVipCompleted',JSON.stringify(next));localStorage.setItem('tmVipLast',id);renderVideoLibrary();updateOverview();
    toastMessage(alreadyDone?'Status materi dibatalkan. Progress belajar diperbarui.':'Materi ditandai sebagai selesai. Progress belajar diperbarui.');
  }
  videoLibrary.addEventListener('click',e=>{
    const complete=e.target.closest('[data-complete-id]');
    if(complete){markComplete(complete.dataset.completeId);return;}
    const btn=e.target.closest('[data-video-id]');if(!btn)return;
    localStorage.setItem('tmVipLast',btn.dataset.videoId);updateOverview();activeVideoId=btn.dataset.videoId;videoModalTitle.textContent=btn.dataset.videoTitle;
    if(modalComplete){const done=isDone(activeVideoId);modalComplete.textContent=done?'✓ Sudah selesai':'✓ Tandai sudah selesai';modalComplete.classList.toggle('done',done);modalComplete.disabled=false;}
    videoModal.showModal();
    createR2Player(`${activeVideoId}.mp4`);
  });
  renderVideoLibrary();
}
if(modalComplete)modalComplete.onclick=()=>{if(activeVideoId)markVideoCompleteFromModal(activeVideoId)};
function markVideoCompleteFromModal(id){
  const list=JSON.parse(localStorage.getItem('tmVipCompleted')||'[]'),alreadyDone=list.includes(id),next=alreadyDone?list.filter(item=>item!==id):[...list,id];
  localStorage.setItem('tmVipCompleted',JSON.stringify(next));localStorage.setItem('tmVipLast',id);renderVideoLibrary();updateOverview();
  if(modalComplete){modalComplete.textContent=alreadyDone?'○ Tandai sudah selesai':'✓ Sudah selesai';modalComplete.classList.toggle('done',!alreadyDone);modalComplete.disabled=false;}
  toastMessage(alreadyDone?'Status materi dibatalkan. Progress belajar diperbarui.':'Materi ditandai sebagai selesai. Progress belajar diperbarui.');
}
if(closeVideo)closeVideo.onclick=closeVipVideo;
if(videoModal)videoModal.addEventListener('click',e=>{if(e.target===videoModal)closeVipVideo()});

if(videoPlay)videoPlay.onclick=()=>{if(!videoPlayer)return;videoPlayer.paused?videoPlayer.play():videoPlayer.pause();syncVideoControls()};
if(videoSeek)videoSeek.oninput=()=>{if(videoPlayer){const d=videoPlayer.duration||0;videoPlayer.currentTime=d*(+videoSeek.value/1000);syncVideoControls()}};
if(videoMute)videoMute.onclick=()=>{if(!videoPlayer)return;videoPlayer.muted=!videoPlayer.muted;syncVideoControls()};
if(videoVolume)videoVolume.oninput=()=>{if(!videoPlayer)return;const v=Math.max(0,Math.min(100,+videoVolume.value))/100;videoPlayer.volume=v;videoPlayer.muted=v===0;syncVideoControls()};
function enterCssFullscreen(){
  if(!videoFrameWrap)return;
  videoFrameWrap.classList.add('tm-css-fullscreen');
  document.documentElement.classList.add('tm-video-open');
  document.body.classList.add('tm-video-fullscreen');
  videoFullscreen?.setAttribute('aria-label','Keluar layar penuh');
}
function exitCssFullscreen(){
  videoFrameWrap?.classList.remove('tm-css-fullscreen');
  document.documentElement.classList.remove('tm-video-open');
  document.body.classList.remove('tm-video-fullscreen');
  videoFullscreen?.setAttribute('aria-label','Layar penuh');
}
if(videoFullscreen)videoFullscreen.onclick=async()=>{
  if(!videoPlayer||!videoFrameWrap)return;
  if(document.fullscreenElement){try{await document.exitFullscreen()}catch(_){}return;}
  if(videoFrameWrap.classList.contains('tm-css-fullscreen')){exitCssFullscreen();return;}
  try{if(videoFrameWrap.requestFullscreen){await videoFrameWrap.requestFullscreen({navigationUI:'hide'});return;}}catch(_){}
  enterCssFullscreen();
};
document.addEventListener('fullscreenchange',()=>{
  if(!document.fullscreenElement&&!videoFrameWrap?.classList.contains('tm-css-fullscreen'))videoFullscreen?.setAttribute('aria-label','Layar penuh');
});
if(videoPlayer){
  ['loadedmetadata','timeupdate','durationchange','play','pause','volumechange','ended'].forEach(ev=>videoPlayer.addEventListener(ev,syncVideoControls));
}

function toastMessage(message){const t=document.getElementById('toast');if(!t)return;t.textContent=message;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}

/* Overview state: browser-local learning progress */
const overviewVideos = [
['Introduction Class','qu_wCOW0wNI'],['Forex by The Numbers: Rahasia Menghitung Pip, Profit & Resiko Seperti Pro','X3PwOoXoOSk'],['Metode/Strategi Part 1','xoq6ayL8ntM'],['Backtest & Forward Test','aAimxdsn9aE'],['Money Management','3SGEVLCbivc'],['Metode/Strategi Part 2','MzTC-A4bKkY'],['Ngosan (Ngobrol Santai) - 21 September 2025','Lu4tYAVNDyk'],['Foundation - 28 September 2025','NET4ByGlbbI'],['Dow Theory Part 1 - 5 Oktober 2025','Lr5y2XsXCqU'],['Dow Theory Part 2 - 12 Oktober 2025','8I9SWn_tYEU'],['Support & Resistance - 19 Oktober 2025','tNn2_2NaJ_Y'],['Candlestick - 26 Oktober 2025','1AmBp9nKQBU'],['Chart Pattern - 9 November 2025','d6H62mJjeck'],['Trader Minoritas - Divergence - 16 November 2025','UkNXZPl4PBY'],['Trader Minoritas - Bollinger Bands - 30 November 2025','n4rdoF146d4'],['Trader Minoritas - Survival First, Profit Later: Blueprint Anti-MC - 7 Desember 2025','n6sy7LXEX_w'],['Trader Minoritas - EA AUTO TP & SL (LAUNCHING) - 21 Desember 2025','DBoUe1w4ACs'],['Trader Minoritas - Ngosan 4 Januari 2026','RTEy6_KfF6I'],['Trader Minoritas - Trading Psychology 11 Januari 2026','PNPABTuDkOE'],['Trader Minoritas - Ngosan 25 Januari 2026','--0qQtLqQTo'],['New Beginning (OMEGA MINORITAS LAUNCHING) 1 Februari 2026','OWpD4OcAtuA'],['New EDGE - 22 February 2026','S68M4VIktUo'],['NEW EDGE 2 - 15 Maret 2026','PeA1MhlfO70'],['New Project - Trader Minoritas 29 Maret 2026','DQCk-V-lVRs'],['GRAND LAUNCHING EA GLOBAL AUTO TP & SL','vYLmWhyN-QQ'],['Sharing by Member VIP Trader Minoritas - Darcey','v1Q2my4ZHHU'],['Breakout Trading Strategy - Om Sis','ocYXHDNQO6E'],['Sharing by Member (Bang Tama) - 24 Mei 2026 - Trader Minoritas','Y89ranVJFUM'],['Ngosan - 7 Juni 2026 (Trader Minoritas)','1CWNqNPVPu4'],['Wonders of the World - Trader Minoritas 21 Juni 2026','snhCfyWgJeo'],['Anniversary Preparation - 5 July 2026','-Y6rFugbCyc'],['Scalping Edge Sharing 61% winrate by Member (Mr. Tama) & Announcement','wI1G9lRvTeQ'],['Ngobrol Santai Berkualitas, Review Strategy, Update EA, dll - 9 Agustus 2026','7VynpmhQZgQ'],['GRAND LAUNCHING - TRADER MINORITAS CHRONO HEATMAP','AJN-i0xh4h8'],['Ngosan (Ngobrol Santai) - Update 6 September 2026','NJfw71NKDYE']
];


function updateOverview(){
 const done=JSON.parse(localStorage.getItem('tmVipCompleted')||'[]');
 const last=localStorage.getItem('tmVipLast')||'';
 const total=overviewVideos.length;

 // Hitung progress berdasarkan video yang benar-benar ada di daftar
 const completed=overviewVideos.filter(v=>done.includes(v[1])).length;
 const pct=total?Math.round(completed/total*100):0;

 const a=document.getElementById('progressCount');
 const b=document.getElementById('progressPercent');
 const bar=document.getElementById('progressBar');
 const label=document.getElementById('progressLabel');

 if(a)a.textContent=completed+' / '+total;
 if(b)b.textContent=pct+'%';
 if(bar)bar.style.width=pct+'%';

 // Prioritaskan video terakhir yang dibuka jika belum selesai.
 // Jika sudah selesai, cari video pertama yang belum selesai.
 let next=overviewVideos.find(v=>v[1]===last&&!done.includes(v[1]));

 if(!next){
   next=overviewVideos.find(v=>!done.includes(v[1]));
 }

 const contTitle=document.getElementById('continueTitle');
 const contMeta=document.getElementById('continueMeta');
 const btn=document.getElementById('continueButton');

 if(next){
   const idx=overviewVideos.findIndex(v=>v[1]===next[1]);

   if(contTitle)contTitle.textContent=next[0];
   if(contMeta)contMeta.textContent=
     'Materi '+String(idx+1).padStart(2,'0')+
     ' · Modul VIP Trader Minoritas';

   if(btn){
     btn.textContent='Lanjutkan Belajar →';
     btn.onclick=()=>{
       openPage('learn');

       // Buka video yang dipilih setelah halaman Modul VIP ditampilkan
       setTimeout(()=>{
         const videoButton=document.querySelector(
           `[data-video-id="${next[1]}"]`
         );

         if(videoButton)videoButton.click();
       },100);
     };
   }

   if(label){
     label.textContent=completed
       ? `Anda sudah menyelesaikan ${completed} dari ${total} video. Lanjutkan materi berikutnya.`
       : 'Mulai belajar dari materi pertama yang belum selesai.';
   }
 }else{
   if(contTitle)contTitle.textContent='Semua modul selesai!';
   if(contMeta)contMeta.textContent=
     'Selamat! Anda telah menyelesaikan seluruh materi Modul VIP.';
   if(btn){
     btn.textContent='Lihat Semua Modul →';
     btn.onclick=()=>openPage('learn');
   }
   if(label){
     label.textContent='Luar biasa! Anda telah menyelesaikan semua '+total+' video.';
   }
 }

 const recent=document.getElementById('recentMaterials');

 if(recent){
   recent.innerHTML=overviewVideos.slice(-3).reverse().map((v,i)=>
     `<div class="recent-item">
       <div>
         <b>${v[0]}</b>
         <small>VIDEO ${total-i}</small>
       </div>
       <span>▶</span>
     </div>`
   ).join('');
 }
}

updateOverview();




/* TM EDGE LAB spreadsheet backtest */
(function(){
 const $=id=>document.getElementById(id);
 const defaults={mode:'fixed',lot:.01,initial:1000,profit:10,loss:10,explanation:'',rr:'',symbol:'XAUUSD',timeframe:'M1',period:'1 Jan 2024 s/d 31 Des 2026',trades:[]};
 let state={...defaults};
 if(!Array.isArray(state.trades))state.trades=[];
 // Migrate the previous combined Symbol / Timeframe value.
 if(typeof state.symbol==='string' && state.symbol.includes(' - ')){
   const parts=state.symbol.split(' - ');
   state.symbol=parts[0]||'XAUUSD';
   if(!state.timeframe && parts[1])state.timeframe=parts[1];
 }
 if(!state.timeframe)state.timeframe='M1';
 const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
 const money=n=>'$'+Number(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
 // Backtest data stays in memory for this browser tab/session only. Use JSON Export to keep it.
 function persist(){}
 function initInputs(){
  $('edgeMode').value=state.mode;$('edgeLot').value=state.lot;$('edgeInitial').value=state.initial;
  $('edgeProfit').value=state.profit;$('edgeLoss').value=Math.abs(Number(state.loss)||0);$('edgeExplanation').value=state.explanation||'';
  $('edgeRR').value=state.rr||'';$('edgeSymbol').value=state.symbol;$('edgeTimeframe').value=state.timeframe;const periodLabel=$('edgePeriodLabel');if(periodLabel)periodLabel.textContent=state.period;
  syncMode();
 }
 function syncMode(){
  state.mode=$('edgeMode').value;
  $('edgeFixedValues').hidden=state.mode==='manual';
  $('edgeManualValues').hidden=state.mode!=='manual';
  const modeDescription=$('edgeModeDescription');
  if(modeDescription){
   modeDescription.textContent=state.mode==='fixed'
    ?'Fixed Lot: Profit/Loss otomatis dihitung dari nilai Profit per Win dan Loss per Loss di atas.'
    :'Manual: isi Profit/Loss tiap transaksi secara langsung di tabel backtest; profit gunakan angka positif dan loss angka negatif.';
  }
  persist();render();
 }
 function stats(){
  let balance=Number(state.initial)||0,peak=balance,maxDD=0,wins=0,losses=0,buy=0,sell=0,gp=0,gl=0,cw=0,cl=0,mw=0,ml=0;
  let rows=state.trades.map((t,i)=>{
   const result=t.result||'',dir=t.direction||'';
   let pl=0;
   if(state.mode==='fixed') pl=result==='Win'?(Number(state.profit)||0):result==='Loss'?-Math.abs(Number(state.loss)||0):0;
   else pl=Number(t.pl)||0;
   if(result==='Win'){wins++;cw++;cl=0;mw=Math.max(mw,cw);gp+=Math.max(pl,0);}
   else if(result==='Loss'){losses++;cl++;cw=0;ml=Math.max(ml,cl);gl+=Math.abs(Math.min(pl,0));}
   if(dir==='Buy')buy++;if(dir==='Sell')sell++;
   balance+=pl;peak=Math.max(peak,balance);const dd=peak-balance;maxDD=Math.max(maxDD,dd);
   return {...t,num:i+1,pl,balance,peak,dd,winStreak:cw,lossStreak:cl};
  });
  const net=balance-(Number(state.initial)||0);
  return {rows,balance,peak,maxDD,wins,losses,buy,sell,gp,gl,pf:gl?gp/gl:(gp?gp:0),winrate:rows.length?wins/rows.length*100:0,net,mw,ml,recovery:maxDD?net/maxDD:0};
 }
 function renderRows(){
  const m=stats(), rows=m.rows.slice();
  // Keep a spreadsheet-like blank row at the bottom for immediate entry.
  rows.push({num:rows.length+1,direction:'Sell',result:'',pl:''});
  $('edgeRows').innerHTML=rows.map((t,i)=>{
   const blank=i===rows.length-1;
   const plText=state.mode==='fixed'?(t.result==='Win'?money(Math.abs(Number(state.profit)||0)):t.result==='Loss'?money(-Math.abs(Number(state.loss)||0)):'—'):(blank?'':money(t.pl));
   const bal=blank?'—':money(t.balance),peak=blank?'—':money(t.peak),dd=blank?'—':money(t.dd);
   return `<tr><td>${t.num}</td>
    <td><select data-i="${i}" data-k="direction" aria-label="Buy/Sell"><option ${t.direction==='Buy'?'selected':''}>Buy</option><option ${t.direction==='Sell'?'selected':''}>Sell</option></select></td>
    <td><select data-i="${i}" data-k="result" aria-label="Win/Loss"><option value="">—</option><option ${t.result==='Win'?'selected':''}>Win</option><option ${t.result==='Loss'?'selected':''}>Loss</option></select></td>
    <td>${state.mode==='manual'?`<input data-i="${i}" data-k="pl" type="number" step="any" placeholder="Profit + / Loss -" value="${blank?'':esc(t.pl??'')}" aria-label="Profit/Loss dolar">`:`<span class="calculated ${t.pl<0?'negative':'positive'}">${blank?'—':plText}</span>`}</td>
    <td><span class="calculated">${bal}</span></td><td><span class="calculated">${peak}</span></td><td><span class="calculated ${!blank&&t.dd?'negative':''}">${dd}</span></td>
    <td><span class="calculated">${blank?'—':t.winStreak}</span></td><td><span class="calculated">${blank?'—':t.lossStreak}</span></td>
    </tr>`;
  }).join('');
 }
 function renderStats(){
  const m=stats();
  const items=[['Total Net Profit/Loss',money(m.net)],['Total Trades',m.rows.length],['Total Win',m.wins],['Total Loss',m.losses],['Winrate',m.winrate.toFixed(2)+'%'],['Profit Factor',m.pf.toFixed(2)],['Max Drawdown',money(m.maxDD)],['Max Drawdown %',(Number(state.initial)?(m.maxDD/Number(state.initial)*100):0).toFixed(2)+'%'],['Consecutive Wins',m.mw],['Consecutive Losses',m.ml],['Recovery Factor',m.recovery.toFixed(2)],['Total Buy',m.buy],['Total Sell',m.sell],['Current Balance',money(m.balance)]];
  $('edgeStats').innerHTML=items.map(([k,v])=>`<div class="edge-stat"><span>${k}</span><strong>${v}</strong></div>`).join('');
  const svg=$('edgeChart'), vals=[Number(state.initial)||0,...m.rows.map(t=>t.balance)], W=600,H=220,p=16,min=Math.min(...vals),max=Math.max(...vals),range=max-min||1;
  const pts=vals.map((v,i)=>`${p+i/Math.max(vals.length-1,1)*(W-p*2)},${H-p-(v-min)/range*(H-p*2)}`).join(' ');
  svg.innerHTML=`<line x1="16" y1="204" x2="584" y2="204" class="edge-axis"/><polyline points="${pts}" class="edge-line"/>`;
 }
 function render(){renderRows();renderStats();}
 function commitCell(el){
  const i=Number(el.dataset.i),k=el.dataset.k;
  if(i===state.trades.length){
   const t={direction:'Sell',result:'',pl:0,entryDate:'',exitDate:''};
   t[k]=el.value;
   if(k==='direction'&&t.direction==='')t.direction='Sell';
   state.trades.push(t);
  }else if(state.trades[i]){
   state.trades[i][k]=el.value;
  }else return;
  if(state.mode==='manual' && state.trades[i] && k==='pl'){
   const amount=Math.abs(Number(state.trades[i].pl)||0);
   state.trades[i].pl=state.trades[i].result==='Loss'?-amount:state.trades[i].result==='Win'?amount:Number(state.trades[i].pl)||0;
  }
  if(state.mode==='manual' && state.trades[i] && k==='result' && ['Win','Loss'].includes(state.trades[i].result)){
   const amount=Math.abs(Number(state.trades[i].pl)||0);
   state.trades[i].pl=state.trades[i].result==='Loss'?-amount:amount;
  }
  // Only count a transaction after Win/Loss is selected. In fixed mode result drives P/L.
  if(state.trades[i] && !state.trades[i].result && k!=='result' && !state.trades[i].entryDate && !state.trades[i].exitDate && !state.trades[i].pl){ /* retain editable draft */ }
  persist();render();
 }
 document.addEventListener('change',e=>{const el=e.target;if(!el.matches('#edgeRows [data-k]'))return;commitCell(el);});
 ['edgeLot','edgeInitial','edgeProfit','edgeLoss','edgeExplanation','edgeRR','edgeSymbol','edgeTimeframe','edgePeriodButton'].forEach(id=>$(id)?.addEventListener('change',()=>{
  const map={edgeLot:'lot',edgeInitial:'initial',edgeProfit:'profit',edgeLoss:'loss',edgeExplanation:'explanation',edgeRR:'rr',edgeSymbol:'symbol',edgeTimeframe:'timeframe',edgePeriodButton:'period'};
  const key=map[id];state[key]=id==='edgeLot'||id==='edgeInitial'||id==='edgeProfit'||id==='edgeLoss'?Number($(id).value)||0:(id==='edgePeriodButton'?$('edgePeriodLabel').textContent:$(id).value);persist();render();
 }));
 $('edgeMode')?.addEventListener('change',syncMode);
 function downloadFile(filename, content, type){
  const blob=new Blob([content],{type});
  const href=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=href;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(href),1000);
 }
 $('edgeProjectExport')?.addEventListener('click',()=>{
  const payload={format:'TM_EDGE_LAB_PROJECT',version:1,exportedAt:new Date().toISOString(),project:{
   mode:state.mode,lot:state.lot,initial:state.initial,profit:state.profit,loss:Math.abs(Number(state.loss)||0),
   explanation:state.explanation,rr:state.rr,symbol:state.symbol,timeframe:state.timeframe,
   period:state.period,trades:state.trades
  }};
  const safeSymbol=String(state.symbol||'Backtest').replace(/[^a-z0-9_-]+/gi,'_');
  downloadFile(`TM_EDGE_LAB_${safeSymbol}.json`,JSON.stringify(payload,null,2),'application/json;charset=utf-8');
  toastMessage('Project berhasil diexport.');
 });
 $('edgeNewProject')?.addEventListener('click',()=>{
  if(!confirm('Mulai project baru? Semua transaksi dan pengaturan backtest saat ini akan dikosongkan. Export JSON terlebih dahulu jika ingin menyimpannya.'))return;
  state={...defaults,trades:[]};
  initInputs();render();
  toastMessage('Project baru siap. Data backtest sebelumnya dikosongkan.');
 });
 $('edgeProjectImport')?.addEventListener('click',()=>$('edgeProjectFile')?.click());
 $('edgeProjectFile')?.addEventListener('change',async e=>{
  const file=e.target.files?.[0];if(!file)return;
  try{
   const imported=JSON.parse(await file.text());
   const project=imported?.format==='TM_EDGE_LAB_PROJECT' ? imported.project : imported?.project;
   const required=['mode','lot','initial','profit','loss','explanation','rr','symbol','timeframe','period','trades'];
   if(!project||!required.every(k=>Object.prototype.hasOwnProperty.call(project,k))||!Array.isArray(project.trades)){
    throw new Error('Invalid project');
   }
   if(!['fixed','manual'].includes(project.mode))throw new Error('Invalid mode');
   if(project.trades.length>100000)throw new Error('Too many trades');
   state={...defaults,...project,loss:Math.abs(Number(project.loss)||0),trades:project.trades.map(t=>({
    direction:t?.direction==='Buy'?'Buy':'Sell',
    result:['Win','Loss'].includes(t?.result)?t.result:'',
    pl:Number(t?.pl)||0,
    entryDate:String(t?.entryDate||''),
    exitDate:String(t?.exitDate||'')
   }))};
   persist();initInputs();render();
   toastMessage('Project berhasil diimport.');
  }catch(err){
   toastMessage('File project tidak valid. Pilih file JSON hasil Export TM EDGE LAB.');
  }
  e.target.value='';
 });
 initInputs();render();
})();


/* TM EDGE LAB calendar period picker */
(function setupEdgePeriodPicker(){
  const button=document.getElementById('edgePeriodButton');
  const label=document.getElementById('edgePeriodLabel');
  const picker=document.getElementById('edgePeriodPicker');
  const start=document.getElementById('edgePeriodStart');
  const end=document.getElementById('edgePeriodEnd');
  const apply=document.getElementById('edgePeriodApply');
  const cancel=document.getElementById('edgePeriodCancel');
  if(!button||!label||!picker||!start||!end||!apply||!cancel)return;

  const formatDate=value=>{
    if(!value)return '';
    const [y,m,d]=value.split('-').map(Number);
    const months=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return `${d} ${months[m-1]} ${y}`;
  };
  const displayRange=()=>`${formatDate(start.value)} s/d ${formatDate(end.value)}`;

  function openPicker(){
    // Sync the popup fields with the currently applied range before editing.
    const text=label.textContent.trim();
    const match=text.match(/^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})\s+s\/d\s+(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/);
    if(match){
      const months={'Jan':'01','Feb':'02','Mar':'03','Apr':'04','Mei':'05','May':'05','Jun':'06','Jul':'07','Agu':'08','Aug':'08','Sep':'09','Okt':'10','Oct':'10','Nov':'11','Des':'12','Dec':'12'};
      const a=months[match[2]],b=months[match[5]];
      if(a)start.value=`${match[3]}-${a}-${match[1].padStart(2,'0')}`;
      if(b)end.value=`${match[6]}-${b}-${match[4].padStart(2,'0')}`;
    }
    picker.hidden=false;
    button.setAttribute('aria-expanded','true');
  }
  function closePicker(){
    picker.hidden=true;
    button.setAttribute('aria-expanded','false');
  }
  button.addEventListener('click',()=>picker.hidden?openPicker():closePicker());
  cancel.addEventListener('click',closePicker);
  apply.addEventListener('click',()=>{
    if(!start.value||!end.value){toastMessage('Pilih tanggal mulai dan selesai.');return;}
    if(start.value>end.value){toastMessage('Tanggal selesai harus sama atau setelah tanggal mulai.');return;}
    label.textContent=displayRange();
    closePicker();
    // Trigger the same persistence mechanism as other config fields, if present.
    button.dispatchEvent(new Event('change',{bubbles:true}));
  });
  document.addEventListener('click',event=>{
    if(!picker.hidden&&!picker.contains(event.target)&&!button.contains(event.target))closePicker();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&!picker.hidden)closePicker();
  });
})();
