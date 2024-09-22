const songs = [
  {
    name: 'Madonna - Like a prayer',
    src: './assets/Madonna – Like a Prayer.mp3',
    img: './assets/Madonna_cover.png'
  },
  {
    name: 'alt-J - In Cold Blood',
    src: './assets/alt-j-in-cold-blood.mp3',
    img: './assets/In_Cold_Blood_alt-J.jpg'
  },
  {
    name: 'Foster the People - Pumped Up Kicks',
    src: './assets/foster-the-people-pumped-up-kicks.mp3',
    img: './assets/PumpedUpKicks.jpg'
  },
  {
    name: 'Валерий Меладзе - Говновоз',
    src: './assets/Валерий Меладзе - Говновоз.mp3',
    img: './assets/ValeryGovno.png'
  }
];


const playBtn = document.querySelector('.playButton');
const pauseBtn = document.querySelector('.pauseButton');
const prev = document.querySelector('.prevButton');
const next = document.querySelector('.nextButton');
const progressBar = document.querySelector('.progress');
const bar = document.querySelector('.bar');
const duration = document.querySelector('.wholeTime');
const current = document.querySelector('.currentTime');
const picture = document.querySelector('.NPImg');
const text = document.querySelector('.current');
let cover = document.createElement('img');
let songText = document.createElement('p');

var playNum = 0;
let isPlay = false;

let song = songs[playNum];
const audio = new Audio();
console.dir(audio);

function songImage(playNum) {
  song = songs[playNum];
  cover.className = 'img';
  cover.src = song.img;
  picture.appendChild(cover);
}
function songTitle(playNum) {
  song = songs[playNum];
  songText.className = 'currentText';
  songText.textContent = song.name;
  text.appendChild(songText);
}

function playAudio() {
  audio.src = song.src;
  if (!isPlay) {
    pauseBtn.classList.remove('hidden');
    pauseBtn.classList.add('visible');
    playBtn.classList.add('hidden');
    audio.play();
    isPlay = true;
  } else {
    pauseBtn.classList.remove('visible');
    pauseBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');
    audio.pause();
    isPlay = false;
  }
}

audio.addEventListener('timeupdate', progress);

function progress() {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
  let dur = audio.duration;
  let cur = audio.currentTime;
  duration.innerHTML = duration.innerHTML.replace('0:00', getNormalTime(dur));
  current.innerHTML = getNormalTime(cur);
};

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', playAudio);

document.addEventListener('DOMContentLoaded', start);

function start() {
  pauseBtn.classList.add('hidden');
  songImage(playNum);
  songTitle(playNum);
}

function getNormalTime(s) {
  let m = Math.trunc(s / 60) + '';
  s = Math.trunc(s % 60) + '';

  return m.padStart(2, 0) + ':' + s.padStart(2, 0);
}

bar.addEventListener('click', e => {
  const timelineWidth = window.getComputedStyle(bar).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
  audio.currentTime = timeToSeek;
});

function playNext() {
  nextS();
  if (!isPlay) {
    audio.pause();
    pauseBtn.classList.remove('visible');
    pauseBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');

    cover.remove();
    songText.remove();
    songImage(playNum);
    songTitle(playNum);
  } else {
    song = songs[playNum];
    audio.src = song.src;
    audio.play();
    cover.remove();
    songText.remove();
    songImage(playNum);
    songTitle(playNum);
  }
}

function playPrev() {
  prevS();
  if (!isPlay) {
    audio.pause();
    pauseBtn.classList.remove('visible');
    pauseBtn.classList.add('hidden');
    playBtn.classList.remove('hidden');

    cover.remove();
    songText.remove();
    songImage(playNum);
    songTitle(playNum);
  } else {
    song = songs[playNum];
    audio.src = song.src;
    audio.play();
    cover.remove();
    songText.remove();
    songImage(playNum);
    songTitle(playNum);
  }
}

next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);

function nextS() {
  playNum = playNum + 1;
  if (playNum >= songs.length) {
    playNum = 0;
  }
}

function prevS() {
  audio.pause();
  playNum = playNum - 1;
  if (playNum < 0) {
    playNum = songs.length - 1;
  }
}