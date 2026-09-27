// قائمة الأغاني الافتراضية
const tracks = [
  {
    title: "",
    artist: "",
    art: "",
    src: ""
  },
  {
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    art: "",
    src: ""
  },
  {
    title: "",
    artist: "",
    art: "",
    src: ""
  },
  {
    title: "",
    artist: "",
    art: "",
    src: ""
  },
  {
    title: "Acoustic Breeze",
    artist: "Benjamin Tissot",
    art: "",
    src: ""
  },
  {
    title: "",
    artist: "",
    art: "",
    src: ""
  }
];

// عناصر الـ DOM
const audio = new Audio();
let trackIndex = 0;
let isPlaying = false;

const trackArt = document.getElementById("track-art");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");

const playPauseBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const totalDurationEl = document.getElementById("total-duration");
const volumeBar = document.getElementById("volume-bar");
const playlistList = document.getElementById("playlist-list");

// 1. تحميل التراك وتحديث البيانات
function loadTrack(index) {
  trackIndex = index;
  const current = tracks[trackIndex];

  audio.src = current.src;
  trackTitle.innerText = current.title;
  trackArtist.innerText = current.artist;
  trackArt.src = current.art;

  progressBar.value = 0;
  currentTimeEl.innerText = "0:00";
  totalDurationEl.innerText = "0:00";

  updatePlaylistHighlight();
}

// 2. التحكم بالتشغيل والإيقاف المؤقت
function playTrack() {
  isPlaying = true;
  audio.play();
  playIcon.classList.remove("fa-play");
  playIcon.classList.add("fa-pause");
  trackArt.style.transform = "scale(1.05)";
}

function pauseTrack() {
  isPlaying = false;
  audio.pause();
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  trackArt.style.transform = "scale(1)";
}

function togglePlay() {
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
}

// 3. التنقل بين الأغاني
function prevTrack() {
  trackIndex = (trackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(trackIndex);
  if (isPlaying) playTrack();
}

function nextTrack() {
  trackIndex = (trackIndex + 1) % tracks.length;
  loadTrack(trackIndex);
  if (isPlaying) playTrack();
}

// 4. معالجة الوقت وشريط التقدم (Seek Bar)
audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progressPercent;

    currentTimeEl.innerText = formatTime(audio.currentTime);
    totalDurationEl.innerText = formatTime(audio.duration);
  }
});

progressBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
  }
});

// 5. التحكم بالصوت
volumeBar.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

// 6. التشغيل التلقائي عند انتهاء المقطع (Autoplay Bonus)
audio.addEventListener("ended", () => {
  nextTrack();
  playTrack();
});

// 7. بناء قائمة التشغيل (Playlist Bonus)
function buildPlaylist() {
  playlistList.innerHTML = "";
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${track.title}</span><small>${track.artist}</small>`;
    li.addEventListener("click", () => {
      loadTrack(index);
      playTrack();
    });
    playlistList.appendChild(li);
  });
}

function updatePlaylistHighlight() {
  const items = playlistList.querySelectorAll("li");
  items.forEach((item, idx) => {
    item.classList.toggle("active-track", idx === trackIndex);
  });
}

// دالة تنسيق الثواني (دقيقة:ثانية)
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// تشغيل الأحداث والتهيئة الأولية
playPauseBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevTrack);
nextBtn.addEventListener("click", nextTrack);

document.addEventListener("DOMContentLoaded", () => {
  buildPlaylist();
  loadTrack(0);
});