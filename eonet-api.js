
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


async function fetchDashboardDataAsync() {
  let response = await fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open')
  let data = await response.json()

  let categoryCount = {
    'Drought': 0,
    'Dust Haze': 0,
    'Earthquakes': 0,
    'Floods': 0,
    'Landslides': 0,
    'Manmade': 0,
    'Sea Lake Ice': 0,
    'Severe Storms': 0,
    'Snow': 0,
    'Temp Extremes': 0,
    'Volcanoes': 0,
    'Water Colour': 0,
    'Wildfires': 0
  }

  // count up event category titles 
  data.events.reduce(function (categories, event) {

    let categoryTitle = event.categories[0].title

    if (categoryTitle in categories) {
      categories[categoryTitle]++
    }
    return categories
  }, categoryCount)

  // convert to array
  var currentEventTotals = []
  for (category in categoryCount) {
    currentEventTotals.push({ title: category, count: categoryCount[category] })
  }

  // sort by count descending
  currentEventTotals.sort((a, b) => {
    return b.count - a.count;
  });

  // locate the ordered list element we will programmatically append list items to and clear any remove any exsiting list items 
  let currentEvents = document.querySelector('#currentevents')
  currentEvents.replaceChildren()

  // iterate through the sorted event list and create HTML elements
  for (let category of currentEventTotals) {

    let listItem = document.createElement('li');
    listItem.className = "list-group-item d-flex justify-content-between align-items-center"
    listItem.setAttribute('role', 'row')

    let title = document.createElement('div');
    title.className = "fw-bold m-2"
    title.textContent = category.title
    title.tabIndex = 0
    title.setAttribute('role', 'cell')
    listItem.appendChild(title)

    let eventTotal = document.createElement('span')
    if (category.count > 0) // only display blue badges for event counts greater than 0
      eventTotal.className = "badge bg-primary rounded-pill m-2"
    else
      eventTotal.className = "badge bg-secondary rounded-pill m-2"

    eventTotal.textContent = category.count
    eventTotal.tabIndex = 0
    eventTotal.setAttribute('role', 'cell')
    listItem.appendChild(eventTotal)

    currentEvents.appendChild(listItem)
  }

}
