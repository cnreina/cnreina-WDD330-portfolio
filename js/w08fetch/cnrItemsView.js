/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrData from './cnrData.js';
import * as cnrDisplay from './cnrDisplay.js';

const cnrFetchBaseURL = 'https://swapi.dev/api/';

let cnrPeople = null;
let cnrPagesCount = 0;
let cnrCurrentPageNumber = 0;

// INITIALIZE
window.onload = function () {
  cnrPagesCount = 0;

  // create new data object
  const cnrDataSchema = {
    cnrName: 'Person name.',
    cnrHeight: 'Person height.',
    cnrBirthYear: 'Person birth year.',
    cnrGender: 'Person gender.',
    cnrSpecies: 'Person species.',
    cnrHomeWorldURL: 'Person home world URL.'
  };
  cnrPeople = new cnrData.cnrItemsClass('cnrPeople', cnrDataSchema);

  // click or touch var
  let cnrClickOrTouchEventVar = '';
  if ("ontouchend" in document.documentElement) {
    console.log("Using touch");
    cnrClickOrTouchEventVar = 'touchend';
  }
  else {
    console.log("Using click");
    cnrClickOrTouchEventVar = 'click';
  };

  // init event listeners
  const cnrPreviousButtonVar = document.getElementById('cnrpreviousbutton');
  cnrPreviousButtonVar.addEventListener(cnrClickOrTouchEventVar, cnrPreviousButtonClickHandler);

  const cnrNextButtonVar = document.getElementById('cnrnextbutton');
  cnrNextButtonVar.addEventListener(cnrClickOrTouchEventVar, cnrNextButtonClickHandler);

  const cnrPaginationLinksVar = document.getElementById('cnrpaginationlinkscontainerdiv');
  cnrPaginationLinksVar.addEventListener(cnrClickOrTouchEventVar, cnrPaginationLinksClickHandler);

  // load data
  cnrFetchJSON(cnrFetchBaseURL + 'people');

}; // window.onload

/**	cnrFetchJSON
 * Requests a JSON resource. 
*/
function cnrFetchJSON(cnrURLParam) {
  // fetch people
  const cnrHeaders = new Headers();
  const cnrRequest = new Request(cnrURLParam, {
    method: 'GET',
    headers: cnrHeaders,
    mode: 'cors',
    cache: 'default'
  });

  fetch(cnrRequest).then((response) => response.json())
  .then((cnrJSONData) => cnrProcesResponseJSON(cnrJSONData));
  
}; // cnrFetch

/**	cnrProcesResponseJSON. 
 * Process response json from fetch request. 
 * Updates data. 
 * Updates page navigation buttons. 
 * Updates pages count. 
*/
function cnrProcesResponseJSON(cnrResponseJSONParam) {
  if (cnrResponseJSONParam === null || cnrResponseJSONParam === '') {
    console.log('ERROR: cnrProcesResponseJSON > cnrResponseJSONParam');
    return null;
  };

  // reset data
  cnrPeople.cnrRemoveItems();
  console.log(cnrPeople.cnrGetClassItemsCount().toString());

  // process JSON
  const cnrTotalItemCountVar = cnrResponseJSONParam.count;
  const cnrPreviousPageURLVar = cnrResponseJSONParam.previous;
  const cnrNextPageURLVar = cnrResponseJSONParam.next;

  const cnrResultArray = cnrResponseJSONParam.results;
  if (cnrResultArray === null || cnrResultArray.length <= 0) {
    console.log('ERROR: cnrProcesResponseJSON > cnrResultArray');
    return null;
  };
  const cnrCurrentItemCountVar = cnrResultArray.length;

  // get items
  const cnrLength = cnrCurrentItemCountVar;
  let cnrCounter = 0;
  for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++){
    const cnrPersonVar = cnrResultArray[cnrCounter];
    const cnrItem = {
      cnrName: cnrPersonVar.name,
      cnrHeight: cnrPersonVar.height,
      cnrBirthYear: cnrPersonVar.birth_year,
      cnrGender: cnrPersonVar.gender,
      cnrSpecies: cnrPersonVar.species,
      cnrHomeWorldURL: cnrPersonVar.homeworld
    };
    // add item to data
    cnrPeople.cnrAddItem('cnrPerson', true, cnrItem);
  };

  // update pagination
  if (cnrPagesCount <= 0) {
    cnrPagesCount = (cnrTotalItemCountVar / cnrCurrentItemCountVar) + 1;
  };
  const cnrPreviousButtonVar = document.getElementById('cnrpreviousbutton');
  if (cnrPreviousPageURLVar === null || cnrPreviousPageURLVar === '') {
    cnrPreviousButtonVar.dataset.url = '';
    cnrPreviousButtonVar.disabled = true;
  } else {
    cnrPreviousButtonVar.dataset.url = cnrPreviousPageURLVar;
    cnrPreviousButtonVar.disabled = false;
  };
  
  const cnrNextButtonVar = document.getElementById('cnrnextbutton');
  if (cnrNextPageURLVar === null || cnrNextPageURLVar === '') {
    cnrNextButtonVar.dataset.url = '';
    cnrNextButtonVar.disabled = true;

    const cnrURLVar = new URL(cnrPreviousPageURLVar);
    const cnrURLParamsVar = new URLSearchParams(cnrURLVar.search);
    const cnrValueVar = cnrURLParamsVar.get('page');
    cnrCurrentPageNumber = Number(cnrValueVar) + 1;
    console.log('cnrCurrentPageNumber = ', cnrCurrentPageNumber);

  } else {
    cnrNextButtonVar.dataset.url = cnrNextPageURLVar;
    cnrNextButtonVar.disabled = false;

    const cnrURLVar = new URL(cnrNextPageURLVar);
    const cnrURLParamsVar = new URLSearchParams(cnrURLVar.search);
    const cnrValueVar = cnrURLParamsVar.get('page');
    cnrCurrentPageNumber = Number(cnrValueVar) - 1;
    console.log('cnrCurrentPageNumber = ', cnrCurrentPageNumber);
  };

  // display items
  cnrDisplay.cnrRenderItems('cnrjscontainerdiv1', cnrPeople.cnrGetItemsDataForName('cnrPerson'));

  // display pagination
  cnrDisplay.cnrRenderPagination('cnrpaginationlinkscontainerdiv', cnrCurrentPageNumber, cnrPagesCount);
  
}; // cnrProcessResponse

function cnrPreviousButtonClickHandler() {
  if (this.dataset.url === null || this.dataset.url === '') { return; };

  const cnrPreviousButtonVar = document.getElementById('cnrpreviousbutton');
  cnrPreviousButtonVar.disabled = true;
  // request previous page
  cnrFetchJSON(this.dataset.url);
};

function cnrNextButtonClickHandler() {
  if (this.dataset.url === null || this.dataset.url === '') { return; };

  const cnrNextButtonVar = document.getElementById('cnrnextbutton');
  cnrNextButtonVar.disabled = true;
  // request next page
  cnrFetchJSON(this.dataset.url);
};

function cnrPaginationLinksClickHandler(cnrParam) {
  cnrParam.preventDefault();
  if (cnrParam === null || cnrParam === '') {
    console.log("ERROR: cnrPaginationLinksClickHandler > cnrParam", cnrParam);
    return null;
  };

  const cnrLinkNumberVar = cnrParam.target.dataset.cnrvalue;
  if (cnrLinkNumberVar === null || cnrLinkNumberVar === '') {
    console.log("ERROR: cnrPaginationLinksClickHandler > cnrLinkNumberVar", cnrLinkNumberVar);
    return null;
  };

  // get page
  cnrFetchJSON(cnrFetchBaseURL + 'people/?page=' + cnrLinkNumberVar.toString());

};
