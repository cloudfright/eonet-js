


async function fetchCategoriesAsync() {
    let response = await fetch('https://eonet.sci.gsfc.nasa.gov/api/v3/categories')
    let data = await response.json()

    console.log('waiting');
    let categories = document.querySelector('#categories')
    console.log(categories);
    categories.replaceChildren()

    for (const cateogry of data.categories) {
        let row = document.createElement('div');
        row.className = "row p-3 bg-light border"
        
        let title = document.createElement('div');
        title.className = "col-sm-4 fw-bold"
        title.textContent = cateogry.title
        row.appendChild(title)
        
        let desc = document.createElement('div');
        desc.className = "col-sm-8 text-muted"
        desc.textContent = cateogry.description
        row.appendChild(desc)
        
        categories.appendChild(row)
    }
}

