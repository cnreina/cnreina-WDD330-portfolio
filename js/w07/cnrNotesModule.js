/*	Carlos N Reina
  cnreina@gmail.com
*/

/**	cnrHikesModule 
 * cnrNotesClass (Exported Class)
 * cnrNoteClass (Private Class)
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
 * Individual cnrNoteClass.
 * Accessible through cnrNotesClass.
*/
class cnrNoteClass {
  // PUBLIC
  cnrID;
  cnrParentID;
  cnrType;
  cnrTitle;
  cnrContent;
  cnrCreatedDate;
  cnrUpdatedDate;

  constructor(cnrIDParam, cnrParentIDParam, cnrTypeParam, cnrTitleParam, cnrContentParam, cnrCreatedParam, cnrUpdatedParam) {
    this.cnrID = cnrIDParam;
    this.cnrParentID = cnrParentIDParam;
    this.cnrType = cnrTypeParam;
    this.cnrTitle = cnrTitleParam;
    this.cnrContent = cnrContentParam;
    this.cnrCreatedDate = cnrCreatedParam;
    this.cnrUpdatedDate = cnrUpdatedParam;
  };

}; // cnrNoteClass


/**************************************************************************
EXPORTED CLASSES */

/**	Exported class. 
 * Interface for cnrNoteClass. 
 * Mantains an array of, and provides functions to 
 * access, cnrNoteClass objects.
*/
export class cnrNotesClass {
  /* PRIVATE */
  #cnrNotesName;
  #cnrNotesID;
  #cnrNotesArray;

  /* PUBLIC */
  constructor(cnrNameParam) {
    this.#cnrNotesName = cnrNameParam;
    this.#cnrNotesID = self.crypto.randomUUID();
    this.#cnrNotesName = cnrNameParam;
    this.#cnrNotesArray = new Array;
  };

  /* PUBLIC GETTERS */

  /**	Returns name. */
  cnrNotesGetName() { return this.#cnrNotesName; };

  /**	Returns UUID. */
  cnrNotesGetID() { return this.#cnrNotesID; };

  /**	Returns array. Returns null if empty */
  cnrNotesGetArray() {
    if (this.#cnrNotesArray.length <= 0) { return null; };
    return this.#cnrNotesArray;
  };

  /**	Returns array length. */
  cnrNotesGetCount() { return this.#cnrNotesArray.length; };

  /**	Returns object for index.
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrNotesGetNoteForIndex(cnrIndexParam) {
    if (this.#cnrNotesArray.length == 0) { return null; };
    if (cnrIndexParam >= this.#cnrNotesArray.length) { return null; };

    return this.#cnrNotesArray[cnrIndexParam];
  };

  /**	Returns object for UUID. 
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrNotesGetNoteForID(cnrIDParam) {
    if (this.#cnrNotesArray.length == 0) { return null; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrNotesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrNotesArray[cnrCounterVar].cnrHikeID.toString() == cnrIDParam.toString()) {
        return this.#cnrNotesArray[cnrCounterVar];
      };
    };

    return null;
  };

  /**	Returns object id for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrNotesGetNoteIDForIndex(cnrIndexParam) {
    if (this.#cnrNotesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrNotesArray.length) { return ''; };

    return this.#cnrNotesArray[cnrIndexParam].cnrID;
  };

  /**	Returns object's parent id for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrNotesGetNoteParentIDForIndex(cnrIndexParam) {
    if (this.#cnrNotesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrNotesArray.length) { return ''; };

    return this.#cnrNotesArray[cnrIndexParam].cnrParentID;
  };

  /**	Returns object type for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrNotesGetNoteTypeForIndex(cnrIndexParam) {
    if (this.#cnrNotesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrNotesArray.length) { return ''; };

    return this.#cnrNotesArray[cnrIndexParam].cnrType;
  };

  /**	Returns object title for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrNotesGetNoteTitleForIndex(cnrIndexParam) {
    if (this.#cnrNotesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrNotesArray.length) { return ''; };

    return this.#cnrNotesArray[cnrIndexParam].cnrTitle;
  };

  /**	Returns object content for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrNotesGetNoteContentForIndex(cnrIndexParam) {
    if (this.#cnrNotesArray.length == 0) { return ''; };
    if (cnrIndexParam >= this.#cnrNotesArray.length) { return ''; };

    return this.#cnrNotesArray[cnrIndexParam].cnrContent;
  };

  
  /* PUBLIC SETTERS */

  /**	Creates and adds a new note to the array. 
   * Returns new object on success. 
   * Returns null on errors.
  */
  cnrNotesAddNote(cnrParentIDParam, cnrTypeParam, cnrTitleParam, cnrContentParam) {
    if (cnrParentIDParam == null || cnrParentIDParam == '') { return null; };
    if (cnrTypeParam == null || cnrTypeParam == '') { return null; };
    if (cnrTitleParam == null || cnrTitleParam == '') { return null; };
    if (cnrContentParam == null || cnrContentParam == '') { return null; };
    
    // create new note
    const cnrNewIDVar = self.crypto.randomUUID();
    const cnrDateVar = cnrDataModuleGetCurrentTime();
    const cnrIDVar = cnrNewIDVar;
    const cnrParentIDVar = cnrParentIDParam;
    const cnrTypeVar = cnrTypeParam;
    const cnrTitleVar = cnrTitleParam;
    const cnrContentVar = cnrContentParam;
    const cnrCreatedDateVar = cnrDateVar;
    const cnrUpdatedDateVar = cnrDateVar;
    const cnrNewNoteVar = new cnrNoteClass(cnrIDVar, cnrParentIDVar, cnrTypeVar, cnrTitleVar, cnrContentVar, cnrCreatedDateVar, cnrUpdatedDateVar);

    // save
    this.#cnrNotesArray.push(cnrNewNoteVar);
    return cnrNewNoteVar;
  };

  /**	Imports a note to the array. 
   * Returns new object on success. 
   * Returns null on errors.
  */
   cnrNotesImportNote(cnrIDParam, cnrParentIDParam, cnrTypeParam, cnrTitleParam, cnrContentParam, cnrCreatedParam, cnrUpdatedParam) {
    if (cnrIDParam == null || cnrIDParam == '') { return null; };
    if (cnrParentIDParam == null || cnrParentIDParam == '') { return null; };
    if (cnrTypeParam == null || cnrTypeParam == '') { return null; };
    if (cnrTitleParam == null || cnrTitleParam == '') { return null; };
    if (cnrContentParam == null || cnrContentParam == '') { return null; };
    if (cnrCreatedParam == null || cnrCreatedParam == '') { return null; };
    if (cnrUpdatedParam == null || cnrUpdatedParam == '') { return null; };

    // create new note
    const cnrIDVar = cnrIDParam;
    const cnrParentIDVar = cnrParentIDParam;
    const cnrTypeVar = cnrTypeParam;
    const cnrTitleVar = cnrTitleParam;
    const cnrContentVar = cnrContentParam;
    const cnrCreatedDateVar = cnrCreatedParam;
    const cnrUpdatedDateVar = cnrUpdatedParam;
    const cnrNewNoteVar = new cnrNoteClass(cnrIDVar, cnrParentIDVar, cnrTypeVar, cnrTitleVar, cnrContentVar, cnrCreatedDateVar, cnrUpdatedDateVar);

    // save new note
    this.#cnrNotesArray.push(cnrNewNoteVar);
    return cnrNewNoteVar;
  };

  /**	Removes an object from the array.
   * Returns the removed object on success. 
   * Returns null on errors.
   * */
  cnrNotesRemoveNoteForID(cnrIDParam) {
    if (this.#cnrNotesArray.length == 0) { return null; };
    if (cnrIDParam == null || cnrIDParam == '') { return null; };

    let cnrOldItemVar = this.cnrNotesGetNoteForID(cnrIDParam);
    if (cnrOldItemVar == null || cnrOldItemVar == '') { return null; };

    let cnrCounterVar = 0;
    let cnrLengthVar = this.#cnrNotesArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; ++cnrCounterVar){ 
      if (this.#cnrNotesArray[cnrCounterVar].cnrHikeID.toString() === cnrIDParam.toString()) {
        // remove item
        this.#cnrNotesArray.splice(cnrCounterVar, 1);
        return cnrOldItemVar;
      };
    };

    return null;
  };

}; // cnrNotesClass
