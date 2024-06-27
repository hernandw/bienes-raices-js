

const lat = document.getElementById("lat").value || -18.4900773;
const lng = document.getElementById("lng").value || -70.277749;
let marker;


const apiKey  = "AAPK896adcc73c7648b2a32b6dca0182b86f9TEhwXkbtj-KWBk4UsEi3nY_acGVTyLNrKva2kRePTeJDii8Z_DcHkwTmRWJiGkV"
  
  

const geocodeService = L.esri.Geocoding.geocodeService({
  apikey: apiKey,
});

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
    

    map.panTo(new L.LatLng(position.lat, position.lng));

    geocodeService
      .reverse()
      .latlng(position, 13)
      .run(function (error, result) {
        if (error) {
          console.log(error.message);
        } else {
          console.log(result);
        }
        marker.bindPopup(result.address.LongLabel);

        //llenar los camos de la calle
        document.querySelector(".street").textContent =
          result?.address?.Address ?? "";
        document.querySelector("#street").value = result?.address.Address ?? "";
        document.querySelector("#lat").value = result?.latlng?.lat ?? "";
        document.querySelector("#lng").value = result?.latlng?.lng ?? "";
      });
  });
});
