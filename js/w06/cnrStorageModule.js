/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/* ************************************************************************* */
// EXPORTS

/** Creates a new key/value entry in LocalStorage if key does not exist.
 * Returns 0 on success.
 * Returns a negative number on errors.
 * Call cnrLocalStorageGetLastErrorMessage to know more.
*/
export function cnrLocalStorageCreate(cnrKeyParam, cnrValueParam) {
  if (typeof cnrKeyParam != 'string') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is not a string");
    return -1;
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is null or empty");
    return -1;
  };
  if (localStorage.getItem(cnrKeyParam) != null || localStorage.getItem(cnrKeyParam) == '') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key exists");
    return -1;
  };
  
  localStorage.setItem(cnrKeyParam, cnrValueParam);
  return 0;
};

/** Updates key/value pair in LocalStorage if key exists.
 * Returns 0 on success.
 * Returns a negative number on errors.
 * Call cnrLocalStorageGetLastErrorMessage to know more.
*/
export function cnrLocalStorageUpdate(cnrKeyParam, cnrValueParam) {
  if (typeof cnrKeyParam != 'string') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is not a string");
    return -1;
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is null or empty");
    return -1;
  };
  if (localStorage.getItem(cnrKeyParam) == null) {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key does not exist");
    return -1;
  };
  
  localStorage.setItem(cnrKeyParam, cnrValueParam);
  return 0;
};

/** Retrieves value of key from LocalStorage if key exists.
 * Returns 0 on success.
 * Returns a negative number on errors.
 * Call cnrLocalStorageGetLastErrorMessage to know more.
*/
export function cnrLocalStorageRetrieve(cnrKeyParam, cnrValueParam) {
  if (typeof cnrKeyParam != 'string') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is not a string");
    return '';
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is null or empty");
    return '';
  };
  if (localStorage.getItem(cnrKeyParam) == null) {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key does not exist");
    return '';
  };
  
  return localStorage.GetItem(cnrKeyParam);
};

/** Returns true if key exist, false if it does not. */
export function cnrLocalStorageHasKey(cnrKeyParam) {
  if (localStorage.getItem(cnrKeyParam) == null) {
    return false;
  } else {
    return true;
  };
};

/** Deletes key/value from LocalStorage if key exists.
 * Returns 0 on success.
 * Returns a negative number on errors.
 * Call cnrLocalStorageGetLastErrorMessage to know more.
*/
export function cnrLocalStorageDeleteKey(cnrKeyParam) {
  if (typeof cnrKeyParam != 'string') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is not a string");
    return '';
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key is null or empty");
    return '';
  };
  if (localStorage.getItem(cnrKeyParam) == null) {
    cnrLocalStorageSetLastErrorMessage("ERROR: Key does not exist");
    return '';
  };

  localStorage.removeItem(cnrKeyParam);
  return 0;
};

/** Returns last error message. */
export function cnrLocalStorageGetLastErrorMessage() {
  const cnrLastErrorVar = localStorage.getItem("cnrLocalStorageLastErrorMessage");
  return cnrLastErrorVar;
};


/* ************************************************************************* */
// PRIVATE

/** Returns last error message. */
function cnrLocalStorageSetLastErrorMessage(cnrValueParam) {
  localStorage.setItem("cnrLocalStorageLastErrorMessage", cnrValueParam);
};
