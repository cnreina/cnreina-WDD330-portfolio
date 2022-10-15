/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE
window.onload = function () {
  // init event listeners
  const cnrDetailsLinksVar = document.querySelectorAll('.backlinks');
  for (const cnrDetailsLinkVar of cnrDetailsLinksVar) {
    const gridContainer = document.getElementById('gridcontainer');
    if ("ontouchend" in document.documentElement) {
      console.log("Using touchend");
      cnrDetailsLinkVar.addEventListener('touchend', cnrBackLinksClickHandler);
    }
    else {
      console.log("Using click");
      cnrDetailsLinkVar.addEventListener('click', cnrBackLinksClickHandler);
    };
  };
  
  cnrWindowOnLoadHandler();
};

// EVENT HANDLERS
function cnrWindowOnLoadHandler() {
  document.getElementById('cardheadertitle').innerText = cnrGetQueryStringValue('cnrName');
  document.getElementById('image').setAttribute('src', cnrGetQueryStringValue('cnrImageURL'));
  document.getElementById('location').innerText = cnrGetQueryStringValue('cnrLocation');
  document.getElementById('rating').innerText = cnrGetQueryStringValue('cnrRating');
  document.getElementById('difficulty').innerText = cnrGetQueryStringValue('cnrDifficulty');
  document.getElementById('directions').innerText = cnrGetQueryStringValue('cnrDirections');
  document.getElementById('description').innerText = cnrGetQueryStringValue('cnrDescription');
};

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = "../../html/w06/w0600.html";
};

function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam)
  return cnrValueVar;
};
