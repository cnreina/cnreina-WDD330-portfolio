/*	Carlos N Reina
  cnreina@gmail.com
*/

/**	cnrHikesModule 
 * cnrHikesClass (Exported Class)
 * cnrHikeClass (Private Class)
*/


/**************************************************************************
PRIVATE MODULE FUNCTIONS */

/**	Returns current UTC time. */
function cnrDataModuleGetCurrentTime() {
  const cnrDateTimeVar = new Date();
  const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
  return cnrDateTimeUTCVar;
};

/**************************************************************************
PRIVATE CLASSES */

/**	Private class. 
 * Individual cnrHikeClass.
 * Accessible through cnrHikesClass. 
*/
class cnrHikeClass {
  // PUBLIC
  cnrHikeID;
  cnrHikeName;
  cnrHikeLocation;
  cnrHikeRating;
  cnrHikeDifficulty;
  cnrHikeDescription;
  cnrHikeDirections;
  cnrHikeImageURL;

  constructor(cnrHikeIDParam, cnrNameParam, cnrLocationParam, cnrRatingParam, cnrDifficultyParam, cnrDescriptionParam, cnrDirectionsParam, cnrImageURLParam) {
    this.cnrHikeID = cnrHikeIDParam;
    this.cnrHikeName = cnrNameParam;
    this.cnrHikeLocation = cnrLocationParam;
    this.cnrHikeRating = cnrRatingParam;
    this.cnrHikeDifficulty = cnrDifficultyParam;
    this.cnrHikeDescription = cnrDescriptionParam;
    this.cnrHikeDirections = cnrDirectionsParam;
    this.cnrHikeImageURL = cnrImageURLParam;
  };

}; // cnrHikeClass


/**************************************************************************
EXPORTED CLASSES */

/**	Exported class. 
 * Interface for cnrHikeClass. 
 * Mantains an array of, and provides functions to 
 * access cnrHikeClass.
*/
export class cnrHikesClass {
  // PRIVATE

  #cnrHikesName;
  #cnrHikesID;
  #cnrHikesArray;

  constructor(cnrNameParam) {
    this.#cnrHikesName = cnrNameParam;
    this.#cnrHikesID = self.crypto.randomUUID();
    this.#cnrHikesName = cnrNameParam;
    this.#cnrHikesArray = new Array;
  };

  // PUBLIC

  // list
  /**	Returns list's name. */
  cnrHikesGetName() { return this.#cnrHikesName; };

  /**	Returns list's UUID. */
  cnrHikesGetID() { return this.#cnrHikesID; };

  /**	Returns list's array. Returns null if empty */
  cnrHikesGetArray() {
    if (this.#cnrHikesArray.length <= 0) { return null; };
    return this.#cnrHikesArray;
  };

  /**	Returns hikes array length. */
  cnrHikesGetCount() { return this.#cnrHikesArray.length; };

  /**	Returns hike object for index.
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrHikesGetForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return null; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return null; };

    return this.#cnrHikesArray[cnrIndexParam];
  };

  /**	Returns hike object for UUID. 
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrHikesGetForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return null; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar];
      };
    };

    return null;
  };

  /**	Returns hike id for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetIDForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

    return this.#cnrHikesArray[cnrIndexParam].cnrHikeID;
  };

  /**	Returns hike name for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetNameForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeName;
  };

  /**	Returns hike name for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetNameForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeName;
      };
    };

    return null;
  };

  /**	Returns hike image url for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetImageURLForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeImageURL;
  };

  /**	Returns hike image url for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetImageURLForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeImageURL;
      };
    };

    return null;
  };

  /**	Returns hike location for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetLocationForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeLocation;
  };

  /**	Returns hike location for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetLocationForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeLocation;
      };
    };

    return '';
  };

  /**	Returns hike rating for index.
   * Returns a negative number if empty. 
   * Returns a negative number on errors.
  */
   cnrHikesGetRatingForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return -1; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return -1; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeRating;
  };

  /**	Returns hike rating for UUID. 
   * Returns a negative number if empty. 
   * Returns a negative number on errors.
  */
   cnrHikesGetRatingForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return -1; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeRating;
      };
    };

    return -1;
  };

  /**	Returns hike difficulty for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetDifficultyForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeDifficulty;
  };

  /**	Returns hike difficulty for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetDifficultyForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeDifficulty;
      };
    };

    return '';
  };

  /**	Returns hike description for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetDescriptionForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeDescription;
  };

  /**	Returns hike description for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetDescriptionForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeDescription;
      };
    };

    return '';
  };

  /**	Returns hike directions for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetDirectionsForIndex(cnrIndexParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrHikesArray.length) { return ''; };

     return this.#cnrHikesArray[cnrIndexParam].cnrHikeDirections;
  };

  /**	Returns hike directions for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrHikesGetDirectionsForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return ''; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrHikesArray[cnrCounterVar].cnrHikeDirections;
      };
    };

    return '';
  };

  /**	Returns data as a JSON string. 
   * Returns an empty string if empty 
   * Returns an empty string on errors 
  */
  cnrHikesGetJSONString() {
  if (this.#cnrHikesArray.length <= 0) { return ''; };

    const cnrJSONString = JSON.stringify(this.#cnrHikesArray);
    //  const cnrHikesObject = {cnrHikes: cnrJSONString};
    // return JSON.stringify(cnrHikesObject);
    
    return cnrJSONString;
  };

  /**	Creates and adds a new hike to the array. 
   * Returns new object on success. 
   * Returns null on errors.
  */
  cnrHikesAddHike(cnrNameParam, cnrLocationParam, cnrRatingParam, cnrDifficultyParam, cnrDescriptionParam, cnrDirectionsParam, cnrImageURLParam) {
    if (cnrNameParam == null || cnrNameParam == '') { return null; };
    if (cnrLocationParam == null || cnrLocationParam == '') { return null; };
    if (cnrRatingParam == null || cnrRatingParam == '') { return null; };
    if (cnrDifficultyParam == null || cnrDifficultyParam == '') { return null; };
    if (cnrDescriptionParam == null || cnrDescriptionParam == '') { return null; };
    if (cnrDirectionsParam == null || cnrDirectionsParam == '') { return null; };
    if (cnrImageURLParam == null || cnrImageURLParam == '') { return null; };

    // create new hike
    const cnrNewIDVar = self.crypto.randomUUID();
    const cnrIDVar = cnrNewIDVar;
    const cnrNameVar = cnrNameParam;
    const cnrLocationVar = cnrLocationParam;
    const cnrRatingVar = cnrRatingParam;
    const cnrDifficultyVar = cnrDifficultyParam;
    const cnrDescriptionVar = cnrDescriptionParam;
    const cnrDirectionsVar = cnrDirectionsParam;
    const cnrImageURLVar = cnrImageURLParam;
    const cnrNewHikeVar = new cnrHikeClass(cnrIDVar, cnrNameVar, cnrLocationVar, cnrRatingVar, cnrDifficultyVar, cnrDescriptionVar, cnrDirectionsVar, cnrImageURLVar);

    // save new hike
    this.#cnrHikesArray.push(cnrNewHikeVar);
    return cnrNewHikeVar;
  };

  /**	Imports a hike to the array. 
   * Returns new object on success. 
   * Returns null on errors.
  */
   cnrHikesImportHike(cnrIDParam, cnrNameParam, cnrLocationParam, cnrRatingParam, cnrDifficultyParam, cnrDescriptionParam, cnrDirectionsParam, cnrImageURLParam) {
    if (cnrIDParam == null || cnrIDParam == '') { return null; };
    if (cnrNameParam == null || cnrNameParam == '') { return null; };
    if (cnrLocationParam == null || cnrLocationParam == '') { return null; };
    if (cnrRatingParam == null || cnrRatingParam == '') { return null; };
    if (cnrDifficultyParam == null || cnrDifficultyParam == '') { return null; };
    if (cnrDescriptionParam == null || cnrDescriptionParam == '') { return null; };
    if (cnrDirectionsParam == null || cnrDirectionsParam == '') { return null; };
    if (cnrImageURLParam == null || cnrImageURLParam == '') { return null; };

    // create new hike
    const cnrIDVar = cnrIDParam;
    const cnrNameVar = cnrNameParam;
    const cnrLocationVar = cnrLocationParam;
    const cnrRatingVar = cnrRatingParam;
    const cnrDifficultyVar = cnrDifficultyParam;
    const cnrDescriptionVar = cnrDescriptionParam;
    const cnrDirectionsVar = cnrDirectionsParam;
    const cnrImageURLVar = cnrImageURLParam;
    const cnrNewHikeVar = new cnrHikeClass(cnrIDVar, cnrNameVar, cnrLocationVar, cnrRatingVar, cnrDifficultyVar, cnrDescriptionVar, cnrDirectionsVar, cnrImageURLVar);

    // save new hike
    this.#cnrHikesArray.push(cnrNewHikeVar);
    return cnrNewHikeVar;
  };

  /**	Removes a hike from the array.
   * Returns the removed object on success. 
   * Returns null on errors.
   * */
  cnrHikesRemoveHikeForID(cnrIDParam) {
    if (this.#cnrHikesArray.length == 0) { return null; };
    if (cnrIDParam == null || cnrIDParam == '') { return null; };

    let cnrOldItemVar = this.cnrHikesGetForID(cnrIDParam);
    if (cnrOldItemVar == null || cnrOldItemVar == '') { return null; };

    let cnrCounterVar = 0;
    let cnrLengthVar = this.#cnrHikesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; ++cnrCounterVar){ 
      if (this.#cnrHikesArray[cnrCounterVar].cnrHikeID.toString() === cnrIDParam.toString()) {
        // remove item
        this.#cnrHikesArray.splice(cnrCounterVar, 1);
        return cnrOldItemVar;
      };
    };

    return null;
  };

}; // cnrHikesClass
