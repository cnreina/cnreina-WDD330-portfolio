/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import cnrHikesClass from '../../js/w05/w0501hikes.js';

// INITIALIZE
window.onload = function() {
  const cnrHike = new cnrHikesClass();
  cnrHike.cnrDisplayHikeList('displaydiv');

};

// EVENT HANDLERS
function cnrDetailsLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  const cnrIDVar = cnrEventParam.target.id;

  window.location.href = "../../html/w05/w0501B.html?id=" + cnrIDVar;

};
