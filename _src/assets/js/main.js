'use strict';

const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');
const ulListEl = document.querySelector('.result-list');
const ulFavEl = document.querySelector('.favorites-list');
const urlSearch = 'http://api.tvmaze.com/search/shows?q=';

//LISTENER
buttonEl.addEventListener('click', handleButtonClick);
ulListEl.addEventListener('focus', handleListFocus); //PENDIENTE

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
        const imgUrlAlt = `https://via.placeholder.com/210x295/ffffff/666666/?text=${title}`;
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
        //añado contenido dentro del titulo, li y ul
        titleEl.append(title);
        appendEl(liEl, imgEl);
        appendEl(liEl, titleEl);
        appendEl(ulListEl,liEl);
      }
    });
}

//FAVORITE SHOWS

// Crear un listado (array) con las series favoritas que almacenamos en una variable.
const favShows = [];

//Para ello, al hacer clic sobre un resultado el color de fondo y el de fuente se intercambian.
function handleListFocus() {
  //cuando selecciono un elemento se le agrega una clase fav
  const favEl = titleEl.classList.add('fav');
  //cuando tiene la clase fav, añado al elemento en favShows[]
  favShows.push(favEl);
}

// Este listado lo mostraremos en la parte izquierda de la pantalla, debajo del formulario de búqueda.
// Para terminar, si volvemos a realizar una nueva búsqueda, los favoritos se irán acumulando en nuestra lista.

//LOCAL STORAGE
//Rastreo un evento sobre el documento (estoy pendiente de que se cargue la pagina)
//document.onload = loadPage();