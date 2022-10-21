/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE MODULES
import * as cnrDataModule from './cnrDataModule.js';
import * as cnrStorageModule from './cnrStorageModule.js';

// INITIALIZE CLASSES
const cnrTODOList = new cnrDataModule.cnrDataListClass();

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
  // get data list from storage
  const cnrDataVar = cnrStorageModule.cnrLocalStorageRetrieve('cnrDataList');
  if (cnrDataVar === null || cnrDataVar === '') {
    console.log(cnrStorageModule.cnrLocalStorageGetLastErrorMessage());
  } else {

    // get cnrData
    const cnrDataJSONVar = JSON.parse(cnrDataVar);
    console.log("cnrDataJSONVar = ", cnrDataJSONVar);
    // get cnrDataList
    if (Object.hasOwn(cnrDataJSONVar, 'cnrDataItem')) {

      console.log('entries = ', Object.entries(cnrDataJSONVar));
    };
    // parse cnrDataList
    let cnrDataListVar = [];
    let cnrDataItemsVar = [];
    if (typeof cnrDataJSONVar === 'object') {
      if (Object.hasOwn(cnrDataJSONVar, 'cnrDataList')) {
        for (const [key, value] of Object.entries(cnrDataJSONVar)) {
          cnrDataListVar = value;
          console.log("********** cnrDataListVar = ", cnrDataListVar);

          // get cnrDataItem
          for (const [key2, value2] of Object.entries(value)) {
            const cnrItemsJONVar = JSON.parse(value2);
            cnrDataItemsVar = cnrItemsJONVar;
            
          };
        };
      };
    };

    // parse cnrDataItem
    let cnrDataItemVar = [];
    if (typeof cnrDataItemsVar === 'object') {
      if (Object.hasOwn(cnrDataItemsVar, 'cnrDataItem')) {
        for (const [key, value] of Object.entries(cnrDataItemsVar)) {
          cnrDataItemVar = value;
          console.log("********** cnrDataItemVar = ", cnrDataItemVar);
          // for (const [key2, value2] of Object.entries(value)) {
          //   const cnrData2JSONVar = JSON.parse(value2);
          //   console.log("********** cnrData2JSONVar = ", cnrData2JSONVar);
          // };
        };
      };
    };
    
    let cnrCounterVar = 0;
    const cnrLengthVar = cnrDataItemsVar.length;
    for (cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      const cnrItemVar = cnrDataItemsVar[cnrCounterVar];
      console.log("cnrItemVar = ", cnrItemVar);
    };

  };
  
  // display item list
  const cnrContainerElementVar = document.getElementById("cnrjscontainerdiv1");
  const cnrDataListParamVar = cnrTODOList.cnrDataListGetList();
  cnrDataRenderList(cnrDataListParamVar, cnrContainerElementVar);

};

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
