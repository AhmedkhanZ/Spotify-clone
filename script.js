console.log("Welcome to Spotify")

//Initialize Variables
let songIndex = 0; //song-number
let audio = new Audio('./songs/1.mp3'); //object of Audio-class
let masterPlay = document.getElementById('masterPlay'); //getting and naming of play-button
let myProgressBar = document.getElementById('myProgressBar'); //getting and naming of progress-bar
let gif = document.getElementById('gif'); 
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSong = document.getElementById('masterSong');


let songs = [
    {songName: "Warriyo-Mortals (feat, Laura Brehm) [NCS Release]", filepath:"./songs/1.mp3", coverpath: "./covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filepath:"./songs/2.mp3", coverpath: "./covers/2.jpg"},
    {songName: "Salam-e-Ishq", filepath:"./songs/3.mp3", coverpath: "./covers/3.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filepath:"./songs/4.mp3", coverpath: "./covers/4.jpg"},
    {songName: "Different - Heaven Hide", filepath:"./songs/5.mp3", coverpath: "./covers/5.jpg"},
    {songName: "Janji-Heroes-Tonight-feat", filepath:"./songs/6.mp3", coverpath: "./covers/6.jpg"},
    {songName: "Rabba-Salam-e-Ishq", filepath:"./songs/7.mp3", coverpath: "./covers/7.jpg"},
    {songName: "Sakhiyan Bhule-dhena", filepath:"./songs/8.mp3", coverpath: "./covers/8.jpg"},
    {songName: "Tumhari Kasam-salam-e-Ishq", filepath:"./songs/9.mp3", coverpath: "./covers/9.jpg"},
    {songName: "Kros - Held [30k]", filepath:"./songs/10.mp3", coverpath: "./covers/10.jpg"},
]

// audioElement.play();

songItems.forEach((element,i)=>{
    element.style.fontFamily =  'Ubuntu';
   element.getElementsByTagName('img')[0].src=songs[i].coverpath;
   element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
   gif.style.opacity=0;
})


const makeAllPauseSymbols = ()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove("fa-pause-circle");
    element.classList.add("fa-play-circle");
    audio.pause();
});
}

//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
        
    }
    else{
        audio.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
        makeAllPauseSymbols();
    }
})

//Listen to Event of change/update of song-time
audio.addEventListener('timeupdate', (e)=>{
    console.log("timeupdated");
    //Update Seekbar
    progress =parseInt((audio.currentTime/audio.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('click',()=>{
    audio.currentTime=parseInt((audio.duration*myProgressBar.value)/100);
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
            element.classList.add("fa-play-circle");
            
    });
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
    songIndex = parseInt(e.target.id);
    makeAllPlays();
    e.target.classList.remove("fa-play-circle");
    e.target.classList.add("fa-pause-circle");
    audio.src = `./songs/${songIndex +1}.mp3`;
    masterSong.innerText = songs[songIndex].songName;
    audio.currentTime=0;
    audio.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
})
});

document.getElementById('forward').addEventListener('click',()=>{
  if(songIndex>=9){
    songIndex =0 ;
  }
  else{
    songIndex += 1;
  }
  audio.src = `./songs/${songIndex +1}.mp3`;
  masterSong.innerText = songs[songIndex].songName;
  audio.currentTime=0;
  audio.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
})

document.getElementById('previous').addEventListener('click',()=>{
  if(songIndex<=0){
    songIndex = 0;
  }
  else{
    songIndex -= 1;
  }
  audio.src = `./songs/${songIndex +1}.mp3`;
  masterSong.innerText = songs[songIndex].songName;
  audio.currentTime=0;
  audio.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
})