/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrFetchModule from './cnrFetchModule.js';

const cnrTOP_OFFSET = 6;
const cnrLEFT_OFFSET = 4;

window.onload = function () {
  // init event listeners
  // buttons
  const cnrElementsFromClass = document.querySelectorAll('.cnrbuttons');
  for (const cnrElementVar of cnrElementsFromClass) {
    if (cnrIsTouchDevice()) {
      cnrElementVar.addEventListener('touchstart', cnrElementPointerDownHandler);
      cnrElementVar.addEventListener('touchend', cnrElementPointerUpHandler);
    } else {
      cnrElementVar.addEventListener('mousedown', cnrElementPointerDownHandler);
      cnrElementVar.addEventListener('mouseup', cnrElementPointerUpHandler);
    };
  };

  // get server state
  cnrFetchModule.cnrPOSTcnrCommand("state", "", cnrFetchResponseCallback, cnrFetchErrorCallback);

}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrElementPointerDownHandler() {
  const cnrCommandData = this.dataset.cnrcommand;
  if (cnrCommandData === null || cnrCommandData === '') {
    console.log("EROR: cnrElementPointerDownHandler > cnrCommandData ", cnrCommandData);
    return null;
  };
  if (!cnrIsValidCommand(cnrCommandData)) {
    return;
  };

  cnrProcessPointerDownEvent(cnrCommandData);
};

function cnrElementPointerUpHandler() {
  const cnrCommandData = this.dataset.cnrcommand;
  if (cnrCommandData === null || cnrCommandData === '') {
    console.log("EROR: cnrElementPointerUpHandler > cnrCommandData ", cnrCommandData);
    return null;
  };
  if (!cnrIsValidCommand(cnrCommandData)) {
    return;
  };

  cnrProcessPointerUpEvent(cnrCommandData);
};


/* ************************************************************************* */
// CONTROLLERS

/** cnrProcessPointerDownEvent. 
 * Returns null on errors. 
*/
function cnrProcessPointerDownEvent(cnrCommandParam) {
  if (cnrCommandParam === null || cnrCommandParam === '') {
    console.log("EROR: cnrProcessPointerDownEvent > cnrCommandParam ", cnrCommandParam);
    return null;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-cnrcommand="${cnrCommandParam}"]`);
  const cnrElement = cnrContainerElement[0];
  cnrElement.classList.add('cnrbuttondown');
  cnrElement.style.transform = `translate(${cnrLEFT_OFFSET}px, ${cnrTOP_OFFSET}px)`;
};

/** cnrProcessPointerUpEvent. 
 * Returns null on errors. 
*/
function cnrProcessPointerUpEvent(cnrCommandParam) {
  if (cnrCommandParam === null || cnrCommandParam === '') {
    console.log("EROR: cnrProcessPointerUpEvent > cnrCommandParam ", cnrCommandParam);
    return null;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-cnrcommand="${cnrCommandParam}"]`);
  const cnrElement = cnrContainerElement[0];
  cnrElement.classList.remove('cnrbuttondown');
  cnrElement.style.transform = `translate(0px, 0px)`;

  // send command
  cnrFetchModule.cnrPOSTcnrCommand(cnrCommandParam, "", cnrFetchResponseCallback, cnrFetchErrorCallback);

};


/* ************************************************************************* */
// TOOLS

/** cnrIsTouchDevice. 
 * Returns null on errors. 
*/
function cnrIsTouchDevice() {
  if ('ontouchend' in document.documentElement) { return true; };
  return false;
};

/** cnrIsValidCommand */
function cnrIsValidCommand(cnrParam){
  if (
    cnrParam === 'on' ||
    cnrParam === 'off' ||
    cnrParam === 'home' ||
    cnrParam === 'state'
  ) {
    return true;  
  };
  return false;
}; // cnrIsValidCommand

/** cnrFetchResponseCallback */
async function cnrFetchResponseCallback(cnrParam) {
  const cnrJSONData = await cnrParam.json();
  if(cnrJSONData === null || cnrJSONData === ''){
    console.log('ERROR: cnrJSONData ', cnrJSONData);
  };

  // process server state
  if (
    cnrJSONData.cnrCommand.command === 'state' ||
    cnrJSONData.cnrCommand.command === 'on' ||
    cnrJSONData.cnrCommand.command === 'off'
  ) {
    // ON
    if(cnrJSONData.cnrCommand.response === 'on'){
      const cnrContainerElement = document.getElementById('cnrcardheaderdiv');
      cnrContainerElement.classList.remove('cnrstateoff');
      cnrContainerElement.classList.add('cnrstateon');
    };

    // OFF
    if(cnrJSONData.cnrCommand.response === 'off'){
      const cnrContainerElement = document.getElementById('cnrcardheaderdiv');
      cnrContainerElement.classList.remove('cnrstateon');
      cnrContainerElement.classList.add('cnrstateoff');
    };
    return;
  };

  // process home page request
  if (cnrJSONData.cnrCommand.command === 'home') {
    if(cnrJSONData.cnrCommand.response != ''){
      window.location.href = cnrJSONData.cnrCommand.response;
      console.log('Home Page: ', cnrJSONData.cnrCommand.response);
    };
    return;
  };

}; // cnrFetchResponseCallback

/** cnrFetchErrorCallback */
function cnrFetchErrorCallback(cnrParam){
  console.log(cnrParam);

  // reset views
  const cnrContainerElement = document.getElementById('cnrcardheaderdiv');
  cnrContainerElement.classList.remove('cnrstateon');
  cnrContainerElement.classList.remove('cnrstateoff');
  
}; // cnrFetchErrorCallback
