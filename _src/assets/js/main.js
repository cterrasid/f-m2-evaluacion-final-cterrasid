'use strict';

const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');
const urlSearch = 'http://api.tvmaze.com/search/shows?q=';

buttonEl.addEventListener('click', handleButtonClick);

function handleButtonClick() {
  //Al hacer click el valor del input se incorpora a la url
  const inputValue = inputEl.value;
  const urlResult = urlSearch + inputValue;

  fetch(urlResult)
    .then(response => response.json())
    .then(data => {
        //bucle horrible
      for (let index = 0; index < data.length; index++) {
        // const infoResult = data[index];
        let imgUrl = data[index].show.image.medium;
        let title = data[index].show.name;
        let ulListEl = document.querySelector('.result-list');
        //creo un li en cada iteracion
        const liEl = document.createElement('li');
        //creo un img en cada iteracion
        const imgEl = document.createElement('img');
        //creo un titulo en cada iteracion
        const titleEl = document.createElement('h3');
        //meto el img en el li
        liEl.appendChild(imgEl);
        //meto el titulo en el li
        liEl.appendChild(titleEl);
        //meto el li en ul
        ulListEl.appendChild(liEl);



      }


    });

}
