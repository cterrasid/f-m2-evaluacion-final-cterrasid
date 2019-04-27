'use strict';
//VARIABLES
const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');

const ulListEl = document.querySelector('.result-list');
const ulFavEl = document.querySelector('.favorites-list');

const urlSearch = 'http://api.tvmaze.com/search/shows?q=';

let favShows = [];
handleLoadPage();
//SUPPORT FUNCTIONS
//createElemente, appendChild, set Attibute, classList
const createEl = a => { return document.createElement(a); };
const appendEl = (el, a) => { return el.appendChild(a); };
const setAttr = (el, att, val) => { return el.setAttribute(att, val); };
const addRemoveClass = (classA, classB, el) => { el.classList.add(classA); el.classList.remove(classB); };

//EVENT: REQUEST - CLICK
buttonEl.addEventListener('click', handleButtonClick);
function handleButtonClick() {
  ulListEl.innerHTML = '';
  const inputValue = inputEl.value;
  const urlResult = urlSearch + inputValue;

  fetch(urlResult)
    .then(response => response.json())
    .then(data => {
      for (let index = 0; index < data.length; index++) {

        const title = data[index].show.name;
        let imgUrl = data[index].show.image;
        const imgUrlAlt = `https://via.placeholder.com/210x295/ffffff/888888/?text=${title}`;
        (imgUrl) ? imgUrl = imgUrl.medium : imgUrl = imgUrlAlt;

        const liEl = createEl('li');
        const imgEl = createEl('img');
        const titleEl = createEl('h3');

        if (imgUrl) {
          setAttr(imgEl, 'src', imgUrl);
        } else {
          setAttr(imgEl, 'src', imgUrlAlt);
        }
        liEl.classList.add('list-result');
        titleEl.append(title);
        appendEl(liEl, imgEl);
        appendEl(liEl, titleEl);
        appendEl(ulListEl, liEl);

        liEl.addEventListener('click', handleListClick);
      }
      
    });
  }
  
//FAVOURITE SHOWS
function handleListClick() {


  let copyLiEl = this.cloneNode(true);
  ulFavEl.append(copyLiEl);
  const favEl = addRemoveClass('fav', 'list-result', copyLiEl);


  favShows.push(copyLiEl.innerHTML);
  localStorage.setItem('favorite', JSON.stringify(favShows));

  this.removeEventListener('click', handleListClick);
}

//cada vez que cargue la pagina
function handleLoadPage() {
  const cache = JSON.parse(localStorage.getItem('favorite'));
  const cacheConcat = favShows.concat(cache);
  const newCache = favShows.push(cacheConcat);
  for (let index = 0; index < newCache.length; index++) {
    createEl('p'); 
  }
  console.log(newCache);
}
document.addEventListener('load', handleLoadPage);