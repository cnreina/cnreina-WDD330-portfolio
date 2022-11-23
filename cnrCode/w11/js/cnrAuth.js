/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// MODULES

//Auth class which provides basic JWT based authentication for our app.
//Requires:accesstothemakeRequest functions

// import { makeRequest } from './authHelpers.js';

import * as cnrFetch from './cnrFetchAPI.js';

const cnrRequest_URL_PATH_LOGIN = 'login';


export class Auth {
  constructor() {
    this.jwtToken = '';
    this.user = {};
  };
  
  async login(cnrUserNameParam, cnrPasswordParam, cnrCallbackParam = null) {
    if(cnrUserNameParam === null || cnrUserNameParam === ''){
      console.log('ERROR: login > cnrUserNameParam\n', cnrUserNameParam);
      return null;
    };
    if(cnrPasswordParam === null || cnrPasswordParam === ''){
      console.log('ERROR: login > cnrPasswordParam\n', cnrPasswordParam);
      return null;
    };

    // const cnrPostDataVar = {
    //   cnrUserName: cnrUserNameParam,
    //   cnrPassword: cnrPasswordParam
    // };
    
    try {
      // 1. use the makeRequest function to pass our credentials to the server
      const cnrResponseVar = await cnrFetch.cnrFetchRequestJSON(cnrRequest_URL_PATH_LOGIN, 'POST', { email: cnrUserNameParam, password: cnrPasswordParam });
      if(cnrResponseVar === null || cnrResponseVar === ''){
        console.log('ERROR: login > cnrResponseVar\n', cnrResponseVar);
        return null;
      };

      //2.ifwegetasuccessfulresponse...wehaveatoken! Store it since we
      
      
      
      

      // let's get the user details as well and store them locally in the class
      // you can pass a query to the API by appending it on the end of the url li
      
      this.user = await this.getCurrentUser(cnrUserNameParam);

      // hide the login form. document.getElementById('login').classList.add('hidden');

      // clear the password
      // password.value = '';

      // since we have a token let's go grab some data from the API by executing
      if (cnrCallbackParam) { cnrCallbackParam(); };
      
      } catch (error) {
        // if there were any errors display them
        console.log('ERROR: class Auth > login\n', error);
    };
    
  }; // login

  // uses the email of the currently logged in user to pull up the full user deta
  async getCurrentUser(email) {
    try {
      // 3. add the code here to make a request for the user identified by email.

    } catch (error) {
      console.log('ERROR: class Auth > getCurrentUser\n', error);
    };
  }; // getCurrentUser
  
  set token(value) {
    // we need this for the getter to work...but we don't want to allow setting
  };

  get token() {
    return this.jwtToken;
  };
}; // end auth class
