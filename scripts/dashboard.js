
import { fetchDashboardDataAsync } from '../modules/events.js';

window.addEventListener('load', (event) => {
    fetchDashboardDataAsync();
});