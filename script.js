const SOURCES={
  mounir:{title:"محمد منير",type:"user_uploads",value:"MounirOfficial",artist:"محمد منير",color:"#0ea5e9",icon:"fa-music"},
  wassouf:{title:"جورج وسوف",type:"user_uploads",value:"GeorgesWassouf",artist:"جورج وسوف",color:"#8b5cf6",icon:"fa-microphone-lines"}
};

const state={
  sourceId:localStorage.getItem("pavley-source")||"mounir",
  customPlaylistId:localStorage.getItem("pavley-custom-playlist")||"",
  isPlaying:false,
  shuffle:localStorage.getItem("pavley-shuffle")==="true",
  repeat:localStorage.getItem("pavley-repeat")==="true",
  favorites:JSON.parse(localStorage.getItem("pavley-favorites")||"[]"),
  playerReady:false,
  currentVideoId:"",
  lastVideoTitle:""
};

let player=null;
let progressTimer=null;

const E={
  tabs:document.getElementById("playlist-tabs"),
  playlistTitle:document.getElementById("playlist-title"),
  trackCount:document.getElementById("track-count"),
  nowTitle:document.getElementById("now-title"),
  nowArtist:document.getElementById("now-artist"),
  nowArt:document.getElementById("now-art"),
  initials:document.getElementById("art-initials"),
  favoriteMain:document.getElementById("favorite-main"),
  progress:document.getElementById("progress"),
  current:document.getElementById("current-time"),
  duration:document.getElementById("total-duration"),
  volume:document.getElementById("volume"),
  playBtn:document.getElementById("play-btn"),
  playIcon:document.getElementById("play-icon"),
  shuffle:document.getElementById("shuffle-btn"),
  repeat:document.getElementById("repeat-btn"),
  next:document.getElementById("next-btn"),
  prev:document.getElementById("prev-btn"),
  mute:document.getElementById("mute-btn"),
  theme:document.getElementById("theme-btn"),
  waveform:document.getElementById("waveform"),
  status:document.getElementById("player-status"),
  videoStatus:document.getElementById("video-status"),
  openYoutube:document.getElementById("open-youtube"),
  addPlaylist:document.getElementById("add-playlist-btn"),
  playlistForm:document.getElementById("playlist-form"),
  playlistUrl:document.getElementById("playlist-url"),
  savePlaylist:document.getElementById("save-playlist"),
  cancelPlaylist:document.getElementById("cancel-playlist"),
  formStatus:document.getElementById("playlist-form-status")
};

function getSource(){
  if(state.sourceId==="custom") return {title:"My YouTube Playlist",type:"playlist",value:state.customPlaylistId,artist:"YouTube Playlist",color:"#f97316",icon:"fa-list-music"};
  return SOURCES[state.sourceId];
}

function isFavorite(){
  return state.currentVideoId && state.favorites.includes(state.currentVideoId);
}

function buildTabs(){
  const items=[
    ...Object.entries(SOURCES).map(([id,s])=>({id,title:s.title,icon:s.icon,badge:"YT"})),
    ...(state.customPlaylistId?[{id:"custom",title:"My Playlist",icon:"fa-list",badge:"YT"}]:[])
  ];

  E.tabs.innerHTML=items.map(item=>`
    <button class="playlist-tab ${item.id===state.sourceId?"active":""}" data-source="${item.id}" type="button">
      <span><i class="fa-solid ${item.icon}" aria-hidden="true"></i>${item.title}</span>
      <small>${item.badge}</small>
    </button>
  `).join("");
}

function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  localStorage.setItem("pavley-theme",theme);
  const light=theme==="light";
  E.theme.setAttribute("aria-pressed",String(light));
  E.theme.setAttribute("aria-label",light?"التبديل إلى الوضع الداكن":"التبديل إلى الوضع الفاتح");
  E.theme.innerHTML=`<i class="fa-solid ${light?"fa-sun":"fa-moon"}" aria-hidden="true"></i>`;
}

function formatTime(seconds){
  if(!Number.isFinite(seconds)||seconds<0) return "0:00";
  return `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,"0")}`;
}

function updateProgress(){
  if(!player||!state.playerReady) return;
  const duration=player.getDuration();
  const current=player.getCurrentTime();
  if(Number.isFinite(duration)&&duration>0){
    E.progress.value=String(current/duration*100);
    E.current.textContent=formatTime(current);
    E.duration.textContent=formatTime(duration);
  }
}

function updateControls(){
  E.playIcon.className=`fa-solid ${state.isPlaying?"fa-pause":"fa-play"}`;
  E.playBtn.setAttribute("aria-label",state.isPlaying?"إيقاف مؤقت":"تشغيل");
  E.shuffle.setAttribute("aria-pressed",String(state.shuffle));
  E.repeat.setAttribute("aria-pressed",String(state.repeat));
  E.mute.setAttribute("aria-pressed",String(player?.isMuted?.()||false));
  E.mute.innerHTML=`<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i> ${player?.isMuted?.()?"إلغاء الكتم":"كتم"}`;
  E.waveform.classList.toggle("playing",state.isPlaying);
}

function setTrackMeta(){
  if(!player||!state.playerReady) return;

  const data=player.getVideoData ? player.getVideoData() : {};
  const title=data.title||state.lastVideoTitle||"YouTube Playlist";
  const artist=data.author||getSource().artist;

  state.lastVideoTitle=title;
  state.currentVideoId=data.video_id||player.getVideoUrl?.().match(/[?&]v=([^&]+)/)?.[1]||state.currentVideoId;

  E.nowTitle.textContent=title;
  E.nowArtist.textContent=artist;
  E.playlistTitle.textContent=getSource().title;
  E.trackCount.textContent="YouTube";
  E.initials.textContent=title.trim().charAt(0)||"♪";
  E.nowArt.style.background=`linear-gradient(145deg,${getSource().color},#071525 72%)`;

  const favorite=isFavorite();
  E.favoriteMain.classList.toggle("active",favorite);
  E.favoriteMain.setAttribute("aria-pressed",String(favorite));
  E.favoriteMain.innerHTML=`<i class="${favorite?"fa-solid":"fa-regular"} fa-heart" aria-hidden="true"></i>`;

  try{
    const url=player.getVideoUrl();
    E.openYoutube.href=url||getSource().type==="playlist"?`https://www.youtube.com/playlist?list=${getSource().value}`:"https://www.youtube.com/";
  }catch{
    E.openYoutube.href="https://www.youtube.com/";
  }
}

function createPlayer(){
  if(typeof YT==="undefined"||typeof YT.Player==="undefined"){
    E.videoStatus.textContent="مستني مشغّل YouTube...";
    return;
  }

  if(player) player.destroy();

  const source=getSource();

  player=new YT.Player("youtube-player",{
    width:"100%",
    height:"100%",
    playerVars:{
      autoplay:0,
      controls:1,
      rel:0,
      playsinline:1,
      enablejsapi:1
    },
    events:{
      onReady:onPlayerReady,
      onStateChange:onPlayerStateChange,
      onError:onPlayerError
    }
  });

  E.videoStatus.textContent=source.type==="playlist"
    ?"تحميل الـ Playlist..."
    :"تحميل فيديوهات القناة الرسمية...";
}

function loadSource(){
  if(!player||!state.playerReady) return;

  const source=getSource();
  state.isPlaying=false;
  state.currentVideoId="";
  state.lastVideoTitle="";
  E.status.textContent="";
  E.current.textContent="0:00";
  E.duration.textContent="0:00";
  E.progress.value="0";

  if(source.type==="playlist"){
    player.loadPlaylist({
      list:source.value,
      listType:"playlist",
      index:0
    });
  }else{
    player.loadPlaylist({
      list:source.value,
      listType:"user_uploads",
      index:0
    });
  }

  player.setLoop(state.repeat);
  player.setShuffle(state.shuffle);
  E.videoStatus.textContent=source.type==="playlist"
    ?"Playlist YouTube جاهزة."
    :`فيديوهات ${source.artist} الرسمية جاهزة.`;
  setTimeout(setTrackMeta,500);
}

function onPlayerReady(){
  state.playerReady=true;
  player.setVolume(Number(E.volume.value));
  createWave();
  loadSource();
  updateControls();
}

function onPlayerStateChange(event){
  if(event.data===YT.PlayerState.PLAYING){
    state.isPlaying=true;
    E.status.textContent="";
    setTrackMeta();
    clearInterval(progressTimer);
    progressTimer=setInterval(updateProgress,250);
  }else if(event.data===YT.PlayerState.PAUSED){
    state.isPlaying=false;
    updateProgress();
    clearInterval(progressTimer);
  }else if(event.data===YT.PlayerState.ENDED){
    state.isPlaying=false;
    if(state.repeat){
      player.playVideo();
    }else{
      updateProgress();
    }
    clearInterval(progressTimer);
  }else if(event.data===YT.PlayerState.CUED){
    setTrackMeta();
    E.videoStatus.textContent="جاهز للتشغيل.";
  }
  updateControls();
}

function onPlayerError(){
  state.isPlaying=false;
  E.status.textContent="YouTube رفض تشغيل هذا المحتوى داخل المشغّل. افتح الأغنية من YouTube أو اختَر Playlist أخرى.";
  updateControls();
}

function createWave(){
  E.waveform.innerHTML=Array.from({length:34},(_,i)=>`<span style="--h:${8+(i*13)%17}px"></span>`).join("");
}

function playPause(){
  if(!player||!state.playerReady){
    E.status.textContent="المشغّل لسه بيجهز...";
    return;
  }

  const stateCode=player.getPlayerState();
  if(stateCode===YT.PlayerState.PLAYING){
    player.pauseVideo();
  }else{
    player.playVideo();
  }
}

function next(){if(player?.nextVideo)player.nextVideo()}
function previous(){
  if(!player) return;
  if(player.getCurrentTime()>4){
    player.seekTo(0,true);
  }else{
    player.previousVideo();
  }
}

function toggleFavorite(){
  if(!state.currentVideoId) return;
  state.favorites=state.favorites.includes(state.currentVideoId)
    ?state.favorites.filter(x=>x!==state.currentVideoId)
    :[...state.favorites,state.currentVideoId];
  localStorage.setItem("pavley-favorites",JSON.stringify(state.favorites));
  setTrackMeta();
}

function parsePlaylistId(value){
  try{
    const url=new URL(value);
    return url.searchParams.get("list")||"";
  }catch{
    return /^[A-Za-z0-9_-]+$/.test(value)?value:"";
  }
}

E.tabs.addEventListener("click",event=>{
  const tab=event.target.closest("[data-source]");
  if(!tab)return;
  state.sourceId=tab.dataset.source;
  localStorage.setItem("pavley-source",state.sourceId);
  buildTabs();
  loadSource();
});

E.playBtn.addEventListener("click",playPause);
E.next.addEventListener("click",next);
E.prev.addEventListener("click",previous);

E.shuffle.addEventListener("click",()=>{
  state.shuffle=!state.shuffle;
  localStorage.setItem("pavley-shuffle",String(state.shuffle));
  if(player?.setShuffle) player.setShuffle(state.shuffle);
  updateControls();
});

E.repeat.addEventListener("click",()=>{
  state.repeat=!state.repeat;
  localStorage.setItem("pavley-repeat",String(state.repeat));
  if(player?.setLoop) player.setLoop(state.repeat);
  updateControls();
});

E.progress.addEventListener("input",()=>{
  if(player?.seekTo&&Number.isFinite(player.getDuration())){
    player.seekTo(Number(E.progress.value)/100*player.getDuration(),true);
  }
});

E.volume.addEventListener("input",event=>{
  if(player?.setVolume)player.setVolume(Number(event.target.value));
  localStorage.setItem("pavley-volume",String(Number(event.target.value)));
});

E.mute.addEventListener("click",()=>{
  if(!player)return;
  player.isMuted()?player.unMute():player.mute();
  updateControls();
});

E.favoriteMain.addEventListener("click",toggleFavorite);
E.theme.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="light"?"dark":"light"));

E.addPlaylist.addEventListener("click",()=>{
  E.playlistForm.hidden=!E.playlistForm.hidden;
  if(!E.playlistForm.hidden)E.playlistUrl.focus();
});

E.cancelPlaylist.addEventListener("click",()=>{
  E.playlistForm.hidden=true;
  E.formStatus.textContent="";
});

E.savePlaylist.addEventListener("click",()=>{
  const id=parsePlaylistId(E.playlistUrl.value.trim());
  if(!id){
    E.formStatus.textContent="حط رابط YouTube Playlist صحيح.";
    return;
  }
  state.customPlaylistId=id;
  state.sourceId="custom";
  localStorage.setItem("pavley-custom-playlist",id);
  localStorage.setItem("pavley-source","custom");
  E.playlistForm.hidden=true;
  E.playlistUrl.value="";
  buildTabs();
  loadSource();
});

document.addEventListener("keydown",event=>{
  if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName))return;
  if(event.code==="Space"){event.preventDefault();playPause()}
  if(event.code==="ArrowRight")next();
  if(event.code==="ArrowLeft")previous();
  if(event.key.toLowerCase()==="m")E.mute.click();
});

window.addEventListener("beforeunload",()=>clearInterval(progressTimer));

window.onYouTubeIframeAPIReady=()=>createPlayer();

setTheme(localStorage.getItem("pavley-theme")||"dark");
E.volume.value=localStorage.getItem("pavley-volume")||"80";
buildTabs();
if(window.YT?.Player)createPlayer();
