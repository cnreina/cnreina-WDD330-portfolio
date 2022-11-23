/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// MODULES

import * as cnrAuth from './cnrAuth.js';

const cnrAuthVar = new cnrAuth.Auth();


/* ************************************************************************* */
// INITIALIZE

window.onload = function () {
  const cnrSubmitButton = document.getElementById('cnrsubmitbutton');
  cnrSubmitButton.addEventListener('pointerup', cnrSubmitButtonPointerUpHandler);

}; // window.onload

/** cnrSubmitButtonPointerUpHandler */
function cnrSubmitButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  const cnrUsernameVar = document.getElementById('cnrusername');
  if(cnrUsernameVar.value === null || cnrUsernameVar.value === ''){
    console.log('ERROR: cnrSubmitButtonPointerUpHandler > cnrUsernameVar\n', cnrUsernameVar);
    return;
  };

  const cnrPasswordVar = document.getElementById('cnrpassword');
  if(cnrPasswordVar.value === null || cnrPasswordVar.value === ''){
    console.log('ERROR: cnrSubmitButtonPointerUpHandler > cnrPasswordVar\n', cnrPasswordVar);
    return;
  };

  // login
  cnrAuthVar.login(cnrUsernameVar.value, cnrPasswordVar.value, cnrLoginCallback);

  cnrPasswordVar.value = '';

}; // cnrSubmitButtonPointerUpHandler

/** cnrLoginCallback */
function cnrLoginCallback(cnrParam){
  console.log('TEST: cnrLoginCallback\n', cnrParam);

}; // cnrLoginCallback
