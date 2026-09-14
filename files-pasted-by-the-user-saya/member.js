const WORKER_URL='https://tm-vip-video.bossrobot-id.workers.dev';
const VIP_TOKEN=sessionStorage.getItem('tmVipToken');
if(!VIP_TOKEN)location.replace('index.html');
const officialLogoStyles=document.createElement('style');officialLogoStyles.textContent="aside .brand>b{font-size:0!important;background:#111 url('https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/Trader%20MInoritas%20logo.png') center/90% auto no-repeat!important;border-color:rgba(216,180,94,.45)!important}";document.head.appendChild(officialLogoStyles);
const pages=document.querySelectorAll('.page'),side=document.getElementById('side'),crumb=document.getElementById('crumb');
function openPage(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));crumb.textContent='DASHBOARD / '+id.toUpperCase().replace('LEARN','MODUL VIP').replace('JOURNAL','JOURNAL & BACKTEST');side.classList.remove('open');scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>openPage(b.dataset.page));document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>openPage(b.dataset.jump));document.getElementById('menu').onclick=()=>side.classList.toggle('open');document.getElementById('logout').onclick=()=>{sessionStorage.clear();location.href='index.html'};
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
  const token=sessionStorage.getItem('tmVipToken');
  if(!token)throw new Error('Session login tidak ditemukan.');
  const res=await fetch(`${WORKER_URL}/video-url?file=${encodeURIComponent(file)}`,{headers:{Authorization:`Bearer ${token}`}});
  if(res.status===401){sessionStorage.removeItem('tmVipToken');sessionStorage.removeItem('tmDemoMember');throw new Error('Sesi login sudah berakhir. Silakan login kembali.');}
  if(!res.ok)throw new Error('Gagal mendapatkan akses video.');
  const data=await res.json();
  if(!data.success||!data.url)throw new Error('Signed video URL tidak tersedia.');
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
 const count=done.length,total=overviewVideos.length,pct=Math.round(count/total*100);
 const a=document.getElementById('progressCount'),b=document.getElementById('progressPercent'),bar=document.getElementById('progressBar'),label=document.getElementById('progressLabel');
 if(a)a.textContent=count+' / '+total;b&&(b.textContent=pct+'%');bar&&(bar.style.width=pct+'%');
 if(label)label.textContent=count?`Anda sudah menyelesaikan ${count} dari ${total} video. Lanjutkan satu materi berikutnya.`:'Mulai dari satu materi, lalu lanjutkan secara konsisten.';
 const idx=overviewVideos.findIndex(v=>v[1]===last), contTitle=document.getElementById('continueTitle'),contMeta=document.getElementById('continueMeta'),btn=document.getElementById('continueButton');
 if(idx>=0){contTitle.textContent=overviewVideos[idx][0];contMeta.textContent='Materi '+String(idx+1).padStart(2,'0')+' · Modul VIP Trader Minoritas';btn.textContent='Buka Modul VIP →';btn.onclick=()=>openPage('learn')}
 const recent=document.getElementById('recentMaterials');
 if(recent)recent.innerHTML=overviewVideos.slice(-3).reverse().map((v,i)=>`<div class="recent-item"><div><b>${v[0]}</b><small>VIDEO ${total-i}</small></div><span>▶</span></div>`).join('');
}
updateOverview();


/* =========================================================
   JOURNAL / BACKTEST / FORWARD TEST — local workspace
   ========================================================= */
(function(){
  const store={journal:'tmJournalTrades',backtest:'tmBacktestTrades',forward:'tmForwardTrades'};
  const configs={journal:'tmJournalConfig',backtest:'tmBacktestConfig',forward:'tmForwardConfig'};
  let activeMode='journal';
  const $=id=>document.getElementById(id);
  const read=(key, fallback)=>{try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(_){return fallback}};
  const write=(key,val)=>localStorage.setItem(key,JSON.stringify(val));
  const esc=s=>String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const today=new Date().toISOString().slice(0,10);
  const cfgDefaults={journal:{initial:100},backtest:{strategy:'',instrument:'XAUUSD',lot:.1,period:'',initial:100,rules:''},forward:{strategy:'',instrument:'XAUUSD',lot:.1,period:'',initial:100,notes:''}};
  function getCfg(mode){return {...cfgDefaults[mode],...read(configs[mode],{})}}
  function saveCfg(mode){
    const c=getCfg(mode);
    if(mode==='backtest')Object.assign(c,{strategy:$('btStrategy').value.trim(),instrument:$('btInstrument').value.trim(),lot:+$('btLot').value||0,period:$('btPeriod').value.trim(),initial:+$('btInitial').value||0,rules:$('btRules').value.trim()});
    if(mode==='forward')Object.assign(c,{strategy:$('ftStrategy').value.trim(),instrument:$('ftInstrument').value.trim(),lot:+$('ftLot').value||0,period:$('ftPeriod').value.trim(),initial:+$('ftInitial').value||0,notes:$('ftNotes').value.trim()});
    write(configs[mode],c);toastMessage('Konfigurasi test tersimpan.');renderMode(mode);
  }
  function loadCfg(mode){
    const c=getCfg(mode);
    if(mode==='backtest'){$('btStrategy').value=c.strategy||'';$('btInstrument').value=c.instrument||'XAUUSD';$('btLot').value=c.lot??.1;$('btPeriod').value=c.period||'';$('btInitial').value=c.initial??100;$('btRules').value=c.rules||''}
    if(mode==='forward'){$('ftStrategy').value=c.strategy||'';$('ftInstrument').value=c.instrument||'XAUUSD';$('ftLot').value=c.lot??.1;$('ftPeriod').value=c.period||'';$('ftInitial').value=c.initial??100;$('ftNotes').value=c.notes||''}
  }
  function metrics(mode){
    const trades=read(store[mode],[]), c=getCfg(mode), initial=+c.initial||100;
    let balance=initial,peak=initial,maxDD=0,win=0,loss=0,be=0,buy=0,sell=0,winStreak=0,lossStreak=0,currentW=0,currentL=0,gp=0,gl=0;
    const rows=trades.map((t,i)=>{
      const pl=+t.pl||0; balance+=pl; peak=Math.max(peak,balance); const dd=Math.max(0,peak-balance); maxDD=Math.max(maxDD,dd);
      if(t.direction==='Buy')buy++;else sell++;
      if(t.result==='win'){win++;currentW++;currentL=0;winStreak=Math.max(winStreak,currentW);gp+=Math.max(pl,0);}
      else if(t.result==='loss'){loss++;currentL++;currentW=0;lossStreak=Math.max(lossStreak,currentL);gl+=Math.max(-pl,0);}
      else{be++;currentW=0;currentL=0}
      
      return {...t,num:i+1,balance,peak,dd,winStreak:currentW,lossStreak:currentL};
    });
    return {trades,rows,initial,balance,peak,maxDD,win,loss,be,buy,sell,pf:gl?gp/gl:(gp?gp:0),winRate:trades.length?win/trades.length*100:0,conWins:winStreak,conLoss:lossStreak,recovery:maxDD?((balance-initial)/maxDD):0,avgWin:win?gp/win:0,avgLoss:loss?gl/loss:0};
  }
  function money(n){return (n<0?'−':'')+'$'+Math.abs(n).toFixed(2)}
  function pct(n){return n.toFixed(2)+'%'}
  
  function statHTML(m){return `<b>NET PROFIT/LOSS<strong class="${(m.balance-m.initial)<0?'loss':''}">${money(m.balance-m.initial)}</strong></b><b>WIN RATE<strong>${pct(m.winRate)}</strong></b><b>PROFIT FACTOR<strong>${m.pf.toFixed(2)}</strong></b><b>MAX DRAWDOWN<strong class="${m.maxDD?'loss':''}">${money(m.maxDD)}${m.initial?` <small>(${pct(m.maxDD/m.initial*100)})</small>`:''}</strong></b><b>INITIAL DEPOSIT<strong>${money(m.initial)}</strong></b><b>TOTAL TRADES<strong>${m.trades.length}</strong></b><b>TOTAL WIN<strong>${m.win}</strong></b><b>TOTAL LOSS<strong>${m.loss}</strong></b><b>TOTAL BUY<strong>${m.buy}</strong></b><b>TOTAL SELL<strong>${m.sell}</strong></b><b>CONSECUTIVE WINS<strong>${m.conWins}</strong></b><b>CONSECUTIVE LOSSES<strong>${m.conLoss}</strong></b><b>RECOVERY FACTOR<strong>${m.recovery.toFixed(2)}</strong></b><b>AVG WIN / LOSS<strong>${money(m.avgWin)} / ${money(m.avgLoss)}</strong></b>`}
  function tableHTML(mode,m){
    if(!m.rows.length)return `<div class="empty-state"><b>Belum ada trade.</b><span>Tambahkan trade pertama untuk mulai membangun data ${mode==='backtest'?'backtest':mode==='forward'?'forward test':'journal'} Anda.</span></div>`;
    return `<div class="trade-table-scroll"><div class="trade-table"><div class="trade-row trade-head"><span>#</span><span>TRADE</span><span>TYPE</span><span>WIN/LOSS</span><span>LOT</span><span>P/L</span><span>BALANCE</span><span>PEAK</span><span>DRAWDOWN</span><span>WIN STREAK</span><span>LOSS STREAK</span><span></span></div>${m.rows.map(t=>`<div class="trade-row"><span>${t.num}</span><span><b>${esc(t.instrument||'—')}</b><small>${esc(t.date||'')}</small></span><span><i class="${t.direction==='Sell'?'sell':''}">${esc(t.direction||'—').toUpperCase()}</i></span><span><i class="${t.result==='loss'?'sell':t.result==='be'?'be':''}">${t.result==='be'?'BE':t.result.toUpperCase()}</i></span><span>${t.lot||'—'}</span><span class="${+t.pl<0?'loss':''}">${money(+t.pl||0)}</span><span>${money(t.balance)}</span><span>${money(t.peak)}</span><span class="${t.dd?'loss':''}">${money(t.dd)}</span><span>${t.winStreak}</span><span>${t.lossStreak}</span><button class="delete-trade" data-mode="${mode}" data-id="${esc(t.id)}" title="Hapus">×</button></div>`).join('')}</div></div>`;
  }
  function drawChart(mode,m){
    const el=$(mode==='backtest'?'btChart':'ftChart');if(!el)return;const svg=el.querySelector('svg');const vals=[m.initial,...m.rows.map(x=>x.balance)];const W=600,H=220,pad=18,min=Math.min(...vals),max=Math.max(...vals),range=max-min||1;const pts=vals.map((v,i)=>`${pad+(i/(Math.max(vals.length-1,1)))*(W-pad*2)},${H-pad-((v-min)/range)*(H-pad*2)}`).join(' ');svg.innerHTML=`<line x1="18" y1="202" x2="582" y2="202" class="chart-axis"/><polyline points="${pts}" class="chart-line"/>`}
  function renderMode(mode){
    const m=metrics(mode);
    if(mode==='journal'){$('journalStats').innerHTML=statHTML(m);$('journalTable').innerHTML=tableHTML(mode,m)}
    if(mode==='backtest'){$('btStats').innerHTML=statHTML(m);$('btTable').innerHTML=tableHTML(mode,m);$('btTradeCount').textContent=m.trades.length+' TRADES';drawChart(mode,m)}
    if(mode==='forward'){$('ftStats').innerHTML=statHTML(m);$('ftTable').innerHTML=tableHTML(mode,m);$('ftTradeCount').textContent=m.trades.length+' TRADES';drawChart(mode,m)}
  }
  function openTrade(mode){activeMode=mode;const c=getCfg(mode);$('tradeModalKicker').textContent=mode==='backtest'?'BACKTEST TRADE':mode==='forward'?'FORWARD TEST TRADE':'JOURNAL TRADE';$('tradeModalTitle').textContent=mode==='backtest'?'Catat hasil backtest.':mode==='forward'?'Catat hasil forward test.':'Catat trade aktual.';$('tradeForm').reset();$('tradeInstrument').value=c.instrument||'';$('tradeLot').value=c.lot??.1;$('tradePL').value=0;$('tradeDate').value=today; updateAutoPL();modal.showModal()}
  ['journalAddTrade','backtestAddTrade','forwardAddTrade'].forEach((id,i)=>$(id)?.addEventListener('click',()=>openTrade(['journal','backtest','forward'][i])));
  $('btSaveConfig')?.addEventListener('click',()=>saveCfg('backtest'));$('ftSaveConfig')?.addEventListener('click',()=>saveCfg('forward'));
  function updateAutoPL(){
    const result=$('tradeResult')?.value, lot=+$('tradeLot')?.value||0, entry=+$('tradeEntry')?.value||0, sl=+$('tradeSL')?.value||0, tp=+$('tradeTP')?.value||0, instrument=($('tradeInstrument')?.value||'').trim().toUpperCase();
    let pl=0;
    if(result==='win' && entry && tp && lot) pl=Math.abs(tp-entry)*lot*(instrument.includes('XAU')?100:100);
    else if(result==='loss' && entry && sl && lot) pl=-Math.abs(sl-entry)*lot*(instrument.includes('XAU')?100:100);
    $('tradePL').value=pl.toFixed(2);
  }
  ['tradeResult','tradeLot','tradeEntry','tradeSL','tradeTP','tradeInstrument'].forEach(id=>$(id)?.addEventListener('input',updateAutoPL));
  $('tradeForm')?.addEventListener('submit',e=>{e.preventDefault();updateAutoPL();const mode=activeMode, arr=read(store[mode],[]);arr.push({id:Date.now().toString(36)+Math.random().toString(36).slice(2,7),instrument:$('tradeInstrument').value.trim(),direction:$('tradeDirection').value,result:$('tradeResult').value,lot:+$('tradeLot').value||0,entry:+$('tradeEntry').value||0,sl:+$('tradeSL').value||0,tp:+$('tradeTP').value||0,pl:+$('tradePL').value||0,date:$('tradeDate').value,exitDate:$('tradeExitDate').value});write(store[mode],arr);modal.close();renderMode(mode);toastMessage('Trade tersimpan. Statistik diperbarui otomatis.');});
  document.addEventListener('click',e=>{const b=e.target.closest('.delete-trade');if(!b)return;const mode=b.dataset.mode;const arr=read(store[mode],[]).filter(t=>t.id!==b.dataset.id);write(store[mode],arr);renderMode(mode);toastMessage('Trade dihapus.')});
  // Sheet-inspired utilities: CSV template + export for each workspace.
  function downloadText(name,text,type='text/csv'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
  const csvHeader='Trade,Direction,Result,Lot Size,Entry Price,Stop Loss,Take Profit,Profit/Loss,Entry Date,Exit Date';
  function csvCell(v){return '"'+String(v??'').replaceAll('"','""')+'"'}
  function exportMode(mode){const rows=read(store[mode],[]);const csv=[csvHeader,...rows.map((x,i)=>[i+1,x.direction,x.result,x.lot,x.entry,x.sl,x.tp,x.pl,x.date,x.exitDate].map(csvCell).join(','))].join('\n');downloadText(`TM_${mode}_trading_data.csv`,csv)}
  function downloadTemplate(mode){downloadText(`TM_${mode}_template.csv`,csvHeader+'\n1,Buy,win,0.1,4000,3997.5,4010,10,2026-09-15,2026-09-15')}
  document.querySelectorAll('[data-export]').forEach(b=>b.addEventListener('click',()=>exportMode(b.dataset.export)));
  document.querySelectorAll('[data-template]').forEach(b=>b.addEventListener('click',()=>downloadTemplate(b.dataset.template)));
  document.querySelectorAll('.summary-tabs button').forEach(btn=>btn.addEventListener('click',()=>{const wrap=btn.closest('.summary-tabs');wrap.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');toastMessage(btn.textContent+' summary — siap dikembangkan ke analisis periode.')}));
  loadCfg('backtest');loadCfg('forward');renderMode('journal');renderMode('backtest');renderMode('forward');
})();
