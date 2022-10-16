/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrData from './cnrDataModule.js';
import * as cnrStorage from './cnrStorageModule.js';

// INITIALIZE
window.onload = function() {
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

  cnrWindowOnLoadHandler();

};

// EVENT HANDLERS
function cnrWindowOnLoadHandler(cnrEventParam) {
  // display todo list
  const cnrTODOList = new cnrData.cnrDataListClass();
  // cnrTODOList.cnrDataDisplayList('jscontainerdiv1');
  
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