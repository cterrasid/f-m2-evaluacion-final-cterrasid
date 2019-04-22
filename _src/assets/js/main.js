'use strict';

const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');
const ulListEl = document.querySelector('.result-list');
const urlSearch = 'http://api.tvmaze.com/search/shows?q=';

//LISTENER
buttonEl.addEventListener('click', handleButtonClick);

//funcion para crear elementos
const createEl = a => {return document.createElement(a);};
//funcion para crear elementos
const appendEl = (el, a) => {return el.appendChild(a);};
//funcion para añadir atributos
const setAttr = (el, att, val) => {return el.setAttribute(att, val);};


//HANDLER
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
        const imgUrl = data[index].show.image.medium;
        const title = data[index].show.name;
        const imgUrlAlt = `https://via.placeholder.com/210x295/ffffff/666666/?text=${title}`;
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
// Una vez aparecen los resultados de búsqueda, podremos indicar cuáles son nuestras series
// favoritas. Para ello, al hacer clic sobre un resultado el color de fondo y el de fuente se
// intercambian.
// Además, debes crear un listado (array) con las series favoritas que almacenamos en una variable.
// Este listado lo mostraremos en la parte izquierda de la pantalla, debajo del formulario de búqueda.
// Para terminar, si volvemos a realizar una nueva búsqueda, los favoritos se irán acumulando en
// nuestra lista.