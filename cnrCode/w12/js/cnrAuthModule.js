/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

const cnrFetch_BASE_URL = 'http://127.0.0.1:8080/';
const cnrFetch_METHOD_GET = 'GET';
const cnrFetch_METHOD_POST = 'POST';
const cnrFetch_METHOD_PUT = 'PUT';
const cnrFetch_ERROR_NAME = 'cnr_ERROR';

const cnrRequest_URL_PATH_LOGIN = 'login';
const cnrRequest_METHOD_POST = 'POST';


/**	cnrAuthClass 
 * JWT authentication class. 
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
    if(cnrCallbackParam === null || cnrCallbackParam === ''){
      this.cnrLastErrorData = 'ERROR: cnrAuth.js > cnrLogIn > cnrCallbackParam\n' + cnrCallbackParam;
      return null;
    };

    // request options
    let cnrRequestOptions = {
      method: cnrFetch_METHOD_POST,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // prepare body
    const cnrBodyDataVar = {
      email: cnrEmailParam,
      password: cnrPasswordParam
    };
    cnrRequestOptions.body = JSON.stringify(cnrBodyDataVar);
    
    // prepare token
    if (this.jwtToken) {cnrRequestOptions.headers.Authorization = `Bearer ${this.jwtToken}`;};
    
    // prepare url
    const cnrRequestUrlVar = `${cnrFetch_BASE_URL}${cnrRequest_URL_PATH_LOGIN}`;
    
    // send credentials
    try {
      const cnrFetchResponseVar = await fetch(cnrRequestUrlVar, cnrRequestOptions);
      const cnrJSONVar = await cnrFetchResponseVar.json();
      if(cnrJSONVar === null || cnrJSONVar === ''){
        console.log('ERROR: cnrFetchRequestJSON > cnrJSONVar ', cnrJSONVar);
        return null;
      };
      // return token
      cnrCallbackParam(this.cnrLastErrorData != null, cnrJSONVar);

    } catch (cnrFetchError) {
      console.log(`${cnrFetch_ERROR_NAME}: `, cnrFetchError);
      return null;
    };
  }; // cnrLogIn

  set token(value) {
    // needed for getter to work
  };

  get token() {
    return this.jwtToken;
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
