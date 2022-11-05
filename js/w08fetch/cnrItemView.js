/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrData from './cnrData.js';
import * as cnrDisplay from './cnrDisplay.js';

const cnrPeopleViewURL = "../../html/w08fetch/cnrPeopleView.html";
let cnrComments = null;

// INITIALIZE
window.onload = function () {
  // create new comments object
  const cnrCommentSchema = {
    cnrID: 'Comment ID. Use it to link comment with subject.',
    cnrDate: 'Comment date and time in UTC format.',
    cnrComment: 'Comment content.'
  };
  cnrComments = new cnrData.cnrItemsClass('cnrComments', cnrCommentSchema);
  
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
  const cnrBackToListLinkVar = document.getElementById('cnrbacklinkdiv');
  cnrBackToListLinkVar.addEventListener(cnrClickOrTouchEventVar, cnrBackLinksClickHandler);

  cnrWindowOnLoadHandler();
}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrWindowOnLoadHandler() {
  // get query string data
  const cnrNameVar = cnrGetQueryStringValue('cnrName');
  const cnrGenderVar = cnrGetQueryStringValue('cnrGender');
  const cnrBirthYearVar = cnrGetQueryStringValue('cnrBirthYear');
  const cnrHeightVar = cnrGetQueryStringValue('cnrHeight');
  const cnrSpeciesVar = cnrGetQueryStringValue('cnrSpecies');
  const cnrHomeWorldURLVar = cnrGetQueryStringValue('cnrHomeWorldURL');
  const cnrPageNumberVar = cnrGetQueryStringValue('cnrPageNumber');

  // render data
  document.getElementById('cnrcardheadertitle').innerText = cnrNameVar;
  document.getElementById('cnrname').innerText = cnrNameVar;
  document.getElementById('cnrgender').innerText = cnrGenderVar;
  document.getElementById('cnrbirthyear').innerText = cnrBirthYearVar;
  document.getElementById('cnrheight').innerText = cnrHeightVar;
  document.getElementById('cnrspecies').innerText = cnrSpeciesVar;
  document.getElementById('cnrhomeworld').innerText = cnrHomeWorldURLVar;

}; // cnrWindowOnLoadHandler

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();

  // prepare querystring data sent to people page
  const cnrPageNumberVar = cnrGetQueryStringValue('cnrPageNumber');
  const cnrItemObject = { cnrPageNumber: cnrPageNumberVar };
  const cnrEncodedStringVar = new URLSearchParams(cnrItemObject).toString();
  const cnrPeopleURLVar = `${cnrPeopleViewURL}?${cnrEncodedStringVar}`;

  window.location.href = cnrPeopleURLVar;
};

/* ************************************************************************* */
// CONTROLLERS

/**	cnrGetQueryStringValue. 
 * Returns query string value for passed key. 
 * Returns empty string on empty or errors. 
*/
function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam)
  return cnrValueVar;
};
