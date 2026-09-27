const DEFAULT_SOURCES=[
  {id:"mounir",name:"محمد منير",artist:"محمد منير",url:"https://soundcloud.com/mohamed-mounir-official",type:"soundcloud",cover:"",color:"#0ea5e9"},
  {id:"wassouf",name:"جورج وسوف",artist:"جورج وسوف",url:"https://soundcloud.com/georges_wassouf",type:"soundcloud",cover:"",color:"#8b5cf6"}
];

const DEFAULT_CONFIG={
  appName:"Pavley",
  appSubtitle:"Audio Player",
  heroTitle:{ar:"اعمل مكتبتك على مزاجك.",en:"Build your library your way."},
  heroDescription:{ar:"أنشئ Playlist جديدة، غيّر اسمها والغلاف، أضف واحذف الأغاني، وشغّل روابط صوت من مصادر مختلفة بدون فيديو.",en:"Create playlists, edit covers, add or remove tracks, and play audio from different sources without video."},
  footerText:"© 2026 Pavley Audio Player",
  logoUrl:"",
  accent:"#38bdf8",
  language:"ar"
};

const KEYS={
  config:"pavley-user-config-v1",
  sources:"pavley-user-sources-v1",
  playlists:"pavley-user-playlists-v1",
  view:"pavley-user-view-v1",
  theme:"pavley-user-theme-v1",
  volume:"pavley-user-volume-v1",
  shuffle:"pavley-user-shuffle-v1",
  repeat:"pavley-user-repeat-v1",
  favorites:"pavley-user-favorites-v1"
};

const I18N={
  ar:{
    libraryLabel:"مكتبتي",playlists:"Playlists",sourcesLabel:"المصادر",sources:"المصادر",add:"إضافة",
    editableTitle:"كل حاجة قابلة للتعديل",editableText:"عدّل هوية المنصة، اللغة، المظهر، الـPlaylists، الأغاني، الأغلفة والمصادر من إعدادات المستخدم.",
    playlist:"Playlist",source:"مصدر",songs:"أغنية",ready:"جاهز للتشغيل",chooseTrack:"اختار أغنية",save:"حفظ",cancel:"إلغاء",
    playlistName:"اسم الـPlaylist",coverUrl:"رابط الغلاف",optional:"(اختياري)",trackName:"اسم الأغنية",artist:"المطرب",
    audioUrl:"رابط الصوت",addToPlaylist:"إضافة إلى Playlist",choosePlaylist:"اختار Playlist",
    settings:"الإعدادات",appearance:"المظهر والهوية",appearanceHint:"كل الإعدادات دي محفوظة للمستخدم على نفس المتصفح.",
    appName:"اسم المنصة",appSubtitle:"الوصف القصير",heroTitle:"عنوان الواجهة",heroDescription:"وصف الواجهة",
    accent:"اللون الأساسي",logoUrl:"رابط اللوجو",footerText:"نص الفوتر",language:"اللغة",
    manageSources:"إدارة المصادر",manageSourcesHint:"عدّل أو احذف أي مصدر وأضف مصادر جديدة.",
    addSource:"إضافة مصدر",saveChanges:"حفظ التغييرات",sourceName:"اسم المصدر",sourceArtist:"المطرب / صاحب المصدر",
    sourceType:"نوع المصدر",sourceUrl:"رابط المصدر",sourceCover:"رابط الغلاف",sourceColor:"لون المصدر",
    edit:"تعديل",remove:"حذف",addTrack:"إضافة أغنية",editPlaylist:"تعديل Playlist",deletePlaylist:"حذف Playlist",
    createPlaylist:"إنشاء Playlist",editTrack:"تعديل الأغنية",createSource:"إضافة مصدر",editSource:"تعديل المصدر",
    myPlaylist:"MY PLAYLIST",soundcloudSource:"SOUNDCLOUD SOURCE",sourceLoaded:"تم تحميل المصدر.",playlistReady:"الـPlaylist جاهزة للتشغيل.",
    emptyPlaylist:"مفيش أغاني لسه. أضف أول أغنية.",emptySource:"المصدر ده مفيهوش أغاني متاحة.",
    directAudio:"DIRECT AUDIO",soundcloud:"SOUNDCLOUD",openSource:"فتح المصدر",mute:"كتم",unmute:"إلغاء الكتم",
    appReady:"المشغّل جاهز.",addPlaylistFirst:"أنشئ Playlist جديدة من زر +.",duplicate:"الأغنية موجودة بالفعل في الـPlaylist.",
    directHint:"الرابط لازم يكون SoundCloud Track أو ملف صوت مباشر من موقع يسمح بالتشغيل.",
    youtubeHint:"رابط YouTube نفسه لا يتحول لصوت منفصل هنا. استخدم SoundCloud أو رابط ملف صوت مباشر.",
    badUrl:"حط رابط http أو https صحيح.",badCover:"رابط الغلاف لازم يكون http أو https.",
    deleted:"تم الحذف.",noPlaylists:"مفيش Playlists لسه.",createFirstPlaylist:"اضغط + وأنشئ أول Playlist.",
    playError:"الرابط مش ملف صوت مباشر أو السيرفر مانع التشغيل.",
    sourceError:"المصدر غير متاح للتشغيل."
  },
  en:{
    libraryLabel:"MY LIBRARY",playlists:"Playlists",sourcesLabel:"SOURCES",sources:"Sources",add:"Add",
    editableTitle:"Everything is editable",editableText:"Edit the platform identity, language, theme, playlists, songs, artwork and sources from user settings.",
    playlist:"PLAYLIST",source:"SOURCE",songs:"songs",ready:"Ready to play",chooseTrack:"Choose a track",save:"Save",cancel:"Cancel",
    playlistName:"Playlist name",coverUrl:"Cover URL",optional:"(optional)",trackName:"Track name",artist:"Artist",
    audioUrl:"Audio URL",addToPlaylist:"Add to Playlist",choosePlaylist:"Choose Playlist",
    settings:"Settings",appearance:"Appearance & Identity",appearanceHint:"These settings are saved for this user in this browser.",
    appName:"App name",appSubtitle:"App subtitle",heroTitle:"Hero title",heroDescription:"Hero description",
    accent:"Accent color",logoUrl:"Logo image URL",footerText:"Footer text",language:"Language",
    manageSources:"Manage Sources",manageSourcesHint:"Edit or delete any source and add new ones.",
    addSource:"Add source",saveChanges:"Save changes",sourceName:"Source name",sourceArtist:"Artist / owner",
    sourceType:"Source type",sourceUrl:"Source URL",sourceCover:"Cover URL",sourceColor:"Source color",
    edit:"Edit",remove:"Delete",addTrack:"Add track",editPlaylist:"Edit Playlist",deletePlaylist:"Delete Playlist",
    createPlaylist:"Create Playlist",editTrack:"Edit Track",createSource:"Add Source",editSource:"Edit Source",
    myPlaylist:"MY PLAYLIST",soundcloudSource:"SOUNDCLOUD SOURCE",sourceLoaded:"Source loaded.",playlistReady:"Playlist ready to play.",
    emptyPlaylist:"No tracks yet. Add the first track.",emptySource:"This source has no playable tracks.",
    directAudio:"DIRECT AUDIO",soundcloud:"SOUNDCLOUD",openSource:"Open source",mute:"Mute",unmute:"Unmute",
    appReady:"Player ready.",addPlaylistFirst:"Create a Playlist with the + button.",duplicate:"This track is already in the Playlist.",
    directHint:"Use a SoundCloud Track URL or a direct audio file URL from a site that permits playback.",
    youtubeHint:"A YouTube page URL is not converted into separate audio here. Use SoundCloud or a direct audio file URL.",
    badUrl:"Enter a valid http or https URL.",badCover:"Cover URL must use http or https.",
    deleted:"Deleted.",noPlaylists:"No Playlists yet.",createFirstPlaylist:"Press + to create your first Playlist.",
    playError:"The URL is not a direct audio file or the server blocked playback.",
    sourceError:"This source is not available for playback."
  }
};

function readJSON(key,fallback){
  try{
    const value=localStorage.getItem(key);
    return value?JSON.parse(value):fallback;
  }catch{return fallback;}
}

function clone(value){return JSON.parse(JSON.stringify(value));}

function createId(prefix){
  return prefix+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8);
}

function normalizeConfig(raw){
  const c=raw&&typeof raw==="object"?raw:{};
  return{
    appName:String(c.appName||DEFAULT_CONFIG.appName),
    appSubtitle:String(c.appSubtitle||DEFAULT_CONFIG.appSubtitle),
    heroTitle:{ar:String(c.heroTitle?.ar||DEFAULT_CONFIG.heroTitle.ar),en:String(c.heroTitle?.en||DEFAULT_CONFIG.heroTitle.en)},
    heroDescription:{ar:String(c.heroDescription?.ar||DEFAULT_CONFIG.heroDescription.ar),en:String(c.heroDescription?.en||DEFAULT_CONFIG.heroDescription.en)},
    footerText:String(c.footerText||DEFAULT_CONFIG.footerText),
    logoUrl:safeUrl(c.logoUrl),
    accent:isColor(c.accent)?c.accent:DEFAULT_CONFIG.accent,
    language:c.language==="en"?"en":"ar"
  };
}

function normalizeSource(source){
  if(!source||typeof source!=="object")return null;
  const url=safeUrl(source.url);
  if(!url)return null;
  return{
    id:String(source.id||createId("src")),
    name:String(source.name||"Source"),
    artist:String(source.artist||""),
    url,
    type:source.type==="soundcloud"?"soundcloud":"audio",
    cover:safeUrl(source.cover),
    color:isColor(source.color)?source.color:"#0ea5e9"
  };
}

function normalizeTrack(track){
  if(!track||typeof track!=="object")return null;
  const url=safeUrl(track.url);
  if(!url)return null;
  return{
    id:String(track.id||createId("tr")),
    soundId:String(track.soundId||""),
    title:String(track.title||"Untitled"),
    artist:String(track.artist||"Unknown artist"),
    url,
    artwork:safeUrl(track.artwork),
    type:isSoundCloudUrl(url)?"soundcloud":"audio"
  };
}

function normalizePlaylist(playlist){
  return{
    id:String(playlist?.id||createId("pl")),
    name:String(playlist?.name||"Playlist"),
    cover:safeUrl(playlist?.cover),
    tracks:Array.isArray(playlist?.tracks)?playlist.tracks.map(normalizeTrack).filter(Boolean):[],
    createdAt:Number(playlist?.createdAt)||Date.now()
  };
}

function migrateLegacyData(){
  if(!localStorage.getItem(KEYS.playlists)){
    const old=readJSON("pavley-playlists-v3",[]);
    if(Array.isArray(old)&&old.length)localStorage.setItem(KEYS.playlists,JSON.stringify(old));
  }
  if(!localStorage.getItem(KEYS.view)){
    const old=readJSON("pavley-view-v4",readJSON("pavley-view-v3",null));
    if(old)localStorage.setItem(KEYS.view,JSON.stringify(old));
  }
  if(!localStorage.getItem(KEYS.favorites)){
    const old=readJSON("pavley-favorites-v2",readJSON("pavley-favorites",[]));
    if(Array.isArray(old))localStorage.setItem(KEYS.favorites,JSON.stringify(old));
  }
}

migrateLegacyData();

const state={
  config:normalizeConfig(readJSON(KEYS.config,DEFAULT_CONFIG)),
  sources:[],
  playlists:[],
  view:readJSON(KEYS.view,{type:"playlist",id:null,sourceId:null}),
  tracks:[],
  index:0,
  engine:"none",
  ready:false,
  playing:false,
  shuffle:localStorage.getItem(KEYS.shuffle)==="true",
  repeat:localStorage.getItem(KEYS.repeat)==="true",
  muted:false,
  previousVolume:Number(localStorage.getItem("pavley-previous-volume-v1")||80),
  editingPlaylistId:null,
  editingTrackId:null,
  editingSourceId:null,
  copyTrackIndex:null,
  loadToken:0,
  scContext:""
};

let widget=null;
let progressTimer=null;

const E={
  root:document.documentElement,
  appName:document.getElementById("app-name"),
  appSubtitle:document.getElementById("app-subtitle"),
  brandMark:document.getElementById("brand-mark"),
  language:document.getElementById("language-btn"),
  theme:document.getElementById("theme-btn"),
  settings:document.getElementById("settings-btn"),
  myPlaylists:document.getElementById("my-playlists"),
  sourceTabs:document.getElementById("source-tabs"),
  addPlaylist:document.getElementById("add-playlist-btn"),
  addSource:document.getElementById("add-source-btn"),
  title:document.getElementById("playlist-title"),
  kind:document.getElementById("playlist-kind"),
  count:document.getElementById("track-count"),
  list:document.getElementById("track-list"),
  editPlaylist:document.getElementById("edit-playlist-btn"),
  addTrack:document.getElementById("add-track-btn"),
  deletePlaylist:document.getElementById("delete-playlist-btn"),
  scWrap:document.getElementById("sc-player-wrap"),
  scFrame:document.getElementById("soundcloud-widget"),
  audio:document.getElementById("native-audio"),
  sourceStatus:document.getElementById("source-status"),
  art:document.getElementById("now-art"),
  initials:document.getElementById("art-initials"),
  favorite:document.getElementById("favorite-main"),
  nowTitle:document.getElementById("now-title"),
  nowArtist:document.getElementById("now-artist"),
  sourcePill:document.getElementById("source-pill"),
  wave:document.getElementById("waveform"),
  current:document.getElementById("current-time"),
  duration:document.getElementById("total-duration"),
  progress:document.getElementById("progress"),
  volume:document.getElementById("volume"),
  shuffle:document.getElementById("shuffle-btn"),
  prev:document.getElementById("prev-btn"),
  play:document.getElementById("play-btn"),
  playIcon:document.getElementById("play-icon"),
  next:document.getElementById("next-btn"),
  repeat:document.getElementById("repeat-btn"),
  mute:document.getElementById("mute-btn"),
  muteLabel:document.getElementById("mute-label"),
  sourceLink:document.getElementById("source-link"),
  sourceLinkLabel:document.getElementById("source-link-label"),
  status:document.getElementById("player-status"),
  footer:document.getElementById("footer-text"),
  heroTitle:document.getElementById("hero-title"),
  heroDescription:document.getElementById("hero-description"),
  metaDescription:document.getElementById("meta-description"),
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
  saveTrack:document.getElementById("save-track"),
  copyModal:document.getElementById("add-to-playlist-modal"),
  destination:document.getElementById("destination-playlist"),
  copyStatus:document.getElementById("copy-status"),
  saveCopy:document.getElementById("save-copy-track"),
  settingsModal:document.getElementById("settings-modal"),
  settingAppName:document.getElementById("setting-app-name"),
  settingAppSubtitle:document.getElementById("setting-app-subtitle"),
  settingHeroTitle:document.getElementById("setting-hero-title"),
  settingHeroDescription:document.getElementById("setting-hero-description"),
  settingAccent:document.getElementById("setting-accent"),
  settingLogo:document.getElementById("setting-logo"),
  settingFooter:document.getElementById("setting-footer"),
  settingLanguage:document.getElementById("setting-language"),
  settingsSources:document.getElementById("settings-sources-list"),
  settingsAddSource:document.getElementById("settings-add-source"),
  saveSettings:document.getElementById("save-settings"),
  sourceModal:document.getElementById("source-modal"),
  sourceModalTitle:document.getElementById("source-modal-title"),
  sourceName:document.getElementById("source-name"),
  sourceArtist:document.getElementById("source-artist"),
  sourceType:document.getElementById("source-type"),
  sourceUrl:document.getElementById("source-url"),
  sourceCover:document.getElementById("source-cover"),
  sourceColor:document.getElementById("source-color"),
  sourceStatus:document.getElementById("source-modal-status"),
  saveSource:document.getElementById("save-source")
};

function lang(){return state.config.language;}
function t(key){return I18N[lang()][key]||I18N.en[key]||key;}

function setLanguage(language){
  state.config.language=language==="en"?"en":"ar";
  localStorage.setItem(KEYS.config,JSON.stringify(state.config));
  applyConfig();
  renderAll();
  refreshOpenModals();
}

function applyConfig(){
  E.root.lang=lang();
  E.root.dir=lang()==="ar"?"rtl":"ltr";
  document.body.dataset.lang=lang();
  E.language.textContent=lang()==="ar"?"EN":"AR";
  E.language.setAttribute("aria-label",lang()==="ar"?"Switch language":"تبديل اللغة");
  E.appName.textContent=state.config.appName;
  E.appSubtitle.textContent=state.config.appSubtitle;
  E.heroTitle.textContent=state.config.heroTitle[lang()];
  E.heroDescription.textContent=state.config.heroDescription[lang()];
  E.footer.textContent=state.config.footerText;
  E.sourceLinkLabel.textContent=t("openSource");
  E.muteLabel.textContent=state.muted?t("unmute"):t("mute");
  document.title=state.config.appName+" "+state.config.appSubtitle;
  E.metaDescription.content=state.config.heroDescription[lang()];
  E.root.style.setProperty("--primary",state.config.accent);
  E.root.style.setProperty("--primary-2",state.config.accent);
  if(state.config.logoUrl){
    E.brandMark.innerHTML='<img src="'+escapeAttr(state.config.logoUrl)+'" alt="" />';
    E.brandMark.classList.add("image-logo");
  }else{
    E.brandMark.classList.remove("image-logo");
    E.brandMark.innerHTML='<i class="fa-solid fa-headphones" aria-hidden="true"></i>';
  }
  document.querySelectorAll("[data-i18n]").forEach(node=>{
    node.textContent=t(node.dataset.i18n);
  });
  updateStaticLabels();
}

function updateStaticLabels(){
  E.editPlaylist.title=t("editPlaylist");
  E.editPlaylist.setAttribute("aria-label",t("editPlaylist"));
  E.addTrack.title=t("addTrack");
  E.addTrack.setAttribute("aria-label",t("addTrack"));
  E.deletePlaylist.title=t("deletePlaylist");
  E.deletePlaylist.setAttribute("aria-label",t("deletePlaylist"));
  E.prev.setAttribute("aria-label",lang()==="ar"?"السابق":"Previous");
  E.next.setAttribute("aria-label",lang()==="ar"?"التالي":"Next");
  E.play.setAttribute("aria-label",state.playing?(lang()==="ar"?"إيقاف مؤقت":"Pause"):(lang()==="ar"?"تشغيل":"Play"));
  E.favorite.setAttribute("aria-label",lang()==="ar"?"إضافة للمفضلة":"Add to favorites");
}

function saveConfig(){
  localStorage.setItem(KEYS.config,JSON.stringify(state.config));
}

function saveSources(){
  localStorage.setItem(KEYS.sources,JSON.stringify(state.sources));
}

function savePlaylists(){
  localStorage.setItem(KEYS.playlists,JSON.stringify(state.playlists));
}

function isColor(value){
  return /^#[0-9a-fA-F]{6}$/.test(String(value||""));
}

function safeUrl(value){
  try{
    const url=new URL(String(value||"").trim());
    return url.protocol==="http:"||url.protocol==="https:"?url.href:"";
  }catch{return"";}
}

function isSoundCloudUrl(url){
  try{return new URL(url).hostname.replace(/^www\./,"").toLowerCase().endsWith("soundcloud.com");}catch{return false;}
}

function isYoutubeUrl(url){
  try{
    const host=new URL(url).hostname.replace(/^www\./,"").toLowerCase();
    return host==="youtube.com"||host==="youtu.be"||host.endsWith(".youtube.com");
  }catch{return false;}
}

function activePlaylist(){
  return state.view.type==="playlist"?state.playlists.find(p=>p.id===state.view.id)||null:null;
}

function collection(){
  return state.view.type==="playlist"?(activePlaylist()?.tracks||[]):state.tracks;
}

function currentItem(){
  return collection()[state.index]||null;
}

function ensureData(){
  state.sources=readJSON(KEYS.sources,null);
  if(!Array.isArray(state.sources)||!state.sources.length){
    const oldCustom=readJSON("pavley-custom-sources-v1",[]);
    state.sources=[...clone(DEFAULT_SOURCES),...(Array.isArray(oldCustom)?oldCustom.map(normalizeSource).filter(Boolean):[])];
    saveSources();
  }else{
    state.sources=state.sources.map(normalizeSource).filter(Boolean);
  }

  const rawPlaylists=readJSON(KEYS.playlists,[]);
  state.playlists=Array.isArray(rawPlaylists)?rawPlaylists.map(normalizePlaylist):[];

  if(!state.playlists.length){
    state.playlists=[{id:createId("pl"),name:lang()==="ar"?"مكتبتي":"My Library",cover:"",tracks:[],createdAt:Date.now()}];
    savePlaylists();
  }

  if(!state.view||typeof state.view!=="object")state.view={type:"playlist",id:state.playlists[0].id,sourceId:null};
  if(state.view.type==="playlist"&&!state.playlists.some(p=>p.id===state.view.id)){
    state.view={type:"playlist",id:state.playlists[0].id,sourceId:null};
  }
  if(state.view.type==="source"&&!state.sources.some(s=>s.id===state.view.sourceId)){
    state.view={type:"playlist",id:state.playlists[0].id,sourceId:null};
  }
  persistView();
}

function persistView(){
  localStorage.setItem(KEYS.view,JSON.stringify(state.view));
}

function themeInit(){
  const saved=localStorage.getItem(KEYS.theme)||"dark";
  document.documentElement.dataset.theme=saved;
  E.theme.setAttribute("aria-pressed",String(saved==="light"));
  E.theme.innerHTML='<i class="fa-solid '+(saved==="light"?"fa-sun":"fa-moon")+'" aria-hidden="true"></i>';
}

function toggleTheme(){
  const next=document.documentElement.dataset.theme==="light"?"dark":"light";
  localStorage.setItem(KEYS.theme,next);
  themeInit();
}

function formatTime(seconds){
  if(!Number.isFinite(seconds)||seconds<0)return"0:00";
  const s=Math.floor(seconds);
  return Math.floor(s/60)+":"+String(s%60).padStart(2,"0");
}

function buildSidebar(){
  E.myPlaylists.innerHTML=state.playlists.map(p=>{
    const letter=escapeHtml((p.name.trim().charAt(0)||"♫"));
    return '<button class="playlist-tab '+(state.view.type==="playlist"&&state.view.id===p.id?"active":"")+'" data-playlist-id="'+escapeAttr(p.id)+'" type="button"><span><span class="playlist-avatar">'+letter+'</span><span class="playlist-label">'+escapeHtml(p.name)+'</span></span><small>'+p.tracks.length+'</small></button>';
  }).join("");

  E.sourceTabs.innerHTML=state.sources.map(s=>{
    const icon=s.type==="soundcloud"?"fa-cloud":"fa-file-audio";
    return '<button class="playlist-tab '+(state.view.type==="source"&&state.view.sourceId===s.id?"active":"")+'" data-source-id="'+escapeAttr(s.id)+'" type="button"><span><span class="playlist-avatar"><i class="fa-solid '+icon+'"></i></span><span class="playlist-label">'+escapeHtml(s.name)+'</span></span><small>'+escapeHtml(s.type==="soundcloud"?"SC":"AUDIO")+'</small></button>';
  }).join("");

  if(!state.playlists.length)E.myPlaylists.innerHTML='<div class="empty-state" style="padding:18px 10px"><i class="fa-solid fa-list"></i><strong>'+t("noPlaylists")+'</strong><p>'+t("createFirstPlaylist")+'</p></div>';
}

function updateHeader(){
  const p=activePlaylist();
  const s=state.view.type==="source"?state.sources.find(x=>x.id===state.view.sourceId):null;
  E.title.textContent=state.view.type==="playlist"?(p?.name||"Playlist"):(s?.name||t("sources"));
  E.kind.textContent=state.view.type==="playlist"?t("myPlaylist"):t("soundcloudSource");
  E.count.textContent=collection().length+" "+t("songs");
  const editable=Boolean(p);
  E.editPlaylist.disabled=!editable;
  E.deletePlaylist.disabled=!editable;
  E.addTrack.disabled=!editable;
}

function artworkFor(item){
  return safeUrl(item?.artwork);
}

function renderTracks(){
  const list=collection();
  if(!list.length){
    const action=state.view.type==="playlist"?'<button class="mini-btn primary empty-action" id="empty-add-track" type="button">'+t("addTrack")+'</button>':"";
    E.list.innerHTML='<div class="empty-state"><i class="fa-solid fa-music"></i><strong>'+t(state.view.type==="playlist"?"emptyPlaylist":"emptySource")+'</strong>'+action+'</div>';
    return;
  }

  E.list.innerHTML=list.map((item,i)=>{
    const fav=isFavorite(item);
    const actions='<button class="row-btn '+(fav?"active":"")+'" data-favorite-index="'+i+'" type="button" aria-label="'+(fav?"Remove from favorites":"Add to favorites")+'"><i class="'+(fav?"fa-solid":"fa-regular")+' fa-heart"></i></button>'+
      (state.view.type==="playlist"
        ?'<button class="row-btn" data-edit-index="'+i+'" type="button" aria-label="'+t("edit")+'"><i class="fa-solid fa-pen"></i></button><button class="row-btn delete" data-delete-index="'+i+'" type="button" aria-label="'+t("remove")+'"><i class="fa-solid fa-trash"></i></button>'
        :'<button class="row-btn" data-copy-index="'+i+'" type="button" aria-label="'+t("addToPlaylist")+'"><i class="fa-solid fa-plus"></i></button>');
    return '<div class="track-row '+(i===state.index?"active":"")+'" data-index="'+i+'"><div class="track-thumb" style="--thumb:'+escapeAttr(getAccent())+'">'+escapeHtml((item.title||"♪").trim().charAt(0)||"♪")+'</div><div class="track-main"><span class="track-title">'+escapeHtml(item.title)+'</span><span class="track-artist">'+escapeHtml(item.artist||"")+'</span></div><div class="track-extra">'+actions+'</div></div>';
  }).join("");
}

function getAccent(){
  if(state.view.type==="source"){
    const s=state.sources.find(x=>x.id===state.view.sourceId);
    return s?.color||state.config.accent;
  }
  return state.config.accent;
}

function buildSettingsSources(){
  E.settingsSources.innerHTML=state.sources.map(s=>{
    return '<div class="managed-item"><div class="managed-main"><span class="managed-icon"><i class="fa-solid '+(s.type==="soundcloud"?"fa-cloud":"fa-file-audio")+'"></i></span><div><strong>'+escapeHtml(s.name)+'</strong><small>'+escapeHtml(s.url)+'</small></div></div><div class="managed-actions"><button class="row-btn" data-settings-edit-source="'+escapeAttr(s.id)+'" type="button" aria-label="'+t("edit")+'"><i class="fa-solid fa-pen"></i></button><button class="row-btn delete" data-settings-delete-source="'+escapeAttr(s.id)+'" type="button" aria-label="'+t("remove")+'"><i class="fa-solid fa-trash"></i></button></div></div>';
  }).join("");
}

function refreshOpenModals(){
  if(E.settingsModal.open)openSettings(false);
}

function renderAll(){
  buildSidebar();
  updateHeader();
  renderTracks();
  updateStaticLabels();
}

function setupSoundCloud(){
  if(widget)return;
  widget=SC.Widget(E.scFrame);

  widget.bind(SC.Widget.Events.READY,()=>{
    state.ready=true;
    widget.setVolume(currentVolume());
    if(state.view.type==="source"&&state.scContext)readSoundCloudSounds(state.loadToken);
  });

  widget.bind(SC.Widget.Events.PLAY,()=>{
    if(state.engine!=="soundcloud")return;
    state.playing=true;
    startProgress();
    updateControls();
    syncSoundCloudCurrent();
  });

  widget.bind(SC.Widget.Events.PAUSE,()=>{
    if(state.engine!=="soundcloud")return;
    state.playing=false;
    stopProgress();
    updateControls();
  });

  widget.bind(SC.Widget.Events.FINISH,()=>{
    if(state.engine!=="soundcloud")return;
    state.playing=false;
    stopProgress();
    playNext(true);
  });

  widget.bind(SC.Widget.Events.ERROR,()=>{
    if(state.engine!=="soundcloud")return;
    state.playing=false;
    stopProgress();
    E.status.textContent=t("sourceError");
    updateControls();
  });

  widget.bind(SC.Widget.Events.PLAY_PROGRESS,event=>{
    if(state.engine!=="soundcloud")return;
    E.current.textContent=formatTime(Number(event.currentPosition||0)/1000);
    E.progress.value=Number.isFinite(event.relativePosition)?String(event.relativePosition*100):"0";
    widget.getDuration(d=>E.duration.textContent=formatTime(Number(d||0)/1000));
  });
}

function readSoundCloudSounds(token,attempt=0){
  if(token!==state.loadToken||state.view.type!=="source")return;
  widget.getSounds(sounds=>{
    if(token!==state.loadToken||state.view.type!=="source")return;
    const normalized=(sounds||[]).map(sound=>({
      id:"sc_"+String(sound.id),
      soundId:String(sound.id||""),
      title:String(sound.title||"SoundCloud Track"),
      artist:String(sound.user?.username||state.sources.find(s=>s.id===state.view.sourceId)?.artist||"SoundCloud"),
      url:safeUrl(sound.permalink_url)||safeUrl(sound.uri),
      artwork:"",
      type:"soundcloud"
    })).filter(x=>x.url);

    if(normalized.length||attempt>=5){
      state.tracks=normalized;
      state.index=0;
      renderAll();
      if(normalized.length)loadDisplay(normalized[0]);
      E.sourceStatus.textContent=normalized.length?state.sources.find(s=>s.id===state.view.sourceId)?.name+" ✓":t("emptySource");
      return;
    }
    setTimeout(()=>readSoundCloudSounds(token,attempt+1),350);
  });
}

function loadCurrentSource(){
  stopAll();
  const token=++state.loadToken;
  state.tracks=[];
  state.index=0;
  state.scContext="";
  renderAll();

  const source=state.sources.find(s=>s.id===state.view.sourceId);
  if(!source){
    showSoundCloud(false);
    E.sourceStatus.textContent=t("sourceError");
    return;
  }

  E.sourceLink.href=source.url;

  if(source.type==="audio"){
    showSoundCloud(false);
    state.tracks=[{
      id:"src_"+source.id,
      soundId:"",
      title:source.name,
      artist:source.artist||"Audio",
      url:source.url,
      artwork:source.cover,
      type:"audio"
    }];
    state.index=0;
    renderAll();
    E.sourceStatus.textContent=t("sourceLoaded");
    loadDisplay(state.tracks[0]);
    return;
  }

  showSoundCloud(true);
  setupSoundCloud();
  state.engine="soundcloud";
  state.scContext=source.url;
  E.sourceStatus.textContent=source.name+" ...";
  widget.load(source.url,{
    auto_play:false,
    hide_related:true,
    show_comments:false,
    show_user:true,
    show_reposts:false,
    show_teaser:false,
    show_artwork:false,
    color:source.color.replace("#",""),
    callback:()=>{
      if(token!==state.loadToken)return;
      state.ready=true;
      widget.setVolume(currentVolume());
      readSoundCloudSounds(token);
    }
  });
}

function loadCurrentPlaylist(){
  showSoundCloud(false);
  state.tracks=[];
  state.index=0;
  state.engine="none";
  state.ready=false;
  const playlist=activePlaylist();
  if(!playlist){
    E.sourceStatus.textContent=t("sourceError");
    return;
  }
  renderAll();
  E.sourceStatus.textContent=playlist.tracks.length?t("playlistReady"):t("emptyPlaylist");
  resetPlayer();
}

function loadView(){
  if(state.view.type==="source")loadCurrentSource();
  else loadCurrentPlaylist();
}

function selectPlaylist(id){
  if(!state.playlists.some(p=>p.id===id))return;
  state.view={type:"playlist",id,sourceId:null};
  persistView();
  loadView();
}

function selectSource(id){
  if(!state.sources.some(s=>s.id===id))return;
  state.view={type:"source",id:null,sourceId:id};
  persistView();
  loadView();
}

function playTrackAt(index,autoplay=true){
  const list=collection();
  if(!list.length)return;
  state.index=Math.max(0,Math.min(index,list.length-1));
  renderTracks();
  const item=list[state.index];
  if(item.type==="soundcloud")loadSoundCloudTrack(item,autoplay);
  else loadDirectTrack(item,autoplay);
}

function loadSoundCloudTrack(item,autoplay){
  const token=++state.loadToken;
  setupSoundCloud();
  stopNative();
  state.engine="soundcloud";
  state.ready=false;
  state.scContext=item.url;
  showSoundCloud(true);
  loadDisplay(item);
  E.sourceLink.href=item.url;

  widget.load(item.url,{
    auto_play:false,hide_related:true,show_comments:false,show_user:true,show_reposts:false,show_teaser:false,show_artwork:false,color:getAccent().replace("#",""),
    callback:()=>{
      if(token!==state.loadToken)return;
      state.ready=true;
      widget.setVolume(currentVolume());
      if(autoplay)widget.play();
      E.sourceStatus.textContent=t("sourceLoaded");
    }
  });
}

function loadDirectTrack(item,autoplay){
  const token=++state.loadToken;
  stopSoundCloud();
  state.engine="native";
  state.ready=true;
  showSoundCloud(false);
  const audio=E.audio;

  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  audio.volume=currentVolume()/100;
  audio.src=item.url;
  audio.load();

  loadDisplay(item);
  E.sourceLink.href=item.url;
  E.sourceStatus.textContent=t("sourceLoaded");

  audio.onloadedmetadata=()=>{
    if(token===state.loadToken)E.duration.textContent=formatTime(audio.duration);
  };
  audio.onplay=()=>{
    if(token!==state.loadToken)return;
    state.playing=true;
    startProgress();
    updateControls();
  };
  audio.onpause=()=>{
    if(token!==state.loadToken)return;
    state.playing=false;
    stopProgress();
    updateControls();
  };
  audio.onended=()=>{
    if(token!==state.loadToken)return;
    state.playing=false;
    stopProgress();
    playNext(true);
  };
  audio.onerror=()=>{
    if(token!==state.loadToken)return;
    state.playing=false;
    stopProgress();
    E.status.textContent=t("playError");
    updateControls();
  };
  audio.ontimeupdate=()=>{
    if(token!==state.loadToken||!Number.isFinite(audio.duration)||audio.duration<=0)return;
    E.current.textContent=formatTime(audio.currentTime);
    E.duration.textContent=formatTime(audio.duration);
    E.progress.value=String((audio.currentTime/audio.duration)*100);
  };

  if(autoplay)audio.play().catch(()=>{if(token===state.loadToken)E.status.textContent=lang()==="ar"?"اضغط Play للتشغيل.":"Press Play to start playback.";});
}

function syncSoundCloudCurrent(){
  widget.getCurrentSound(sound=>{
    if(state.engine!=="soundcloud"||!sound)return;
    const list=collection();
    const found=list.findIndex(item=>item.soundId&&String(item.soundId)===String(sound.id));
    if(found>=0&&found!==state.index){
      state.index=found;
      renderTracks();
      loadDisplay(list[found]);
    }
  });
}

function loadDisplay(item){
  if(!item){resetPlayer();return;}
  E.nowTitle.textContent=item.title||"Untitled";
  E.nowArtist.textContent=item.artist||"";
  E.initials.textContent=(item.title||"♪").trim().charAt(0)||"♪";
  const art=artworkFor(item)||((state.view.type==="playlist")?activePlaylist()?.cover:"");
  E.art.classList.toggle("has-image",Boolean(art));
  E.art.style.backgroundImage=art?'url("'+escapeAttr(art)+'")':"";
  if(!art)E.art.style.background="linear-gradient(145deg,"+getAccent()+",#071525)";
  E.sourcePill.textContent=item.type==="soundcloud"?t("soundcloud"):t("directAudio");
  E.sourceLink.href=item.url;
  const fav=isFavorite(item);
  E.favorite.classList.toggle("active",fav);
  E.favorite.setAttribute("aria-pressed",String(fav));
  E.favorite.innerHTML='<i class="'+(fav?"fa-solid":"fa-regular")+' fa-heart"></i>';
}

function resetPlayer(){
  const playlist=activePlaylist();
  E.nowTitle.textContent=t("ready");
  E.nowArtist.textContent=playlist?.name||t("chooseTrack");
  E.sourcePill.textContent="PAVLEY";
  E.current.textContent="0:00";
  E.duration.textContent="0:00";
  E.progress.value="0";
  E.art.classList.toggle("has-image",Boolean(playlist?.cover));
  E.art.style.backgroundImage=playlist?.cover?'url("'+escapeAttr(playlist.cover)+'")':"";
  if(!playlist?.cover)E.art.style.background="linear-gradient(145deg,"+getAccent()+",#071525)";
  E.favorite.classList.remove("active");
  E.favorite.setAttribute("aria-pressed","false");
  E.favorite.innerHTML='<i class="fa-regular fa-heart"></i>';
  updateControls();
}

function stopSoundCloud(){
  if(widget){try{widget.pause();}catch{}}
}

function stopNative(){
  const audio=E.audio;
  audio.pause();
  audio.onloadedmetadata=null;
  audio.onplay=null;
  audio.onpause=null;
  audio.onended=null;
  audio.onerror=null;
  audio.ontimeupdate=null;
  audio.removeAttribute("src");
  audio.load();
}

function stopAll(){
  ++state.loadToken;
  stopProgress();
  stopSoundCloud();
  stopNative();
  state.engine="none";
  state.ready=false;
  state.playing=false;
  updateControls();
}

function showSoundCloud(show){
  E.scWrap.classList.toggle("hidden",!show);
}

function startProgress(){
  stopProgress();
  progressTimer=setInterval(()=>{
    if(state.engine==="soundcloud"&&widget)widget.getPosition(pos=>E.current.textContent=formatTime(Number(pos||0)/1000));
    if(state.engine==="native")E.current.textContent=formatTime(E.audio.currentTime);
  },250);
}

function stopProgress(){
  clearInterval(progressTimer);
  progressTimer=null;
}

function playNext(fromFinish=false){
  const list=collection();
  if(!list.length)return;

  if(state.repeat){
    playTrackAt(state.index,true);
    return;
  }

  let next;
  if(state.shuffle&&list.length>1){
    do next=Math.floor(Math.random()*list.length);while(next===state.index);
  }else next=state.index+1;

  if(next>=list.length){
    if(fromFinish){
      state.playing=false;
      resetProgress();
      updateControls();
      return;
    }
    next=0;
  }
  playTrackAt(next,true);
}

function playPrevious(){
  const list=collection();
  if(!list.length)return;

  if(state.engine==="native"&&E.audio.currentTime>5){E.audio.currentTime=0;return;}

  if(state.engine==="soundcloud"&&widget){
    widget.getPosition(pos=>{
      if(Number(pos||0)>5000)widget.seekTo(0);
      else playTrackAt((state.index-1+list.length)%list.length,true);
    });
    return;
  }

  playTrackAt((state.index-1+list.length)%list.length,true);
}

function resetProgress(){
  E.current.textContent="0:00";
  E.progress.value="0";
}

function togglePlay(){
  const list=collection();
  if(!list.length){
    E.status.textContent=state.view.type==="playlist"?t("emptyPlaylist"):t("emptySource");
    return;
  }

  if(!currentItem()){
    playTrackAt(0,true);
    return;
  }

  if(state.engine==="native"){
    if(state.playing)E.audio.pause();
    else E.audio.play().catch(()=>{E.status.textContent=lang()==="ar"?"اضغط Play للتشغيل.":"Press Play to start playback.";});
    return;
  }

  if(state.engine==="soundcloud"&&widget){
    widget.isPaused(paused=>paused?widget.play():widget.pause());
    return;
  }

  playTrackAt(state.index,true);
}

function updateControls(){
  E.playIcon.className="fa-solid "+(state.playing?"fa-pause":"fa-play");
  E.play.setAttribute("aria-label",state.playing?(lang()==="ar"?"إيقاف مؤقت":"Pause"):(lang()==="ar"?"تشغيل":"Play"));
  E.shuffle.setAttribute("aria-pressed",String(state.shuffle));
  E.repeat.setAttribute("aria-pressed",String(state.repeat));
  E.mute.setAttribute("aria-pressed",String(state.muted));
  E.muteLabel.textContent=state.muted?t("unmute"):t("mute");
  E.mute.innerHTML='<i class="fa-solid '+(state.muted?"fa-volume-high":"fa-volume-xmark")+'"></i> <span id="mute-label">'+(state.muted?t("unmute"):t("mute"))+'</span>';
  E.wave.classList.toggle("playing",state.playing);
}

function favoriteKey(item){
  return String(item.soundId||item.url||item.id);
}

function isFavorite(item){
  const list=readJSON(KEYS.favorites,[]);
  return Array.isArray(list)&&list.includes(favoriteKey(item));
}

function toggleFavorite(item){
  if(!item)return;
  const list=readJSON(KEYS.favorites,[]);
  const key=favoriteKey(item);
  const next=list.includes(key)?list.filter(x=>x!==key):[...list,key];
  localStorage.setItem(KEYS.favorites,JSON.stringify(next));
  loadDisplay(item);
  renderTracks();
}

function openPlaylistModal(id=null){
  state.editingPlaylistId=id;
  const p=id?state.playlists.find(x=>x.id===id):null;
  E.playlistModalTitle.textContent=p?t("editPlaylist"):t("createPlaylist");
  E.playlistName.value=p?.name||"";
  E.playlistCover.value=p?.cover||"";
  E.playlistStatus.textContent="";
  E.playlistModal.showModal();
  setTimeout(()=>E.playlistName.focus(),20);
}

function savePlaylistFromForm(){
  const name=E.playlistName.value.trim();
  const coverInput=E.playlistCover.value.trim();
  const cover=safeUrl(coverInput);

  if(!name){E.playlistStatus.textContent=lang()==="ar"?"اكتب اسم الـPlaylist.":"Enter a Playlist name.";return;}
  if(coverInput&&!cover){E.playlistStatus.textContent=t("badCover");return;}

  if(state.editingPlaylistId){
    const p=state.playlists.find(x=>x.id===state.editingPlaylistId);
    if(!p)return;
    p.name=name;
    p.cover=cover;
  }else{
    const p={id:createId("pl"),name,cover,tracks:[],createdAt:Date.now()};
    state.playlists.unshift(p);
    state.view={type:"playlist",id:p.id,sourceId:null};
    persistView();
  }

  savePlaylists();
  E.playlistModal.close();
  buildSidebar();
  loadView();
}

function deleteActivePlaylist(){
  const p=activePlaylist();
  if(!p)return;
  if(!confirm(lang()==="ar"?'تحذف Playlist "'+p.name+'"؟':'Delete Playlist "'+p.name+'"?'))return;

  stopAll();
  const idx=state.playlists.findIndex(x=>x.id===p.id);
  state.playlists.splice(idx,1);
  if(!state.playlists.length){
    state.playlists.push({id:createId("pl"),name:lang()==="ar"?"مكتبتي":"My Library",cover:"",tracks:[],createdAt:Date.now()});
  }
  const fallback=state.playlists[Math.min(idx,state.playlists.length-1)];
  state.view={type:"playlist",id:fallback.id,sourceId:null};
  savePlaylists();
  persistView();
  loadView();
}

function openTrackModal(index=null){
  const p=activePlaylist();
  if(!p)return;

  const item=index===null?null:p.tracks[index];
  state.editingTrackId=item?.id||null;
  E.trackModalTitle.textContent=item?t("editTrack"):t("addTrack");
  E.trackTitle.value=item?.title||"";
  E.trackArtist.value=item?.artist||"";
  E.trackUrl.value=item?.url||"";
  E.trackArt.value=item?.artwork||"";
  E.trackStatus.textContent=t("directHint");
  E.trackModal.showModal();
  setTimeout(()=>E.trackTitle.focus(),20);
}

function saveTrackFromForm(){
  const p=activePlaylist();
  if(!p)return;

  const title=E.trackTitle.value.trim();
  const artist=E.trackArtist.value.trim()||(lang()==="ar"?"غير معروف":"Unknown artist");
  const url=safeUrl(E.trackUrl.value.trim());
  const artInput=E.trackArt.value.trim();
  const artwork=safeUrl(artInput);

  if(!title){E.trackStatus.textContent=lang()==="ar"?"اكتب اسم الأغنية.":"Enter a track name.";return;}
  if(!url){E.trackStatus.textContent=t("badUrl");return;}
  if(artInput&&!artwork){E.trackStatus.textContent=t("badCover");return;}
  if(isYoutubeUrl(url)){E.trackStatus.textContent=t("youtubeHint");return;}

  const existing=state.editingTrackId?p.tracks.find(x=>x.id===state.editingTrackId):null;
  const item={
    id:state.editingTrackId||createId("tr"),
    soundId:isSoundCloudUrl(url)?(existing?.soundId||""):"",
    title,artist,url,artwork,
    type:isSoundCloudUrl(url)?"soundcloud":"audio"
  };

  const index=p.tracks.findIndex(x=>x.id===state.editingTrackId);
  if(index>=0)p.tracks[index]=item;
  else p.tracks.push(item);

  savePlaylists();
  E.trackModal.close();
  buildSidebar();
  loadView();

  if(index>=0&&index===state.index){
    setTimeout(()=>loadDisplay(item),50);
  }
}

function deleteTrack(index){
  const p=activePlaylist();
  const item=p?.tracks[index];
  if(!p||!item)return;
  if(!confirm(lang()==="ar"?'تحذف "'+item.title+'"؟':'Delete "'+item.title+'"?'))return;

  const deleting=index===state.index;
  if(deleting)stopAll();
  p.tracks.splice(index,1);
  if(index<state.index)state.index--;
  if(state.index>=p.tracks.length)state.index=Math.max(0,p.tracks.length-1);
  savePlaylists();
  buildSidebar();
  renderTracks();

  if(!p.tracks.length)resetPlayer();
  else if(deleting)resetPlayer();
}

function openCopyModal(index){
  if(!state.playlists.length){alert(t("noPlaylists"));return;}
  const item=state.tracks[index];
  if(!item)return;

  state.copyTrackIndex=index;
  E.destination.innerHTML=state.playlists.map(p=>'<option value="'+escapeAttr(p.id)+'">'+escapeHtml(p.name)+'</option>').join("");
  E.copyStatus.textContent="";
  E.copyModal.showModal();
}

function saveCopyTrack(){
  const item=state.tracks[state.copyTrackIndex];
  const p=state.playlists.find(x=>x.id===E.destination.value);
  if(!item||!p)return;

  if(p.tracks.some(x=>x.url===item.url)){
    E.copyStatus.textContent=t("duplicate");
    return;
  }

  p.tracks.push({id:createId("tr"),soundId:item.soundId||"",title:item.title,artist:item.artist,url:item.url,artwork:item.artwork||"",type:"soundcloud"});
  savePlaylists();
  buildSidebar();
  E.copyModal.close();
  if(state.view.type==="playlist"&&state.view.id===p.id)renderTracks();
}

function openSettings(show=true){
  E.settingAppName.value=state.config.appName;
  E.settingAppSubtitle.value=state.config.appSubtitle;
  E.settingHeroTitle.value=state.config.heroTitle[lang()];
  E.settingHeroDescription.value=state.config.heroDescription[lang()];
  E.settingAccent.value=state.config.accent;
  E.settingLogo.value=state.config.logoUrl;
  E.settingFooter.value=state.config.footerText;
  E.settingLanguage.value=state.config.language;
  buildSettingsSources();
  if(show)E.settingsModal.showModal();
}

function saveSettings(){
  state.config.appName=E.settingAppName.value.trim()||DEFAULT_CONFIG.appName;
  state.config.appSubtitle=E.settingAppSubtitle.value.trim()||DEFAULT_CONFIG.appSubtitle;
  state.config.heroTitle[lang()]=E.settingHeroTitle.value.trim()||DEFAULT_CONFIG.heroTitle[lang()];
  state.config.heroDescription[lang()]=E.settingHeroDescription.value.trim()||DEFAULT_CONFIG.heroDescription[lang()];
  state.config.accent=isColor(E.settingAccent.value)?E.settingAccent.value:DEFAULT_CONFIG.accent;
  const logoInput=E.settingLogo.value.trim();
  state.config.logoUrl=logoInput?safeUrl(logoInput):"";
  if(logoInput&&!state.config.logoUrl){alert(t("badUrl"));return;}
  state.config.footerText=E.settingFooter.value.trim()||DEFAULT_CONFIG.footerText;
  const selectedLanguage=E.settingLanguage.value==="en"?"en":"ar";
  state.config.language=selectedLanguage;
  saveConfig();
  applyConfig();
  renderAll();
  E.settingsModal.close();
}

function openSourceModal(id=null){
  state.editingSourceId=id;
  const s=id?state.sources.find(x=>x.id===id):null;
  E.sourceModalTitle.textContent=s?t("editSource"):t("createSource");
  E.sourceName.value=s?.name||"";
  E.sourceArtist.value=s?.artist||"";
  E.sourceType.value=s?.type||"soundcloud";
  E.sourceUrl.value=s?.url||"";
  E.sourceCover.value=s?.cover||"";
  E.sourceColor.value=s?.color||state.config.accent;
  E.sourceStatus.textContent="";
  E.sourceModal.showModal();
  setTimeout(()=>E.sourceName.focus(),20);
}

function saveSourceFromForm(){
  const name=E.sourceName.value.trim();
  const artist=E.sourceArtist.value.trim();
  const type=E.sourceType.value==="soundcloud"?"soundcloud":"audio";
  const url=safeUrl(E.sourceUrl.value.trim());
  const coverInput=E.sourceCover.value.trim();
  const cover=safeUrl(coverInput);
  const color=isColor(E.sourceColor.value)?E.sourceColor.value:"#0ea5e9";

  if(!name){E.sourceStatus.textContent=lang()==="ar"?"اكتب اسم المصدر.":"Enter a source name.";return;}
  if(!url){E.sourceStatus.textContent=t("badUrl");return;}
  if(coverInput&&!cover){E.sourceStatus.textContent=t("badCover");return;}
  if(type==="soundcloud"&&!isSoundCloudUrl(url)){
    E.sourceStatus.textContent=lang()==="ar"?"مصدر SoundCloud لازم يكون رابط SoundCloud.":"A SoundCloud source must use a SoundCloud URL.";
    return;
  }
  if(type==="audio"&&isYoutubeUrl(url)){
    E.sourceStatus.textContent=t("youtubeHint");
    return;
  }

  const source={id:state.editingSourceId||createId("src"),name,artist,url,type,cover,color};
  const idx=state.sources.findIndex(x=>x.id===state.editingSourceId);
  if(idx>=0)state.sources[idx]=source;
  else{
    state.sources.push(source);
    state.view={type:"source",id:null,sourceId:source.id};
    persistView();
  }

  saveSources();
  E.sourceModal.close();
  buildSettingsSources();
  buildSidebar();
  loadView();
}

function deleteSource(id){
  if(state.sources.length<=1){
    alert(lang()==="ar"?"لازم يفضل مصدر واحد على الأقل.":"Keep at least one source.");
    return;
  }
  const source=state.sources.find(s=>s.id===id);
  if(!source)return;
  if(!confirm(lang()==="ar"?'تحذف المصدر "'+source.name+'"؟':'Delete source "'+source.name+'"?'))return;

  state.sources=state.sources.filter(s=>s.id!==id);
  saveSources();

  if(state.view.type==="source"&&state.view.sourceId===id){
    state.view={type:"playlist",id:state.playlists[0].id,sourceId:null};
    persistView();
    loadView();
  }else{
    buildSettingsSources();
    buildSidebar();
  }
}

function escapeHtml(value){
  return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

function escapeAttr(value){
  return escapeHtml(value).replace(/\\/g,"&#92;");
}

E.addPlaylist.addEventListener("click",()=>openPlaylistModal());
E.addSource.addEventListener("click",()=>openSourceModal());
E.settings.addEventListener("click",()=>openSettings());
E.settingsAddSource.addEventListener("click",()=>{E.settingsModal.close();openSourceModal();});
E.savePlaylist.addEventListener("click",savePlaylistFromForm);
E.saveTrack.addEventListener("click",saveTrackFromForm);
E.saveCopy.addEventListener("click",saveCopyTrack);
E.saveSettings.addEventListener("click",saveSettings);
E.saveSource.addEventListener("click",saveSourceFromForm);

E.language.addEventListener("click",()=>setLanguage(lang()==="ar"?"en":"ar"));
E.theme.addEventListener("click",toggleTheme);
E.play.addEventListener("click",togglePlay);
E.next.addEventListener("click",()=>playNext(false));
E.prev.addEventListener("click",playPrevious);
E.shuffle.addEventListener("click",()=>{state.shuffle=!state.shuffle;localStorage.setItem(KEYS.shuffle,String(state.shuffle));updateControls();});
E.repeat.addEventListener("click",()=>{state.repeat=!state.repeat;localStorage.setItem(KEYS.repeat,String(state.repeat));updateControls();});
E.volume.addEventListener("input",event=>{state.muted=false;applyVolume(event.target.value);updateControls();});
E.mute.addEventListener("click",()=>{
  if(state.muted){state.muted=false;applyVolume(state.previousVolume||80);}
  else{state.previousVolume=currentVolume();state.muted=true;applyVolume(0);}
  updateControls();
});
E.progress.addEventListener("input",()=>{
  const ratio=Number(E.progress.value)/100;
  if(state.engine==="native"&&Number.isFinite(E.audio.duration))E.audio.currentTime=ratio*E.audio.duration;
  if(state.engine==="soundcloud"&&widget)widget.getDuration(d=>widget.seekTo(ratio*Number(d||0)));
});
E.favorite.addEventListener("click",()=>toggleFavorite(currentItem()));

E.editPlaylist.addEventListener("click",()=>activePlaylist()&&openPlaylistModal(activePlaylist().id));
E.deletePlaylist.addEventListener("click",deleteActivePlaylist);
E.addTrack.addEventListener("click",()=>openTrackModal());

E.myPlaylists.addEventListener("click",event=>{
  const tab=event.target.closest("[data-playlist-id]");
  if(tab)selectPlaylist(tab.dataset.playlistId);
});

E.sourceTabs.addEventListener("click",event=>{
  const tab=event.target.closest("[data-source-id]");
  if(tab)selectSource(tab.dataset.sourceId);
});

E.list.addEventListener("click",event=>{
  const empty=event.target.closest("#empty-add-track");
  if(empty){openTrackModal();return;}

  const fav=event.target.closest("[data-favorite-index]");
  if(fav){event.stopPropagation();toggleFavorite(collection()[Number(fav.dataset.favoriteIndex)]);return;}

  const edit=event.target.closest("[data-edit-index]");
  if(edit){event.stopPropagation();openTrackModal(Number(edit.dataset.editIndex));return;}

  const del=event.target.closest("[data-delete-index]");
  if(del){event.stopPropagation();deleteTrack(Number(del.dataset.deleteIndex));return;}

  const copy=event.target.closest("[data-copy-index]");
  if(copy){event.stopPropagation();openCopyModal(Number(copy.dataset.copyIndex));return;}

  const row=event.target.closest(".track-row");
  if(row)playTrackAt(Number(row.dataset.index),true);
});

E.settingsSources.addEventListener("click",event=>{
  const edit=event.target.closest("[data-settings-edit-source]");
  if(edit){event.stopPropagation();openSourceModal(edit.dataset.settingsEditSource);return;}
  const del=event.target.closest("[data-settings-delete-source]");
  if(del){event.stopPropagation();deleteSource(del.dataset.settingsDeleteSource);}
});

document.querySelectorAll("[data-close-modal]").forEach(button=>{
  button.addEventListener("click",()=>document.getElementById(button.dataset.closeModal)?.close());
});

document.addEventListener("keydown",event=>{
  if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement.tagName))return;
  if(event.code==="Space"){event.preventDefault();togglePlay();}
  if(event.key==="ArrowRight")playNext(false);
  if(event.key==="ArrowLeft")playPrevious();
  if(event.key.toLowerCase()==="m")E.mute.click();
});

E.wave.innerHTML=Array.from({length:34},(_,i)=>'<span style="--h:'+(8+(i*13)%17)+'px"></span>').join("");

function currentVolume(){return Math.max(0,Math.min(100,Number(E.volume.value||80)));}

function applyVolume(value){
  const volume=Math.max(0,Math.min(100,Number(value)));
  E.volume.value=String(volume);
  localStorage.setItem(KEYS.volume,String(volume));
  if(widget)widget.setVolume(volume);
  E.audio.volume=volume/100;
}

ensureData();
themeInit();
E.volume.value=localStorage.getItem(KEYS.volume)||"80";
applyVolume(E.volume.value);
applyConfig();
setupSoundCloud();
loadView();
