const PLAYLISTS = {
  mounir: {
    title: "محمد منير",
    icon: "fa-music",
    artist: "محمد منير",
    channel: "https://www.youtube.com/@MounirOfficial",
    color: "#0ea5e9",
    tracks: [
      ["علي صوتك","ali-sotak.mp3"],["الليلة يا سمرا","el-leila-ya-samra.mp3"],["شمندورة","shamandora.mp3"],["أنا بعشق البحر","ana-bashaa-el-bahr.mp3"],["وسط الدايرة","west-el-dayra.mp3"],["علموني عينيكي","allamouni-einiki.mp3"],["لما النسيم","lama-el-naseem.mp3"],["سو يا سو","sow-ya-sow.mp3"],["افتح قلبك","eftah-albak.mp3"],["مدد يا رسول الله","madad-ya-rasoulallah.mp3"],["حارة السقايين","harret-el-saqqayeen.mp3"],["ممكن","momken.mp3"],["باب الجمال","bab-el-gamal.mp3"],["وطن","watan.mp3"],["يا أهل العرب والطرب","ya-ahl-el-arab.mp3"],["الكون كله بيدور","el-koun-kollo.mp3"]
    ]
  },
  wassouf: {
    title: "جورج وسوف",
    icon: "fa-microphone-lines",
    artist: "جورج وسوف",
    channel: "https://www.youtube.com/@GeorgesWassouf",
    color: "#8b5cf6",
    tracks: [
      ["كلام الناس","kalam-el-nas.mp3"],["صابر وراضي","saber-w-rady.mp3"],["خسرت كل الناس","khasert-kol-el-nas.mp3"],["الهوى سلطان","el-hawa-sultan.mp3"],["طبيب جراح","tabib-jarrah.mp3"],["بيحسدوني","be7sedouni.mp3"],["لو نويت","law-nawet.mp3"],["الحب شاطر","el-hob-shater.mp3"],["سهرت الليل","sahert-el-leil.mp3"],["يوم الوداع","yom-el-wadaa.mp3"],["حظي ضاع","hazzi-daa.mp3"],["إرمي الشباك","erme-el-shebak.mp3"],["علم قلبي","allem-albi.mp3"],["ليل العاشقين","leil-el-ashekeen.mp3"],["بتعاتبني على كلمة","betaatabni.mp3"],["أرضى بالنصيب","arda-bel-nasib.mp3"]
    ]
  }
};

const state = {
  playlistId: localStorage.getItem("pavley-playlist") || "mounir",
  index: Number(localStorage.getItem("pavley-index") || 0),
  isPlaying: false,
  shuffle: localStorage.getItem("pavley-shuffle") === "true",
  repeat: localStorage.getItem("pavley-repeat") === "true",
  favorites: JSON.parse(localStorage.getItem("pavley-favorites") || "[]"),
  query: "",
  favoritesOnly: false
};

const audio = new Audio();
audio.preload = "metadata";
audio.volume = Number(localStorage.getItem("pavley-volume") || 0.8);

const localFiles = new Map();
const objectUrls = new Map();

const E = {
  tabs: document.getElementById("playlist-tabs"),
  list: document.getElementById("track-list"),
  title: document.getElementById("playlist-title"),
  count: document.getElementById("track-count"),
  search: document.getElementById("search-input"),
  favFilter: document.getElementById("favorites-filter"),
  nowTitle: document.getElementById("now-title"),
  nowArtist: document.getElementById("now-artist"),
  nowArt: document.getElementById("now-art"),
  initials: document.getElementById("art-initials"),
  favMain: document.getElementById("favorite-main"),
  current: document.getElementById("current-time"),
  duration: document.getElementById("total-duration"),
  progress: document.getElementById("progress"),
  volume: document.getElementById("volume"),
  playBtn: document.getElementById("play-btn"),
  playIcon: document.getElementById("play-icon"),
  shuffle: document.getElementById("shuffle-btn"),
  repeat: document.getElementById("repeat-btn"),
  next: document.getElementById("next-btn"),
  prev: document.getElementById("prev-btn"),
  official: document.getElementById("official-btn"),
  status: document.getElementById("player-status"),
  theme: document.getElementById("theme-btn"),
  clear: document.getElementById("clear-search-btn"),
  source: document.getElementById("source-pill"),
  wave: document.getElementById("waveform"),
  importBtn: document.getElementById("import-files"),
  fileInput: document.getElementById("file-input")
};

const getPlaylist = () => PLAYLISTS[state.playlistId];
const getAllTracks = () => getPlaylist().tracks.map(([title, file]) => ({
  id: `${state.playlistId}-${title}`,
  title,
  artist: getPlaylist().artist,
  file,
  color: getPlaylist().color,
  channel: getPlaylist().channel
}));

function getCurrentTrack() {
  const tracks = getAllTracks();
  state.index = Math.max(0, Math.min(state.index, tracks.length - 1));
  return tracks[state.index];
}

function buildTabs() {
  E.tabs.innerHTML = Object.entries(PLAYLISTS).map(([id, p]) => `
    <button class="playlist-tab ${id === state.playlistId ? "active" : ""}" data-playlist="${id}" type="button">
      <span><i class="fa-solid ${p.icon}" aria-hidden="true"></i>${p.title}</span>
      <small>${p.tracks.length}</small>
    </button>
  `).join("");
}

function visibleTracks() {
  const q = state.query.toLowerCase();
  return getAllTracks().filter(t =>
    (t.title + " " + t.artist).toLowerCase().includes(q) &&
    (!state.favoritesOnly || state.favorites.includes(t.id))
  );
}

function renderList() {
  const list = visibleTracks();
  E.title.textContent = getPlaylist().title;
  E.count.textContent = `${list.length} أغنية`;

  if (!list.length) {
    E.list.innerHTML = '<div class="empty-state"><i class="fa-regular fa-face-frown" aria-hidden="true"></i><strong>مفيش نتائج</strong><p>غير البحث أو اقفل فلتر المفضلة.</p></div>';
    return;
  }

  E.list.innerHTML = list.map(track => {
    const index = getPlaylist().tracks.findIndex(item => item[0] === track.title);
    const favorite = state.favorites.includes(track.id);
    const active = index === state.index;

    return `
      <div class="track-row ${active ? "active" : ""}" data-index="${index}">
        <div class="track-thumb" style="--thumb:${track.color}">${track.title.trim().charAt(0)}</div>
        <div class="track-main">
          <span class="track-title">${track.title}</span>
          <span class="track-artist">${track.artist}</span>
        </div>
        <div class="track-extra">
          <button class="heart-btn ${favorite ? "active" : ""}" data-favorite-id="${track.id}" type="button" aria-label="${favorite ? "إزالة من المفضلة" : "إضافة للمفضلة"}" aria-pressed="${favorite}">
            <i class="${favorite ? "fa-solid" : "fa-regular"} fa-heart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function setCurrentUI(track) {
  E.nowTitle.textContent = track.title;
  E.nowArtist.textContent = track.artist;
  E.source.textContent = localFiles.has(track.file.toLowerCase()) ? "LOCAL FILE" : "LOCAL";
  E.official.href = `${track.channel}/search?query=${encodeURIComponent(track.title)}`;
  E.initials.textContent = track.title.trim().charAt(0) || "م";
  E.nowArt.style.background = `linear-gradient(145deg,${track.color},#071525 72%)`;

  const favorite = state.favorites.includes(track.id);
  E.favMain.classList.toggle("active", favorite);
  E.favMain.setAttribute("aria-pressed", String(favorite));
  E.favMain.innerHTML = `<i class="${favorite ? "fa-solid" : "fa-regular"} fa-heart" aria-hidden="true"></i>`;
}

function updateControls() {
  E.playIcon.className = `fa-solid ${state.isPlaying ? "fa-pause" : "fa-play"}`;
  E.playBtn.setAttribute("aria-label", state.isPlaying ? "إيقاف مؤقت" : "تشغيل");
  E.shuffle.setAttribute("aria-pressed", String(state.shuffle));
  E.repeat.setAttribute("aria-pressed", String(state.repeat));
  E.wave.classList.toggle("playing", state.isPlaying);
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function resolveAudioSrc(track) {
  const local = localFiles.get(track.file.toLowerCase());
  if (local) {
    const key = track.file.toLowerCase();
    if (objectUrls.has(key)) URL.revokeObjectURL(objectUrls.get(key));
    const url = URL.createObjectURL(local);
    objectUrls.set(key, url);
    return { url, source: "LOCAL FILE" };
  }
  return { url: `music/${state.playlistId}/${track.file}`, source: "LOCAL FOLDER" };
}

function hasLocalFile(track) {
  return Boolean(localFiles.get(track.file.toLowerCase()));
}

function loadTrack(index = state.index, autoplay = false) {
  audio.pause();
  state.isPlaying = false;

  state.index = Math.max(0, Math.min(index, getPlaylist().tracks.length - 1));
  const track = getCurrentTrack();

  localStorage.setItem("pavley-playlist", state.playlistId);
  localStorage.setItem("pavley-index", String(state.index));

  const source = resolveAudioSrc(track);
  audio.src = source.url;
  E.source.textContent = source.source;
  E.current.textContent = "0:00";
  E.duration.textContent = "0:00";
  E.progress.value = "0";
  E.status.textContent = "";
  setCurrentUI(track);
  renderList();
  updateControls();

  if (autoplay) playTrack();
}

function requestAudioFile() {
  E.status.textContent = "اختَر ملف الصوت للأغنية الحالية.";
  E.fileInput.value = "";
  E.fileInput.click();
}

async function playTrack() {
  const track = getCurrentTrack();

  if (!hasLocalFile(track) && !audio.src.startsWith("blob:")) {
    requestAudioFile();
    return;
  }

  try {
    await audio.play();
    state.isPlaying = true;
    E.status.textContent = "";
  } catch (error) {
    state.isPlaying = false;
    if (error?.name === "AbortError") return;
    E.status.textContent = "تعذر تشغيل الملف. تأكد أن الملف الصوتي صالح ثم جرّب مرة أخرى.";
  }

  updateControls();
}

function pauseTrack() {
  audio.pause();
  state.isPlaying = false;
  updateControls();
}

function nextTrack() {
  const total = getPlaylist().tracks.length;

  if (state.shuffle && total > 1) {
    let next;
    do next = Math.floor(Math.random() * total);
    while (next === state.index);
    state.index = next;
  } else {
    state.index = (state.index + 1) % total;
  }

  loadTrack(state.index, true);
}

function previousTrack() {
  if (audio.currentTime > 4) {
    audio.currentTime = 0;
    return;
  }

  state.index = (state.index - 1 + getPlaylist().tracks.length) % getPlaylist().tracks.length;
  loadTrack(state.index, state.isPlaying);
}

function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id)
    ? state.favorites.filter(item => item !== id)
    : [...state.favorites, id];

  localStorage.setItem("pavley-favorites", JSON.stringify(state.favorites));
  setCurrentUI(getCurrentTrack());
  renderList();
}

function switchPlaylist(id) {
  if (!PLAYLISTS[id]) return;
  state.playlistId = id;
  state.index = 0;
  state.query = "";
  state.favoritesOnly = false;
  E.search.value = "";
  E.favFilter.setAttribute("aria-pressed", "false");
  buildTabs();
  loadTrack(0);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("pavley-theme", theme);

  const light = theme === "light";
  E.theme.setAttribute("aria-pressed", String(light));
  E.theme.setAttribute("aria-label", light ? "التبديل إلى الوضع الداكن" : "التبديل إلى الوضع الفاتح");
  E.theme.innerHTML = `<i class="fa-solid ${light ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i>`;
}

function updateProgress() {
  if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
  E.progress.value = String(audio.currentTime / audio.duration * 100);
  E.current.textContent = formatTime(audio.currentTime);
  E.duration.textContent = formatTime(audio.duration);
}

E.tabs.addEventListener("click", event => {
  const button = event.target.closest("[data-playlist]");
  if (button) switchPlaylist(button.dataset.playlist);
});

E.importBtn.addEventListener("click", () => E.fileInput.click());

E.fileInput.addEventListener("change", event => {
  const files = [...event.target.files].filter(file => file.type.startsWith("audio/"));
  const track = getCurrentTrack();

  if (!files.length) {
    E.status.textContent = "اختَر ملف صوت صالح.";
    event.target.value = "";
    return;
  }

  if (files.length === 1) {
    localFiles.set(track.file.toLowerCase(), files[0]);
  } else {
    files.forEach(file => localFiles.set(file.name.toLowerCase(), file));
  }

  loadTrack(state.index, false);
  E.status.textContent = `تم تجهيز ${track.title} للتشغيل.`;
  renderList();
  event.target.value = "";

  playTrack();
});

E.list.addEventListener("click", event => {
  const heart = event.target.closest("[data-favorite-id]");
  if (heart) {
    event.stopPropagation();
    toggleFavorite(heart.dataset.favoriteId);
    return;
  }

  const row = event.target.closest(".track-row");
  if (!row) return;

  const index = Number(row.dataset.index);
  loadTrack(index, false);

  if (hasLocalFile(getCurrentTrack())) {
    playTrack();
  } else {
    requestAudioFile();
  }
});

E.search.addEventListener("input", event => {
  state.query = event.target.value.trim();
  renderList();
});

E.favFilter.addEventListener("click", () => {
  state.favoritesOnly = !state.favoritesOnly;
  E.favFilter.setAttribute("aria-pressed", String(state.favoritesOnly));
  renderList();
});

E.clear.addEventListener("click", () => {
  state.query = "";
  state.favoritesOnly = false;
  E.search.value = "";
  E.favFilter.setAttribute("aria-pressed", "false");
  renderList();
});

E.favMain.addEventListener("click", () => toggleFavorite(getCurrentTrack().id));
E.playBtn.addEventListener("click", () => state.isPlaying ? pauseTrack() : playTrack());
E.next.addEventListener("click", nextTrack);
E.prev.addEventListener("click", previousTrack);

E.shuffle.addEventListener("click", () => {
  state.shuffle = !state.shuffle;
  localStorage.setItem("pavley-shuffle", String(state.shuffle));
  updateControls();
});

E.repeat.addEventListener("click", () => {
  state.repeat = !state.repeat;
  localStorage.setItem("pavley-repeat", String(state.repeat));
  updateControls();
});

E.progress.addEventListener("input", () => {
  if (Number.isFinite(audio.duration)) audio.currentTime = Number(E.progress.value) / 100 * audio.duration;
});

E.volume.addEventListener("input", event => {
  audio.volume = Number(event.target.value) / 100;
  localStorage.setItem("pavley-volume", String(audio.volume));
});

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadedmetadata", () => E.duration.textContent = formatTime(audio.duration));
audio.addEventListener("play", () => { state.isPlaying = true; updateControls(); });
audio.addEventListener("pause", () => { state.isPlaying = false; updateControls(); });
audio.addEventListener("ended", () => state.repeat ? (audio.currentTime = 0, playTrack()) : nextTrack());
audio.addEventListener("error", () => {
  state.isPlaying = false;
  E.status.textContent = "ملف الأغنية غير موجود. استخدم زر رفع الملفات لاختيار الملف من جهازك.";
  updateControls();
});

E.theme.addEventListener("click", () => setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light"));

document.addEventListener("keydown", event => {
  if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

  if (event.code === "Space") {
    event.preventDefault();
    state.isPlaying ? pauseTrack() : playTrack();
  }
  if (event.code === "ArrowRight") nextTrack();
  if (event.code === "ArrowLeft") previousTrack();
  if (event.key.toLowerCase() === "m") audio.muted = !audio.muted;
});

window.addEventListener("beforeunload", () => {
  for (const url of objectUrls.values()) URL.revokeObjectURL(url);
});

setTheme(localStorage.getItem("pavley-theme") || "dark");
E.volume.value = String(Math.round(audio.volume * 100));
E.wave.innerHTML = Array.from({length: 34}, (_, i) => `<span style="--h:${8 + (i * 13) % 17}px"></span>`).join("");
buildTabs();
loadTrack(Number.isFinite(state.index) ? state.index : 0);
updateControls();
