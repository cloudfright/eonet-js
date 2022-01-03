import { fetchCategoriesAsync } from '../modules/categories.js';

window.addEventListener('load', (event) => {
    fetchCategoriesAsync();
});