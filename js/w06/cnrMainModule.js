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

/**	Gets item list from storage.
 * Requests the rendering of the item list in the selected element.
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
  for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++){
    const cnrDataItemVar = cnrDataJSONObject[cnrDataJSONKeys[cnrCounter]];
    if (cnrDataItemVar == null) { console.log("ERROR: cnrDataItemVar == null"); return; };
    const cnrDataItemObject = JSON.parse(cnrDataItemVar);
    if (cnrDataItemObject == null) { console.log("ERROR: cnrDataItemObject == null"); return; };

    // load cnrTODOList
    cnrNewTODOList.cnrDataListImportItem(cnrDataItemObject.cnrItemID, cnrDataItemObject.cnrItemCreatedTimeUTC, cnrDataItemObject.cnrItemUpdatedTimeUTC, cnrDataItemObject.cnrItemType, cnrDataItemObject.cnrItemStatus, cnrDataItemObject.cnrItemTag, cnrDataItemObject.cnrItemData);

    // console.log("cnrItemID = ", cnrDataItemObject.cnrItemID);
    // console.log("cnrItemCreatedTimeUTC = ", cnrDataItemObject.cnrItemCreatedTimeUTC);
    // console.log("cnrItemUpdatedTimeUTC = ", cnrDataItemObject.cnrItemUpdatedTimeUTC);
    // console.log("cnrItemType = ", cnrDataItemObject.cnrItemType);
    // console.log("cnrItemStatus = ", cnrDataItemObject.cnrItemStatus);
    // console.log("cnrItemTag = ", cnrDataItemObject.cnrItemTag);
    // console.log("cnrItemData = ", cnrDataItemObject.cnrItemData);
    // console.log("\n");

  };

  cnrTODOList = cnrNewTODOList;

  // display item list
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  const cnrDataListParamVar = cnrTODOList.cnrDataListGetList();
  cnrDataRenderList(cnrDataListParamVar, cnrContainerElementVar);

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
  // prepare json
  const cnrItemDataVar = {cnrTaskStatus: 'active', cnrTaskTitle: cnrToDoTitleVar};
  // add task
  const cnrNewItemVar = cnrTODOList.cnrDataListAddItem('json', 'cnrDataItem', cnrItemDataVar);
  
  // display new task
  cnrDataRenderItem(document.getElementById("cnrjscontainerdiv1"), cnrNewItemVar);

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
  // console.log("cnrEventParam.parent = ", cnrEventParam.parent);

  if (cnrEventParam == null) { return; };
  
  // DELETE ITEM
  if (cnrEventParam.target.classList.contains("cnrjsdeleteitemdivs")) {
    cnrDeleteItem(this.id);
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
  console.table(cnrTODOList.cnrDataListGetList());

  // update storage
  if (cnrStorageModule.cnrLocalStorageHasKey('cnrDataList')) {
    cnrStorageModule.cnrLocalStorageUpdate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  } else {
    cnrStorageModule.cnrLocalStorageCreate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  };

};


/* ************************************************************************* */
// DISPLAY HANDLERS

/**	Renders the passed list of data items in the passed element object. */
function cnrDataRenderList(cnrDataListParam, cnrContainerElementParam) {
  cnrDataListParam.forEach(cnrDataItemVar => {
    cnrDataRenderItem(cnrContainerElementParam, cnrDataItemVar);
  });
};

/**	Renders one data item. */
function cnrDataRenderItem(cnrContainerElementParam, cnrDataItemParam) {
  console.log("cnrDataRenderItem > cnrDataItemParam = " + cnrDataItemParam);

  const cnrDataItemVar = cnrDataItemParam;
  const cnrDataItemIDVar = cnrDataItemVar.cnrDataItemGetID();
  const cnrDataItemDataVar = cnrDataItemVar.cnrDataItemGetData();

  const cnrJSContentDivVar = document.createElement('div');
  cnrJSContentDivVar.classList.add('cnrjscontentdivs');
  cnrJSContentDivVar.id = cnrDataItemIDVar;
  cnrJSContentDivVar.onclick = cnrItemClickHandler;
  cnrJSContentDivVar.innerHTML = `
    <div class="cnrjsstatusdivs">X</div>
    <div class="cnrjstaskdivs">${cnrDataItemDataVar}</div>
    <div class="cnrjsdeleteitemdivs">X</div>
  `;
  cnrContainerElementParam.appendChild(cnrJSContentDivVar);

  console.log("cnrJSContentDivVar.id = ", cnrJSContentDivVar.id);

  return cnrJSContentDivVar;

}; // cnrDataRenderItem
