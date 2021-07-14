const URL = 'https://pixabay.com/api/';
const KEY = '22463604-709d4d80ecefd06266ae1aa7f';
const PER_PAGE = 12;

export default class ApiService{
 constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
   async fetchImage() {
        const url = `${URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${PER_PAGE}&key=${KEY}`;
       const res = await fetch(url);
       const data = await res.json();
              
       return data.hits   
   };

 incrementPage() {
    this.page += 1;
    };

  resetPage() {
    this.page = 1;
    };

    get query() {
    return this.searchQuery;
    };

  set query(newQuery) {
    this.searchQuery = newQuery;
    };
    
}