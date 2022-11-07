/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrDisplay from './w07display.js';
import * as cnrComments from './w07comments.js';
import * as cnrStorage from './w07storage.js';

const cnrCommentsObject = new cnrComments.cnrCommentsClass();
const cnrHikesURL = "../html/w07hikes.html";

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

  // init event listeners
  const cnrBackToListLinkVar = document.getElementById('cnrbacklinkdiv');
  cnrBackToListLinkVar.addEventListener(cnrClickOrTouchEventVar, cnrBackLinksClickHandler);

  const cnrSubmitButtonVar = document.getElementById('cnrcommentsubmitbutton');
  cnrSubmitButtonVar.addEventListener(cnrClickOrTouchEventVar, cnrSubmitClickHandler);

  const cnrInputTextVar = document.getElementById('cnrcommentinput');
  cnrInputTextVar.addEventListener('keyup', cnrInputKeyUpHandler);
  
  cnrWindowOnLoadHandler();
};


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
  const cnrCommentsVar = new cnrComments.cnrCommentsClass();
  cnrDisplay.cnrRenderCommentsForID('cnrcomments', cnrCommentsVar.cnrGetAllComments(), cnrNameVar);

};

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
  const cnrNewCommentObject = cnrCommentsObject.cnrAddComment(cnrInputIDVar, cnrInputValueVar);
  if (cnrNewCommentObject === null || cnrNewCommentObject === '') {
    console.log("ERROR: w07hike.js > cnrSubmitClickHandler > cnrNewCommentObject", cnrNewCommentObject);
    return;
  };

  // update display
  cnrDisplay.cnrRenderCommentsForID('cnrcomments', cnrCommentsObject.cnrGetAllComments(), cnrInputIDVar);

  // save comment
  if (cnrStorage.cnrLocalStorageHasKey('cnrComments') === true) {
    cnrStorage.cnrLocalStorageUpdate('cnrComments', cnrCommentsObject.cnrGetAllCommentsAsJSONString());
  } else {
    cnrStorage.cnrLocalStorageCreate('cnrComments', cnrCommentsObject.cnrGetAllCommentsAsJSONString());
  };
  
};

/* ************************************************************************* */
// CONTROLLERS

function cnrGetQueryStringValue(cnrKeyParam) {
  const cnrQueryStringVar = window.location.search;
  const cnrURLParamsVar = new URLSearchParams(cnrQueryStringVar);
  const cnrValueVar = cnrURLParamsVar.get(cnrKeyParam)
  return cnrValueVar;
};
