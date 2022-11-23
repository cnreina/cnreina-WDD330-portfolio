/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// MODULES

//Auth class which provides basic JWT based authentication for our app.

import * as cnrFetch from './cnrFetchAPI.js';

const cnrRequest_URL_PATH_LOGIN = 'login';
const cnrRequest_URL_PATH_USERS = 'users';
const cnrRequest_METHOD_POST = 'POST';
const cnrRequest_METHOD_GET = 'GET';


export class Auth {
  constructor() {
    this.jwtToken = null;
    this.user = {};
  };
  
  async login(cnrEmailContainerParam, cnrPasswordContainerParam, cnrCallbackParam = null) {
    if(cnrEmailContainerParam === null || cnrEmailContainerParam === ''){
      console.log('ERROR: cnrAuth.js > login > cnrEmailContainerParam\n', cnrEmailContainerParam);
      return null;
    };
    if(cnrPasswordContainerParam === null || cnrPasswordContainerParam === ''){
      console.log('ERROR: cnrAuth.js > login > cnrPasswordContainerParam\n', cnrPasswordContainerParam);
      return null;
    };

    const cnrBodyDataVar = {
      email: cnrEmailContainerParam.value,
      password: cnrPasswordContainerParam.value
    };
    
    try {
      // send credentials
      const cnrResponseVar = await cnrFetch.cnrFetchRequestJSON(cnrRequest_URL_PATH_LOGIN, cnrRequest_METHOD_POST, cnrBodyDataVar, this.jwtToken);
      if(cnrResponseVar === null || cnrResponseVar === ''){
        console.log('ERROR: cnrAuth.js > login > cnrResponseVar\n', cnrResponseVar);
        return null;
      };

      // store token
      if(cnrResponseVar.accessToken === null || cnrResponseVar.accessToken === ''){
        console.log('ERROR: cnrAuth.js > login > cnrResponseVar.accessToken\n', cnrResponseVar);
        return null;
      };
      this.jwtToken = cnrResponseVar.accessToken;
      
      // get user data
      const cnrUserVar = await this.getCurrentUser(cnrEmailContainerParam.value);
      if(cnrUserVar === null || cnrUserVar === ''){
        console.log('ERROR: cnrAuth.js > login > cnrUserVar\n', cnrUserVar);
        return null;
      };
      this.user = cnrUserVar;

      // clear password field
      cnrPasswordContainerParam.value = '';

      // hide login
      document.getElementById('cnrlogin').classList.add('cnrhidden');

      // test callback
      if (cnrCallbackParam) {
        const cnrCallbackResponseVar = cnrCallbackParam();
        if(cnrCallbackResponseVar === null || cnrCallbackResponseVar === ''){
          console.log('ERROR: cnrAuth.js > login > cnrCallbackResponseVar\n', cnrCallbackResponseVar);
          return null;
        };

        // ******************** TEST
        // console.clear();
        console.log('TEST: cnrCallbackResponseVar\n', cnrCallbackResponseVar);
      };
      
      } catch (error) {
        // if there were any errors display them
        console.log('ERROR: cnrAuth.js > login\n', error);
    };
    
  }; // login

  // uses the email of the currently logged in user to pull up the full user deta
  async getCurrentUser(cnrEmailParam) {
    if(cnrEmailParam === null || cnrEmailParam === ''){
      console.log('ERROR: cnrAuth.js > getCurrentUser > cnrEmailParam\n', cnrEmailParam);
      return null;
    };
    if(this.jwtToken === null || this.jwtToken === ''){
      console.log('ERROR: cnrAuth.js > getCurrentUser > this.jwtToken\n', this.jwtToken);
      return null;
    };

    // send request
    try {
      const cnrURLVar = cnrRequest_URL_PATH_USERS + '?email=' + cnrEmailParam;
      const cnrResponseVar = await cnrFetch.cnrFetchRequestJSON(cnrURLVar, cnrRequest_METHOD_GET, null, this.jwtToken);
      if(cnrResponseVar === null || cnrResponseVar === ''){
        console.log('ERROR: cnrAuth.js > getCurrentUser > cnrResponseVar\n', cnrResponseVar);
        return null;
      };
      // return user
      return cnrResponseVar[0];

    } catch (error) {
      console.log('ERROR: cnrAuth.js > getCurrentUser\n', error);
    };
  }; // getCurrentUser
  
  set token(value) {
    // we need this for the getter to work...but we don't want to allow setting
  };

  get token() {
    return this.jwtToken;
  };

}; // end auth class
