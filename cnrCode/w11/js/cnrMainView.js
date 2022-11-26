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

const cnrHomeURL = '../html/cnrMainView.html'

/**	window.onload. */
window.onload = function () {
  // init login form
  const cnrLoginForm = document.forms['cnrlogin'];
  cnrLoginForm.addEventListener('reset', cnrResetFormHandler, false);
  cnrLoginForm.email.addEventListener('keyup', cnrValidateEmailHandler);
  cnrLoginForm.password.addEventListener('keyup', cnrValidatePasswordHandler);
  // init submit button
  const cnrSubmitButton = document.getElementById('cnrsubmitbutton');
  cnrSubmitButton.addEventListener('pointerup', cnrSubmitButtonPointerUpHandler);

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

  // init posts button
  const cnrPostsButton = document.getElementById('cnrpostsbutton');
  cnrPostsButton.addEventListener('pointerup', cnrPostsButtonPointerUpHandler);

  // init home button
  const cnrHomeButton = document.getElementById('cnrhomebutton');
  cnrHomeButton.addEventListener('pointerup', cnrHomeButtonPointerUpHandler);

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

/** cnrPostsButtonPointerUpHandler */
function cnrPostsButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  if(cnrAuth === null){
    console.log('ERROR: cnrPostsButtonPointerUpHandler > cnrAuth\n', cnrAuth);
    return;
  };

  if (cnrParam === null || cnrParam === '') {
    console.log('ERROR: cnrPostsButtonPointerUpHandler > cnrParam\n', cnrParam);
    return;
  };

  cnrAuth.cnrGetCurrentUserPostsByEmail(cnrAuth.user.email, cnrPostsCallback);

}; // cnrPostsButtonPointerUpHandler

/** cnrHomeButtonPointerUpHandler */
function cnrHomeButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  if (cnrParam === null || cnrParam === '') {
    console.log('ERROR: cnrHomeButtonPointerUpHandler > cnrParam\n', cnrParam);
    return;
  };

  window.location = cnrHomeURL;

}; // cnrHomeButtonPointerUpHandler


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

/** cnrPostsCallback. 
 * Displays user posts. 
*/
function cnrPostsCallback(cnrErrorsParam = false, cnrPosts) {
  if(cnrErrorsParam){
    console.log('ERROR: cnrPostsCallback > cnrAuth.cnrLastError()\n', cnrAuth.cnrLastError());
    return null;
  };
  if (cnrPosts === null || cnrPosts === '') {
    console.log('ERROR: cnrPostsCallback > cnrPosts\n', cnrPosts);
    return null;
  };

  // hide user data view
  document.getElementById('cnruserdata').classList.add('cnrhidden');

  // show user posts view
  document.getElementById('cnruserposts').classList.remove('cnrhidden');

  // display posts
  const cnrPostsDiv = document.getElementById("cnrpostscontainerdiv");
  cnrPosts.forEach(cnrPost => {
    // create post container
    const cnrPostContainerVar = document.createElement('div');
    cnrPostContainerVar.classList.add('cnrpostdivs');
    cnrPostContainerVar.id = `cnrpostdiv${cnrPost.id}`;

    // create id text
    const cnrPostIdVar = document.createElement('p');
    cnrPostIdVar.classList.add('cnrposttext');
    cnrPostIdVar.id = `cnrpostid${cnrPost.id}`;
    cnrPostIdVar.textContent = `ID: ${cnrPost.id}`;
    cnrPostContainerVar.append(cnrPostIdVar);

    // create user id text
    const cnrPostUserIdVar = document.createElement('p');
    cnrPostUserIdVar.classList.add('cnrposttext');
    cnrPostUserIdVar.id = `cnrpostuserid${cnrPost.id}`;
    cnrPostUserIdVar.textContent = `User ID: ${cnrPost.userId}`;
    cnrPostContainerVar.append(cnrPostUserIdVar);

    // create title text
    const cnrPostTitleVar = document.createElement('p');
    cnrPostTitleVar.classList.add('cnrposttext');
    cnrPostTitleVar.id = `cnrposttitle${cnrPost.id}`;
    cnrPostTitleVar.textContent = `Title: ${cnrPost.title}`;
    cnrPostContainerVar.append(cnrPostTitleVar);

    // create created text
    const cnrPostCreatedVar = document.createElement('p');
    cnrPostCreatedVar.classList.add('cnrposttext');
    cnrPostCreatedVar.id = `cnrpostcreated${cnrPost.id}`;
    cnrPostCreatedVar.textContent = `Created: ${cnrPost.createdAt}`;
    cnrPostContainerVar.append(cnrPostCreatedVar);

    // create created text
    const cnrPostContentVar = document.createElement('p');
    cnrPostContentVar.classList.add('cnrposttext');
    cnrPostContentVar.id = `cnrpostcontent${cnrPost.id}`;
    cnrPostContentVar.textContent = `Content: ${cnrPost.content}`;
    cnrPostContainerVar.append(cnrPostContentVar);

    // save post container
    cnrPostsDiv.append(cnrPostContainerVar);

  });

}; // cnrPostsCallback
