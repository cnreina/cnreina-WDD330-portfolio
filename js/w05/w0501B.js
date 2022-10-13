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
  // cnrEventParam.preventDefault();
  console.log("cnrWindowOnLoadHandler\n" + cnrGetQueryStringValue('id'));
  
};

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = "../../html/w05/w0501.html";
};

function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get('id')
  return cnrValueVar;
};
