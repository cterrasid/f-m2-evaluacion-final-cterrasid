'use strict';
//VARIABLES
const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');

const ulListEl = document.querySelector('.result-list');
const ulFavEl = document.querySelector('.favorites-list');

const urlSearch = 'http://api.tvmaze.com/search/shows?q=';

let favShows = [];

// loadPage();

//SUPPORT FUNCTIONS
const createEl = a => { return document.createElement(a); };
const appendEl = (el, a) => { return el.appendChild(a); };
const setAttr = (el, att, val) => { return el.setAttribute(att, val); };

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
        const imgUrlAlt = `https://via.placeholder.com/210x295/afeeee/888888/?text=${title}`;
        (imgUrl) ? imgUrl = imgUrl.medium : imgUrl = imgUrlAlt;
        const liEl = createEl('li');
        const imgEl = createEl('img');
        const titleEl = createEl('h3');
        if (imgUrl) {
          setAttr(imgEl, 'src', imgUrl);
        } else {
          setAttr(imgEl, 'src', imgUrlAlt);
        }
        titleEl.append(title);
        appendEl(liEl, imgEl);
        appendEl(liEl, titleEl);
        appendEl(ulListEl, liEl);

        liEl.addEventListener('click', handleListClick);
      }

    });
}

//FAVOUTITE SHOWS
function handleListClick() {

  (this.click) ? this.classList.add('fav') : this.classList.remove('fav');

  let copyLiEl = this.cloneNode(true);
  ulFavEl.append(copyLiEl);
  setAttr(copyLiEl, 'class', 'fav');

  favShows.push(this.innerHTML);
  localStorage.setItem('favorite', JSON.stringify(favShows));

  this.removeEventListener('click', handleListClick);
  copyLiEl.removeEventListener('click', handleListClick);

}

// function loadPage() {
//     if (favShows !== []) {
//         const cacheEl = localStorage.getItem('favorite');
//         favShows.push(cacheEl);
//     }
// }