/*	Carlos N Reina
  cnreina@gmail.com
*/


/**************************************************************************
INITIALIZE MODULE */

// IMPORT MODULES
import * as cnrStorageModule from './cnrStorageModule.js';
import * as cnrHikesModule from './cnrHikesModule.js';

// INSTANTIATE CLASSES
let cnrHikes = new cnrHikesModule.cnrHikesClass();

// INITIALIZE HANDLERS
window.onload = function () {
  // click or touch var
  let cnrClickOrTouchEventVar = '';
  if ("ontouchend" in document.documentElement) {
    console.log("Using touchend");
    cnrClickOrTouchEventVar = 'touchend';
  }
  else {
    console.log("Using click");
    cnrClickOrTouchEventVar = 'click';
  };
 
  // item content handlers
  const cnrItemsSelectedHandlerVar = document.querySelectorAll('.cnrjscontentdivs');
  for (const cnrItemSelectedVar of cnrItemsSelectedHandlerVar) {
    cnrItemSelectedVar.addEventListener(cnrClickOrTouchEventVar, cnrItemClickHandler);
  };

  // process window onload event
  cnrWindowOnLoadHandler();

}; // window.onload


/**************************************************************************
EVENT HANDLERS */

/**	Initializes data. */
function cnrWindowOnLoadHandler() {
  // get data string
  let cnrDataStringVar = cnrGetLocalData('cnrDataList');
  if (cnrDataStringVar === null || cnrDataStringVar === '') {
    cnrDataStringVar = cnrGetRemoteData('cnrDataList');
  };

  if (cnrDataStringVar === null || cnrDataStringVar === '') {
    console.log("ERROR: cnrDataStringVar > " + cnrStorageModule.cnrLocalStorageGetLastErrorMessage());
    return;
  };

  cnrLoadData(cnrDataStringVar);
}; // cnrWindowOnLoadHandler

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
  
  // HANDLE TARGETS

  // NAVIGATE EVENT
  if (cnrEventParam.target.classList.contains("cnrjsnavigatedivs")) {
    console.log("Navigate Event (" + cnrIDVar + ")");
    return;
  };

}; // cnrItemClickHandler


/* ************************************************************************* */
// EVENT CONTROLLERS

/**	Gets data from local storage based on passed id. 
 * Returns data as a string.
 * Returns empty string on errors. 
*/
function cnrGetLocalData(cnrDataIDParam) {
  if (cnrDataIDParam === null || cnrDataIDParam === '') {
    console.log("ERROR: cnrDataIDParam");
    return '';
  };

  const cnrDataStringVar = cnrStorageModule.cnrLocalStorageRetrieve(cnrDataIDParam);
  if (cnrDataStringVar === null || cnrDataStringVar === '') {
    return '';
  } else {
    return cnrDataStringVar;
  };
}; // cnrGetLocalData

/**	Gets data from remote location based on passed id. 
 * Returns data as a string.
 * Returns empty string on errors. 
*/
function cnrGetRemoteData(cnrDataIDParam) {
  if (cnrDataIDParam === null || cnrDataIDParam === '') {
    console.log("ERROR: cnrDataIDParam");
    return '';
  };

  // STUB
  console.log("WARNING: cnrGetRemoteData > Loading fake data");

  const cnrHikeObject = {
    cnrName: 'cnrName',
    cnrImageURL: 'cnrImageURL',
    cnrLocation: 'cnrLocation',
    cnrRating: 'cnrRating',
    cnrDifficulty: 'cnrDifficulty',
    cnrDescription: 'cnrDescription',
    cnrDirections: 'cnrDirections'
  };
  
  const cnrJSONData = [cnrHikeObject];
  const cnrFakeDataVar = JSON.stringify(cnrJSONData);
  return cnrFakeDataVar;
}; // cnrGetRemoteData

/**	Loads data from passed string. */
function cnrLoadData(cnrDataStringParam) {
  // create new list
  const cnrNewHikeList = new cnrHikesModule.cnrHikesClass();

  // get cnrDataList object from JSON
  const cnrDataJSONObject = JSON.parse(cnrDataStringParam);
  const cnrDataJSONKeys = Object.keys(cnrDataJSONObject);
  // get cnrDataItem objects
  const cnrLength = cnrDataJSONKeys.length;
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; ++cnrCounter){
    const cnrDataItemVar = cnrDataJSONObject[cnrDataJSONKeys[cnrCounter]];    
    if (cnrDataItemVar == null) { console.log("ERROR: cnrDataItemVar == null"); return; };
    const cnrDataItemObject = Object.keys(cnrDataItemVar);
    if (cnrDataItemObject == null) { console.log("ERROR: cnrDataItemObject == null"); return; };

    // load new list
    cnrNewHikeList.cnrHikesImportHike(cnrDataItemObject.cnrName, cnrDataItemObject.cnrImageURL, cnrDataItemObject.cnrLocation, cnrDataItemObject.cnrRating, cnrDataItemObject.cnrDifficulty, cnrDataItemObject.cnrDescription, cnrDataItemObject.cnrDirections);    
  };

  // save new loaded list
  cnrHikes = cnrNewHikeList;

  TODO needs imageurl parameter
  console.log("TEST: " + cnrHikes);
  console.table(cnrHikes);

  // refresh display
  cnrRenderData(document.getElementById("cnrjscontainerdiv1"));
}; // cnrLoadData

/**	Navigates based on passed id. */
function cnrNavigate(cnrIDParam) {
  if (cnrIDParam == null || cnrIDParam == '') {
    console.log("ERROR: cnrIDParam = ", cnrIDParam);
    return;
  };

  // navigate
  
  
  // refresh display
  cnrRenderData(document.getElementById("cnrjscontainerdiv1"));

}; // cnrNavigate


/* ************************************************************************* */
// DISPLAY CONTROLLERS

/**	Finds entries for passed key in passed list of data items.
 * Requests the rendering of each entry in a selected element object. */
function cnrRenderData(cnrContainerElementParam) {
  // update storage
  // cnrUpdateStorage();

  // clear display
  cnrClearElement("cnrjscontainerdiv1");
  
  // abort if list is empty
  if (cnrHikes.cnrHikesGetCount() <= 0) { return; };
  
  // update display
  console.table(cnrHikes.cnrHikesGetArray());
  
  // parse items
  const cnrLength = cnrHikes.cnrHikesGetCount();
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++) {
    // render data
    const cnrJSContentDivVar = document.createElement('div');
    cnrJSContentDivVar.classList.add('cnrjscontentdivs');
    cnrJSContentDivVar.id = cnrHikes.cnrHikesGetIDForIndex(cnrCounter);
    cnrJSContentDivVar.onclick = cnrItemClickHandler;
    cnrJSContentDivVar.innerHTML = `
      <div class="carddivs">
        <div class="headerdivs">
          <p class="headertitles">${cnrHikes.cnrHikesGetNameForIndex(cnrCounter)}</p>
        </div>
        <div class="gridcontainerdivs">
          <div class="gridcelldivs">
            <div class="imagedivs">
                <img class="images" src=${cnrHikes.cnrHikesGet(cnrCounter)} alt="Image">
            </div>
          </div>
          <div class="gridcelldivs">
            <div class="hikeinfodivs">
              <div class="hikebasicinfodivs">
                <p><b>Name:</b></p><p>${cnrHikeParam.cnrName}</p>
                <p><b>Location:</b></p><p>${cnrHikeParam.cnrLocation}</p>
                <p><b>Rating:</b></p><p>${cnrHikeParam.cnrRating}</p>
                <a class="detailslinks" href="../../html/w07/w07hike.html?${cnrEncodedStringVar}">Details</a>
              </div>
              <div class="hikefullinfodivs">
                <p><b>Dificulty:</b></p><p>${cnrHikeParam.cnrDifficulty}</p>
                <p><b>cnrDirections:</b></p><p>Go north . . .</p>
                <p><b>cnrDescription:</b></p><p>blah blah blah . . .</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // render item
    cnrContainerElementParam.appendChild(cnrJSContentDivVar);
    cnrJSContentDivVar.scrollIntoView({behavior: 'smooth'});
  };

}; // cnrRenderData

function cnrRenderHike(cnrHikeParam) {
  const cnrHikeObject = {
    cnrName: cnrHikeParam.cnrName,
    cnrImageURL: cnrHikeParam.cnrImageURL,
    cnrLocation: cnrHikeParam.cnrLocation,
    cnrRating: cnrHikeParam.cnrRating,
    cnrDifficulty: cnrHikeParam.cnrDifficulty,
    cnrDescription: cnrHikeParam.cnrDescription,
    cnrDirections: cnrHikeParam.cnrDirections
  };
  const cnrEncodedStringVar = new URLSearchParams(cnrHikeObject).toString();
  
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('carddivs');
  cnrCardDivVar.innerHTML = `
    <div class="carddivs">
      <div class="headerdivs">
        <p class="headertitles">${cnrHikeParam.cnrName}</p>
      </div>
      <div class="gridcontainerdivs">
        <div class="gridcelldivs">
          <div class="imagedivs">
              <img class="images" src=${cnrHikeParam.cnrImageURL} alt="Image">
          </div>
        </div>
        <div class="gridcelldivs">
          <div class="hikeinfodivs">
            <div class="hikebasicinfodivs">
              <p><b>Name:</b></p><p>${cnrHikeParam.cnrName}</p>
              <p><b>Location:</b></p><p>${cnrHikeParam.cnrLocation}</p>
              <p><b>Rating:</b></p><p>${cnrHikeParam.cnrRating}</p>
              <a class="detailslinks" href="../../html/w07/w07hike.html?${cnrEncodedStringVar}">Details</a>
            </div>
            <div class="hikefullinfodivs">
              <p><b>Dificulty:</b></p><p>${cnrHikeParam.cnrDifficulty}</p>
              <p><b>cnrDirections:</b></p><p>Go north . . .</p>
              <p><b>cnrDescription:</b></p><p>blah blah blah . . .</p>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

  return cnrCardDivVar;
}; // cnrRenderHike

/**	Removes all items from display element. */
function cnrClearElement(cnrElementIDParam) {
  // console.clear();
  // remove from element
  const cnrContainerElementVar = document.getElementById(cnrElementIDParam);
  while (cnrContainerElementVar.firstChild) {
    cnrContainerElementVar.removeChild(cnrContainerElementVar.firstChild);
  };
}; // cnrClearElement

/* ************************************************************************* */
// STORAGE CONTROLLERS

/**	Updates localStorage. */
function cnrUpdateStorage() {
  const cnrDataJSONStringVar = cnrHikes.cnrHikesGetJSONString();
  if (cnrDataJSONStringVar === null || cnrDataJSONStringVar === '') {
    console.log("ERROR: cnrHikes.cnrHikesGetJSONString");
    return;
  };

  if (cnrStorageModule.cnrLocalStorageHasKey('cnrDataList')) {
    cnrStorageModule.cnrLocalStorageUpdate('cnrDataList', cnrDataJSONStringVar);
  } else {
    if (cnrDataList.cnrDataListGetItemCount() > 0) {
      cnrStorageModule.cnrLocalStorageCreate('cnrDataList', cnrDataJSONStringVar);
    };
  };
}; // cnrUpdateStorage
