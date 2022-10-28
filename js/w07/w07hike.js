/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrHikesURL = "../../html/w07/w07hikes.html";

window.onload = function () {
  // init event listeners
  const cnrDetailsLinksVar = document.querySelectorAll('.cnrbacklinks');
  for (const cnrDetailsLinkVar of cnrDetailsLinksVar) {
    const gridContainer = document.getElementById('gridcontainer');
    if ("ontouchend" in document.documentElement) {
      console.log("Using touch");
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
  document.getElementById('cnrcardheadertitle').innerText = cnrGetQueryStringValue('cnrName');
  document.getElementById('cnrcardimage').setAttribute('src', cnrGetQueryStringValue('cnrImageURL'));
  document.getElementById('cnrlocation').innerText = cnrGetQueryStringValue('cnrLocation');
  document.getElementById('cnrrating').innerText = cnrGetQueryStringValue('cnrRating');
  document.getElementById('cnrdifficulty').innerText = cnrGetQueryStringValue('cnrDifficulty');
  document.getElementById('cnrdirections').innerText = cnrGetQueryStringValue('cnrDirections');
  document.getElementById('cnrdescription').innerText = cnrGetQueryStringValue('cnrDescription');

};

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = cnrHikesURL;
};

function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam)
  return cnrValueVar;
};
