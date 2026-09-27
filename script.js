const SOURCES={
  mounir:{title:"محمد منير",url:"https://soundcloud.com/mohamed-mounir-official",artist:"محمد منير",color:"#0ea5e9",icon:"fa-music"},
  wassouf:{title:"جورج وسوف",url:"https://soundcloud.com/georges_wassouf",artist:"جورج وسوف",color:"#8b5cf6",icon:"fa-microphone-lines"}
};

const state={
  sourceId:localStorage.getItem("pavley-source")||"mounir",
  customUrl:localStorage.getItem("pavley-custom-url")||"",
  sounds:[],
  index:0,
  isPlaying:false,
  shuffle:localStorage.getItem("pavley-shuffle")==="true",
  repeat:localStorage.getItem("pavley-repeat")==="true",
  favorites:JSON.parse(localStorage.getItem("pavley-favorites")||"[]"),
  ready:false
};

let widget=null;
let progressTimer=null;

const E={
  tabs:document.getElementById("playlist-tabs"),
  title:document.getElementById("playlist-title"),
  count:document.getElementById("track-count"),
  list:document.getElementById("track-list"),
  nowTitle:document.getElementById("now-title"),
  nowArtist:document.getElementById("now-artist"),
  art:document.getElementById("now-art"),
  initials:document.getElementById("art-initials"),
  favorite:document.getElementById("favorite-main"),
  progress:document.getElementById("progress"),
  current:document.getElementById("current-time"),
  duration:document.getElementById("total-duration"),
  volume:document.getElementById("volume"),
  playBtn:document.getElementById("play-btn"),
  playIcon:document.getElementById("play-icon"),
  next:document.getElementById("next-btn"),
  prev:document.getElementById("prev-btn"),
  shuffle:document.getElementById("shuffle-btn"),
  repeat:document.getElementById("repeat-btn"),
  mute:document.getElementById("mute-btn"),
  theme:document.getElementById("theme-btn"),
  wave:document.getElementById("waveform"),
  status:document.getElementById("player-status"),
  sourceStatus:document.getElementById("source-status"),
  sourceLink:document.getElementById("source-link"),
  addPlaylist:document.getElementById("add-playlist-btn"),
  form:document.getElementById("playlist-form"),
  url:document.getElementById("playlist-url"),
  save:document.getElementById("save-playlist"),
  cancel:document.getElementById("cancel-playlist"),
  formStatus:document.getElementById("playlist-form-status")
};

function source(){return state.sourceId==="custom"?{title:"My SoundCloud Playlist",url:state.customUrl,artist:"SoundCloud",color:"#f97316",icon:"fa-list"}:SOURCES[state.sourceId]}

function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  localStorage.setItem("pavley-theme",theme);
  const light=theme==="light";
  E.theme.setAttribute("aria-pressed",String(light));
  E.theme.innerHTML=`<i class="fa-solid ${light?"fa-sun":"fa-moon"}" aria-hidden="true"></i>`;
}

function buildTabs(){
  const items=[...Object.entries(SOURCES).map(([id,s])=>({id,title:s.title,icon:s.icon})),...(state.customUrl?[{id:"custom",title:"My Playlist",icon:"fa-list"}]:[])];
  E.tabs.innerHTML=items.map(item=>`<button class="playlist-tab ${item.id===state.sourceId?"active":""}" data-source="${item.id}" type="button"><span><i class="fa-solid ${item.icon}" aria-hidden="true"></i>${item.title}</span><small>SC</small></button>`).join("");
}

function formatTime(ms){if(!Number.isFinite(ms)||ms<0)return"0:00";const sec=Math.floor(ms/1000);return`${Math.floor(sec/60)}:${String(sec%60).padStart(2,"0")}`}

function makeWidget(){
  const host=document.getElementById("soundcloud-widget");
  host.innerHTML=`<iframe id="sc-frame" title="SoundCloud audio player" scrolling="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=${encodeURIComponent(source().url)}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&show_artwork=false&color=0284c7"></iframe>`;
  widget=SC.Widget("sc-frame");
  bindWidget();
}

function bindWidget(){
  widget.bind(SC.Widget.Events.READY,()=>{
    state.ready=true;
    widget.setVolume(Number(E.volume.value));
    widget.getSounds(sounds=>{
      state.sounds=sounds||[];
      state.index=0;
      renderList();
      updateCurrent();
      E.sourceStatus.textContent=state.sounds.length?`تم تحميل ${state.sounds.length} مقطع صوتي.`:"المصدر ده مفيهوش مقاطع متاحة للتشغيل.";
    });
  });

  widget.bind(SC.Widget.Events.PLAY,()=>{
    state.isPlaying=true;
    startProgress();
    updateControls();
    updateCurrent();
  });

  widget.bind(SC.Widget.Events.PAUSE,()=>{
    state.isPlaying=false;
    stopProgress();
    updateControls();
  });

  widget.bind(SC.Widget.Events.FINISH,()=>{
    state.isPlaying=false;
    stopProgress();
    if(state.repeat){widget.seekTo(0);widget.play()}else if(state.shuffle){playRandom()}else{widget.next()}
    updateControls();
  });

  widget.bind(SC.Widget.Events.PLAY_PROGRESS,event=>{
    E.progress.value=String((event.relativePosition||0)*100);
    E.current.textContent=formatTime(event.currentPosition||0);
  });
}

function updateCurrent(){
  if(!state.sounds.length)return;
  widget.getCurrentSound(sound=>{
    if(!sound)return;
    state.index=state.sounds.findIndex(item=>String(item.id)===String(sound.id));
    if(state.index<0)state.index=0;

    E.nowTitle.textContent=sound.title||"SoundCloud Track";
    E.nowArtist.textContent=sound.user?.username||source().artist;
    E.initials.textContent=(sound.title||"♪").trim().charAt(0);
    E.art.style.background=`linear-gradient(145deg,${source().color},#071525 72%)`;
    E.sourceLink.href=sound.permalink_url||source().url;

    const favorite=state.favorites.includes(String(sound.id));
    E.favorite.classList.toggle("active",favorite);
    E.favorite.setAttribute("aria-pressed",String(favorite));
    E.favorite.innerHTML=`<i class="${favorite?"fa-solid":"fa-regular"} fa-heart" aria-hidden="true"></i>`;

    renderList();
    widget.getDuration(duration=>{
      E.duration.textContent=formatTime(duration||0);
    });
  });
}

function renderList(){
  E.title.textContent=source().title;
  E.count.textContent=state.sounds.length?`${state.sounds.length} مقطع`:"لا يوجد";
  if(!state.sounds.length){
    E.list.innerHTML='<div class="empty-state"><i class="fa-brands fa-soundcloud" aria-hidden="true"></i><strong>مفيش صوت متاح</strong><p>جرّب مصدر مختلف أو Playlist تانية.</p></div>';
    return;
  }

  E.list.innerHTML=state.sounds.map((sound,i)=>{
    const fav=state.favorites.includes(String(sound.id));
    return `<div class="track-row ${i===state.index?"active":""}" data-index="${i}">
      <div class="track-thumb" style="--thumb:${source().color}">${(sound.title||"♪").trim().charAt(0)}</div>
      <div class="track-main"><span class="track-title">${sound.title||"Untitled"}</span><span class="track-artist">${sound.user?.username||source().artist}</span></div>
      <div class="track-extra"><button class="heart-btn ${fav?"active":""}" data-favorite-id="${sound.id}" type="button" aria-label="${fav?"إزالة من المفضلة":"إضافة للمفضلة"}" aria-pressed="${fav}"><i class="${fav?"fa-solid":"fa-regular"} fa-heart" aria-hidden="true"></i></button></div>
    </div>`;
  }).join("");
}

function playIndex(index,autoplay=true){
  if(!widget||!state.sounds.length)return;
  state.index=Math.max(0,Math.min(index,state.sounds.length-1));
  widget.skip(state.index);
  if(autoplay)widget.play();
  setTimeout(updateCurrent,250);
}

function playRandom(){
  if(state.sounds.length<2){widget.play();return}
  let next;
  do next=Math.floor(Math.random()*state.sounds.length);while(next===state.index);
  playIndex(next,true);
}

function startProgress(){stopProgress();progressTimer=setInterval(()=>widget.getPosition(pos=>E.current.textContent=formatTime(pos||0)),250)}
function stopProgress(){clearInterval(progressTimer);progressTimer=null}
function updateControls(){
  E.playIcon.className=`fa-solid ${state.isPlaying?"fa-pause":"fa-play"}`;
  E.playBtn.setAttribute("aria-label",state.isPlaying?"إيقاف مؤقت":"تشغيل");
  E.shuffle.setAttribute("aria-pressed",String(state.shuffle));
  E.repeat.setAttribute("aria-pressed",String(state.repeat));
  widget?.isPaused?.(paused=>{const mutedText="كتم";E.mute.setAttribute("aria-pressed",String(false));E.mute.innerHTML=`<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i> ${mutedText}`});
  E.wave.classList.toggle("playing",state.isPlaying);
}

function loadSource(){
  state.ready=false;state.sounds=[];state.index=0;
  E.list.innerHTML='<div class="empty-state"><i class="fa-solid fa-spinner" aria-hidden="true"></i><strong>جاري التحميل</strong><p>ثواني...</p></div>';
  E.sourceStatus.textContent="جاري تحميل مصدر الصوت...";
  if(widget)widget.load(source().url,{auto_play:false,show_artwork:false,show_comments:false,show_user:true,show_reposts:false,show_teaser:false,color:"0284c7",callback:()=>{}});
  E.sourceLink.href=source().url;
  if(widget){
    setTimeout(()=>{
      widget.getSounds(sounds=>{
        state.sounds=sounds||[];
        renderList();
        updateCurrent();
      });
    },700);
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

E.list.addEventListener("click",event=>{
  const heart=event.target.closest("[data-favorite-id]");
  if(heart){
    event.stopPropagation();
    const id=String(heart.dataset.favoriteId);
    state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];
    localStorage.setItem("pavley-favorites",JSON.stringify(state.favorites));
    updateCurrent();
    return;
  }
  const row=event.target.closest(".track-row");
  if(row)playIndex(Number(row.dataset.index),true);
});

E.playBtn.addEventListener("click",()=>{
  if(!widget||!state.ready){
    E.status.textContent="المشغّل لسه بيجهز...";
    return;
  }
  widget.isPaused(paused=>paused?widget.play():widget.pause());
});

E.next.addEventListener("click",()=>{
  if(!widget)return;
  if(state.shuffle)playRandom();else widget.next();
});

E.prev.addEventListener("click",()=>{
  if(!widget)return;
  widget.getPosition(pos=>{
    if(pos>4000)widget.seekTo(0);
    else widget.prev();
  });
});

E.shuffle.addEventListener("click",()=>{
  state.shuffle=!state.shuffle;
  localStorage.setItem("pavley-shuffle",String(state.shuffle));
  updateControls();
});

E.repeat.addEventListener("click",()=>{
  state.repeat=!state.repeat;
  localStorage.setItem("pavley-repeat",String(state.repeat));
  updateControls();
});

E.progress.addEventListener("input",()=>{
  if(!widget)return;
  widget.getDuration(duration=>widget.seekTo(Number(E.progress.value)/100*duration));
});

E.volume.addEventListener("input",event=>{
  widget?.setVolume(Number(event.target.value));
  localStorage.setItem("pavley-volume",String(event.target.value));
});

E.mute.addEventListener("click",()=>{
  if(!widget)return;
  widget.getVolume(volume=>{
    if(Number(volume)>0){
      localStorage.setItem("pavley-previous-volume",String(volume));
      widget.setVolume(0);
      E.mute.setAttribute("aria-pressed","true");
      E.mute.innerHTML='<i class="fa-solid fa-volume-high" aria-hidden="true"></i> إلغاء الكتم';
    }else{
      const restored=Number(localStorage.getItem("pavley-previous-volume")||80);
      widget.setVolume(restored);
      E.volume.value=String(restored);
      E.mute.setAttribute("aria-pressed","false");
      E.mute.innerHTML='<i class="fa-solid fa-volume-xmark" aria-hidden="true"></i> كتم';
    }
  });
});

E.favorite.addEventListener("click",()=>{
  if(!state.sounds.length)return;
  widget.getCurrentSound(sound=>{
    if(!sound)return;
    const id=String(sound.id);
    state.favorites=state.favorites.includes(id)?state.favorites.filter(x=>x!==id):[...state.favorites,id];
    localStorage.setItem("pavley-favorites",JSON.stringify(state.favorites));
    updateCurrent();
  });
});

E.theme.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="light"?"dark":"light"));

E.addPlaylist.addEventListener("click",()=>{
  E.form.hidden=!E.form.hidden;
  if(!E.form.hidden)E.url.focus();
});

E.cancel.addEventListener("click",()=>{
  E.form.hidden=true;
  E.formStatus.textContent="";
});

E.save.addEventListener("click",()=>{
  try{
    const url=new URL(E.url.value.trim());
    if(!url.hostname.includes("soundcloud.com"))throw new Error();
    state.customUrl=E.url.value.trim();
    state.sourceId="custom";
    localStorage.setItem("pavley-custom-url",state.customUrl);
    localStorage.setItem("pavley-source","custom");
    E.form.hidden=true;
    E.formStatus.textContent="";
    buildTabs();
    loadSource();
  }catch{
    E.formStatus.textContent="حط رابط SoundCloud صحيح.";
  }
});

document.addEventListener("keydown",event=>{
  if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName))return;
  if(event.code==="Space"){event.preventDefault();E.playBtn.click()}
  if(event.code==="ArrowRight")E.next.click();
  if(event.code==="ArrowLeft")E.prev.click();
  if(event.key.toLowerCase()==="m")E.mute.click();
});

E.wave.innerHTML=Array.from({length:34},(_,i)=>`<span style="--h:${8+(i*13)%17}px"></span>`).join("");

setTheme(localStorage.getItem("pavley-theme")||"dark");
E.volume.value=localStorage.getItem("pavley-volume")||"80";
buildTabs();
makeWidget();
