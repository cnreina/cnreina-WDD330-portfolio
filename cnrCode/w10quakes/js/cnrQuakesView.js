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
import * as cnrData from './cnrData.js';
import * as cnrDisplay from './cnrDisplay.js';
import * as cnrGeoLocation from './cnrGeoLocationAPI.js';


// QUAKES
let cnrQuakes;
const cnrQuakes_API_SRC = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
const cnrQuakes_API_RESPONSE_TYPE = 'geojson';
const cnrQuakes_API_START_TIME = '2019-01-01';
const cnrQuakes_API_END_TIME = '2019-02-02';
const cnrQuakes_API_MAX_RADIUS_KM = '100';


window.onload = function () {
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

/**	cnrGetQuakes. 
 * Gets quakes data from API. 
*/
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
 * Processes response json from fetch request. 
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
      cnrMagnitude: cnrResponseJSONParam.features[cnrCounter].properties.mag,
      cnrDetails: cnrResponseJSONParam.features[cnrCounter].properties.detail
    };
    // save quake data object
    cnrQuakes.cnrAddItem("cnrQuake", true, cnrDataVar);
  };

  // display quake data
  cnrDisplay.cnrRenderItems('cnrjscontainerdiv', cnrQuakes);
  
}; // cnrProcesResponseJSON
