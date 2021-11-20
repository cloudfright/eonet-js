


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
  
    let eventTotals = {
      drought: 0,
      dustHaze: 0,
      earthquakes: 0,
      floods: 0,
      landslides: 0,
      manmade: 0,
      seaLakeIce: 0,
      severeStorms: 0,
      snow: 0,
      tempExtremes: 0,
      volcanoes: 0,
      waterColour: 0,
      wildfires: 0
    }
  
    for (const event of data.events) {
      switch (event.categories[0].id) // count up the event id
      {
        case 'drought': eventTotals.drought++; break;
        case 'dustHaze': eventTotals.dustHaze++; break;
        case 'earthquakes': eventTotals.earthquakes++; break;
        case 'floods': eventTotals.floods++; break;
        case 'landslides': eventTotals.landslides++; break;
        case 'manmade': eventTotals.manmade++; break;
        case 'seaLakeIce': eventTotals.seaLakeIce++; break;
        case 'severeStorms': eventTotals.severeStorms++; break;
        case 'snow': eventTotals.snow++; break;
        case 'tempExtremes': eventTotals.tempExtremes++; break;
        case 'volcanoes': eventTotals.volcanoes++; break;
        case 'waterColor': eventTotals.waterColour++; break;
        case 'wildfires': eventTotals.wildfires++; break;
      }
    }

    document.querySelector('#drought').textContent = eventTotals.drought
    document.querySelector('#dusthaze').textContent = eventTotals.dustHaze
    document.querySelector('#earthquakes').textContent = eventTotals.earthquakes
    document.querySelector('#floods').textContent = eventTotals.floods
    document.querySelector('#landslides').textContent = eventTotals.landslides
    document.querySelector('#manmade').textContent = eventTotals.manmade
    document.querySelector('#sealakeice').textContent = eventTotals.seaLakeIce
    document.querySelector('#severestorms').textContent = eventTotals.severeStorms
    document.querySelector('#snow').textContent = eventTotals.snow
    document.querySelector('#tempextremes').textContent = eventTotals.tempExtremes
    document.querySelector('#volcanoes').textContent = eventTotals.volcanoes
    document.querySelector('#watercolour').textContent = eventTotals.waterColour
    document.querySelector('#wildfires').textContent = eventTotals.wildfires

    console.log(eventTotals)
  }