/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrDataModule from './cnrDataModule.js';
import * as cnrStorageModule from './cnrStorageModule.js';

const cnrTODOList = new cnrDataModule.cnrDataListClass();

window.onload = function () {
  cnrTODOList.cnrDataListAddItem('string', 'log', 'window.onload');

  // init event handlers
  const cnrAddItemButtonVar = document.getElementById('cnradditembutton');
  if ("ontouchend" in document.documentElement) {
    console.log("Using touchend");
    cnrAddItemButtonVar.addEventListener('touchend', cnrAddItemButtonHandler);
  }
  else {
    console.log("Using click");
    cnrAddItemButtonVar.addEventListener('click', cnrAddItemButtonHandler);
  };

  const cnrDeleteItemButtonsVar = document.querySelectorAll('.cnrjscontentdivs');
  for (const cnrDeleteItemButtonVar of cnrDeleteItemButtonsVar) {
    if ("ontouchend" in document.documentElement) {
      console.log("Using touchend");
      cnrDeleteItemButtonVar.addEventListener('touchend', cnrItemClickHandler);
    }
    else {
      console.log("Using click");
      cnrDeleteItemButtonVar.addEventListener('click', cnrItemClickHandler);
    };
  };

  // handle onload event
  cnrWindowOnLoadHandler();

};


/* ************************************************************************* */
// EVENT HANDLERS
function cnrWindowOnLoadHandler(cnrEventParam) {
  const cnrNewItemVar = cnrTODOList.cnrDataListAddItem('string', 'log', 'cnrWindowOnLoadHandler');
  console.log("cnrTODOList.cnrDataListGetItemCount = " + cnrTODOList.cnrDataListGetItemCount());
  console.log("cnrTODOList.cnrDataListGetItemsForKey = " + cnrTODOList.cnrDataListGetItemsForTag('log')[0].cnrDataItemGetData());

  // display todo list

  cnrDataRenderItem(document.getElementById("cnrjscontainerdiv1"), cnrNewItemVar);

};

/**	Adds a new item to the list */
function cnrAddItemButtonHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  const cnrIDVar = cnrEventParam.target.id;
  if (cnrIDVar != "cnradditembutton") { return; };

  // add item to list
  const cnrToDoTitleVar = document.getElementById('cnradditeminput').value;
  console.log("cnrToDoTitleVar = " + cnrToDoTitleVar);

  const cnrNewItemVar = cnrTODOList.cnrDataListAddItem('tag', 'todo', cnrToDoTitleVar);

  console.log("cnrDataListGetItemCount = " + cnrTODOList.cnrDataListGetItemCount());
  console.log("cnrDataListGetItemsForTag = " + cnrTODOList.cnrDataListGetItemsForTag('log')[0].cnrDataItemGetData());

  // display new item
  cnrDataRenderItem(document.getElementById("cnrjscontainerdiv1"), cnrNewItemVar);

  // update storage
  // cnrStorageModule.cnrLocalStorageCreate('todo', cnrToDoTitleVar);

};

/**	Handles click event on each item. */
function cnrItemClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();

  console.log("this = ", this);
  console.log("cnrEventParam.target = ", cnrEventParam.target);
  // console.log("cnrEventParam.parent = ", cnrEventParam.parent);

  if (cnrEventParam == null) { return; };
  
  // DELETE ITEM
  if (cnrEventParam.target.classList.contains("cnrjsdeleteitemdivs")) {
    cnrDeleteItem(this.id);
    return;
  };
};

/**	Removes item. */
function cnrDeleteItem(cnrItemIDParam) {
  console.log("cnrItemIDParam = ", cnrItemIDParam);

  if (cnrItemIDParam == null || cnrItemIDParam == '') { return; };

  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  const cnrContentElementVar = document.getElementById(cnrItemIDParam);
  cnrContainerElementVar.removeChild(cnrContentElementVar);
  
  // cnrStorageModule.cnrLocalStorageDeleteKey(cnrItemIDParam);

};


/* ************************************************************************* */
// DISPLAY HANDLERS

/**	Renders the list of data items. */
function cnrDataRenderList(cnrContainerElementParam, cnrDataListParam) {
  cnrDataListParam.forEach(cnrDataItemVar => {
    cnrContainerElementParam.appendChild(cnrDataRenderItem(cnrDataItemVar));
  });
};

/**	Renders one data item. */
function cnrDataRenderItem(cnrContainerElementParam, cnrDataItemParam) {
  console.log("cnrDataRenderItem > cnrDataItemParam = " + cnrDataItemParam);

  const cnrItemVar = cnrDataItemParam;
  const cnrItemIDVar = cnrItemVar.cnrDataItemGetID();
  const cnrJSContentDivVar = document.createElement('div');
  cnrJSContentDivVar.classList.add('cnrjscontentdivs');
  cnrJSContentDivVar.id = cnrItemIDVar;
  cnrJSContentDivVar.onclick = cnrItemClickHandler;
  cnrJSContentDivVar.innerHTML = `
    <div class="cnrjsstatusdivs">X</div>
    <div class="cnrjstaskdivs">Task Name Goes Here</div>
    <div class="cnrjsdeleteitemdivs">X</div>
  `;
  cnrContainerElementParam.appendChild(cnrJSContentDivVar);

  // const cnrNewItemVar = document.getElementById(cnrItemIDVar);
  // cnrNewItemVar.addEventListener('click', cnrDeleteItemButtonHandler);

  return cnrJSContentDivVar;

  /*	
    ${cnrItemVar.cnrDataItemGetData()}
    ${cnrItemVar.cnrDataItemGetData()}
    ${cnrItemVar.cnrDataItemGetData()}
  */
  
}; // cnrDataRenderItem

