const api = {
    base: "https://api.lyrics.ovh/"
  }
const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);
let  firstPage = true;
let  SecondPage = false;
const  lyricsInformation = []; 
const list =  document.querySelector('#list')
const row = document.querySelector('.card');
 
  function  screenSelector(){
    
   if(SecondPage == true){
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
        return lyricsData.json();
        
      }).then(displayResults);
  }
  
function displayResults (data) {
 this.lyricsInformation = data.data;
 this.lyricsInformation.forEach((info )=> addLyricsInfoToList(info));
 }

  function getLyrics(event){
     SecondPage = true;
   this.screenSelector();  

}
function addLyricsInfoToList(info){
  console.log(info);
list.innerHTML +=`
<div class="card" style="cursor:pointer" onclick="getLyrics(' ${info.artist.name} ')"

  <div class="container">
  <img src="${info.album.cover_big}" alt="Avatar" style="width:100%">

    <h4><b>${info.artist.name}</b></h4> 
    
        <p>${info.title}</p> 
  </div>
</div>
<br/>
`;

 }

document.addEventListener('DOMContentLoaded',displayResults)

