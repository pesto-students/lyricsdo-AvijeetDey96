const api = {
    base: "https://api.lyrics.ovh/"
  }
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
let  firstPage = true;
let  SecondPage = false;
let   lyricsInformation = []; 
let  lyrics = '';
const list =  document.querySelector('#list')
let dispalyLyrics =  document.querySelector('#dispalyLyrics')

const row = document.querySelector('.card');
screenSelector();
  function  screenSelector(){
    
   if(SecondPage == true && firstPage == false){
    document.querySelector('.container').style.display = "none";
    document.querySelector('.lyrics').style.display = "block";
  }
  else{
    document.querySelector('.container').style.display = "block";
    document.querySelector('.lyrics').style.display = "none";
  }
}
function setQuery(evt) {
  if (evt.keyCode == 13) {
     getResults(searchbox.value);
  }
}
function getResults (query) {
    fetch(`${api.base}suggest/${query}`, {mode: 'cors'})
      .then(lyricsData => {
        lyricsInformation = [];
        document.addEventListener("DOMContentLoaded", getResults);

        return lyricsData.json();
        
      }).then(displayResults);
  }
  
function displayResults (data) {
  if(data.data.length != 0){
  lyricsInformation = data.data;
  document.getElementsByClassName("list").innerHTML = "";
  list.innerHTML = '' 
  lyricsInformation.forEach((info )=> addLyricsInfoToList(info));
 }
 else{
  }

 }

  function getLyrics(name,title){
       fetch(`${api.base}/v1/${name}/${title}`, {mode: 'cors'})  
     .then(lyrics => { 
      return lyrics.json()
     }).then(dispatchLyrics) 
    
}
function dispatchLyrics(data){


if(data.lyrics == ""){
  lyrics ="No Lyrics Found!"
}
else{
  lyrics = data.lyrics;
}
SecondPage = true;
firstPage =false;
screenSelector();
showLyrics(lyrics);
}
function addLyricsInfoToList(info){
  
list.innerHTML +=`
<div class="card col-lg-4 col-md-4 col-sm-6 col-xs-12" style="cursor:pointer" onclick="getLyrics(' ${info.artist.name}' , ' ${info.album.title}')"

  <div class="container card-design">
  <img src="${info.album.cover_medium}" alt="Avatar" >

    <p style="font-size:15px;padding:0;    text-align: center;    font-weight: bold;">${info.artist.name}</p> 
    
        <p style="font-size:15px;padding:0;    text-align: center;  font-weight: bold;  margin-bottom: 5px;">${info.title}</p> 
  </div>
</div>
 
`;

 }
 function showLyrics(lyrics) {
  dispalyLyrics.innerHTML =`
  <div class="container infoText" >
  ${lyrics}
  </div>
  `;
 }
 function BackToHome(){
  SecondPage = false;
  firstPage =true;
  screenSelector();
  document.addEventListener('DOMContentLoaded',displayResults)

 }
 document.addEventListener('DOMContentLoaded',addLyricsInfoToList)

document.addEventListener('DOMContentLoaded',displayResults)

 