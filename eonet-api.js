
 // This list the id's of the EONET categories 
 const categories = {
  DROUGHT: 'drought',
  DUSTHAZE: 'dustHaze',
  EARTHQUAKES: 'earthquakes',
  FLOODS: 'floods',
  LANDSLIDES: 'landslides',
  MANMADE: 'manmade',
  SEALAKEICE: 'seaLakeIce',
  SERVERSTORMS: 'severeStorms',
  SNOW: 'snow',
  TEMPEXTREMES: 'tempExtremes',
  VOLCANOES: 'volcanoes',
  WATERCOLOUR: 'waterColor',
  WILDFIRES: 'wildfires'
}

// the display name of the EONET categories
const categoryDisplayName = {
  DROUGHT: 'Drought',
  DUSTHAZE: 'Dust Haze',
  EARTHQUAKES: 'Earthquakes',
  FLOODS: 'Floods',
  LANDSLIDES: 'Landslides',
  MANMADE: 'Manmade',
  SEALAKEICE: 'Sea Lake Ice',
  SERVERSTORMS: 'Severe Storms',
  SNOW: 'Snow',
  TEMPEXTREMES: 'Temp Extremes',
  VOLCANOES: 'Volcanoes',
  WATERCOLOUR: 'Water Colour',
  WILDFIRES: 'Wildfires'
}

// fetch and render data for home page 
async function fetchCategoriesAsync() {
    let response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/categories')
    let data = await response.json()

    let categories = document.querySelector('#categories')
    categories.replaceChildren()

    for (const cateogry of data.categories) {
        let row = document.createElement('div');
        row.className = "row p-3 bg-light border"
        row.setAttribute('role', 'row')

        let title = document.createElement('div');
        title.className = "col-sm-4 fw-bold"
        title.textContent = cateogry.title
        title.tabIndex = 0
        title.setAttribute('role', 'cell')
        row.appendChild(title)

        let desc = document.createElement('div');
        desc.className = "col-sm-8 text-muted"
        desc.textContent = cateogry.description
        desc.tabIndex = 0
        desc.setAttribute('role', 'cell')
        row.appendChild(desc)

        categories.appendChild(row)
    }
}


// fetch and render data for the dashboard page
async function fetchDashboardDataAsync() {
    let response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open')
    let data = await response.json()
  
    let eventMap = new Map ([
      [categoryDisplayName.DROUGHT, 0],
      [categoryDisplayName.DUSTHAZE, 0],
      [categoryDisplayName.EARTHQUAKES, 0],
      [categoryDisplayName.FLOODS, 0],
      [categoryDisplayName.LANDSLIDES, 0],
      [categoryDisplayName.MANMADE, 0],
      [categoryDisplayName.SEALAKEICE, 0],
      [categoryDisplayName.SERVERSTORMS, 0],
      [categoryDisplayName.SNOW, 0],
      [categoryDisplayName.TEMPEXTREMES, 0],
      [categoryDisplayName.VOLCANOES, 0],
      [categoryDisplayName.WATERCOLOUR, 0],
      [categoryDisplayName.WILDFIRES, 0]
    ])

    // iterate through the event data and keep running totals of events per category
    for (const event of data.events) {
      switch (event.categories[0].id) // count up the event id
      {
        case categories.DROUGHT:
          incrementEvent(eventMap, categoryDisplayName.DROUGHT);
          break;
        case categories.DUSTHAZE: 
          incrementEvent(eventMap, categoryDisplayName.DUSTHAZE);
          break;
        case categories.EARTHQUAKES:
         incrementEvent(eventMap, categoryDisplayName.EARTHQUAKES);
          break;
        case categories.FLOODS:
          incrementEvent(eventMap, categoryDisplayName.FLOODS);
          break;
        case categories.LANDSLIDES:
          incrementEvent(eventMap, categoryDisplayName.LANDSLIDES);
          break;
        case categories.MANMADE:
          incrementEvent(eventMap, categoryDisplayName.MANMADE);
          break;
        case categories.SEALAKEICE:
          incrementEvent(eventMap, categoryDisplayName.SEALAKEICE);
          break;
        case categories.SERVERSTORMS:
          incrementEvent(eventMap, categoryDisplayName.SERVERSTORMS);
          break;
        case categories.SNOW:
          incrementEvent(eventMap, categoryDisplayName.SNOW);
          break;
        case categories.TEMPEXTREMES:
          incrementEvent(eventMap, categoryDisplayName.TEMPEXTREMES);
          break;
        case categories.VOLCANOES:
          incrementEvent(eventMap, categoryDisplayName.VOLCANOES);
          break;
        case categories.WATERCOLOUR:
          incrementEvent(eventMap, categoryDisplayName.WATERCOLOUR);
          break;
        case categories.WILDFIRES:
          incrementEvent(eventMap, categoryDisplayName.WILDFIRES);
          break;
      }
    }

    // sort the map containing the event counts (number of events descending)
    const unsortedArray = [...eventMap]
    const sortedArray = unsortedArray.sort(([key1, value1], [key2, value2]) => {
      if (value2 > value1) return 1
      else if (value2 < value1) return -1
      else return 0 
    })
    const sortedEvents = new Map(sortedArray)

    // locate the ordered list element we will programmatically append list items to and clear any remove any exsiting list items 
    let currentEvents = document.querySelector('#currentevents')
    currentEvents.replaceChildren()

    // iterate through the sorted event list and create HTML elements
    for (let [name, count] of sortedEvents.entries()) {
    
      let listItem = document.createElement('li');
      listItem.className = "list-group-item d-flex justify-content-between align-items-center"
      listItem.setAttribute('role', 'row')

      let title = document.createElement('div');
      title.className = "fw-bold m-2"
      title.textContent = name
      title.tabIndex = 0
      title.setAttribute('role', 'cell')
      listItem.appendChild(title)

      let eventTotal = document.createElement('span')
      if (count > 0) // only display blue badges for event counts greater than 0
        eventTotal.className = "badge bg-primary rounded-pill m-2"
      else
       eventTotal.className = "badge bg-secondary rounded-pill m-2"
       
      eventTotal.textContent = count
      eventTotal.tabIndex = 0   
      eventTotal.setAttribute('role', 'cell')
      listItem.appendChild(eventTotal)

      currentEvents.appendChild(listItem)
    }
  }

  // helper function increment event count
  function incrementEvent(map, eventId) {
    map.set(eventId, map.get(eventId) + 1)
  }