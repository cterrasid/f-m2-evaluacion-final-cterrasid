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
        let imgUrl = data[index].show.image.medium;
        let title = data[index].show.name;
        const imgUrlAlt = `https://via.placeholder.com/210x295/ffffff/666666/?text=${title}`;
        //creo un li en cada iteracion
        //const liEl = document.createElement('li');
        const liEl = createEl('li');
        const imgEl = createEl('img');
        const titleEl = createEl('h3');
        //creo un img en cada iteracion
        //const imgEl = document.createElement('img');
        //añado el src y la url de la imagen
        if (imgUrl) {setAttr(imgEl, 'src', imgUrl);
          //imgEl.setAttribute('src', imgUrl);
        } else {setAttr(imgEl, 'src', imgUrlAlt);
          //imgEl.setAttribute('src', imgUrlAlt);            
        }
        //creo un titulo en cada iteracion
        //const titleEl = document.createElement('h3');
        //añado contenido dentro del titulo
        titleEl.append(title);
        appendEl(liEl, imgEl);
        appendEl(liEl, titleEl);
        appendEl(ulListEl,liEl);
        //meto el img en el li
        //liEl.appendChild(imgEl);
        //meto el titulo en el li
        //liEl.appendChild(titleEl);
        //meto el li en ul
        //ulListEl.appendChild(liEl);
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