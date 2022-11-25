/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrFetch from './cnrFetchAPI.js';

const cnrRequest_URL_PATH_LOGIN = 'login';
const cnrRequest_URL_PATH_USERS = 'users';
const cnrRequest_METHOD_POST = 'POST';
const cnrRequest_METHOD_GET = 'GET';

/**	cnrAuthClass 
 * Basic JWT authentication class. 
 * Functions: 
 * cnrLogIn, 
 * cnrGetCurrentUserDataByEmail, 
 * cnrLastError. 
*/
export class cnrAuthClass {
  constructor() {
    this.jwtToken = null;
    this.user = {};
    this.cnrLastErrorData = null;
  };
  
  /**	cnrLogIn 
    * Sends a request to login the user for 
    * passed email and password. 
    * Invokes callback function, if passed. 
    * Returns null on errors. 
    * Call cnrLastError() to get last error data and 
    * clear error buffer. 
  */
  async cnrLogIn(cnrEmailParam, cnrPasswordParam, cnrCallbackParam = null) {
    if (this.cnrLastErrorData != null) { return null; };
    if(cnrEmailParam === null || cnrEmailParam === ''){
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn > cnrEmailContainerParam\n' + cnrEmailParam;
      return null;
    };
    if(cnrPasswordParam === null || cnrPasswordParam === ''){
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn > cnrPasswordContainerParam\n' + cnrPasswordParam;
      return null;
    };

    const cnrBodyDataVar = {
      email: cnrEmailParam,
      password: cnrPasswordParam
    };
    
    try {
      // send credentials
      const cnrResponseVar = await cnrFetch.cnrFetchRequestJSON(cnrRequest_URL_PATH_LOGIN, cnrRequest_METHOD_POST, cnrBodyDataVar, this.jwtToken);
      if(cnrResponseVar === null || cnrResponseVar === ''){
        this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn > cnrResponseVar\n' + cnrResponseVar;
        return null;
      };

      // store token
      if(cnrResponseVar.accessToken === null || cnrResponseVar.accessToken === ''){
        this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn > cnrResponseVar.accessToken\n' + cnrResponseVar;
        return null;
      };
      this.jwtToken = cnrResponseVar.accessToken;
      
      // get user data
      const cnrUserVar = await this.cnrGetCurrentUserDataByEmail(cnrEmailParam);
      if(cnrUserVar === null || cnrUserVar === ''){
        this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn > cnrUserVar\n' + cnrUserVar;
        return null;
      };
      this.user = cnrUserVar;

      // invoke callback
      if (cnrCallbackParam) { cnrCallbackParam(this.cnrLastErrorData != null); };
      
    } catch (error) {
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn\n' + error;
    };

  }; // cnrLogIn

  /**	cnrGetCurrentUserDataByEmail 
    * Sends a request for user data by passed 
    * current user email. 
    * Returns null on errors. 
    * Call cnrLastError() to get last error 
    * data and clear error buffer. 
  */
  async cnrGetCurrentUserDataByEmail(cnrEmailParam) {
    if (this.cnrLastErrorData != null) { return null; };
    if(this.jwtToken === null || this.jwtToken === ''){
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrGetCurrentUserDataByEmail > this.jwtToken\n' + this.jwtToken;
      return null;
    };
    if(cnrEmailParam === null || cnrEmailParam === ''){
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrGetCurrentUserDataByEmail > cnrEmailParam\n' + cnrEmailParam;
      return null;
    };
    
    // send request
    try {
      const cnrURLVar = cnrRequest_URL_PATH_USERS + '?email=' + cnrEmailParam;
      const cnrResponseVar = await cnrFetch.cnrFetchRequestJSON(cnrURLVar, cnrRequest_METHOD_GET, null, this.jwtToken);
      if(cnrResponseVar === null || cnrResponseVar === ''){
        this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrGetCurrentUserDataByEmail > cnrResponseVar\n' + cnrResponseVar;
        return null;
      };
      // get user data
      const cnrUserDataVar = cnrResponseVar[0];
      if(cnrUserDataVar === null || cnrUserDataVar === ''){
        this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrGetCurrentUserDataByEmail > cnrUserDataVar\n' + cnrUserDataVar;
        return null;
      };

      // return user data
      return cnrUserDataVar;

    } catch (error) {
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrGetCurrentUserDataByEmail\n' + error;
      return null;
    };
  }; // cnrGetCurrentUserDataByEmail
  

  set token(value) {
    // needed for getter to work
  };

  get token() {
    return this.jwtToken;
  };

  set cnrUser(value) {
    // needed for getter to work
  };

  get cnrUser() {
    return this.user;
  };

  /** cnrLastError 
   * Returns Class's last error. 
   * Returns null if no errors exist. 
   * Resets last error data (null). 
  */
  cnrLastError() {
    const cnrLastErrorVar = this.cnrLastErrorData;
    this.cnrLastErrorData = null;
    return cnrLastErrorVar;
  }; // cnrLastError

}; // cnrAuthClass
