/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

// MODULES
import * as cnrDataModule from './cnrDataModule.js';
import * as cnrStorageModule from './cnrStorageModule.js';

// CLASSES
let cnrTODOList = new cnrDataModule.cnrDataListClass();

// FLAGS
let cnrViewModeFlag = 'all';

// INITIALIZE HANDLERS
window.onload = function () {
  console.clear();
  
  // TEST
  // document.onresize = cnrTEST();
  document.onslotchange = cnrTEST();


  // click-touch handler
  let cnrClickOrTouchEventVar = '';
  if ("ontouchend" in document.documentElement) {
    console.log("Using touchend");
    cnrClickOrTouchEventVar = 'touchend';
  }
  else {
    console.log("Using click");
    cnrClickOrTouchEventVar = 'click';
  };

  // item handlers
  const cnrAddItemHandlerVar = document.getElementById('cnradditembutton');
  cnrAddItemHandlerVar.addEventListener(cnrClickOrTouchEventVar, cnrAddItemButtonHandler);
 
  // item content handlers
  const cnrItemsSelectedHandlerVar = document.querySelectorAll('.cnrjscontentdivs');
  for (const cnrItemSelectedVar of cnrItemsSelectedHandlerVar) {
    cnrItemSelectedVar.addEventListener(cnrClickOrTouchEventVar, cnrItemClickHandler);
  };

  // menu handlers
  const cnrMenuCounterVar = document.getElementById('cnrmenutaskcountdiv');
  cnrMenuCounterVar.addEventListener(cnrClickOrTouchEventVar, cnrMenuCounterHandler);
  const cnrMenuAllVar = document.getElementById('cnrmenualltasksdiv');
  cnrMenuAllVar.addEventListener(cnrClickOrTouchEventVar, cnrMenuAllHandler);
  const cnrMenuActiveVar = document.getElementById('cnrmenuactivetasksdiv');
  cnrMenuActiveVar.addEventListener(cnrClickOrTouchEventVar, cnrMenuActiveHandler);
  const cnrMenuCompletedVar = document.getElementById('cnrmenucompletedtasksdiv');
  cnrMenuCompletedVar.addEventListener(cnrClickOrTouchEventVar, cnrMenuCompletedHandler);

  // handle window onload event
  cnrWindowOnLoadHandler();

}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrTEST() {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  window.alert(window.innerHeight);
  
};

/**	Gets data list from storage.
 * Extracts data items from list.
 * Creates a new list and loads extracted items.
 * Requests the rendering of the items in a selected element.
 */
function cnrWindowOnLoadHandler() {
  // get cnrDataList string from storage
  const cnrDataListVar = cnrStorageModule.cnrLocalStorageRetrieve('cnrDataList');
  if (cnrDataListVar === null || cnrDataListVar === '') {
    console.log("ERROR: cnrWindowOnLoadHandler > cnrLocalStorageGetLastErrorMessage = " + cnrStorageModule.cnrLocalStorageGetLastErrorMessage());

    // update task count element
    const cnrMenuCounterVar = document.getElementById('cnrmenutaskcountdiv');
    cnrMenuCounterVar.innerText = 'No tasks';    
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

  // refresh display
  cnrDataRenderItems(document.getElementById("cnrjscontainerdiv1"));

}; // cnrWindowOnLoadHandler

/**	Adds a new item to the list */
function cnrAddItemButtonHandler(cnrEventParam) {
  cnrEventParam.preventDefault();

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
  if (cnrNewItemVar === null || cnrNewItemVar === '') {console.log("ERROR: cnrAddItemButtonHandler"); return; };
  
  // refresh display
  cnrChangeViewMode('all');
  cnrDataRenderItems(document.getElementById("cnrjscontainerdiv1"));

}; // cnrAddItemButtonHandler

/**	Handles click event on each item. */
function cnrItemClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  if (cnrEventParam == null || cnrEventParam == '') {
    console.log("ERROR: cnrEventParam = ", cnrItemIDParam);
    return;
  };

  // get id
  const cnrIDVar = this.id;
  if (cnrIDVar == null || cnrIDVar == '') {
    console.log("ERROR: cnrIDVar = ", cnrIDVar);
    return;
  };
  
  // DELETE EVENT
  if (cnrEventParam.target.classList.contains("cnrjsdeleteitemdivs")) {
    cnrRemoveItem(cnrIDVar);
    return;
  };

  // STATUS EVENT
  if (cnrEventParam.target.classList.contains("cnrjsstatusdivs")) {
    cnrUpdateStatus(cnrIDVar);
    return;
  };

  // TASK EVENT
  if (cnrEventParam.target.classList.contains("cnrjstaskdivs")) {
    console.log("Task Selected Event (" + cnrIDVar + ")");
    return;
  };

}; // cnrItemClickHandler

/**	Handles click event on Menu Counter */
function cnrMenuCounterHandler() {
  console.log("cnrMenuCounterHandler");
};

/**	Handles click event on Menu All */
function cnrMenuAllHandler() {
  cnrChangeViewMode('all');
};

/**	Handles click event on Menu Active */
function cnrMenuActiveHandler() {
  cnrChangeViewMode('active');
};

/**	Handles click event on Menu Completed */
function cnrMenuCompletedHandler() {
  cnrChangeViewMode('completed');
};


/* ************************************************************************* */
// EVENT CONTROLLERS

/**	Removes an item from the item list. 
 * Updates display element. 
 * Updates localStorage.
*/
function cnrRemoveItem(cnrItemIDParam) {
  if (cnrItemIDParam == null || cnrItemIDParam == '') {
    console.log("ERROR: cnrItemIDParam = ", cnrItemIDParam);
    return;
  };

  // remove from list
  const cnrRemovedItemVar = cnrTODOList.cnrDataListRemoveItemForID(cnrItemIDParam);
  if (cnrRemovedItemVar == null || cnrRemovedItemVar == '') {
    console.log("ERROR: cnrRemovedItemVar == null || cnrRemovedItemVar == ''");
  };
  
  // refresh display
  cnrDataRenderItems(document.getElementById("cnrjscontainerdiv1"));

}; // cnrRemoveItem

/**	Updates an item status by UUID. 
 * Updates display element. 
*/
function cnrUpdateStatus(cnrItemIDParam) {
  if (cnrItemIDParam == null || cnrItemIDParam == '') {
    console.log("ERROR: cnrItemIDParam = ", cnrItemIDParam);
    return;
  };

  // update status
  const cnrStatusItemVar = cnrTODOList.cnrDataListUpdateItemStatusForID(cnrItemIDParam);
  if (cnrStatusItemVar == null || cnrStatusItemVar == '') {
    console.log("cnrStatusItemVar == null || cnrStatusItemVar == ''");
  };
  
  // refresh display
  cnrChangeViewMode('all');
  cnrDataRenderItems(document.getElementById("cnrjscontainerdiv1"));

}; // cnrUpdateStatus


/* ************************************************************************* */
// DISPLAY CONTROLLERS

/**	Changes the view mode flag (cnrViewModeFlag). 
 * Updates display element. 
 * Modes: all, active, completed.
*/
function cnrChangeViewMode(cnrViewModeParam) {
  if (cnrViewModeParam == null || cnrViewModeParam == '') {
    console.log("ERROR: cnrViewModeParam = ", cnrViewModeParam);
    return;
  };
  if (cnrViewModeParam != 'all' &&
    cnrViewModeParam != 'active' &&
    cnrViewModeParam != 'completed') {
      console.log("ERROR: Unknown cnrViewModeParam (" + cnrViewModeParam + ")");
      return;
  };

  // update view mode flag
  cnrViewModeFlag = cnrViewModeParam;

  // refresh display
  cnrDataRenderItems(document.getElementById("cnrjscontainerdiv1"));

}; // cnrChangeViewMode

/**	Updates main menu view from mode flag (cnrViewModeFlag). */
function cnrUpdateMenuView() {
  // get menu handlers
  const cnrMenuAllVar = document.getElementById('cnrmenualltasksdiv');
  const cnrMenuActiveVar = document.getElementById('cnrmenuactivetasksdiv');
  const cnrMenuCompletedVar = document.getElementById('cnrmenucompletedtasksdiv');

  // process view mode
  switch (cnrViewModeFlag) {
    case 'all':
      cnrMenuAllVar.classList.add('cnrmenuselected');
      cnrMenuActiveVar.classList.remove('cnrmenuselected');
      cnrMenuCompletedVar.classList.remove('cnrmenuselected');
      break;
    
    case 'active':
      cnrMenuAllVar.classList.remove('cnrmenuselected');
      cnrMenuActiveVar.classList.add('cnrmenuselected');
      cnrMenuCompletedVar.classList.remove('cnrmenuselected');
      break;
    
    case 'completed':
      cnrMenuAllVar.classList.remove('cnrmenuselected');
      cnrMenuActiveVar.classList.remove('cnrmenuselected');
      cnrMenuCompletedVar.classList.add('cnrmenuselected');
      break;
  
    default:
      cnrMenuAllVar.classList.remove('cnrmenuselected');
      cnrMenuActiveVar.classList.remove('cnrmenuselected');
      cnrMenuCompletedVar.classList.remove('cnrmenuselected');
      break;
  };

}; // cnrUpdateMenuView

/**	Finds entries for passed key in passed list of data items.
 * Requests the rendering of each entry in a selected element object. */
function cnrDataRenderItems(cnrContainerElementParam) {

  // update storage
  cnrUpdateStorage();

  // clear display
  cnrClearDisplay();
  if (cnrTODOList == null || cnrTODOList == '') {
    console.log("ERROR: cnrTODOList = ", cnrTODOList);
    return;
  };
  
  // prepare task counters
  const cnrTotalItemCountVar = cnrTODOList.cnrDataListGetItemCount();
  const cnrActiveItemCountVar = cnrTODOList.cnrDataListGetActiveItemCount();
  let cnrCompletedCountVar = cnrTotalItemCountVar - cnrActiveItemCountVar;
  if (cnrCompletedCountVar <= 0) {cnrCompletedCountVar = 0;};
  // prepare task count elements
  const cnrMenuCounterVar = document.getElementById('cnrmenutaskcountdiv');
  // leave if list is empty
  if (cnrTODOList.cnrDataListGetItemCount() <= 0) { cnrMenuCounterVar.innerText = 'No tasks'; return; };
  let cnrTotalCountLabelVar = '';
  let cnrActiveCountLabelVar = '';
  let cnrCompletedCountLabelVar = '';
  if (cnrTotalItemCountVar <= 0) {cnrTotalCountLabelVar = `No tasks`;};
  if (cnrTotalItemCountVar > 1) {cnrTotalCountLabelVar = `${cnrTotalItemCountVar} tasks`;};
  if (cnrTotalItemCountVar == 1) {cnrTotalCountLabelVar = `${cnrTotalItemCountVar} task`;};
  if (cnrActiveItemCountVar <= 0) {cnrActiveCountLabelVar = `No tasks`;};
  if (cnrActiveItemCountVar > 1) {cnrActiveCountLabelVar = `${cnrActiveItemCountVar} tasks`;};
  if (cnrActiveItemCountVar == 1) {cnrActiveCountLabelVar = `${cnrActiveItemCountVar} task`;};
  if (cnrCompletedCountVar <= 0) {cnrCompletedCountLabelVar = `No tasks`;};
  if (cnrCompletedCountVar > 1) {cnrCompletedCountLabelVar = `${cnrCompletedCountVar} tasks`;};
  if (cnrCompletedCountVar == 1) { cnrCompletedCountLabelVar = `${cnrCompletedCountVar} task`; };
  
  // update display
  console.log("cnrViewModeFlag = ", cnrViewModeFlag);
  console.table(cnrTODOList.cnrDataListGetItems());
  
  // parse items
  const cnrLength = cnrTotalItemCountVar;
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++) {
    // get status
    const cnrStatusElementVar = cnrTODOList.cnrDataListGetItemStatusForIndex(cnrCounter);
    // get id
    const cnrDataItemIDVar = cnrTODOList.cnrDataListGetItemIDForIndex(cnrCounter);
    // get data
    const cnrItemData = cnrTODOList.cnrDataListGetItemDataForIndex(cnrCounter)
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

    // process view mode
    switch (cnrViewModeFlag) {
      case 'all':
        // update task count view
        cnrMenuCounterVar.innerText = cnrTotalCountLabelVar;
        // update menu view
        cnrUpdateMenuView();
        // create content elements
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
        break;
      
      case 'active':
        // update task count view
        cnrMenuCounterVar.innerText = cnrActiveCountLabelVar;
        // update menu view
        cnrUpdateMenuView();
        // create content elements
        if (cnrStatusElementVar == 'X') {
          continue;
        } else {
          cnrJSContentDivVar.innerHTML = `
            <div class="cnrjsstatusdivs">${cnrDataStatusVar}</div>
            <div class="cnrjstaskdivs">${cnrDataTitleVar}</div>
            <div class="cnrjsdeleteitemdivs">X</div>
          `;
        };
        break;
      
      case 'completed':
        // update task count view
        cnrMenuCounterVar.innerText = cnrCompletedCountLabelVar;
        // update menu view
        cnrUpdateMenuView();
        // create content elements
        if (cnrStatusElementVar == 'X') {
          cnrJSContentDivVar.innerHTML = `
            <div class="cnrjsstatusdivs cnrjsstatusdivscompleted">${cnrDataStatusVar}</div>
            <div class="cnrjstaskdivs cnrjstaskdivscompleted">${cnrDataTitleVar}</div>
            <div class="cnrjsdeleteitemdivs">X</div>
          `;
        } else {
          continue;
        };
        break;
    
      default:
        console.log("ERROR: cnrViewModeFlag = ", cnrViewModeFlag);
        return;
        break;
    };
    
    // render item
    cnrContainerElementParam.appendChild(cnrJSContentDivVar);
    cnrJSContentDivVar.scrollIntoView({behavior: 'smooth'});
  };

}; // cnrDataRenderItems

/**	Removes all items from display element. */
function cnrClearDisplay() {
  // console.clear();
  // remove from display element
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  while (cnrContainerElementVar.firstChild) {
    cnrContainerElementVar.removeChild(cnrContainerElementVar.firstChild);
  };
}; // cnrClearDisplay

/* ************************************************************************* */
// STORAGE CONTROLLERS

/**	Updates localStorage from cnrDataListClass. */
function cnrUpdateStorage() {
  if (cnrStorageModule.cnrLocalStorageHasKey('cnrDataList')) {
    cnrStorageModule.cnrLocalStorageUpdate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
  } else {
    if (cnrTODOList.cnrDataListGetItemCount() > 0) {
      cnrStorageModule.cnrLocalStorageCreate('cnrDataList', cnrTODOList.cnrDataListGetJSONString());
    };
  };
}; // cnrUpdateStorage
