const WORKER_URL='https://tm-vip-video.bossrobot-id.workers.dev';
const VIP_TOKEN=sessionStorage.getItem('tmVipToken');
if(!VIP_TOKEN)location.replace('index.html');
const officialLogoStyles=document.createElement('style');officialLogoStyles.textContent="aside .brand>b{font-size:0!important;background:#111 url('https://raw.githubusercontent.com/traderminoritas/traderminoritas-assets/main/Trader%20MInoritas%20logo.png') center/90% auto no-repeat!important;border-color:rgba(216,180,94,.45)!important}";document.head.appendChild(officialLogoStyles);
const pages=document.querySelectorAll('.page'),side=document.getElementById('side'),crumb=document.getElementById('crumb');
function openPage(id){pages.forEach(p=>p.classList.toggle('active',p.id===id));document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===id));crumb.textContent='DASHBOARD / '+id.toUpperCase().replace('LEARN','MODUL VIP').replace('JOURNAL','JOURNAL & BACKTEST');side.classList.remove('open');scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>openPage(b.dataset.page));document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>openPage(b.dataset.jump));document.getElementById('menu').onclick=()=>side.classList.toggle('open');document.getElementById('logout').onclick=()=>{sessionStorage.clear();location.href='index.html'};
const tool={lot:{type:'POSITION SIZING',title:'Lot Size Calculator',desc:'Tentukan posisi berdasarkan batas risiko Anda.',fields:[['Modal akun','balance',1000],['Risiko per transaksi (%)','risk',1],['Stop loss (pips)','sl',30]],calc:v=>[['RISIKO MAKSIMUM','$'+(v.balance*v.risk/100).toFixed(2)],['UKURAN POSISI',(v.balance*v.risk/100/(v.sl*10||1)).toFixed(2)+' lot']]},rr:{type:'RISK ANALYSIS',title:'Risk / Reward Calculator',desc:'Bandingkan potensi kerugian dan target sebelum entry.',fields:[['Entry price','entry',1.085],['Stop loss','stop',1.08],['Take profit','tp',1.0975]],calc:v=>[['RISIKO',Math.abs(v.entry-v.stop).toFixed(4)],['RISK : REWARD','1 : '+(Math.abs(v.tp-v.entry)/(Math.abs(v.entry-v.stop)||1)).toFixed(2)]]},comp:{type:'GROWTH PLAN',title:'Compounding Calculator',desc:'Visualisasikan pertumbuhan modal dengan target realistis.',fields:[['Modal awal','capital',1000],['Target per bulan (%)','rate',5],['Durasi (bulan)','months',12]],calc:v=>[['PROYEKSI MODAL','$'+(v.capital*Math.pow(1+v.rate/100,v.months)).toFixed(2)],['PERTUMBUHAN','$'+(v.capital*Math.pow(1+v.rate/100,v.months)-v.capital).toFixed(2)]]}};
function render(type='lot'){let t=tool[type];document.getElementById('calcType').textContent=t.type;document.getElementById('calcTitle').textContent=t.title;document.getElementById('calcDesc').textContent=t.desc;let box=document.getElementById('calcForm');box.innerHTML='<div class="calc-fields">'+t.fields.map(f=>`<label>${f[0]}<input id="${f[1]}" type="number" step="any" value="${f[2]}"></label>`).join('')+'</div><div class="calc-result" id="resultBox"></div>';let update=()=>{let v=Object.fromEntries(t.fields.map(f=>[f[1],+document.getElementById(f[1]).value||0]));document.getElementById('resultBox').innerHTML=t.calc(v).map(r=>`<div><small>${r[0]}</small><b>${r[1]}</b></div>`).join('')};t.fields.forEach(f=>document.getElementById(f[1]).oninput=update);update()};document.querySelectorAll('[data-tool]').forEach(b=>b.onclick=()=>{render(b.dataset.tool);document.querySelectorAll('.toolcards article').forEach(a=>a.classList.remove('selected'));b.closest('article').classList.add('selected')});render();
const modal=document.getElementById('modal'),toast=document.getElementById('toast');document.getElementById('newTrade').onclick=()=>modal.showModal();document.getElementById('close').onclick=()=>modal.close();document.getElementById('tradeForm').onsubmit=e=>{e.preventDefault();modal.close();toast.textContent='Transaksi tersimpan di jurnal demo.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3000)};document.getElementById('profileForm').onsubmit=e=>e.preventDefault();document.getElementById('profileForm').querySelector('button').onclick=()=>{toast.textContent='Profile tersimpan di sesi demo.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),3000)};


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
].map(([title,id],i)=>({number:String(i+1).padStart(2,'0'),title,id}));

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
  videoPlayer.pause();
  videoPlayer.removeAttribute('src');
  videoPlayer.load();
  videoPlayer.dataset.file=file;
  if(videoPlay)videoPlay.textContent='…';
  try{
    const signedUrl=await getSignedVideoUrl(file);
    if(activeVideoId!==file.replace(/\.mp4$/i,''))return;
    videoPlayer.src=signedUrl;
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
      return `<article class="video-card ${done?'is-complete':''}"><button class="video-thumb" data-video-id="${v.id}" data-video-title="${esc(v.title)}"><div class="video-thumb-art" aria-hidden="true"><span>TRADER<br>MINORITAS</span><strong>${v.number}</strong></div><span class="video-play">▶</span><b>${v.number}</b></button><div class="video-card-body"><div class="video-card-label"><small>MODUL VIP · VIDEO ${v.number}</small>${done?'<span class="complete-badge">✓ SELESAI</span>':''}</div><h3>${esc(v.title)}</h3><div class="video-actions"><button class="watch-video" data-video-id="${v.id}" data-video-title="${esc(v.title)}">Tonton video <span>→</span></button><button class="complete-video ${done?'done':''}" data-complete-id="${v.id}">${done?'✓ Sudah selesai':'○ Tandai selesai'}</button></div></div></article>`;
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
