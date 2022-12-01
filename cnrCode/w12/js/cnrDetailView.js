/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrMainViewURL = "../html/cnrMainView.html";

window.onload = function () {
  // click or touch var
  let cnrClickOrTouchEventVar = '';
  if ("ontouchend" in document.documentElement) {
    cnrClickOrTouchEventVar = 'touchend';
  }
  else {
    cnrClickOrTouchEventVar = 'click';
  };

  // init event listeners
  const cnrBackToListLinkVar = document.getElementById('cnrbacklinkdiv');
  cnrBackToListLinkVar.addEventListener(cnrClickOrTouchEventVar, cnrBackLinksClickHandler);

  // get query string data
  const cnrTokenVar = cnrGetQueryStringValue('cnrToken');
  
  // render data
  document.getElementById('cnrcardheadertitle').innerText = cnrTokenVar;
  document.getElementById('cnrtime').innerText = cnrTokenVar;

}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = cnrMainViewURL;
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
  if (cnrValueVar === null || cnrValueVar === '') {
    console.log('ERROR: cnrGetQueryStringValue > cnrValueVar\n', cnrValueVar);
    return '';
  };
  return cnrValueVar;
};

/**	cnrFetchJSON. 
 * Gets JSON data from API. 
*/
function cnrFetchJSON(cnrURLParam) {
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
 * Processes json response from fetch request. 
 * Updates data. 
*/
function cnrProcesResponseJSON(cnrResponseJSONParam) {
  if (cnrResponseJSONParam === null || cnrResponseJSONParam === '') {
    console.log('ERROR: cnrProcesResponseJSON > cnrResponseJSONParam');
    return null;
  };

}; // cnrProcesResponseJSON
