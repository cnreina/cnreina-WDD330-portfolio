/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrTOP_OFFSET = 6;
const cnrLEFT_OFFSET = 4;
const cnrMapViewURL = "../html/cnrMapView.html";

window.onload = function () {
  // init event listeners
  // buttons keyboard
  window.addEventListener('keydown', cnrWindowKeyDownHandler);
  window.addEventListener('keyup', cnrWindowKeyUpHandler);

  // buttons pointer
  const cnrElementsFromClass = document.querySelectorAll('.cnrbuttons');
  for (const cnrElementVar of cnrElementsFromClass) {
    /* pointer event handlers are designed to never delay scrolling. */
    cnrElementVar.addEventListener('pointerdown', cnrElementPointerDownHandler);
    cnrElementVar.addEventListener('pointerup', cnrElementPointerUpHandler);
  };
}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrElementPointerDownHandler() {
  const cnrKeyData = Number(this.dataset.key);
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrElementClickHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessPointerDownEvent(cnrKeyData);
};

function cnrElementPointerUpHandler() {
  const cnrKeyData = Number(this.dataset.key);
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrElementPointerUpHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  console.log('TEST: ', cnrKeyData);

  cnrProcessPointerUpEvent(cnrKeyData);
};

function cnrWindowKeyDownHandler(cnrParam) {
  cnrParam.preventDefault();
  if (cnrParam === null || cnrParam === '') {
    console.log("EROR: cnrWindowKeyDownHandler > cnrParam ", cnrParam);
    return null;
  };

  const cnrKeyData = Number(cnrParam.which);
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrWindowKeyDownHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessPointerDownEvent(cnrKeyData);
};

function cnrWindowKeyUpHandler(cnrParam) {
  cnrParam.preventDefault();
  if (cnrParam === null || cnrParam === '') {
    console.log("EROR: cnrWindowKeyUpHandler > cnrParam ", cnrParam);
    return null;
  };

  const cnrKeyData = Number(cnrParam.which);
  console.log('TEST: ', cnrKeyData);

  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrWindowKeyUpHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessPointerUpEvent(cnrKeyData);
};


/* ************************************************************************* */
// CONTROLLERS

/** cnrProcessDownEvent. 
 * Returns null on errors. 
*/
function cnrProcessPointerDownEvent(cnrIDParam) {
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("EROR: cnrPlaySound > cnrIDParam ", cnrIDParam);
    return null;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-key="${cnrIDParam}"]`);
  const cnrElement = cnrContainerElement[0];
  cnrElement.classList.add('cnrpointerdown');
};

/** cnrProcessUpEvent. 
 * Processes passed event. 
 * Returns null on errors. 
*/
function cnrProcessPointerUpEvent(cnrIDParam) {
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("EROR: cnrProcessUpEvent > cnrIDParam ", cnrIDParam);
    return null;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-key="${cnrIDParam}"]`);
  const cnrElement = cnrContainerElement[0];
  cnrElement.classList.remove('cnrpointerdown');

  // process event
  switch (Number(cnrIDParam)) {
    case 65:
      window.location.href = `${cnrMapViewURL}`;
      break;
  
    default:
      break;
  }
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

/** cnrIsValidKey. 
 * Returns 'true' if passed key code is in the
 * list of valid keys. 
*/
function cnrIsValidKey(cnrIDParam) {
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("EROR: cnrIsValidKey > cnrIDParam ", cnrIDParam);
    return false;
  };

  const cnrIDVAr = Number(cnrIDParam);
  if (
    cnrIDVAr === 65 ||
    cnrIDVAr === 83 ||
    cnrIDVAr === 68
  ) { return true; };

  return false;
};
