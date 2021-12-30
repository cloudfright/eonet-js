
import { EONET_BASE_URL } from '../modules/common.js';

// fetch and render data for home page
async function fetchCategoriesAsync() {

    'use strict';
    let spinner = document.getElementById("spinner");
    spinner.style.visibility = 'visible';
  
    //let response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/categories');
    let response = await fetch(EONET_BASE_URL + '/categories');
    
    let data = await response.json();
  
    let categories = document.querySelector('#categories');
    categories.replaceChildren();
  
    for (const cateogry of data.categories) {
      let row = document.createElement('div');
      row.className = "row p-3 bg-light border";
      row.setAttribute('role', 'row');
  
      let title = document.createElement('div');
      title.className = "col-sm-4 fw-bold";
      title.textContent = cateogry.title;
      title.tabIndex = 0;
      title.setAttribute('role', 'cell');
      row.appendChild(title);
  
      let desc = document.createElement('div');
      desc.className = "col-sm-8 text-muted";
      desc.textContent = cateogry.description;
      desc.tabIndex = 0;
      desc.setAttribute('role', 'cell');
      row.appendChild(desc);
  
      categories.appendChild(row);
    }
    spinner.style.visibility = 'hidden';
  }
  
  export { fetchCategoriesAsync };