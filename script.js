const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const faviconTag = document.getElementById('faviconTag');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


const songs = ['acousticbreeze', 'anewbeginning' , 'buddy' , 'creativeminds' , 'cute' , 'epic' , 'goinghigher' , 'happyrock' , 'hey' , 'jazzyfrenchy' , 'littleidea' , 'summer' , 'memories' , 'ukulele']

let songIndex = Math.floor(Math.random() * songs.length);

loadSong(songs[songIndex])

function loadSong(song) {
    title.innerText = song;
    audio.src = `audio/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
} 

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    faviconTag.href = "/favicons/musicon.jpg";
    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    faviconTag.href = "/favicons/musicpause.jpg";
    audio.pause();
}

function prevsong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songs.length-1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextsong() {
    songIndex++;
    if(songIndex > songs.length-1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration , currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click' , () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    }

    else {
        playSong();
    }
})

prevBtn.addEventListener('click' , prevsong);
nextBtn.addEventListener('click' , nextsong);


audio.addEventListener('timeupdate' , updateProgress);

progressContainer.addEventListener('click' , setProgress);

audio.addEventListener('ended' , nextsong);