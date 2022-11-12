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

import * as cnrSecrets from '../../../cnrSecret/cnrSecrets.js';

let cnrMap;
const cnrMAP_API_KEY = cnrSecrets.cnrAPI_KEY_MAP || "${{CNRMAP_API_KEY}}";
const cnrMAP_API_VERSION = `weekly`;
const cnrMAP_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${cnrMAP_API_KEY}&callback=cnrInitMap&v=${cnrMAP_API_VERSION}`;

window.onload = function () {
  // init map
  const cnrBodyElement = document.getElementsByTagName('body');
  const cnrMapScriptTag = document.createElement('script');
  cnrMapScriptTag.src = cnrMAP_API_SRC;
  cnrBodyElement[0].appendChild(cnrMapScriptTag);
  window.cnrInitMap = cnrInitMap;
  
  console.log('TEST: ', );
  
}; // window.onload

/* ************************************************************************* */
// CONTROL

function cnrInitMap() {
  cnrMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
};
