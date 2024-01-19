const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const imageCont = document.querySelector(".img-container");

//Check playing status

let isPlaying = false;


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