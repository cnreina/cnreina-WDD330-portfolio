/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/**	Google Maps API
 * My Key: AIzaSyAzxh-nw2DhH8U8qFunODSK1kAlG1TdAPY
 * 
 * https://console.cloud.google.com/iam-admin/settings?project=lucid-tiger-368223
 * 
 * https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
 * 
*/

/* ************************************************************************* */
// INITIALIZE

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

window.initMap = initMap;
