/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import cnrToDoClass from './cnrToDoModule.js';
import * as cnrStorage from './cnrStorageModule.js';

// INITIALIZE
window.onload = function() {
  const cnrTODOInstance = new cnrToDoClass();
  cnrTODOInstance.cnrDisplayToDoList('jscontainerdiv1');

  // init event handlers
  const cnrAddItemButtonVar = document.getElementById('cnradditembutton');
  if ("ontouchend" in document.documentElement) {
    console.log("Using touchend");
    cnrAddItemButtonVar.addEventListener('touchend', cnrAddItemClickHandler);
  }
  else {
    console.log("Using click");
    cnrAddItemButtonVar.addEventListener('click', cnrAddItemClickHandler);
  };

};

// EVENT HANDLERS
function cnrWindowOnLoadHandler(cnrEventParam) {
  
};

function cnrAddItemClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  const cnrIDVar = cnrEventParam.target.id;

  switch (cnrIDVar) {
    case "cnradditembutton":
      cnrStorage.cnrLocalStorageCreate(cnrIDVar, cnrIDVar);
      break;
    case "cnrdeleteitembutton":
      cnrStorage.cnrLocalStorageDeleteKey(cnrIDVar);
      break;
  
    default:
      break;
  }
  
};