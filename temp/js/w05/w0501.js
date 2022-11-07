/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE
window.onload = function() {
  // init event listeners
  const cnrDetailsLinksVar = document.querySelectorAll('.detailslinks');
  for(const cnrDetailsLinkVar of cnrDetailsLinksVar) {
    cnrDetailsLinkVar.addEventListener('click', cnrDetailsLinksClickHandler);
  };

};

// EVENT HANDLERS
function cnrDetailsLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  const cnrIDVar = cnrEventParam.target.id;

  window.location.href = "../../html/w05/w0501B.html?id=" + cnrIDVar;

};
