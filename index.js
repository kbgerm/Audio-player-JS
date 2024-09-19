const playBtn = document.querySelector('.playButton');
const pauseBtn = document.querySelector('.pauseButton');
let isPlay = false;
const progressBar = document.querySelector('.progress');
const duration = document.querySelector('.wholeTime');
const current = document.querySelector('.currenTime');

const audio = new Audio('./assets/Madonna – Like a Prayer.mp3');

console.dir(audio);

function playAudio() {
  audio.currentTime = 0;
  if (!isPlay) {
    // audio.src = './assets/Madonna – Like a Prayer.mp3';
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
  current.innerHTML
};

playBtn.addEventListener('click', playAudio);
pauseBtn.addEventListener('click', playAudio);

document.addEventListener('DOMContentLoaded', start);

function start() {
  pauseBtn.classList.add('hidden');

}