/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrTOP_OFFSET = 6;
const cnrLEFT_OFFSET = 4;

window.onload = function () {
  // init event listeners
  // buttons keyboard
  window.addEventListener('keydown', cnrWindowKeyDownHandler);
  window.addEventListener('keyup', cnrWindowKeyUpHandler);

  // buttons pointer
  const cnrElementsFromClass = document.querySelectorAll('.key');
  for (const cnrElementVar of cnrElementsFromClass) {
    /* 
      pointer event handlers are designed to never delay scrolling.

    */
    cnrElementVar.addEventListener('pointerdown', cnrElementPointerDownHandler);
    cnrElementVar.addEventListener('pointerup', cnrElementPointerUpHandler);
    
    // if (cnrIsTouchDevice()) {
    //   cnrElementVar.addEventListener('mousedown', cnrElementPointerDownHandler);
    //   cnrElementVar.addEventListener('touchend', cnrElementPointerUpHandler);
    // } else {
    //   cnrElementVar.addEventListener('mousedown', cnrElementPointerDownHandler);
    //   cnrElementVar.addEventListener('mouseup', cnrElementPointerUpHandler);
    // };
  };
}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrElementPointerDownHandler() {
  const cnrKeyData = this.dataset.key;
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrElementClickHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessDownEvent(cnrKeyData);
};

function cnrElementPointerUpHandler() {
  const cnrKeyData = this.dataset.key;
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrElementPointerUpHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessUpEvent(cnrKeyData);
};

function cnrWindowKeyDownHandler(cnrParam) {
  if (cnrParam === null || cnrParam === '') {
    console.log("EROR: cnrWindowKeyDownHandler > cnrParam ", cnrParam);
    return null;
  };

  const cnrKeyData = cnrParam.which;
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrWindowKeyDownHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessDownEvent(cnrKeyData);
};

function cnrWindowKeyUpHandler(cnrParam) {
  if (cnrParam === null || cnrParam === '') {
    console.log("EROR: cnrWindowKeyUpHandler > cnrParam ", cnrParam);
    return null;
  };

  const cnrKeyData = cnrParam.which;
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrWindowKeyUpHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrProcessUpEvent(cnrKeyData);
};


/* ************************************************************************* */
// CONTROLLERS

/** cnrProcessDownEvent. 
 * Returns null on errors. 
*/
function cnrProcessDownEvent(cnrIDParam) {
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("EROR: cnrPlaySound > cnrIDParam ", cnrIDParam);
    return null;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-key="${cnrIDParam}"]`);
  const cnrElement = cnrContainerElement[0];
  cnrElement.classList.add('playing');
  cnrElement.style.transform = `translate(${cnrLEFT_OFFSET}px, ${cnrTOP_OFFSET}px)`;
};

/** cnrProcessUpEvent. 
 * Returns null on errors. 
*/
function cnrProcessUpEvent(cnrIDParam) {
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("EROR: cnrProcessUpEvent > cnrIDParam ", cnrIDParam);
    return null;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-key="${cnrIDParam}"]`);
  const cnrElement = cnrContainerElement[0];
  cnrElement.classList.remove('playing');
  cnrElement.style.transform = `translate(0px, 0px)`;
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
