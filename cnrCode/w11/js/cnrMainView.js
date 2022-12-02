/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/*	NOTES 
  Bug:
    Do not use form tag, replace it with div tag.
    Using form tag causes fetch to only work in mobile mode, failing in desktop.

*/

/* ************************************************************************* */
// INITIALIZE

const cnrFetch_BASE_URL = 'http://127.0.0.1:8080/';
const cnrFetch_METHOD_GET = 'GET';
const cnrFetch_METHOD_POST = 'POST';
const cnrFetch_METHOD_PUT = 'PUT';

const cnrRequest_URL_PATH_LOGIN = 'login';
const cnrRequest_URL_PATH_USERS = 'users';
const cnrRequest_URL_PATH_POSTS = 'posts';
const cnrRequest_METHOD_POST = 'POST';
const cnrRequest_METHOD_GET = 'GET';

let cnrToken = null;
let cnrUser = null;
let cnrCurrentUserEmail = null;

const cnrHomeURL = '../html/cnrMainView.html'

/**	window.onload. */
window.onload = function () {
  // init login form
  const cnrLoginForm = document.getElementById("cnrlogin");
  cnrLoginForm.addEventListener('reset', cnrResetFormHandler, false);

  const cnrLoginEmail = document.getElementById("email");
  cnrLoginEmail.addEventListener('keyup', cnrValidateEmailHandler, false);

  const cnrLoginPassword = document.getElementById("password");
  cnrLoginPassword.addEventListener('keyup', cnrValidatePasswordHandler, false);

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
  if (cnrToken != null) { return; };
  
  // get form data
  const cnrLoginForm = document.forms['cnrlogin'];
  let cnrErrorCountVar = 0;

  // get email input
  const cnrEmailVar = document.getElementById("email").value;
  if (cnrEmailVar === null || cnrEmailVar === '') {
    cnrFormErrorHandler(true, "ERROR: Email is required", "cnremailerrordiv");
    cnrErrorCountVar++;
  } else {
    cnrFormErrorHandler(false, "", "cnremailerrordiv");
  };
  // save current user email
  cnrCurrentUserEmail = cnrEmailVar;

  // get password input
  const cnrPasswordVar = document.getElementById("password").value;
  if (cnrPasswordVar === null || cnrPasswordVar === '') {
    cnrFormErrorHandler(true, "ERROR: Password is required", "cnrpassworderrordiv");
    cnrErrorCountVar++;
  } else {
    cnrFormErrorHandler(false, "", "cnrpassworderrordiv");
  };

  // check errors count
  if (cnrErrorCountVar != 0) { return; };
  
  // LOGIN
  const cnrBodyDataVar = {
    email: cnrEmailVar,
    password: cnrPasswordVar
  };
  cnrFetchJSON(cnrRequest_URL_PATH_LOGIN, cnrRequest_METHOD_POST, cnrBodyDataVar, cnrToken);

}; // cnrSubmitButtonPointerUpHandler

/** cnrPostsButtonPointerUpHandler */
function cnrPostsButtonPointerUpHandler(cnrParam) {
  cnrParam.preventDefault();

  if (cnrParam === null || cnrParam === '') {
    console.log('ERROR: cnrPostsButtonPointerUpHandler > cnrParam\n', cnrParam);
    return;
  };

  cnrFetchJSON(cnrRequest_URL_PATH_POSTS, cnrRequest_METHOD_GET, null, cnrToken);

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
function cnrLoginCallback(cnrDataParam) {  
  if(cnrDataParam === null || cnrDataParam === ''){
    console.log('ERROR: cnrPostsCallback > cnrDataParam\n', cnrDataParam);
    return null;
  };

  // save token
  cnrToken = cnrDataParam;

  // clear password field
  document.getElementById('password').value = '';
  // hide login
  document.getElementById('cnrlogin').classList.add('cnrhidden');

  // get user data
  cnrFetchJSON(cnrRequest_URL_PATH_USERS, cnrRequest_METHOD_GET, null, cnrToken);

}; // cnrLoginCallback

/** cnrUserCallback. 
 * Displays user data. 
*/
function cnrUserCallback(cnrDataParam) {
  if(cnrDataParam === null || cnrDataParam === ''){
    console.log('ERROR: cnrUserCallback > cnrDataParam\n', cnrDataParam);
    return null;
  };

  // save user
  cnrUser = cnrDataParam;

  // show user data view
  const cnrDataVar = cnrDataParam;
  document.getElementById('cnridlabel').children[0].textContent = `${cnrDataVar.id}`;
  document.getElementById('cnrfirstnamelabel').children[0].textContent = `${cnrDataVar.firstname}`;
  document.getElementById('cnrlastnamelabel').children[0].textContent = `${cnrDataVar.lastname}`;
  document.getElementById('cnragelabel').children[0].textContent = `${cnrDataVar.age}`;
  document.getElementById('cnruseremaillabel').children[0].textContent = `${cnrDataVar.email}`;

  document.getElementById('cnruserdata').classList.remove('cnrhidden');

}; // cnrUserCallback

/** cnrPostsCallback. 
 * Displays user posts. 
*/
function cnrPostsCallback(cnrDataParam) {
  if(cnrDataParam === null || cnrDataParam === ''){
    console.log('ERROR: cnrPostsCallback > cnrDataParam\n', cnrDataParam);
    return null;
  };

  // hide user data view
  document.getElementById('cnruserdata').classList.add('cnrhidden');

  // show user posts view
  document.getElementById('cnruserposts').classList.remove('cnrhidden');

  // display posts
  const cnrPostsVar = cnrDataParam;
  const cnrPostsDiv = document.getElementById("cnrpostscontainerdiv");
  cnrPostsVar.forEach(cnrPostVar => {
    // create post container
    const cnrPostContainerVar = document.createElement('div');
    cnrPostContainerVar.classList.add('cnrpostdivs');
    cnrPostContainerVar.id = `cnrpostdiv${cnrPostVar.id}`;

    // create id text
    const cnrPostIdVar = document.createElement('p');
    cnrPostIdVar.classList.add('cnrposttext');
    cnrPostIdVar.id = `cnrpostid${cnrPostVar.id}`;
    cnrPostIdVar.textContent = `ID: ${cnrPostVar.id}`;
    cnrPostContainerVar.append(cnrPostIdVar);

    // create user id text
    const cnrPostUserIdVar = document.createElement('p');
    cnrPostUserIdVar.classList.add('cnrposttext');
    cnrPostUserIdVar.id = `cnrpostuserid${cnrPostVar.id}`;
    cnrPostUserIdVar.textContent = `User ID: ${cnrPostVar.userId}`;
    cnrPostContainerVar.append(cnrPostUserIdVar);

    // create title text
    const cnrPostTitleVar = document.createElement('p');
    cnrPostTitleVar.classList.add('cnrposttext');
    cnrPostTitleVar.id = `cnrposttitle${cnrPostVar.id}`;
    cnrPostTitleVar.textContent = `Title: ${cnrPostVar.title}`;
    cnrPostContainerVar.append(cnrPostTitleVar);

    // create created text
    const cnrPostCreatedVar = document.createElement('p');
    cnrPostCreatedVar.classList.add('cnrposttext');
    cnrPostCreatedVar.id = `cnrpostcreated${cnrPostVar.id}`;
    cnrPostCreatedVar.textContent = `Created: ${cnrPostVar.createdAt}`;
    cnrPostContainerVar.append(cnrPostCreatedVar);

    // create created text
    const cnrPostContentVar = document.createElement('p');
    cnrPostContentVar.classList.add('cnrposttext');
    cnrPostContentVar.id = `cnrpostcontent${cnrPostVar.id}`;
    cnrPostContentVar.textContent = `Content: ${cnrPostVar.content}`;
    cnrPostContainerVar.append(cnrPostContentVar);

    // save post container
    cnrPostsDiv.append(cnrPostContainerVar);

  });

}; // cnrPostsCallback


/* ************************************************************************* */
// CONTROL

/**	cnrFetchJSON. 
 * Requests JSON data. 
 * Returns JSON data on success. 
 * Returns null on errors. 
*/
export async function cnrFetchJSON(cnrPartialURLParam, cnrMethodParam = cnrFetch_METHOD_GET, cnrBodyParam = null, cnrTokenParam = null) {
  if(cnrPartialURLParam === null || cnrPartialURLParam === ''){
    console.log('ERROR: cnrFetchRequest > cnrPartialURLParam\n', cnrPartialURLParam);
    return null;
  };
  if(cnrMethodParam === null || cnrMethodParam === ''){
    console.log('ERROR: cnrFetchRequest > cnrMethodParam\n', cnrMethodParam);
    return null;
  };
  if (
    cnrMethodParam != cnrFetch_METHOD_GET &&
    cnrMethodParam != cnrFetch_METHOD_POST &&
    cnrMethodParam != cnrFetch_METHOD_PUT
  ) {
    console.log('ERROR: cnrFetchRequest > cnrMethodParam\n', cnrMethodParam);
    return null;
  };

  // request options
  let cnrRequestOptions = {
    method: cnrMethodParam,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // prepare body
  if (cnrMethodParam === cnrFetch_METHOD_POST || cnrMethodParam === cnrFetch_METHOD_PUT) {
    if(cnrBodyParam === null || cnrBodyParam === ''){
      console.log('ERROR: cnrFetchRequest > cnrBodyParam\n', cnrBodyParam);
      return null;
    };
    cnrRequestOptions.body = JSON.stringify(cnrBodyParam);
  };
  
  // prepare token
  if (cnrTokenParam) {cnrRequestOptions.headers.Authorization = `Bearer ${cnrTokenParam}`;};
  
  // prepare url
  const cnrRequestUrlVar = `${cnrFetch_BASE_URL}${cnrPartialURLParam}`;
  
  // fetch data
  fetch(cnrRequestUrlVar, cnrRequestOptions).then((cnrResponseParam) => cnrResponseParam.json())
    .then((cnrJSONData) => cnrProcesResponseJSON(cnrPartialURLParam, cnrJSONData));

}; // cnrFetchRequest

/**	cnrProcesResponseJSON. 
 * Processes response json from fetch request. 
 * Updates data. 
*/
function cnrProcesResponseJSON(cnrPartialURLParam, cnrResponseJSONParam) {
  if (cnrPartialURLParam === null || cnrPartialURLParam === '') {
    console.log('ERROR: cnrProcesResponseJSON > cnrPartialURLParam');
    return null;
  };
  if (cnrResponseJSONParam === null || cnrResponseJSONParam === '') {
    console.log('ERROR: cnrProcesResponseJSON > cnrResponseJSONParam');
    return null;
  };

  // process JSON
  const cnrPartialURLVar = cnrPartialURLParam;
  const cnrJSONVar = cnrResponseJSONParam;  
  switch (cnrPartialURLVar) {
    case cnrRequest_URL_PATH_LOGIN:
      cnrLoginCallback(cnrJSONVar.accessToken);
      break;
    
    case cnrRequest_URL_PATH_USERS:
      cnrJSONVar.forEach(cnrUser => {
        if (cnrUser.email === cnrCurrentUserEmail) {
          cnrUserCallback(cnrUser);
        };
      });
      break;
    
    case cnrRequest_URL_PATH_POSTS:
      let cnrPostsVar = [];
      cnrJSONVar.forEach(cnrPost => {
        if (cnrPost.userId === cnrCurrentUserEmail) {
          cnrPostsVar.push(cnrPost);
        };
      });
      cnrPostsCallback(cnrPostsVar);
      break;

    default:
      break;
  };
  
}; // cnrProcesResponseJSON
