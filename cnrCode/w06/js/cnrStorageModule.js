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
    cnrLocalStorageSetLastErrorMessage("Key is not a string");
    return -1;
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("Key is null or empty");
    return -1;
  };
  if (localStorage.getItem(cnrKeyParam) != null || localStorage.getItem(cnrKeyParam) == '') {
    cnrLocalStorageSetLastErrorMessage("Key exists");
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
    cnrLocalStorageSetLastErrorMessage("Key is not a string");
    return -1;
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("Key is null or empty");
    return -1;
  };
  if (localStorage.getItem(cnrKeyParam) == null) {
    cnrLocalStorageSetLastErrorMessage("Key does not exist");
    return -1;
  };
  
  localStorage.setItem(cnrKeyParam, cnrValueParam);
  return 0;
};

/** Retrieves value of key from LocalStorage if key exists.
 * Returns value for key on success.
 * Returns an empty string on errors.
 * Call cnrLocalStorageGetLastErrorMessage to know more.
*/
export function cnrLocalStorageRetrieve(cnrKeyParam) {
  if (typeof cnrKeyParam != 'string') {
    cnrLocalStorageSetLastErrorMessage("Key is not a string");
    return '';
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("Key is null or empty");
    return '';
  };

  if (cnrLocalStorageHasKey(cnrKeyParam) == false) {
    cnrLocalStorageSetLastErrorMessage("Key does not exist");
    return '';
  };

  const cnrDataValueVar = localStorage.getItem(cnrKeyParam);
  if (cnrDataValueVar == null) {
    cnrLocalStorageSetLastErrorMessage("Value for " + cnrKeyParam + " == null");
    return '';
  };
  
  return cnrDataValueVar;
};

/** Returns true if key exist and its value is not null or empty. 
 * Returns false if key does not exist. 
 */
export function cnrLocalStorageHasKey(cnrKeyParam) {
  const cnrStorageValueVar = localStorage.getItem(cnrKeyParam);
  if (cnrStorageValueVar == null || cnrStorageValueVar == '') {
    cnrLocalStorageDeleteKey(cnrKeyParam);
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
    cnrLocalStorageSetLastErrorMessage("ERROR: cnrKeyParam is not a string");
    return -1;
  };
  if (cnrKeyParam == null || cnrKeyParam == '') {
    cnrLocalStorageSetLastErrorMessage("ERROR: cnrKeyParam is null or empty");
    return -1;
  };

  // remove key
  localStorage.removeItem(cnrKeyParam);
  return 0;
};

/** Returns last error message from localStorage. */
export function cnrLocalStorageGetLastErrorMessage() {
  const cnrLastErrorVar = localStorage.getItem("cnrLastErrorMessage");
  return cnrLastErrorVar;
};


/* ************************************************************************* */
// PRIVATE

/** Sets last error message in localStorage. */
function cnrLocalStorageSetLastErrorMessage(cnrValueParam) {
  localStorage.setItem("cnrLastErrorMessage", cnrValueParam);
};
