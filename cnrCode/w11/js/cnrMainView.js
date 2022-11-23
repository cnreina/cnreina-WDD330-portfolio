/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// MODULES

import * as cnrAuthModule from './cnrAuth.js';

let cnrAuth = null;

/* ************************************************************************* */
// INITIALIZE

window.onload = function () {
  const cnrSubmitButton = document.getElementById('cnrsubmitbutton');
  cnrSubmitButton.addEventListener('pointerup', cnrSubmitButtonPointerUpHandler);

  // TEST DATA
  const cnrUsernameVar = document.getElementById('email');
  cnrUsernameVar.value = 'user1@email.com';
  const cnrPasswordVar = document.getElementById('password');
  cnrPasswordVar.value = 'user1';

  // instantiate auth class
  cnrAuth = new cnrAuthModule.Auth();

}; // window.onload

/** cnrSubmitButtonPointerUpHandler */
function cnrSubmitButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  if(cnrAuth === null){
    console.log('ERROR: cnrSubmitButtonPointerUpHandler > cnrAuth\n', cnrAuth);
    return;
  };

  // get input elements
  const cnrEmailVar = document.getElementById('email');
  if(cnrEmailVar === null || cnrEmailVar === ''){
    console.log('ERROR: cnrSubmitButtonPointerUpHandler > cnrEmailVar\n', cnrEmailVar);
    return;
  };
  const cnrPasswordVar = document.getElementById('password');
  if(cnrPasswordVar === null || cnrPasswordVar === ''){
    console.log('ERROR: cnrSubmitButtonPointerUpHandler > cnrPasswordVar\n', cnrPasswordVar);
    return;
  };

  // login
  cnrAuth.login(cnrEmailVar, cnrPasswordVar, cnrLoginCallback);

}; // cnrSubmitButtonPointerUpHandler

/** cnrLoginCallback */
function cnrLoginCallback() {
  return 'Response from cnrMainView.js > cnrLoginCallback\n';

}; // cnrLoginCallback
