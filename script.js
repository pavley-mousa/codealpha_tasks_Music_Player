const SOURCES={
  mounir:{title:"محمد منير",url:"https://soundcloud.com/mohamed-mounir-official",artist:"محمد منير",color:"#0ea5e9",icon:"fa-music"},
  wassouf:{title:"جورج وسوف",url:"https://soundcloud.com/georges_wassouf",artist:"جورج وسوف",color:"#8b5cf6",icon:"fa-microphone-lines"}
};

const STORAGE={
  playlists:"pavley-playlists-v3",
  source:"pavley-view-v3",
  theme:"pavley-theme",
  volume:"pavley-volume",
  shuffle:"pavley-shuffle",
  repeat:"pavley-repeat",
  favorites:"pavley-favorites"
};

const defaultPlaylist=()=>({id:createId("pl"),name:"مكتبتي",cover:"",tracks:[],createdAt:Date.now()});

const state={
  view:JSON.parse(localStorage.getItem(STORAGE.source)||"null")||{type:"playlist",id:null,sourceId:null},
  playlists:loadPlaylists(),
  tracks:[],
  index:0,
  engine:"none",
  isPlaying:false,
  shuffle:localStorage.getItem(STORAGE.shuffle)==="true",
  repeat:localStorage.getItem(STORAGE.repeat)==="true",
  favorites:JSON.parse(localStorage.getItem(STORAGE.favorites)||"[]"),
  previousVolume:Number(localStorage.getItem("pavley-previous-volume")||80),
  muted:false,
  editingPlaylistId:null,
  editingTrackId:null,
  ready:false
};

let widget=null;
let nativeAudio=null;
let progressTimer=null;

const E={
  myPlaylists:document.getElementById("my-playlists"),
  sourceTabs:document.getElementById("source-tabs"),
  title:document.getElementById("playlist-title"),
  kind:document.getElementById("playlist-kind"),
  count:document.getElementById("track-count"),
  list:document.getElementById("track-list"),
  coverStrip:document.getElementById("playlist-cover-strip"),
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
  scWrap:document.getElementById("sc-player-wrap"),
  scFrame:document.getElementById("soundcloud-widget"),
  audio:document.getElementById("native-audio"),
  addPlaylist:document.getElementById("add-playlist-btn"),
  editPlaylist:document.getElementById("edit-playlist-btn"),
  deletePlaylist:document.getElementById("delete-playlist-btn"),
  addTrack:document.getElementById("add-track-btn"),
  playlistModal:document.getElementById("playlist-modal"),
  playlistModalTitle:document.getElementById("playlist-modal-title"),
  playlistName:document.getElementById("playlist-name"),
  playlistCover:document.getElementById("playlist-cover"),
  playlistStatus:document.getElementById("playlist-modal-status"),
  savePlaylist:document.getElementById("save-playlist"),
  trackModal:document.getElementById("track-modal"),
  trackModalTitle:document.getElementById("track-modal-title"),
  trackTitle:document.getElementById("track-title-input"),
  trackArtist:document.getElementById("track-artist-input"),
  trackUrl:document.getElementById("track-url-input"),
  trackArt:document.getElementById("track-art-input"),
  trackStatus:document.getElementById("track-modal-status"),
  saveTrack:document.getElementById("save-track")
};

function createId(prefix){return prefix+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8)}

function loadPlaylists(){
  try{
    const parsed=JSON.parse(localStorage.getItem(STORAGE.playlists)||"[]");
    if(!Array.isArray(parsed))return[];
    return parsed.map(p=>({
      id:String(p.id||createId("pl")),
      name:String(p.name||"Playlist"),
      cover:safeUrl(p.cover),
      tracks:Array.isArray(p.tracks)?p.tracks.map(normalizeTrack).filter(Boolean):[],
      createdAt:Number(p.createdAt)||Date.now()
    }));
  }catch{return[]}
}

function savePlaylists(){localStorage.setItem(STORAGE.playlists,JSON.stringify(state.playlists))}

function normalizeTrack(track){
  if(!track||typeof track!=="object")return null;
  const url=safeUrl(track.url);
  if(!url)return null;
  const type=isSoundCloudUrl(url)?"soundcloud":"audio";
  return{
    id:String(track.id||createId("tr")),
    title:String(track.title||"أغنية بدون اسم"),
    artist:String(track.artist||"غير معروف"),
    url,
    artwork:safeUrl(track.artwork),
    type
  };
}

function safeUrl(value){
  try{
    const url=new URL(String(value||"").trim());
    if(url.protocol!=="http:"&&url.protocol!=="https:")return"";
    return url.href;
  }catch{return""}
}

function isSoundCloudUrl(url){
  try{return new URL(url).hostname.replace(/^www\./,"").endsWith("soundcloud.com")}catch{return false}
}

function activePlaylist(){
  if(state.view.type!=="playlist")return null;
  return state.playlists.find(p=>p.id===state.view.id)||null;
}

function activeCollection(){
  return state.view.type==="playlist"?(activePlaylist()?.tracks||[]):state.tracks;
}

function currentItem(){
  const list=activeCollection();
  return list[state.index]||null;
}

function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  localStorage.setItem(STORAGE.theme,theme);
  const light=theme==="light";
  E.theme.setAttribute("aria-pressed",String(light));
  E.theme.innerHTML='<i class="fa-solid '+(light?"fa-sun":"fa-moon")+'" aria-hidden="true"></i>';
}

function formatTime(value){
  if(!Number.isFinite(value)||value<0)return"0:00";
  const sec=Math.floor(value);
  return Math.floor(sec/60)+":"+String(sec%60).padStart(2,"0");
}

function buildSidebar(){
  const pItems=state.playlists.map(p=>{
    const img=p.cover?'<img src="'+escapeAttr(p.cover)+'" alt="" />':escapeHtml((p.name||"♪").trim().charAt(0));
    return '<button class="playlist-tab '+(state.view.type==="playlist"&&state.view.id===p.id?"active":"")+'" data-playlist-id="'+escapeAttr(p.id)+'" type="button"><span><span class="playlist-avatar">'+img+'</span><span class="playlist-label">'+escapeHtml(p.name)+'</span></span><small>'+p.tracks.length+'</small></button>';
  }).join("");
  E.myPlaylists.innerHTML=pItems||'<div class="empty-state" style="padding:18px 10px"><i class="fa-solid fa-list"></i><strong>مفيش Playlist لسه</strong><p>اضغط + وأنشئ أول Playlist.</p></div>';

  E.sourceTabs.innerHTML=Object.entries(SOURCES).map(([id,s])=>'<button class="playlist-tab '+(state.view.type==="source"&&state.view.sourceId===id?"active":"")+'" data-source-id="'+id+'" type="button"><span><span class="playlist-avatar"><i class="fa-solid '+s.icon+'"></i></span><span class="playlist-label">'+escapeHtml(s.title)+'</span></span><small>SC</small></button>').join("");
}

function updateHeader(){
  const playlist=activePlaylist();
  const title=state.view.type==="playlist"?(playlist?.name||"مكتبتي"):SOURCES[state.view.sourceId]?.title||"مصدر";
  const cover=playlist?.cover||"";
  E.title.textContent=title;
  E.kind.textContent=state.view.type==="playlist"?"MY PLAYLIST":"SOUNDCLOUD SOURCE";
  E.count.textContent=(activeCollection().length||0)+" أغنية";
  const editable=state.view.type==="playlist"&&Boolean(playlist);
  E.editPlaylist.disabled=!editable;
  E.deletePlaylist.disabled=!editable;
  E.addTrack.disabled=!editable;
  E.sourceLink.href=state.view.type==="playlist"?(currentItem()?.url||"#"):(SOURCES[state.view.sourceId]?.url||"#");

  if(editable&&cover){
    E.coverStrip.classList.add("show");
    E.coverStrip.innerHTML='<div class="playlist-cover-strip-inner"><img class="playlist-cover-mini" src="'+escapeAttr(cover)+'" alt="" /><div><strong>'+escapeHtml(playlist.name)+'</strong><small>غلاف الـPlaylist</small></div></div>';
  }else{
    E.coverStrip.classList.remove("show");
    E.coverStrip.innerHTML="";
  }
}

function renderList(){
  const list=activeCollection();
  updateHeader();
  if(!list.length){
    const add=state.view.type==="playlist"?'<button class="mini-btn primary empty-action" id="empty-add-track" type="button">إضافة أول أغنية</button>':'';
    E.list.innerHTML='<div class="empty-state"><i class="fa-solid fa-music" aria-hidden="true"></i><strong>مفيش أغاني متاحة</strong><p>'+ (state.view.type==="playlist"?"أضف أغنية برابط صوت مباشر أو SoundCloud.":"المصدر ده مفيهوش أغاني متاحة.")+'</p>'+add+'</div>';
    return;
  }

  E.list.innerHTML=list.map((item,i)=>{
    const title=item.title||"Untitled";
    const artist=item.artist||"غير معروف";
    const art=getTrackArtwork(item);
    const thumb=art?'<img src="'+escapeAttr(art)+'" alt="" />':escapeHtml(title.trim().charAt(0)||"♪");
    const fav=isFavorite(item);
    let extras='<button class="row-btn '+(fav?"active":"")+'" data-favorite-index="'+i+'" type="button" aria-label="'+(fav?"إزالة من المفضلة":"إضافة للمفضلة")+'"><i class="'+(fav?"fa-solid":"fa-regular")+' fa-heart"></i></button>';
    if(state.view.type==="playlist"){
      extras+='<button class="row-btn" data-edit-index="'+i+'" type="button" aria-label="تعديل الأغنية"><i class="fa-solid fa-pen"></i></button>';
      extras+='<button class="row-btn delete" data-delete-index="'+i+'" type="button" aria-label="حذف الأغنية"><i class="fa-solid fa-trash"></i></button>';
    }else{
      extras+='<button class="row-btn" data-copy-index="'+i+'" type="button" aria-label="إضافة إلى Playlist"><i class="fa-solid fa-plus"></i></button>';
    }
    return '<div class="track-row '+(i===state.index?"active":"")+'" data-index="'+i+'"><div class="track-thumb" style="--thumb:'+escapeAttr(getAccent())+'">'+thumb+'</div><div class="track-main"><span class="track-title">'+escapeHtml(title)+'</span><span class="track-artist">'+escapeHtml(artist)+'</span></div><div class="track-extra">'+extras+'</div></div>';
  }).join("");
}

function getAccent(){
  return state.view.type==="source"?(SOURCES[state.view.sourceId]?.color||"#0ea5e9"):"#0ea5e9";
}

function getTrackArtwork(item){
  if(item?.artwork)return item.artwork;
  if(item?.artwork_url)return String(item.artwork_url).replace("-large.","-t500x500.");
  return activePlaylist()?.cover||"";
}

function normalizeRemoteSound(sound){
  if(!sound)return null;
  return{
    id:String(sound.id),
    title:String(sound.title||"SoundCloud Track"),
    artist:String(sound.user?.username||SOURCES[state.view.sourceId]?.artist||"SoundCloud"),
    url:safeUrl(sound.permalink_url)||safeUrl(sound.uri),
    artwork:safeUrl(sound.artwork_url||sound.user?.avatar_url),
    type:"soundcloud",
    sound
  };
}

function loadSource(){
  stopProgress();
  stopSoundCloud();
  stopNative();
  state.isPlaying=false;
  state.engine="none";
  state.ready=false;
  state.index=0;
  state.tracks=[];
  renderList();

  if(state.view.type==="playlist"){
    const playlist=activePlaylist();
    if(!playlist){
      if(state.playlists.length){
        state.view={type:"playlist",id:state.playlists[0].id,sourceId:null};
        persistView();
        buildSidebar();
        loadSource();
        return;
      }
      setIdleState("أنشئ Playlist جديدة من زر +.");
      return;
    }
    E.sourceStatus.textContent=playlist.tracks.length?"Playlist جاهزة للتشغيل.":"أضف أول أغنية باستخدام زر المزيكا.";
    resetPlayerCard();
    return;
  }

  const source=SOURCES[state.view.sourceId];
  if(!source){setIdleState("اختار مصدر صوت.");return}
  E.sourceStatus.textContent="جاري تحميل قائمة SoundCloud...";
  showSoundCloud(true);
  setupSoundCloud();
  widget.load(source.url,{auto_play:false,hide_related:true,show_comments:false,show_user:true,show_reposts:false,show_teaser:false,show_artwork:false,color:"0284c7",callback:loadRemoteSounds});
  E.sourceLink.href=source.url;
  E.sourceStatus.textContent="جاري تجهيز أغاني "+source.title+"...";
}

function setupSoundCloud(){
  if(widget)return;
  widget=SC.Widget("soundcloud-widget");
  widget.bind(SC.Widget.Events.READY,()=>{
    state.ready=true;
    widget.setVolume(currentVolume());
    widget.getSounds(sounds=>{
      if(state.view.type!=="source")return;
      state.tracks=(sounds||[]).map(normalizeRemoteSound).filter(t=>t?.url);
      state.index=0;
      renderList();
      if(state.tracks.length)loadCurrentMeta();
      E.sourceStatus.textContent=state.tracks.length?"تم تحميل "+state.tracks.length+" أغنية من SoundCloud.":"المصدر ده مفيهوش أغاني متاحة للتشغيل.";
    });
  });
  widget.bind(SC.Widget.Events.PLAY,()=>{
    if(state.engine!=="soundcloud")return;
    state.isPlaying=true;
    startProgress();
    updateControls();
    loadCurrentMeta();
  });
  widget.bind(SC.Widget.Events.PAUSE,()=>{
    if(state.engine!=="soundcloud")return;
    state.isPlaying=false;
    stopProgress();
    updateControls();
  });
  widget.bind(SC.Widget.Events.ERROR,()=>{
    state.isPlaying=false;
    stopProgress();
    E.status.textContent="SoundCloud رفض تشغيل الرابط أو الرابط غير متاح.";
    updateControls();
  });
  widget.bind(SC.Widget.Events.FINISH,()=>{
    if(state.engine!=="soundcloud")return;
    state.isPlaying=false;
    stopProgress();
    playNext(true);
  });
  widget.bind(SC.Widget.Events.PLAY_PROGRESS,event=>{
    if(state.engine!=="soundcloud")return;
    const current=Number(event.currentPosition||0)/1000;
    const total=Number(event.duration||0)/1000;
    E.current.textContent=formatTime(current);
    E.duration.textContent=formatTime(total);
    E.progress.value=total?String((current/total)*100):"0";
  });
}

function loadRemoteSounds(sounds){
  if(state.view.type!=="source")return;
  state.tracks=(sounds||[]).map(normalizeRemoteSound).filter(t=>t?.url);
  state.index=0;
  renderList();
  loadCurrentMeta();
}

function selectPlaylist(id){
  state.view={type:"playlist",id,sourceId:null};
  persistView();
  buildSidebar();
  loadSource();
}

function selectSource(id){
  state.view={type:"source",id:null,sourceId:id};
  persistView();
  buildSidebar();
  loadSource();
}

function persistView(){localStorage.setItem(STORAGE.source,JSON.stringify(state.view))}

function openPlaylistModal(id=null){
  state.editingPlaylistId=id;
  const p=id?state.playlists.find(x=>x.id===id):null;
  E.playlistModalTitle.textContent=p?"تعديل Playlist":"إنشاء Playlist";
  E.playlistName.value=p?.name||"";
  E.playlistCover.value=p?.cover||"";
  E.playlistStatus.textContent="";
  E.playlistModal.showModal();
  setTimeout(()=>E.playlistName.focus(),30);
}

function savePlaylistFromForm(){
  const name=E.playlistName.value.trim();
  const cover=safeUrl(E.playlistCover.value.trim());
  if(name.length<1){
    E.playlistStatus.textContent="اكتب اسم للـPlaylist.";
    return;
  }
  if(cover!==E.playlistCover.value.trim()&&E.playlistCover.value.trim()){
    E.playlistStatus.textContent="رابط الغلاف لازم يكون http أو https.";
    return;
  }

  if(state.editingPlaylistId){
    const p=state.playlists.find(x=>x.id===state.editingPlaylistId);
    if(!p)return;
    p.name=name;
    p.cover=cover;
    if(state.view.type==="playlist"&&state.view.id===p.id)updateHeader();
  }else{
    const p={id:createId("pl"),name,cover,tracks:[],createdAt:Date.now()};
    state.playlists.unshift(p);
    state.view={type:"playlist",id:p.id,sourceId:null};
    persistView();
  }

  savePlaylists();
  buildSidebar();
  loadSource();
  E.playlistModal.close();
}

function deleteActivePlaylist(){
  const p=activePlaylist();
  if(!p)return;
  if(!confirm('تحذف Playlist "'+p.name+'"؟'))return;
  const index=state.playlists.findIndex(x=>x.id===p.id);
  state.playlists.splice(index,1);
  savePlaylists();
  if(state.playlists[index])state.view={type:"playlist",id:state.playlists[index].id,sourceId:null};
  else if(state.playlists[0])state.view={type:"playlist",id:state.playlists[0].id,sourceId:null};
  else state.view={type:"source",id:null,sourceId:"mounir"};
  persistView();
  buildSidebar();
  loadSource();
}

function openTrackModal(index=null){
  if(state.view.type!=="playlist"||!activePlaylist())return;
  state.editingTrackId=index===null?null:activePlaylist().tracks[index]?.id||null;
  const track=index===null?null:activePlaylist().tracks[index];
  E.trackModalTitle.textContent=track?"تعديل الأغنية":"إضافة أغنية";
  E.trackTitle.value=track?.title||"";
  E.trackArtist.value=track?.artist||"";
  E.trackUrl.value=track?.url||"";
  E.trackArt.value=track?.artwork||"";
  E.trackStatus.textContent="روابط الصوت المباشرة من مواقع مختلفة مدعومة. SoundCloud يدعم روابط التراكات.";
  E.trackModal.showModal();
  setTimeout(()=>E.trackTitle.focus(),30);
}

function saveTrackFromForm(){
  const title=E.trackTitle.value.trim();
  const artist=E.trackArtist.value.trim()||"غير معروف";
  const url=safeUrl(E.trackUrl.value.trim());
  const artwork=safeUrl(E.trackArt.value.trim());
  if(!title){E.trackStatus.textContent="اكتب اسم الأغنية.";return}
  if(!url){
    E.trackStatus.textContent="حط رابط صوت صحيح يبدأ بـ http أو https.";
    return;
  }
  if(E.trackArt.value.trim()&&!artwork){
    E.trackStatus.textContent="رابط الغلاف لازم يكون http أو https.";
    return;
  }
  if(isYoutubeUrl(url)){
    E.trackStatus.textContent="رابط YouTube نفسه مش بيتحوّل لصوت منفصل هنا. استخدم SoundCloud أو رابط ملف صوت مباشر.";
    return;
  }

  const p=activePlaylist();
  if(!p)return;
  const type=isSoundCloudUrl(url)?"soundcloud":"audio";
  const updated={id:state.editingTrackId||createId("tr"),title,artist,url,artwork,type};
  const index=p.tracks.findIndex(t=>t.id===state.editingTrackId);
  if(index>=0)p.tracks[index]=updated;
  else p.tracks.push(updated);
  savePlaylists();
  renderList();
  updateHeader();
  E.trackModal.close();
  if(index<0&&p.tracks.length===1)playTrackAt(0,true);
}

function deleteTrack(index){
  const p=activePlaylist();
  if(!p)return;
  const track=p.tracks[index];
  if(!track)return;
  if(!confirm('تحذف "'+track.title+'؟'))return;
  p.tracks.splice(index,1);
  if(state.index>=p.tracks.length)state.index=Math.max(0,p.tracks.length-1);
  savePlaylists();
  if(!p.tracks.length)stopAll();
  renderList();
  updateHeader();
}

function copyRemoteTrack(index){
  const track=state.tracks[index];
  if(!track?.url||state.playlists.length===0){
    alert("أنشئ Playlist أولاً.");
    return;
  }
  const names=state.playlists.map((p,i)=>(i+1)+". "+p.name).join("\n");
  const answer=prompt("اكتب رقم الـPlaylist اللي هتضيف إليها الأغنية:\n\n"+names,"1");
  const choice=Number(answer)-1;
  const p=state.playlists[choice];
  if(!p)return;
  const exists=p.tracks.some(t=>t.url===track.url);
  if(exists){
    alert("الأغنية موجودة بالفعل في الـPlaylist.");
    return;
  }
  p.tracks.push({id:createId("tr"),title:track.title,artist:track.artist,url:track.url,artwork:track.artwork,type:"soundcloud"});
  savePlaylists();
  buildSidebar();
  if(state.view.type==="playlist"&&state.view.id===p.id)renderList();
}

function playTrackAt(index,autoplay=true){
  const list=activeCollection();
  if(!list.length)return;
  state.index=Math.max(0,Math.min(index,list.length-1));
  renderList();
  const item=list[state.index];
  if(state.view.type==="source"){
    loadSoundCloudItem(item,autoplay);
    return;
  }
  if(item.type==="soundcloud"||isSoundCloudUrl(item.url))loadSoundCloudItem(item,autoplay);
  else loadNativeItem(item,autoplay);
}

function loadSoundCloudItem(item,autoplay){
  setupSoundCloud();
  stopNative();
  state.engine="soundcloud";
  state.ready=false;
  showSoundCloud(true);
  E.sourceStatus.textContent="جاري تجهيز SoundCloud...";
  const options={auto_play:false,hide_related:true,show_comments:false,show_user:true,show_reposts:false,show_teaser:false,show_artwork:false,color:"0284c7",callback:()=>{
    state.ready=true;
    widget.setVolume(currentVolume());
    loadCurrentMeta();
    if(autoplay)widget.play();
  }};
  widget.load(item.url,options);
  loadDisplayForItem(item);
  E.sourceLink.href=item.url;
}

function loadNativeItem(item,autoplay){
  stopSoundCloud();
  state.engine="native";
  nativeAudio=E.audio;
  showSoundCloud(false);
  nativeAudio.volume=currentVolume()/100;
  nativeAudio.src=item.url;
  nativeAudio.load();
  loadDisplayForItem(item);
  E.sourceLink.href=item.url;
  E.sourceStatus.textContent="تشغيل مباشر من رابط الصوت.";
  nativeAudio.onloadedmetadata=()=>{E.duration.textContent=formatTime(nativeAudio.duration);E.progress.value="0";};
  nativeAudio.ontimeupdate=()=>{
    if(!Number.isFinite(nativeAudio.duration)||nativeAudio.duration<=0)return;
    E.current.textContent=formatTime(nativeAudio.currentTime);
    E.duration.textContent=formatTime(nativeAudio.duration);
    E.progress.value=String((nativeAudio.currentTime/nativeAudio.duration)*100);
  };
  nativeAudio.onplay=()=>{state.isPlaying=true;startProgress();updateControls()};
  nativeAudio.onpause=()=>{state.isPlaying=false;stopProgress();updateControls()};
  nativeAudio.onended=()=>{state.isPlaying=false;stopProgress();playNext(true)};
  nativeAudio.onerror=()=>{state.isPlaying=false;stopProgress();E.status.textContent="الرابط مش ملف صوت مباشر أو السيرفر منع تشغيله.";updateControls()};
  if(autoplay){
    const promise=nativeAudio.play();
    if(promise?.catch)promise.catch(()=>{E.status.textContent="اضغط تشغيل لتأكيد تشغيل الصوت في المتصفح.";});
  }
}

function loadDisplayForItem(item){
  const title=item?.title||"جاهز للتشغيل";
  const artist=item?.artist||"غير معروف";
  const art=getTrackArtwork(item)||"";
  E.nowTitle.textContent=title;
  E.nowArtist.textContent=artist;
  E.initials.textContent=(title.trim().charAt(0)||"♪");
  if(art){
    E.art.classList.add("has-image");
    E.art.style.backgroundImage='url("'+art.replace(/"/g,"%22")+'")';
  }else{
    E.art.classList.remove("has-image");
    E.art.style.backgroundImage="";
    E.art.style.background='linear-gradient(145deg,'+getAccent()+',#071525)';
  }
  E.sourcePill.textContent=item?.type==="soundcloud"?"SOUNDCLOUD":"DIRECT AUDIO";
  E.sourceLink.href=item?.url||"#";
  const fav=isFavorite(item);
  E.favorite.classList.toggle("active",fav);
  E.favorite.setAttribute("aria-pressed",String(fav));
  E.favorite.innerHTML='<i class="'+(fav?"fa-solid":"fa-regular")+' fa-heart" aria-hidden="true"></i>';
  E.progress.value="0";
  E.current.textContent="0:00";
  E.duration.textContent="0:00";
}

function loadCurrentMeta(){
  const item=currentItem();
  if(item)loadDisplayForItem(item);
}

function resetPlayerCard(){
  const p=activePlaylist();
  E.nowTitle.textContent="جاهز للتشغيل";
  E.nowArtist.textContent=p?.name||"اختار أغنية";
  E.sourcePill.textContent="PAVLEY";
  E.progress.value="0";
  E.current.textContent="0:00";
  E.duration.textContent="0:00";
  E.favorite.classList.remove("active");
  E.favorite.setAttribute("aria-pressed","false");
  E.favorite.innerHTML='<i class="fa-regular fa-heart" aria-hidden="true"></i>';
  E.art.classList.remove("has-image");
  E.art.style.backgroundImage="";
  E.art.style.background="linear-gradient(145deg,"+(p?.cover?"#193f54":"#123d54")+",#091726)";
  if(p?.cover)E.art.style.backgroundImage='url("'+p.cover.replace(/"/g,"%22")+'")';
  updateControls();
}

function setIdleState(message){
  E.sourceStatus.textContent=message;
  E.list.innerHTML='<div class="empty-state"><i class="fa-solid fa-music"></i><strong>المشغّل جاهز</strong><p>'+escapeHtml(message)+'</p></div>';
  resetPlayerCard();
}

function startProgress(){stopProgress();progressTimer=setInterval(()=>{if(state.engine==="soundcloud"&&widget)widget.getPosition(pos=>{E.current.textContent=formatTime(Number(pos||0)/1000)});else if(state.engine==="native"&&nativeAudio)E.current.textContent=formatTime(nativeAudio.currentTime)},250)}
function stopProgress(){clearInterval(progressTimer);progressTimer=null}

function stopSoundCloud(){
  if(widget){
    try{widget.pause()}catch{}
  }
}

function stopNative(){
  if(E.audio){
    E.audio.pause();
    E.audio.removeAttribute("src");
    E.audio.load();
  }
}

function stopAll(){
  stopSoundCloud();
  stopNative();
  state.engine="none";
  state.isPlaying=false;
  stopProgress();
  updateControls();
}

function showSoundCloud(show){
  E.scWrap.classList.toggle("hidden",!show);
}

function playNext(fromFinish=false){
  const list=activeCollection();
  if(!list.length)return;
  if(state.repeat){
    playTrackAt(state.index,true);
    return;
  }
  let next;
  if(state.shuffle&&list.length>1){
    do next=Math.floor(Math.random()*list.length);while(next===state.index);
  }else{
    next=state.index+1;
    if(next>=list.length){
      if(fromFinish||true){next=0}
    }
  }
  playTrackAt(next,true);
}

function playPrev(){
  const list=activeCollection();
  if(!list.length)return;
  if(state.engine==="native"&&nativeAudio&&nativeAudio.currentTime>5){nativeAudio.currentTime=0;return}
  if(state.engine==="soundcloud"&&widget){
    widget.getPosition(pos=>{
      if(Number(pos||0)>5000)widget.seekTo(0);
      else{
        const prev=(state.index-1+list.length)%list.length;
        playTrackAt(prev,true);
      }
    });
    return;
  }
  const prev=(state.index-1+list.length)%list.length;
  playTrackAt(prev,true);
}

function currentVolume(){return Math.max(0,Math.min(100,Number(E.volume.value||80)))}

function applyVolume(value){
  const volume=Math.max(0,Math.min(100,Number(value)));
  E.volume.value=String(volume);
  localStorage.setItem(STORAGE.volume,String(volume));
  if(widget)widget.setVolume(volume);
  if(E.audio)E.audio.volume=volume/100;
}

function updateControls(){
  E.playIcon.className="fa-solid "+(state.isPlaying?"fa-pause":"fa-play");
  E.playBtn.setAttribute("aria-label",state.isPlaying?"إيقاف مؤقت":"تشغيل");
  E.shuffle.setAttribute("aria-pressed",String(state.shuffle));
  E.repeat.setAttribute("aria-pressed",String(state.repeat));
  E.mute.setAttribute("aria-pressed",String(state.muted));
  E.mute.innerHTML='<i class="fa-solid '+(state.muted?"fa-volume-high":"fa-volume-xmark")+'" aria-hidden="true"></i> '+(state.muted?"إلغاء الكتم":"كتم");
  E.wave.classList.toggle("playing",state.isPlaying);
}

function togglePlay(){
  const list=activeCollection();
  if(!list.length){
    E.status.textContent="أضف أغنية للـPlaylist أو اختار مصدر جاهز.";
    return;
  }
  const item=currentItem();
  if(!item){playTrackAt(0,true);return}
  if(state.engine==="native"){
    if(state.isPlaying)E.audio.pause();else E.audio.play().catch(()=>{E.status.textContent="اضغط تشغيل مرة تانية من المتصفح."});
  }else if(state.engine==="soundcloud"&&widget){
    widget.isPaused(paused=>paused?widget.play():widget.pause());
  }else{
    playTrackAt(state.index,true);
  }
}

function toggleFavoriteCurrent(){
  const item=currentItem();
  if(!item)return;
  const key=favoriteKey(item);
  state.favorites=state.favorites.includes(key)?state.favorites.filter(x=>x!==key):[...state.favorites,key];
  localStorage.setItem(STORAGE.favorites,JSON.stringify(state.favorites));
  loadCurrentMeta();
  renderList();
}

function favoriteKey(item){return String(item.id||item.url||item.title)}
function isFavorite(item){return state.favorites.includes(favoriteKey(item))}

function isYoutubeUrl(url){
  try{
    const h=new URL(url).hostname.replace(/^www\./,"");
    return h==="youtube.com"||h==="youtu.be"||h.endsWith(".youtube.com");
  }catch{return false}
}

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

function escapeAttr(value){return escapeHtml(value)}

function resetFromStorage(){
  if(state.view.type==="playlist"&&!state.playlists.some(p=>p.id===state.view.id)){
    state.view=state.playlists[0]?{type:"playlist",id:state.playlists[0].id,sourceId:null}:{type:"source",id:null,sourceId:"mounir"};
  }
  if(state.view.type==="source"&&!SOURCES[state.view.sourceId])state.view={type:"source",id:null,sourceId:"mounir"};
}

E.myPlaylists.addEventListener("click",event=>{
  const tab=event.target.closest("[data-playlist-id]");
  if(tab)selectPlaylist(tab.dataset.playlistId);
});

E.sourceTabs.addEventListener("click",event=>{
  const tab=event.target.closest("[data-source-id]");
  if(tab)selectSource(tab.dataset.sourceId);
});

E.list.addEventListener("click",event=>{
  const emptyAdd=event.target.closest("#empty-add-track");
  if(emptyAdd){openTrackModal();return}
  const favorite=event.target.closest("[data-favorite-index]");
  if(favorite){
    event.stopPropagation();
    const index=Number(favorite.dataset.favoriteIndex);
    const item=activeCollection()[index];
    if(item){
      const key=favoriteKey(item);
      state.favorites=state.favorites.includes(key)?state.favorites.filter(x=>x!==key):[...state.favorites,key];
      localStorage.setItem(STORAGE.favorites,JSON.stringify(state.favorites));
      renderList();
      loadCurrentMeta();
    }
    return;
  }
  const copy=event.target.closest("[data-copy-index]");
  if(copy){event.stopPropagation();copyRemoteTrack(Number(copy.dataset.copyIndex));return}
  const edit=event.target.closest("[data-edit-index]");
  if(edit){event.stopPropagation();openTrackModal(Number(edit.dataset.editIndex));return}
  const del=event.target.closest("[data-delete-index]");
  if(del){event.stopPropagation();deleteTrack(Number(del.dataset.deleteIndex));return}
  const row=event.target.closest(".track-row");
  if(row)playTrackAt(Number(row.dataset.index),true);
});

E.addPlaylist.addEventListener("click",()=>openPlaylistModal());
E.editPlaylist.addEventListener("click",()=>{const p=activePlaylist();if(p)openPlaylistModal(p.id)});
E.deletePlaylist.addEventListener("click",deleteActivePlaylist);
E.addTrack.addEventListener("click",()=>openTrackModal());
E.savePlaylist.addEventListener("click",savePlaylistFromForm);
E.saveTrack.addEventListener("click",saveTrackFromForm);

document.querySelectorAll("[data-close-modal]").forEach(btn=>btn.addEventListener("click",()=>document.getElementById(btn.dataset.closeModal)?.close()));

E.playBtn.addEventListener("click",togglePlay);
E.next.addEventListener("click",()=>playNext(false));
E.prev.addEventListener("click",playPrev);
E.shuffle.addEventListener("click",()=>{state.shuffle=!state.shuffle;localStorage.setItem(STORAGE.shuffle,String(state.shuffle));updateControls()});
E.repeat.addEventListener("click",()=>{state.repeat=!state.repeat;localStorage.setItem(STORAGE.repeat,String(state.repeat));updateControls()});

E.progress.addEventListener("input",()=>{
  const percent=Number(E.progress.value)/100;
  if(state.engine==="native"&&Number.isFinite(E.audio.duration))E.audio.currentTime=percent*E.audio.duration;
  if(state.engine==="soundcloud"&&widget)widget.getDuration(duration=>widget.seekTo(percent*Number(duration||0)));
});

E.volume.addEventListener("input",event=>{
  state.muted=false;
  applyVolume(event.target.value);
  updateControls();
});

E.mute.addEventListener("click",()=>{
  if(state.muted){
    state.muted=false;
    applyVolume(state.previousVolume||80);
  }else{
    state.previousVolume=currentVolume();
    localStorage.setItem("pavley-previous-volume",String(state.previousVolume));
    state.muted=true;
    applyVolume(0);
  }
  updateControls();
});

E.favorite.addEventListener("click",toggleFavoriteCurrent);
E.theme.addEventListener("click",()=>setTheme(document.documentElement.dataset.theme==="light"?"dark":"light"));

document.addEventListener("keydown",event=>{
  if(["INPUT","TEXTAREA"].includes(document.activeElement.tagName))return;
  if(event.code==="Space"){event.preventDefault();togglePlay()}
  if(event.key==="ArrowRight")playNext(false);
  if(event.key==="ArrowLeft")playPrev();
  if(event.key.toLowerCase()==="m")E.mute.click();
});

E.wave.innerHTML=Array.from({length:34},(_,i)=>'<span style="--h:'+ (8+(i*13)%17)+'px"></span>').join("");

resetFromStorage();
setTheme(localStorage.getItem(STORAGE.theme)||"dark");
E.volume.value=localStorage.getItem(STORAGE.volume)||"80";
applyVolume(E.volume.value);
buildSidebar();
loadSource();