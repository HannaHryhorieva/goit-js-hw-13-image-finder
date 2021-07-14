import './sass/main.scss';
import searchInput from './templates/searchInput.hbs';
import gallery from './templates/gallery.hbs';
import photoCard from './templates/photoCard.hbs';
import button from './templates/button.hbs';

import ApiService from './apiService.js';


var debounce = require('lodash.debounce');

const body = document.querySelector('body');

body.insertAdjacentHTML('beforeend', searchInput());
body.insertAdjacentHTML('beforeend', gallery());
body.insertAdjacentHTML('beforeend', button())


const galleryMarc = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
const buttonMore = document.querySelector('[data-action="load-more"]');

searchForm.addEventListener('input', debounce(onInput, 1000));
buttonMore.addEventListener('click', onLoadMore);

const apiService = new ApiService;

function onInput(e) {
    e.preventDefault();
    apiService.query = e.target.value;
    apiService.resetPage()
    
    galleryMarc.innerHTML = '';
        
    apiService.fetchImage().then(hits => {
        const photoMarc = photoCard(hits);
        return galleryMarc.insertAdjacentHTML('beforeend', photoMarc);
    }).finally(() => {
            if (apiService.query === '') {
       galleryMarc.innerHTML = '';  
    };
    });
    
};

function onLoadMore(e) {
    e.preventDefault();
    apiService.incrementPage();
    apiService.fetchImage().then(hits => {
        const photoMarc = photoCard(hits);
        galleryMarc.insertAdjacentHTML('beforeend', photoMarc);
    }).then(() => {
      return buttonMore.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
     }); 
        });
};




