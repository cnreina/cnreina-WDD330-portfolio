/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrDisplay from './cnrDisplay.js';
import * as cnrData from './cnrData.js';

const cnrHikesURL = "../../html/w08/cnrItemsView.html";

/*	create new comments object
  Data is loaded from localstorage if data type parameter exists.
*/
const cnrCommentSchema = {
  cnrID: 'Comment ID. Use it to link comment with subject.',
  cnrDate: 'Comment date and time in UTC format.',
  cnrComment: 'Comment content.'
};
const cnrComments = new cnrData.cnrItemsClass('cnrComments', cnrCommentSchema);


window.onload = function () {
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

  const cnrSubmitButtonVar = document.getElementById('cnrcommentsubmitbutton');
  cnrSubmitButtonVar.addEventListener(cnrClickOrTouchEventVar, cnrSubmitClickHandler);

  const cnrInputTextVar = document.getElementById('cnrcommentinput');
  cnrInputTextVar.addEventListener('keyup', cnrInputKeyUpHandler);
  
  cnrWindowOnLoadHandler();
}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrWindowOnLoadHandler() {
  // get query string data
  const cnrNameVar = cnrGetQueryStringValue('cnrName');
  const cnrImageURLVar = cnrGetQueryStringValue('cnrImageURL');
  const cnrLocationVar = cnrGetQueryStringValue('cnrLocation');
  const cnrRatingVar = cnrGetQueryStringValue('cnrRating');
  const cnrDifficultyVar = cnrGetQueryStringValue('cnrDifficulty');
  const cnrDirectionsVar = cnrGetQueryStringValue('cnrDirections');
  const cnrDescriptionVar = cnrGetQueryStringValue('cnrDescription');

  // render data
  document.getElementById('cnrcardheadertitle').innerText = cnrNameVar;
  document.getElementById('cnrcardimage').setAttribute('src', cnrImageURLVar);
  document.getElementById('cnrlocation').innerText = cnrLocationVar;
  document.getElementById('cnrrating').innerText = cnrRatingVar;
  document.getElementById('cnrdifficulty').innerText = cnrDifficultyVar;
  document.getElementById('cnrdirections').innerText = cnrDirectionsVar;
  document.getElementById('cnrdescription').innerText = cnrDescriptionVar;
  // render comments
  cnrDisplay.cnrRenderCommentsForID('cnrcomments', cnrComments.cnrGetItemsDataForName('comment'), cnrNameVar);
}; // cnrWindowOnLoadHandler

function cnrBackLinksClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  window.location.href = cnrHikesURL;
};

function cnrInputKeyUpHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  if (this.value === null || this.value === '') {
    document.getElementById('cnrcommentsubmitbutton').disabled = true;
  } else {
    document.getElementById('cnrcommentsubmitbutton').disabled = false;
  };
};

function cnrSubmitClickHandler(cnrEventParam) {
  cnrEventParam.preventDefault();
  // get input
  const cnrInputVar = document.getElementById('cnrcommentinput');
  if (cnrInputVar === null) {
    console.log("ERROR: cnrSubmitClickHandler > cnrInputVar", cnrInputVar);
    return;
  };

  // add comment
  const cnrInputValueVar = cnrInputVar.value;
  if (cnrInputValueVar === null || cnrInputValueVar === '') { return; };
  const cnrInputIDVar = cnrGetQueryStringValue('cnrName');

  const cnrNewComment = {
    cnrID: cnrInputIDVar,
    cnrDate: cnrGetUTCDateTime(),
    cnrComment: cnrInputValueVar
  };
  cnrComments.cnrAddItem('comment', true, cnrNewComment);
  if (cnrComments.cnrGetClassHasErrors()) {
    console.log("cnrGetClassHasErrors > ", cnrComments.cnrGetLastErrorMessage());
  };

  // update storage
  cnrComments.cnrSaveClassData();

  // update display
  cnrDisplay.cnrRenderCommentsForID('cnrcomments', cnrComments.cnrGetItemsDataForName('comment'), cnrInputIDVar);

}; // cnrSubmitClickHandler

/* ************************************************************************* */
// CONTROLLERS

function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam)
  return cnrValueVar;
};

/**	Returns current UTC date and time. */
function cnrGetUTCDateTime() {
  const cnrDateTimeVar = new Date();
  const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
  return cnrDateTimeUTCVar;
};

/**	Updates data storage. */
function cnrUpdateStorage() {
    cnrStorage.cnrLocalStorageUpdate('cnrComments', JSON.stringify(cnrComments.cnrGetItemsDataForName('comment')));
};
