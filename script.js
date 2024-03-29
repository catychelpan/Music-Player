const volumeBar = document.getElementById("duration-container");
const volumeBarProgress = document.getElementById("volume-progress");
const volumeIconContainer = document.getElementById("volume-img-container");
const volumeIcon = document.getElementById("volume-icon");

const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const currentTimeLabel = document.getElementById("current-time");
const durationLabel = document.getElementById("duration");
const progressBar = document.querySelector(".progress");
const progressContainer = document.getElementById("progress-container");

const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const imageCont = document.querySelector(".img-container");

//Check playing status
let isPlaying = false;

//Song id to switch between songs
let songId = 0;

//volume functionality variables
let currVolume = null;
let isSoundOn = true;


//Music collection
const songs = [
    {
        imgAndSongName: "song-1",
        title: "Take It Or Leave It",
        artist: "Cage The Elephant",
        id: 0,
        
    },
    {
        imgAndSongName: "song-2",
        title: "Diet Mountain Dew",
        artist: "Lana Del Ray",
        id: 1,
        
    },
    {
        imgAndSongName: "song-3",
        title: "Blue",
        artist: "V",
        id: 2,
        
    },
    {
        imgAndSongName: "song-4",
        title: "Sur La Planche 2013",
        artist: "La Femme",
        id: 3,
    }
]




//Play functionality
function playSong() {

    isPlaying = true;
    music.play();

    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
    playBtn.setAttribute("title", "Pause");
    imageCont.classList.remove("img-rotate-back");
    imageCont.classList.add("img-rotate");
   
}

//Pause functionality
function pauseSong() {

    isPlaying = false;
    music.pause();

    playBtn.classList.replace("fa-circle-pause", "fa-circle-play");
    playBtn.setAttribute("title", "Play");
    imageCont.classList.remove("img-rotate");
    imageCont.classList.add("img-rotate-back");

}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));




//Switching between songs 
function switchNextSong() {

    let song = null;

    if (songId < songs.length - 1){
        songId++;
    } else {
        songId = 0;
    } 

    song = findSongById();

    if (song !== null) {
        loadSong(song);
    }


}


function switchPrevSong() {

    let song = null;

    if (songId > 0){
        songId--;
    } else {
        songId = songs.length - 1;
    } 

    song = findSongById();

    if (song !== null) {
        loadSong(song);
    }

    
}

prevBtn.addEventListener("click", switchPrevSong);
nextBtn.addEventListener("click", switchNextSong);




function findSongById() {
    
    let song = null;

    songs.forEach((songItem) => {
        if (songItem.id === songId) {
            song = songItem;
    
        }
    })

    return song;

}

//Update Song info in DOM
function loadSong(song) {

    songId = song.id;
    title.innerText = song.title;
    artist.innerText = song.artist;
    image.setAttribute("src", `img/${song.imgAndSongName}.png`);
    music.setAttribute("src", `music/${song.imgAndSongName}.mp3`);

    playSong();


}



//Update Progress and time labels
function updateProgressBar(e) {
    if (isPlaying) {

        const {duration,currentTime} = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        
        progressBar.style.width = `${progressPercent}%`;

        //Calculate duration display

        const durationMin = Math.floor(duration / 60);
        let durationSec =  Math.floor(duration % 60).toString().padStart(2,'0');

        //Delay switching the duration label to avoid NaN

        if (durationSec != "NaN") {
            durationLabel.textContent = `${durationMin}:${durationSec}`;
        }

        //Calculate current time display

        const curMin = Math.floor(currentTime / 60);
        let curSec =  Math.floor(currentTime % 60).toString().padStart(2,'0');

        if (curSec != "NaN") {
            currentTimeLabel.textContent = `${curMin}:${curSec}`;
        }


         
    }

}

music.addEventListener("timeupdate", updateProgressBar);



function setProgressBar(e) {

    console.log(e);
    console.log(this);
    const progressInitWidth = this.clientWidth;
    const clickedArea = e.offsetX;

    const {duration} = music;

    music.currentTime = (clickedArea / progressInitWidth) * duration;
    playSong();

    

}

progressContainer.addEventListener("click", setProgressBar);



function finishSong() {
    setTimeout(switchNextSong,1000);
}

music.addEventListener("ended", finishSong);





//Changing the volume of the music
function changeVolume(e) {


    const volumeInitWidth = this.clientWidth;
    const clickedArea = e.offsetX;

    const volumePercent = (clickedArea / volumeInitWidth);
    currVolume = volumePercent;

    volumeBarProgress.style.width = `${volumePercent * 100}%`;
    music.volume = volumePercent;

}

volumeBar.addEventListener("click", changeVolume);



//Turn music on and off
function turnMusicOn() {

    isSoundOn = true;
    volumeIcon.classList.replace("fa-volume-off", "fa-volume-high")
    music.volume = currVolume;
    volumeBarProgress.style.width = `${currVolume * 100}%` ;

}


function turnMusicOff() {

    isSoundOn = false;
    volumeIcon.classList.replace("fa-volume-high", "fa-volume-off")
    music.volume = 0.0;
    volumeBarProgress.style.width = "0%";

    

}

volumeIconContainer.addEventListener("click", () => {isSoundOn ? turnMusicOff() : turnMusicOn() });

