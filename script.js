const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const imageCont = document.querySelector(".img-container");

//Check playing status
let isPlaying = false;

//Song id to switch between songs
let songId = 0;



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

    //check if switch was while playing time or stop time
    if (isPlaying) {
        music.play();
    }else {
        music.pause();
    }

}