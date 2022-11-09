/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrTOP_OFFSET = 10;
const cnrLEFT_OFFSET = 0;

window.onload = function () {
  // init event listeners
  
  // sound buttons keyup
  window.addEventListener('keyup', cnrWindowKeyUpHandler);

  // sound buttons
  const cnrClickOrTouchVar = cnrGetClickOrTouchEventName();
  const cnrElementsFromClass = document.querySelectorAll('.key');
  for (const cnrElementVar of cnrElementsFromClass) {
    // click or touch
    cnrElementVar.addEventListener(cnrClickOrTouchVar, cnrElementClickHandler);
    // top position
    cnrElementVar.dataset.cnroffsetcount = `0`;
  };

  // sound events
  const cnrAudioElements = document.querySelectorAll('audio');
  for (const cnrElementVar of cnrAudioElements) {
    cnrElementVar.onended = cnrAudioEndedHandler;
  };

}; // window.onload


/* ************************************************************************* */
// EVENT HANDLERS

function cnrElementClickHandler() {
  const cnrKeyData = this.dataset.key;
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrElementClickHandler > cnrKeyData ", cnrKeyData);
    return null;
  };
  if (!cnrIsValidKey(cnrKeyData)) {
    return;
  };

  cnrPlaySound(cnrKeyData);
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

  cnrPlaySound(cnrKeyData);
};

function cnrAudioEndedHandler(cnrParam) {
  if (cnrParam === null || cnrParam === '') {
    console.log("EROR: cnrAudioEndedHandler > cnrParam ", cnrParam);
    return null;
  };

  const cnrIDVar = cnrParam.target.dataset.key;
  if (!cnrIsValidKey(cnrIDVar)) {
    return;
  };

  // update container view
  const cnrContainerElement = document.querySelectorAll(`[data-key="${cnrIDVar}"]`);
  const cnrAudioContainerElement = cnrContainerElement[0];
  cnrAudioContainerElement.classList.remove('playing');
  
  // reset offset count
  if (Number(cnrAudioContainerElement.dataset.cnroffsetcount) >= 10) {
    cnrAudioContainerElement.dataset.cnroffsetcount = `0`;
    cnrAudioContainerElement.style.transform = `translate(0px, 0px)`;
  };
};


/* ************************************************************************* */
// CONTROLLERS

/** cnrPlaySound. 
 * Plays the sound matching the passed id. 
 * Returns null on errors. 
*/
function cnrPlaySound(cnrIDParam) {
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("EROR: cnrPlaySound > cnrIDParam ", cnrIDParam);
    return null;
  };

  // play sound
  const cnrAudioElement = document.querySelectorAll(`[data-key="${cnrIDParam}"]`);
  if (cnrAudioElement === null || cnrAudioElement === '') {
    console.log("EROR: cnrElementClickHandler > cnrAudioElement ", cnrAudioElement);
    return null;
  };
  cnrAudioElement[1].currentTime = 0;
  cnrAudioElement[1].play();

  // update container view
  const cnrAudioContainerElement = cnrAudioElement[0];
  cnrAudioContainerElement.classList.add('playing');
  
  cnrAudioContainerElement.dataset.cnroffsetcount = `${Number(cnrAudioContainerElement.dataset.cnroffsetcount) + 1}`;
  const cnrTopOffsetVar = cnrTOP_OFFSET * Number(cnrAudioContainerElement.dataset.cnroffsetcount)
  cnrAudioContainerElement.style.transform = `translate(${cnrLEFT_OFFSET}px, ${cnrTopOffsetVar}px)`;

};


/* ************************************************************************* */
// TOOLS

/** cnrGetClickOrTouchEventName. 
 * Returns 'touchend' if present. 
 * Returns 'click' if present and 'touchend'
 * is not present. 
 * Returns null on errors. 
*/
function cnrGetClickOrTouchEventName() {
  if ('ontouchend' in document.documentElement) {
    return 'touchend';
  };

  if ('click' in document.documentElement) {
    return 'click';
  };

    return null;
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
    cnrIDVAr === 68 ||
    cnrIDVAr === 70 ||
    cnrIDVAr === 71 ||
    cnrIDVAr === 72 ||
    cnrIDVAr === 74 ||
    cnrIDVAr === 75 ||
    cnrIDVAr === 76
  ) { return true; };

  return false;
};
