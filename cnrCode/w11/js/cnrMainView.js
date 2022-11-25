/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrAuthModule from './cnrAuth.js';

/**	cnrAuth. 
 * Basic JWT authentication. 
 * Functions: 
 * cnrLogIn, 
 * cnrGetCurrentUserDataByEmail, 
 * cnrLastError. 
*/
const cnrAuth = new cnrAuthModule.cnrAuthClass();

/**	window.onload. */
window.onload = function () {
  // init login form
  const cnrLoginForm = document.forms['cnrlogin'];
  cnrLoginForm.addEventListener('reset', cnrResetFormHandler, false);
  cnrLoginForm.email.addEventListener('keyup', cnrValidateEmailHandler);
  cnrLoginForm.password.addEventListener('keyup', cnrValidatePasswordHandler);
  const cnrSubmitButton = document.getElementById('cnrsubmitbutton');
  cnrSubmitButton.addEventListener('pointerup', cnrSubmitButtonPointerUpHandler);

  // init error elements
  const cnrEmailLabel = document.getElementById("cnremaillabel");
  const cnrEmailError = document.createElement('div');
  cnrEmailError.classList.add('cnrerror');
  cnrEmailError.id = 'cnremailerrordiv';
  cnrEmailLabel.append(cnrEmailError);

  const cnrPasswordLabel = document.getElementById("cnrpasswordlabel");
  const cnrPasswordError = document.createElement('div');
  cnrPasswordError.classList.add('cnrerror');
  cnrPasswordError.id = 'cnrpassworderrordiv';
  cnrPasswordLabel.append(cnrPasswordError);


  // TEST DATA
  const cnrUsernameVar = document.getElementById('email');
  cnrUsernameVar.value = 'user1@email.com';
  const cnrPasswordVar = document.getElementById('password');
  cnrPasswordVar.value = 'user1';

}; // window.onload


/* ************************************************************************* */
// HANDLERS

/** cnrSubmitButtonPointerUpHandler */
function cnrSubmitButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  if(cnrAuth === null){
    console.log('ERROR: cnrSubmitButtonPointerUpHandler > cnrAuth\n', cnrAuth);
    return;
  };

  // get form data
  const cnrLoginForm = document.forms['cnrlogin'];
  let cnrErrorCountVar = 0;

  // get email input
  const cnrEmailVar = cnrLoginForm.email.value;
  if (cnrEmailVar === null || cnrEmailVar === '') {
    cnrFormErrorHandler(true, "ERROR: Email is required", "cnremailerrordiv");
    cnrErrorCountVar++;
  } else {
    cnrFormErrorHandler(false, "", "cnremailerrordiv");
  };

  // get password input
  const cnrPasswordVar = cnrLoginForm.password.value;
  if (cnrPasswordVar === null || cnrPasswordVar === '') {
    cnrFormErrorHandler(true, "ERROR: Password is required", "cnrpassworderrordiv");
    cnrErrorCountVar++;
  } else {
    cnrFormErrorHandler(false, "", "cnrpassworderrordiv");
  };

  // check errors count
  if (cnrErrorCountVar != 0) { return; };
  
  // login
  cnrAuth.cnrLogIn(cnrEmailVar, cnrPasswordVar, cnrLoginCallback);

}; // cnrSubmitButtonPointerUpHandler


// FORM VALIDATORS

function cnrValidateEmailHandler() {
  const cnrEmailVar = this.value.toUpperCase();
  if (cnrEmailVar.startsWith('X')) {
    cnrFormErrorHandler(true, "ERROR: Email must not start with X", "cnremailerrordiv");
    return false;
  } else {
    cnrFormErrorHandler(false, "", "cnremailerrordiv");
    return true;
  };
};

function cnrValidatePasswordHandler() {
  const cnrPasswordVar = this.value.toUpperCase();
  if (cnrPasswordVar.startsWith('X')) {
    cnrFormErrorHandler(true, "ERROR: Password must not start with X", "cnrpassworderrordiv");
  } else {
    cnrFormErrorHandler(false, "", "cnrpassworderrordiv");
  };
};

function cnrResetFormHandler() {
  cnrFormErrorHandler(false, "", "cnremailerrordiv");
  cnrFormErrorHandler(false, "", "cnrpassworderrordiv");
};

function cnrFormErrorHandler(cnrDisplayErrorParam, cnrErrorMessageParam, cnrElementIdParam) {
  Event.preventDefault;

  const cnrErrorVar = document.getElementById(cnrElementIdParam);
  cnrErrorVar.textContent = cnrErrorMessageParam;

  if (cnrDisplayErrorParam) {
    cnrErrorVar.style.display = 'block'
  } else {
    cnrErrorVar.textContent = '';
    cnrErrorVar.style.display = 'none'
  };
};


/* ************************************************************************* */
// CALLBACK

/** cnrLoginCallback. 
 * Handles login errors. 
 * Displays user data. 
*/
function cnrLoginCallback(cnrErrorsParam = false) {
  if(cnrErrorsParam){
    console.log('ERROR: cnrLoginCallback > cnrAuth.cnrLastError()\n', cnrAuth.cnrLastError());
    return null;
  };

  // clear password field
  document.getElementById('password').value = '';
  // hide login
  document.getElementById('cnrlogin').classList.add('cnrhidden');

  // show user data
  document.getElementById('cnridlabel').children[0].textContent = `${cnrAuth.cnrUser.id}`;
  document.getElementById('cnrfirstnamelabel').children[0].textContent = `${cnrAuth.cnrUser.firstname}`;
  document.getElementById('cnrlastnamelabel').children[0].textContent = `${cnrAuth.cnrUser.lastname}`;
  document.getElementById('cnragelabel').children[0].textContent = `${cnrAuth.cnrUser.age}`;
  document.getElementById('cnruseremaillabel').children[0].textContent = `${cnrAuth.cnrUser.email}`;

  document.getElementById('cnruserdata').classList.remove('cnrhidden');

}; // cnrLoginCallback
