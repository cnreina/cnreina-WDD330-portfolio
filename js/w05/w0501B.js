/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE
window.onload = function () {
  // init event listeners
  const cnrDetailsLinksVar = document.querySelectorAll('.backlinks');
  for(const cnrDetailsLinkVar of cnrDetailsLinksVar) {
    cnrDetailsLinkVar.addEventListener('click', cnrBackLinksClickHandler);
  };
  
  cnrWindowOnLoadHandler();

};

// EVENT HANDLERS
function cnrWindowOnLoadHandler() {
  document.getElementById('headertitle').innerText = cnrGetQueryStringValue('cnrName');
  document.getElementById('image').setAttribute('src', cnrGetQueryStringValue('cnrImageURL'));
  document.getElementById('location').innerText = cnrGetQueryStringValue('cnrState');
  document.getElementById('rating').innerText = cnrGetQueryStringValue('cnrRating');
  document.getElementById('difficulty').innerText = cnrGetQueryStringValue('cnrDifficulty');
  document.getElementById('directions').innerText = cnrGetQueryStringValue('cnrDirections');
  document.getElementById('description').innerText = cnrGetQueryStringValue('cnrDescription');
};

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = "../../html/w05/w0501.html";
};

function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam)
  return cnrValueVar;
};
