import './sass/main.scss';
import searchInput from './templates/searchInput.hbs';
import gallery from './templates/gallery.hbs';
import photoCard from './templates/photoCard.hbs';
import button from './templates/button.hbs';
import ApiService from './apiService.js';

import '@pnotify/core/dist/Angeler.css';
import '@pnotify/core/dist/BrightTheme.css';

const { defaults } = require('@pnotify/core');
const { alert, notice, info, success, error } = require('@pnotify/core');

defaults.closerHover = false;
defaults.delay = 2000;  

var debounce = require('lodash.debounce');

const body = document.querySelector('body');

body.insertAdjacentHTML('beforeend', searchInput());
body.insertAdjacentHTML('beforeend', gallery());
body.insertAdjacentHTML('beforeend', button())


const galleryMarc = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const buttonMore = document.querySelector('[data-action="load-more"]');

searchForm.addEventListener('input', debounce(onInput, 700));
buttonMore.addEventListener('click', onLoadMore);

buttonMore.classList.add('is-hidden');

const apiService = new ApiService;

function onInput(e) {
    e.preventDefault();
    apiService.query = e.target.value;
    apiService.resetPage()
    
    galleryMarc.innerHTML = '';
        
  apiService.fetchImage().then(hits => {
    buttonMore.classList.remove('is-hidden');
    if (hits.length === 0) {
      const myError = error({
        text: "Такого изображения нет, введите что-то понятное!"
      });
      buttonMore.classList.add('is-hidden');
      return myError;
    };
      const photoMarc = photoCard(hits);
      return galleryMarc.insertAdjacentHTML('beforeend', photoMarc);
    }).catch(() => {
         const myError = error({
            text: "Что-то пошло не так!"
         });
      
        return myError;
    }).finally(() => {
            if (apiService.query === '') {
                galleryMarc.innerHTML = '';
                buttonMore.classList.add('is-hidden');
              const myAlert = alert({
                text: "Введите что-то ...",
                type: 'info'
              });
                return myAlert;
    };
    });
    
};


function onLoadMore(e) {
    e.preventDefault();
    apiService.incrementPage();
  apiService.fetchImage().then(hits => {
      if (hits.length === 0) {
        buttonMore.classList.add('is-hidden');
      }
        const photoMarc = photoCard(hits);
        galleryMarc.insertAdjacentHTML('beforeend', photoMarc);
    }).then(() => {
      return buttonMore.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
     }); 
        });
};




