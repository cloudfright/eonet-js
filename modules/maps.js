
import { EONET_BASE_URL } from '../modules/common.js';

// fetch and render data for the maps page
async function fetchMapDataAsync() {

    let spinner = document.getElementById("spinner");
    spinner.style.visibility = 'visible';

    let response = await fetch(EONET_BASE_URL + '/events/geojson?status=open&days=90');
    let geoJson = await response.json();

    mapboxgl.accessToken = 'MAPBOX_TOKEN_PLACEHOLDER';

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/satellite-v9', // style URL
        zoom: 1, // starting zoom
        center: [138.043, 35.201] // starting center
    });

    map.on('load', () => {
        map.addSource('natural-events', {
            type: 'geojson',
            data: geoJson
        });

        map.addLayer({
            'id': 'natural-events-layer',
            'type': 'circle',
            'source': 'natural-events',
            'paint': {
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
            }
        });

        // Create a popup, but don't add it to the map yet.
        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });

        map.on('mouseenter', 'natural-events-layer', (e) => {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';

            // Copy coordinates array.
            const coordinates = e.features[0].geometry.coordinates.slice();
            const event = e.features[0].properties;

            const speedData = event.magnitudeValue ? event.magnitudeValue + ' ' + event.magnitudeUnit : '';
            const eventDate = new Date(event.date);
            const description = event.title + '<br>' + eventDate.toLocaleString() + '<br>' + speedData;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            // Populate the popup and set its coordinates
            // based on the feature found.
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on('mouseleave', 'natural-events-layer', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });

    });
    spinner.style.visibility = 'hidden';
}

export { fetchMapDataAsync };
