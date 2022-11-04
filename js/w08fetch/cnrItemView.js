/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrData from './cnrData.js';
import * as cnrDisplay from './cnrDisplay.js';

const cnrHikesURL = "../../html/w08fetch/cnrItemsView.html";
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

  // load fake comments if storage is empty
  if (cnrComments.cnrGetClassItemsCount() <= 1) {
    console.log('window.onload > Loading fake comments because storage is empty');
    const cnrDateTimeVar = cnrGetUTCDateTime();

    const cnrItem1 = {
      cnrID: 'Bechler Falls',
      cnrDate: cnrDateTimeVar,
      cnrComment: 'Bechler Falls comment 1'
    };
    cnrComments.cnrAddItem('comment', true, cnrItem1);

    const cnrItem2 = {
      cnrID: 'Teton Canyon',
      cnrDate: cnrDateTimeVar,
      cnrComment: 'Teton Canyon comment 1'
    };
    cnrComments.cnrAddItem('comment', true, cnrItem2);
    
    const cnrItem3 = {
      cnrID: 'Denanda Falls',
      cnrDate: cnrDateTimeVar,
      cnrComment: 'Denanda Falls comment 1'
    };
    cnrComments.cnrAddItem('comment', true, cnrItem3);

    // save fake comments
    cnrComments.cnrSaveClassData();
  };
  
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
  cnrDisplay.cnrRenderCommentsForID('cnrcomments', cnrComments.cnrGetItemsDataForName('cnrPerson'), cnrNameVar);
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
