/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrHikes from './w07hikes.js';
import * as cnrDisplay from './w07display.js';

// INITIALIZE
window.onload = function() {
  const cnrHikesVar = new cnrHikes.cnrHikesClass();
  cnrDisplay.cnrRenderItems('cnrjscontainerdiv1', cnrHikesVar.cnrGetAllHikes());
};
