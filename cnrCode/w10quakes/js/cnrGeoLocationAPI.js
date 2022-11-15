/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

// get permissions

/* ************************************************************************* */
// EXPORTS

/** cnrCurrentPosition 
 * Returns device's current position. 
 * Promisefied method to return the current location of the user. 
*/
export const cnrCurrentPosition = function(options) {
  return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}; // cnrCurrentPosition
