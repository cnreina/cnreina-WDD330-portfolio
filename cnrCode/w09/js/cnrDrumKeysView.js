/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE
window.onload = function () {
  // init event listeners
  // sound buttons click
  cnrAddEventListenerToClass(cnrGetClickOrTouchEventName(), 'key', cnrElementClickHandler);

  // sound buttons keyup
  window.addEventListener('keyup', cnrWindowKeyUpHandler);

}; // window.onload


function cnrElementClickHandler() {
  const cnrKeyData = this.dataset.key;
  if (cnrKeyData === null || cnrKeyData === '') {
    console.log("EROR: cnrElementClickHandler > cnrKeyData ", cnrKeyData);
    return null;
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
  cnrPlaySound(cnrKeyData);
};

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
};

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

/** cnrAddEventListenerToClass. 
 * Adds the passed event listener to each element for
 * the passed class. 
 * Returns null on errors. 
*/
function cnrAddEventListenerToClass(cnrEventParam, cnrClassParam, cnrHandlerParam) {
  if (cnrEventParam === null || cnrEventParam === '') {
    console.log('ERROR: cnrAddEventListenerToClass > cnrEventParam ', cnrEventParam);
    return null;
  };
  if (cnrClassParam === null || cnrClassParam === '') {
    console.log('ERROR: cnrAddEventListenerToClass > cnrClassParam ', cnrClassParam);
    return null;
  };
  if (cnrHandlerParam === null || cnrHandlerParam === '') {
    console.log('ERROR: cnrAddEventListenerToClass > cnrHandlerParam ', cnrHandlerParam);
    return null;
  };

  let cnrClassVar = cnrClassParam;
  if (cnrClassParam[0] != '.') {
    cnrClassVar = '.' + cnrClassParam;
  };
  const cnrElementsFromClass = document.querySelectorAll(cnrClassVar);
  for (const cnrElementVar of cnrElementsFromClass) {
    cnrElementVar.addEventListener(cnrEventParam, cnrHandlerParam);
  };
};
