/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/**	Google Maps API
 * https://console.cloud.google.com/iam-admin/settings?project=lucid-tiger-368223
 * https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
 * 
*/

/* ************************************************************************* */
// INITIALIZE

let cnrMap;

function cnrInitMap() {
  cnrMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
};

window.cnrInitMap = cnrInitMap;
