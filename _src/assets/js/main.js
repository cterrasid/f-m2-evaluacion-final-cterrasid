'use strict';

const inputEl = document.querySelector('.searcher-input');
const buttonEl = document.querySelector('.searcher-btn');
const unListEl = document.querySelector('.result-list');
const urlSearch = 'http://api.tvmaze.com/search/shows?q=';
//const urlBase = 'http://www.tvmaze.com/api#search';

buttonEl.addEventListener('click', handleButtonClick);

function handleButtonClick() {
    //Al hacer click el valor del input se incorpora a la url
    const inputValue = inputEl.value;
    const urlResult = urlSearch + inputValue;

    fetch(urlResult)
        .then(response => response.json())
        .then(show => {
            //muestrame los resultados
            //const infoResult = data.show;
            //con cada iteracion me buscas la imagen y el nombre del show
            for (let i = 0; i < show.length; i++) {
                const imageShow = show[i].image;
                const nameShow = show[i].name;
                
                
            }

            });

        }
