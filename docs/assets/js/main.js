"use strict";const inputEl=document.querySelector(".searcher-input"),buttonEl=document.querySelector(".searcher-btn"),ulListEl=document.querySelector(".result-list"),ulFavEl=document.querySelector(".favorites-list"),urlSearch="http://api.tvmaze.com/search/shows?q=";let favShows=[];buttonEl.addEventListener("click",handleButtonClick);const createEl=e=>document.createElement(e),appendEl=(e,t)=>e.appendChild(t),setAttr=(e,t,l)=>e.setAttribute(t,l);function handleButtonClick(){ulListEl.innerHTML="";const e=inputEl.value;fetch(urlSearch+e).then(e=>e.json()).then(e=>{for(let t=0;t<e.length;t++){const l=e[t].show.name;let s=e[t].show.image;const n=`https://via.placeholder.com/210x295/afeeee/888888/?text=${l}`;s=s?s.medium:n;const c=createEl("li"),i=createEl("img"),a=createEl("h3");setAttr(i,"src",s||n),a.append(l),appendEl(c,i),appendEl(c,a),appendEl(ulListEl,c),c.addEventListener("click",handleListClick)}})}function handleListClick(){this.click?this.classList.add("fav"):this.classList.remove("fav");let e=this.cloneNode(!0);ulFavEl.append(e),setAttr(e,"class","fav"),favShows.push(this.innerHTML),localStorage.setItem("favorite",JSON.stringify(favShows)),this.removeEventListener("click",handleListClick),e.removeEventListener("click",handleListClick)}