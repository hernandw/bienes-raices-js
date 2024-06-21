const lat = -18.4900773;
const lng = -70.277749;
let marker;

const geocodeService = L.esri.Geocoding.geocodeService();

const map = L.map("map").setView([lat, lng], 13);

document.addEventListener("DOMContentLoaded", () => {
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  marker = new L.marker([lat, lng], {
    draggable: true,
    autoPan: true,
  }).addTo(map);

  marker.on("moveend", function (e) {
    marker = e.target;
    const position = marker.getLatLng();
    console.log(position.lat, position.lng);

    map.panTo(new L.LatLng(position.lat, position.lng));


    geocodeService
    .reverse()
    .latlng(position, 13).run((result) => {
      console.log(result);
    })

  });

  
});
