/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/* ************************************************************************* */
// INITIALIZE

const cnrFetch_BASE_URL = 'http://127.0.0.1:8080/';
const cnrFetch_METHOD_GET = 'GET';
const cnrFetch_METHOD_POST = 'POST';
const cnrFetch_METHOD_PUT = 'PUT';


/* ************************************************************************* */
// CONTROL

/**	cnrFetchRequest. 
 * Requests JSON data. 
 * Returns JSON data on success. 
 * Returns null on errors. 
*/
export async function cnrFetchRequestJSON(cnrPartialURLParam, cnrMethodParam = cnrFetch_METHOD_GET, cnrBodyParam = null, cnrTokenParam = null) {
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
    mode: 'no-cors',
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
  try {
    const cnrFetchResponseVar = await fetch(cnrRequestUrlVar, cnrRequestOptions);
    console.log("cnrFetchResponseVar:\n", cnrFetchResponseVar);

    const cnrJSONVar = await cnrFetchResponseVar.json();
    console.log("cnrJSONVar:\n", cnrJSONVar);

    if(cnrJSONVar === null || cnrJSONVar === ''){
      console.log('ERROR: cnrFetchRequestJSON > cnrJSONVar ', cnrJSONVar);
      return null;
    };
    // return JSON
    return cnrJSONVar;

  } catch (cnrFetchError) {
    console.log("ERROR: cnrFetchRequestJSON\n", cnrJSONVar);
    return null;

  };
}; // cnrFetchRequest
