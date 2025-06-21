// script.js

// Initialize the map centered on global view
const map = L.map('map').setView([20, 0], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Fetch live earthquake data from USGS
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson')
  .then(res => res.json())
  .then(data => {
    data.features.forEach(quake => {
      const [lon, lat, depth] = quake.geometry.coordinates;
      const mag = quake.properties.mag;
      const place = quake.properties.place;

      // Create a circle marker with dynamic size and color
      const marker = L.circleMarker([lat, lon], {
        radius: mag * 2,
        color: mag >= 5 ? '#e74c3c' : mag >= 3 ? '#f39c12' : '#2ecc71',
        fillOpacity: 0.6,
        weight: 1
      }).addTo(map);

      // Popup info
      marker.bindPopup(`
        <strong>${place}</strong><br>
        Magnitude: ${mag}<br>
        Depth: ${depth} km
      `);
    });
  })
  .catch(err => {
    console.error('Failed to fetch data:', err);
    alert('Could not fetch earthquake data at this time.');
  });
