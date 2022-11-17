/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrSecrets from './cnrSecrets.js';

const cnrQuakesViewURL = "../html/cnrQuakesView.html";
let cnrMAP_API_POSITION = null;
let cnrMAP_API_ZOOM = null;


window.onload = function () {
  // click or touch var
  let cnrClickOrTouchEventVar = '';
  if ("ontouchend" in document.documentElement) {
    console.log("Using touch");
    cnrClickOrTouchEventVar = 'touchend';
  }
  else {
    console.log("Using click");
    cnrClickOrTouchEventVar = 'click';
  };

  // init event listeners
  const cnrBackToListLinkVar = document.getElementById('cnrbacklinkdiv');
  cnrBackToListLinkVar.addEventListener(cnrClickOrTouchEventVar, cnrBackLinksClickHandler);

  // get query string data
  const cnrTimeVar = cnrGetQueryStringValue('cnrTime');
  const cnrLocationVar = cnrGetQueryStringValue('cnrLocation');
  const cnrMagnitudeVar = cnrGetQueryStringValue('cnrMagnitude');
  const cnrDetailsVar = cnrGetQueryStringValue('cnrDetails');
  
  // render data
  document.getElementById('cnrcardheadertitle').innerText = cnrLocationVar;
  document.getElementById('cnrtime').innerText = cnrTimeVar;
  document.getElementById('cnrlocation').innerText = cnrLocationVar;
  document.getElementById('cnrmagnitude').innerText = cnrMagnitudeVar;
  document.getElementById('cnrdetailsurl').innerText = cnrDetailsVar;

  cnrGetQuakeDetails(cnrDetailsVar);

}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = cnrQuakesViewURL;
};


/* ************************************************************************* */
// CONTROLLERS

/**	cnrGetQueryStringValue. 
 * Returns query string value for passed key. 
 * Returns empty string on empty or errors. 
*/
function cnrGetQueryStringValue(cnrKeyParam) {
  if(cnrKeyParam === null || cnrKeyParam === ''){
    console.log('ERROR: cnrGetQueryStringValue > cnrKeyParam');
    return '';
  };

  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam);
  if(cnrValueVar === null || cnrValueVar === ''){
    return '';
  };

  return cnrValueVar;
};

/**	cnrGetQuakes. 
 * Gets quakes data from API. 
*/
function cnrGetQuakeDetails(cnrURLParam) {
  // fetch quake details
  const cnrHeaders = new Headers();
  const cnrRequest = new Request(cnrURLParam, {
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

  // render data
  document.getElementById('cnrlocation').innerText = cnrResponseJSONParam.properties.place;
  document.getElementById('cnrdetailsurl').innerText = cnrResponseJSONParam.properties.url;
  document.getElementById('cnrlongitud').innerText = cnrResponseJSONParam.geometry.coordinates[0];
  document.getElementById('cnrlatitude').innerText = cnrResponseJSONParam.geometry.coordinates[1];

  // prepare map location
  cnrMAP_API_POSITION = {
    lat: cnrResponseJSONParam.geometry.coordinates[1],
    lng: cnrResponseJSONParam.geometry.coordinates[0]
  };
  cnrMAP_API_ZOOM = 7;
  // init map script
  const cnrMAP_API_KEY = cnrSecrets.cnrAPI_KEY_MAP;
  const cnrMAP_API_VERSION = `weekly`;
  const cnrMAP_API_SRC = `https://maps.googleapis.com/maps/api/js?key=${cnrMAP_API_KEY}&callback=cnrInitMap&v=${cnrMAP_API_VERSION}`;
  const cnrBodyElement = document.getElementsByTagName('body');
  const cnrMapScriptTag = document.createElement('script');
  cnrMapScriptTag.src = cnrMAP_API_SRC;
  cnrBodyElement[0].appendChild(cnrMapScriptTag);
  window.cnrInitMap = cnrInitMap;

}; // cnrProcesResponseJSON

function cnrInitMap() {
  // get map
  const cnrMap = new google.maps.Map(document.getElementById("map"), {
    center: cnrMAP_API_POSITION,
    zoom: cnrMAP_API_ZOOM,
    // scaleControl: false,
    // streetViewControl: false,
    // fullscreenControl: false,
    disableDefaultUI: true
  });
  // add marker
  const cnrMapMarkerVar = new google.maps.Marker({
    position: cnrMAP_API_POSITION,
    map: cnrMap,
  });
};
