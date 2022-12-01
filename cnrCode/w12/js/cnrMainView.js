/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/**	Google Maps API
 * https://console.cloud.google.com/iam-admin/settings?project=lucid-tiger-368223
 * https://developers.google.com/maps/documentation/javascript/overview#maps_map_simple-javascript
*/

/* ************************************************************************* */
// INITIALIZE

// MODULES
import * as cnrAuthModule from './cnrAuthModule.js';
import * as cnrDataModule from './cnrDataModule.js';

/**	cnrAuth. 
 * JWT authentication class. 
 * Functions: 
 * cnrLogIn, 
 * cnrGetCurrentUserDataByEmail, 
 * cnrLastError. 
*/
const cnrAuth = new cnrAuthModule.cnrAuthClass();

/**	cnrJWTToken. 
 * cnrItemsClass for JWT token. 
*/
const cnrDataSchema = {
  cnrJWTData: 'JWT token data.',
  cnrJWTExpire: 'JWT token expiration.',
  cnrJWTEmail: 'JWT token email.'
};
const cnrJWTToken = new cnrDataModule.cnrItemsClass('cnrJWTToken', cnrDataSchema);

const cnrDetailViewURL = '../html/cnrDetailView.html'


/** window.onload */
window.onload = function () {
  // authenticate
  cnrDisplayLogIn();

}; // window.onload


/* ************************************************************************* */
// HANDLERS

/** cnrLoginButtonPointerUpHandler */
function cnrLoginButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  if(cnrAuth === null){
    console.log('ERROR: cnrLoginButtonPointerUpHandler > cnrAuth\n', cnrAuth);
    return;
  };

  // get form data
  const cnrLoginForm = document.forms['cnrloginform'];
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
  
}; // cnrLoginButtonPointerUpHandler


/* ************************************************************************* */
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
// CALLBACKS

/** cnrLoginCallback. 
 * Handles login errors. 
 * Displays control interface. 
*/
function cnrLoginCallback(cnrErrorsParam = false, cnrTokenParam) {
  if(cnrErrorsParam){
    console.log('ERROR: cnrLoginCallback > cnrAuth.cnrLastError()\n', cnrAuth.cnrLastError());
    return null;
  };
  if(cnrTokenParam === null || cnrTokenParam === ''){
    console.log('ERROR: cnrLoginCallback > cnrTokenParam\n', cnrTokenParam);
    return null;
  };

  // clear password field
  document.getElementById('password').value = '';
  // hide login
  document.getElementById('cnrloginform').classList.add('cnrhidden');

  // reset data
  cnrJWTToken.cnrRemoveItems();

  // save data
  cnrJWTToken.cnrAddItem('cnrToken', true, cnrTokenParam);

  // display interface
  cnrDisplayControlInterface();

}; // cnrLoginCallback


/* ************************************************************************* */
// CONTROL

/**	cnrDisplayLogIn. 
 * Displays a login interface. 
*/
function cnrDisplayLogIn() {
  if (cnrJWTToken === null) { console.log('ERROR: cnrDisplayLogIn > cnrJWTToken\n', cnrJWTToken); };

  // init login form
  const cnrLoginForm = document.forms['cnrloginform'];
  cnrLoginForm.addEventListener('reset', cnrResetFormHandler, false);
  cnrLoginForm.email.addEventListener('keyup', cnrValidateEmailHandler);
  cnrLoginForm.password.addEventListener('keyup', cnrValidatePasswordHandler);
  // init submit button
  const cnrSubmitButton = document.getElementById('cnrsubmitbutton');
  cnrSubmitButton.addEventListener('pointerup', cnrLoginButtonPointerUpHandler);

  // init email errors
  const cnrEmailLabel = document.getElementById("cnremaillabel");
  const cnrEmailError = document.createElement('div');
  cnrEmailError.classList.add('cnrerror');
  cnrEmailError.id = 'cnremailerrordiv';
  cnrEmailLabel.append(cnrEmailError);

  // init password errors
  const cnrPasswordLabel = document.getElementById("cnrpasswordlabel");
  const cnrPasswordError = document.createElement('div');
  cnrPasswordError.classList.add('cnrerror');
  cnrPasswordError.id = 'cnrpassworderrordiv';
  cnrPasswordLabel.append(cnrPasswordError);

  // display form
  cnrLoginForm.classList.remove('cnrhidden');

  // TEST DATA
  const cnrUsernameVar = document.getElementById('email');
  cnrUsernameVar.value = 'user1@email.com';
  const cnrPasswordVar = document.getElementById('password');
  cnrPasswordVar.value = 'user1';
  
}; // cnrDisplayLogIn

/**	cnrDisplayControlInterface. 
 * Displays the control interface. 
*/
function cnrDisplayControlInterface() {
  if (cnrJWTToken === null) { console.log('ERROR: cnrDisplayControlInterface > cnrJWTToken\n', cnrJWTToken); };

  const cnrTokenVar = cnrJWTToken.cnrGetItemsDataForName('cnrToken')[0].accessToken;
  const cnrItemObject = {
    cnrToken: cnrTokenVar
  };
  const cnrEncodedStringVar = new URLSearchParams(cnrItemObject).toString();
  const cnrDetailViewURLVar = `${cnrDetailViewURL}?${cnrEncodedStringVar}`;
  window.location.href = cnrDetailViewURLVar;

}; // cnrDisplayControlInterface
