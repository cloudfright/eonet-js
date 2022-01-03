
import { EONET_BASE_URL } from '../modules/common.js';

function initChartControls() {

    let yearSelect = document.querySelector('#year-select');
    yearSelect.replaceChildren();
  
    let currentYear = new Date().getFullYear();
  
    const yearClickHandler = function () {
      fetchChartDataAsync(parseInt(this.textContent));
    };
  
    // populate the year selection dropdown control
    for (let year = currentYear; year >= 1980; year--) {
      let listItem = document.createElement('li');
      listItem.textContent = year;
      listItem.className = "dropdown-item";
      listItem.addEventListener('click', yearClickHandler);
      yearSelect.appendChild(listItem);
    }
  
    const ctx = document.getElementById('year-events-chart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: []
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Natural events from ' + currentYear,
            font: {
              size: 24,
              weight: 'bold'
            },
            fullSize: true
          }
        }
      }
    });
  
    fetchChartDataAsync(currentYear);
  }
  
  
  
  // fetch and render data for the charts page
  async function fetchChartDataAsync(year = 2020) {
  
    const parameters = `start=${year}-01-01&end=${year}-12-31&status=all`;
    const chart = Chart.getChart("year-events-chart");
    chart.clear();
  
    let spinner = document.getElementById("spinner");
    spinner.style.visibility = 'visible';
  
    let response = await fetch(EONET_BASE_URL + '/events?' + parameters);
    let data = await response.json();
  
    let categoryMonthCount = {
      'Drought': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Dust Haze': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Earthquakes': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Floods': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Landslides': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Manmade': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Sea Lake Ice': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Severe Storms': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Snow': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Temp Extremes': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Volcanoes': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Water Colour': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      'Wildfires': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };
  
    data.events.reduce(function (categories, event) {
  
      let categoryTitle = event.categories[0].title;
      let geometryDate = new Date(event.geometry[0].date);
      let month = geometryDate.getMonth();
      let datasets = [];
  
      if (categoryTitle in categories) {
        categories[categoryTitle][month]++;
      }
      return categories;
  
    }, categoryMonthCount);
  
    // build our chart datasets only for those categories with events in the year
    let eventDatasets = [];
    let datasetIdx = 0;
    const colourTable = ['#00aedb', '#a200ff', '#f47835', '#d41243', '#8ec127', '#ff48c4', '#2bd1fc', '#f3ea5f', '#c04df9', '#ff3f3f', '#6b3e26', '#ffc5d9'];
  
    for (let category in categoryMonthCount) {
      // if a category has events in the year, add the monthly as a dataset to be shown
      const eventCount = (previous, current) => previous + current;
      if (categoryMonthCount[category].reduce(eventCount) > 0) {
        eventDatasets.push({
          backgroundColor: colourTable[datasetIdx],
          label: category,
          data: categoryMonthCount[category]
        });
        datasetIdx++;
      }
    }
  
    chart.data.datasets = eventDatasets;
    chart.options.plugins.title.text = 'Natural events from ' + year;
    chart.update();
  
    spinner.style.visibility = 'hidden';
  }

  export { initChartControls };
