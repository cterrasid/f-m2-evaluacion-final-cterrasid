'use strict';

const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');

const ulListEl = document.querySelector('.result-list');
const ulFavEl = document.querySelector('.favorites-list');
const urlSearch = 'http://api.tvmaze.com/search/shows?q=';

let favShows = [];

//LISTENER
buttonEl.addEventListener('click', handleButtonClick);

//funcion para crear elementos
const createEl = a => {return document.createElement(a);};
//funcion para crear elementos
const appendEl = (el, a) => {return el.appendChild(a);};
//funcion para añadir atributos
const setAttr = (el, att, val) => {return el.setAttribute(att, val);};


//HANDLER BUTTON
function handleButtonClick() {
  //Establezco una condicion de 'vacio' inicial
  ulListEl.innerHTML = '';
  //Al hacer click el valor del input se incorpora a la url
  const inputValue = inputEl.value;
  const urlResult = urlSearch + inputValue;

  fetch(urlResult)
    .then(response => response.json())
    .then(data => {
      //bucle horrible
      for (let index = 0; index < data.length; index++) {
        const title = data[index].show.name;
        //Si existe imgUrl, muestra la medium, si no, la alternativa
        let imgUrl = data[index].show.image;
        const imgUrlAlt = `https://via.placeholder.com/210x295/afeeee/888888/?text=${title}`;
        (imgUrl) ? imgUrl = imgUrl.medium : imgUrl = imgUrlAlt;
        //creo li, img y title
        const liEl = createEl('li');
        const imgEl = createEl('img');
        const titleEl = createEl('h3');
        //añado el src y la url de la imagen
        if (imgUrl) {
          setAttr(imgEl, 'src', imgUrl);
        } else {
          setAttr(imgEl, 'src', imgUrlAlt);
        }
        //añado una clase a los li
        liEl.classList.add('list-result');
        //añado contenido dentro del titulo, li y ul
        titleEl.append(title);
        appendEl(liEl, imgEl);
        appendEl(liEl, titleEl);
        appendEl(ulListEl,liEl);

        //PUEDO LLAMAR ELEMENTOS DESDE AFUERA CON UN LISTENER ADENTRO
        liEl.addEventListener('click', handleListClick);
      }

    });
}

//handler sobre los list
function handleListClick() {
//cuando hago click
//creo una copia de lo que tengo en LiEl(this)
const copyLiEl = this.cloneNode(true);
//meto el copyliEl(this) en la lista de favoritos
  ulFavEl.append(copyLiEl);  
  //ulFavEl.append(this);
  //tambien meto su contenido en el array favShows
  favShows.push(this.innerHTML);
  //meto los elementos dentro del LS
  localStorage.setItem('fav', JSON.stringify(favShows));
  //añado la clase .fav a li
//   if (ulFavEl.append(this)) {
//     this.classList.add('fav');
//   }
const ulFavValue = ulFavEl.innerHTML;
console.log(ulFavValue);
const liFav = ulFavValue.querySelectorAll('li');
console.log(liFav);



  //le quito el evento para que no se agregue 453468 veces
  this.removeEventListener('click', handleListClick);
  copyLiEl.removeEventListener('click', handleListClick);

}