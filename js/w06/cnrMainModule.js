/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE MODULES
import * as cnrDataModule from './cnrDataModule.js';
import * as cnrStorageModule from './cnrStorageModule.js';

// INITIALIZE CLASSES
let cnrTODOList = new cnrDataModule.cnrDataListClass();

// INITIALIZE EVENT HANDLERS
window.onload = function () {
  console.clear();

  // add item handlers
  const cnrAddItemButtonVar = document.getElementById('cnradditembutton');
  if ("ontouchend" in document.documentElement) {
    console.log("Using touchend");
    cnrAddItemButtonVar.addEventListener('touchend', cnrAddItemButtonHandler);
  }
  else {
    console.log("Using click");
    cnrAddItemButtonVar.addEventListener('click', cnrAddItemButtonHandler);
  };

  // item content handlers
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

  // handle window onload event
  cnrWindowOnLoadHandler();

};

/* ************************************************************************* */
// HANDLE EVENTS

/**	Gets data list from storage.
 * Extracts data items from list.
 * Creates a new list and loads extracted items.
 * Requests the rendering of the items in a selected element.
 */
function cnrWindowOnLoadHandler() {
  // get cnrDataList string from storage
  const cnrDataListVar = cnrStorageModule.cnrLocalStorageRetrieve('cnrDataList');
  if (cnrDataListVar === null || cnrDataListVar === '') {
    console.log(cnrStorageModule.cnrLocalStorageGetLastErrorMessage());
    return;
  };

  // create new cnrTODOList
  const cnrNewTODOList = new cnrDataModule.cnrDataListClass();
  // get cnrDataList object from JSON
  const cnrDataJSONObject = JSON.parse(cnrDataListVar);
  const cnrDataJSONKeys = Object.keys(cnrDataJSONObject);
  // get cnrDataItem objects
  const cnrLength = cnrDataJSONKeys.length;
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; ++cnrCounter){
    const cnrDataItemVar = cnrDataJSONObject[cnrDataJSONKeys[cnrCounter]];
    if (cnrDataItemVar == null) { console.log("ERROR: cnrDataItemVar == null"); return; };
    const cnrDataItemObject = JSON.parse(cnrDataItemVar);
    if (cnrDataItemObject == null) { console.log("ERROR: cnrDataItemObject == null"); return; };

    // load new cnrTODOList
    cnrNewTODOList.cnrDataListImportItem(cnrDataItemObject.cnrItemID, cnrDataItemObject.cnrItemCreatedTimeUTC, cnrDataItemObject.cnrItemUpdatedTimeUTC, cnrDataItemObject.cnrItemType, cnrDataItemObject.cnrItemStatus, cnrDataItemObject.cnrItemTag, cnrDataItemObject.cnrItemData);    
  };

  // save new loaded list to cnrTODOList
  cnrTODOList = cnrNewTODOList;

  // render items
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  cnrDataRenderItems(cnrContainerElementVar);

  console.table(cnrTODOList.cnrDataListGetItems());

}; // cnrWindowOnLoadHandler

/**	Adds a new item to the list */
function cnrAddItemButtonHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  console.clear();

  // validate
  const cnrIDVar = cnrEventParam.target.id;
  if (cnrIDVar != "cnradditembutton") { return; };

  // get task title
  const cnrToDoTitleVar = document.getElementById('cnradditeminput').value;
  if (cnrToDoTitleVar === null || cnrToDoTitleVar === '') { return; };
  // prepare object
  const cnrJSONData = JSON.stringify({ cnrTaskStatus: 'active', cnrTaskTitle: cnrToDoTitleVar });
  const cnrItemDataVar = cnrJSONData;
  // add task
  const cnrNewItemVar = cnrTODOList.cnrDataListAddItem('json', 'cnrDataItem', cnrItemDataVar);
  
  // refresh items display
  cnrDataRenderItems(document.getElementById("cnrjscontainerdiv1"));

  // update storage
  if (cnrStorageModule.cnrLocalStorageHasKey('cnrDataList')) {
    cnrStorageModule.cnrLocalStorageUpdate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  } else {
    cnrStorageModule.cnrLocalStorageCreate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  };

};

/**	Handles click event on each item. */
function cnrItemClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();

  console.log("this = ", this);
  console.log("cnrEventParam.target = ", cnrEventParam.target);

  if (cnrEventParam == null) { return; };
  
  // DELETE ITEM
  if (cnrEventParam.target.classList.contains("cnrjsdeleteitemdivs")) {
    cnrDeleteItem(this.id);
    return;
  };

  // UPDATE STATUS
  if (cnrEventParam.target.classList.contains("cnrjsstatusdivs")) {
    cnrUpdateStatus(this.id);
    return;
  };

};

/**	Removes an item from the item list. 
 * Updates display element. 
 * Updates localStorage.
*/
function cnrDeleteItem(cnrItemIDParam) {
  console.clear();
  if (cnrItemIDParam == null || cnrItemIDParam == '') {
    console.log("cnrItemIDParam = ", cnrItemIDParam);
    return;
  };

  // remove from display element
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  const cnrContentElementVar = document.getElementById(cnrItemIDParam);
  cnrContainerElementVar.removeChild(cnrContentElementVar);

  // remove from list
  const cnrRemovedItemVar = cnrTODOList.cnrDataListRemoveItemForID(cnrItemIDParam);
  if (cnrRemovedItemVar == null || cnrRemovedItemVar == '') {
    console.log("cnrRemovedItemVar == null || cnrRemovedItemVar == ''");
  };
  
  console.log("cnrRemovedItemVar = ", cnrRemovedItemVar);
  console.table(cnrTODOList.cnrDataListGetItems());

  // update storage
  if (cnrStorageModule.cnrLocalStorageHasKey('cnrDataList')) {
    cnrStorageModule.cnrLocalStorageUpdate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  } else {
    cnrStorageModule.cnrLocalStorageCreate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  };

};

/**	Removes an item from the item list. 
 * Updates display element. 
 * Updates localStorage.
*/
function cnrUpdateStatus(cnrItemIDParam) {
  console.clear();
  if (cnrItemIDParam == null || cnrItemIDParam == '') {
    console.log("cnrItemIDParam = ", cnrItemIDParam);
    return;
  };

  // update status
  const cnrStatusItemVar = cnrTODOList.cnrDataListUpdateItemStatusForID(cnrItemIDParam);
  if (cnrStatusItemVar == null || cnrStatusItemVar == '') {
    console.log("cnrStatusItemVar == null || cnrStatusItemVar == ''");
  };
  
  console.table(cnrTODOList.cnrDataListGetItems());

  // update storage
  if (cnrStorageModule.cnrLocalStorageHasKey('cnrDataList')) {
    cnrStorageModule.cnrLocalStorageUpdate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  } else {
    cnrStorageModule.cnrLocalStorageCreate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  };

  // render items
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  cnrDataRenderItems(cnrContainerElementVar);

};


/* ************************************************************************* */
// DISPLAY HANDLERS

/**	Finds entries for passed key in passed list of data items.
 * Requests the rendering of each entry in a selected element object. */
function cnrDataRenderItems(cnrContainerElementParam) {
  cnrClearDisplay();
  if (cnrTODOList == null || cnrTODOList == '') {
    console.log("ERROR: cnrTODOList = ", cnrTODOList);
    return;
  };

  // parse items
  const cnrLength = cnrTODOList.cnrDataListGetItemCount();
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++) {
    // get id
    const cnrDataItemIDVar = cnrTODOList.cnrDataListGetItemIDForIndex(cnrCounter);
    // get status
    const cnrStatusElementVar = cnrTODOList.cnrDataListGetItemStatusForIndex(cnrCounter);  
    // get data
    const cnrItemData = cnrTODOList.cnrDataListGetItemDataForIndex(cnrCounter);
    const cnrDataObject = JSON.parse(cnrItemData);
    if (cnrDataObject == null || cnrDataObject == '') {
      console.log("ERROR: cnrDataItemObject = ", cnrDataObject);
      return;
    };
    const cnrDataStatusVar = cnrTODOList.cnrDataListGetItemStatusForIndex(cnrCounter);
    const cnrDataTitleVar = cnrDataObject.cnrTaskTitle;
    // render data
    const cnrJSContentDivVar = document.createElement('div');
    cnrJSContentDivVar.classList.add('cnrjscontentdivs');
    cnrJSContentDivVar.id = cnrDataItemIDVar;
    cnrJSContentDivVar.onclick = cnrItemClickHandler;
    if (cnrStatusElementVar == 'X') {
      cnrJSContentDivVar.innerHTML = `
        <div class="cnrjsstatusdivs cnrjsstatusdivscompleted">${cnrDataStatusVar}</div>
        <div class="cnrjstaskdivs cnrjstaskdivscompleted">${cnrDataTitleVar}</div>
        <div class="cnrjsdeleteitemdivs">X</div>
      `;

    } else {
      cnrJSContentDivVar.innerHTML = `
        <div class="cnrjsstatusdivs">${cnrDataStatusVar}</div>
        <div class="cnrjstaskdivs">${cnrDataTitleVar}</div>
        <div class="cnrjsdeleteitemdivs">X</div>
      `;
    };

    cnrContainerElementParam.appendChild(cnrJSContentDivVar);

  };

}; // cnrDataRenderItems

/**	Removes all items from display element. */
function cnrClearDisplay() {
  console.clear();
  // remove from display element
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  while (cnrContainerElementVar.firstChild) {
    cnrContainerElementVar.removeChild(cnrContainerElementVar.firstChild);
  };
};
