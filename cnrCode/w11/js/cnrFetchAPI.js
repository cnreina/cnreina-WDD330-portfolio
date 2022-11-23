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
const cnrFetch_ERROR_NAME = 'cnr_ERROR';


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
    return;
  };
  if(cnrMethodParam === null || cnrMethodParam === ''){
    console.log('ERROR: cnrFetchRequest > cnrMethodParam\n', cnrMethodParam);
    return;
  };
  if (
    cnrMethodParam != cnrFetch_METHOD_GET &&
    cnrMethodParam != cnrFetch_METHOD_POST &&
    cnrMethodParam != cnrFetch_METHOD_PUT
  ) {
    console.log('ERROR: cnrFetchRequest > cnrMethodParam\n', cnrMethodParam);
    return;
  };

  // prepare headers
  const cnrHeadersVar = new Headers({ 'Content-Type': 'application/json' });
  if (cnrTokenParam) {cnrHeadersVar.headers.Authorization = `Bearer ${cnrTokenParam}`;};
  
  // prepare request
  const cnrRequestUrlVar = `${cnrFetch_BASE_URL}${cnrPartialURLParam}`;
  const cnrRequestVar = new Request(cnrRequestUrlVar, {
    method: cnrMethodParam,
    headers: cnrHeadersVar
  });

  // prepare body
  if (cnrMethodParam === cnrFetch_METHOD_POST || cnrMethodParam === cnrFetch_METHOD_PUT) {
    if(cnrBodyParam === null || cnrBodyParam === ''){
      console.log('ERROR: cnrFetchRequest > cnrBodyParam\n', cnrBodyParam);
      return;
    };
    cnrRequestVar.body = JSON.stringify(cnrBodyParam);
  };

  // fetch data
  try {

    // ******************** TEST
    console.clear();
    console.log('TEST:\n', cnrRequestVar);
    
    const cnrFetchResponseVar = await fetch(cnrRequestVar);
    const cnrJSONVar = await cnrFetchResponseVar.json();

    if(cnrJSONVar === null || cnrJSONVar === ''){
      console.log('ERROR: cnrFetchRequestJSON > cnrJSONVar ', cnrJSONVar);
      return null;
    };
    // return JSON
    return cnrJSONVar;

  } catch (cnrFetchError) {
    console.log(`${cnrFetch_ERROR_NAME}: `, cnrFetchError);
    return null;

  };
}; // cnrFetchRequest
