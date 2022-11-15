/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/**	Google Maps API
 * https://console.cloud.google.com/iam-admin/settings?project=lucid-tiger-368223
 * https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
*/

/* ************************************************************************* */
// INITIALIZE

// MODULES
import * as cnrSecrets from './cnrSecrets.js';
import * as cnrData from './cnrData.js';
import * as cnrDisplay from './cnrDisplay.js';
// import * as cnrFetch from './cnrFetchAPI.js';
import * as cnrGeoLocation from './cnrGeoLocationAPI.js';

// MAP
let cnrMap;
const cnrMAP_API_KEY = cnrSecrets.cnrAPI_KEY_MAP;
const cnrMAP_API_VERSION = `weekly`;
const cnrMAP_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${cnrMAP_API_KEY}&callback=cnrInitMap&v=${cnrMAP_API_VERSION}`;

// QUAKES
let cnrQuakes = null;
const cnrQuakes_API_SRC = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
const cnrQuakes_API_RESPONSE_TYPE = 'geojson';
const cnrQuakes_API_START_TIME = '2019-01-01';
const cnrQuakes_API_END_TIME = '2019-02-02';
const cnrQuakes_API_MAX_RADIUS_KM = '100';


window.onload = function () {
  // init map
  const cnrBodyElement = document.getElementsByTagName('body');
  const cnrMapScriptTag = document.createElement('script');
  cnrMapScriptTag.src = cnrMAP_API_SRC;
  cnrBodyElement[0].appendChild(cnrMapScriptTag);
  window.cnrInitMap = cnrInitMap;

  // create new quake data object
  const cnrDataSchema = {
    cnrTime: 'Quake time.',
    cnrLocation: 'Quake Location.',
    cnrMagnitude: 'Quake magnitude.',
    cnrDetails: 'Quake details URL.'
  };
  cnrQuakes = new cnrData.cnrItemsClass('cnrQuakes', cnrDataSchema);
  // init quakes
  cnrGetQuakes();

}; // window.onload

/* ************************************************************************* */
// CONTROL

function cnrInitMap() {
  cnrMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 35.000, lng: -99.000 },
    zoom: 4
  });
};

function cnrGetQuakes() {
  const cnrQuakeLatitudVar = '43.814540699999995';
  const cnrQuakeLongitudVar = '-111.78491029999999';
  const cnrQuakesRequestUrlVar = `${cnrQuakes_API_SRC}?format=${cnrQuakes_API_RESPONSE_TYPE}&starttime=${cnrQuakes_API_START_TIME}&endtime=${cnrQuakes_API_END_TIME}&latitude=${cnrQuakeLatitudVar}&longitude=${cnrQuakeLongitudVar}&maxradiuskm=${cnrQuakes_API_MAX_RADIUS_KM}`;
  
  // fetch quakes
  const cnrHeaders = new Headers();
  const cnrRequest = new Request(cnrQuakesRequestUrlVar, {
    method: 'GET',
    headers: cnrHeaders,
    mode: 'cors',
    cache: 'default'
  });

  fetch(cnrRequest).then((response) => response.json())
    .then((cnrJSONData) => cnrProcesResponseJSON(cnrJSONData));
}; // cnrGetQuakes

/**	cnrProcesResponseJSON. 
 * Process response json from fetch request. 
 * Updates data. 
*/
function cnrProcesResponseJSON(cnrResponseJSONParam) {
  if (cnrResponseJSONParam === null || cnrResponseJSONParam === '') {
    console.log('ERROR: cnrProcesResponseJSON > cnrResponseJSONParam');
    return null;
  };

  // reset data
  cnrQuakes.cnrRemoveItems();

  // process JSON
  console.clear();
  const cnrLength = cnrResponseJSONParam.features.length;
  if (cnrLength <= 0) {
    console.log("ERROR: cnrProcesResponseJSON > cnrLength ", cnrLength);
    return;
  };
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++){
    // create new quake data object
    const cnrDataVar = {
      cnrTime: cnrResponseJSONParam.features[cnrCounter].properties.time,
      cnrLocation: cnrResponseJSONParam.features[cnrCounter].properties.title,
      cnrMagnitude: cnrResponseJSONParam.features[cnrCounter].properties.rms,
      cnrDetails: cnrResponseJSONParam.features[cnrCounter].properties.detail
    };
    cnrQuakes.cnrAddItem("cnrQuake", true, cnrDataVar);
  };

  cnrDisplay.cnrRenderItems();
  
}; // cnrProcesResponseJSON
