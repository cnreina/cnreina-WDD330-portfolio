/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/*	cnrDataModule 
    
  cnrDataListClass (Exported Class)
    cnrDataListID (UUID)
    cnrDataListCreatedTimeUTC
    cnrDataListUpdatedTimeUTC
    cnrDataListType (Ex; string, json, Etc)
    cnrDataItemArray (Array of cnrDataItemClass)
    
  cnrDataItemClass (Private Class)
    cnrItemID
    cnrItemCreatedTimeUTC
    cnrItemUpdatedTimeUTC
    cnrItemType
    cnrItemStatus
    cnrItemTag
    cnrItemData
*/


/* ************************************************************************* */
// PRIVATE MODULE FUNCTIONS

/**	Returns current UTC time. */
function cnrDataModuleGetCurrentTime() {
  const cnrDateTimeVar = new Date();
  const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
  return cnrDateTimeUTCVar;
};

/* ************************************************************************* */
// PRIVATE CLASSES

class cnrDataItemClass {
  // PRIVATE

  #cnrItemID;
  #cnrItemCreatedTimeUTC;
  #cnrItemUpdatedTimeUTC;
  #cnrItemType;
  #cnrItemStatus;
  #cnrItemTag;
  #cnrItemData;

  constructor(cnrIDParam, cnrCreatedUTCParam, cnrUpdatedUTCParam, cnrTypeParam, cnrStatusParam, cnrTagParam, cnrDataParam) {
    this.#cnrItemID = cnrIDParam;
    this.#cnrItemCreatedTimeUTC = cnrCreatedUTCParam;
    this.#cnrItemUpdatedTimeUTC = cnrUpdatedUTCParam;
    this.#cnrItemType = cnrTypeParam;
    this.#cnrItemStatus = cnrStatusParam;
    this.#cnrItemTag = cnrTagParam;
    this.#cnrItemData = cnrDataParam;
  };

  // PUBLIC

  /**	Returns item object. */
  cnrDataItemGetItem() { return this; };

  /**	Returns item's UUID. */
  cnrDataItemGetID() { return this.#cnrItemID; };

  /**	Returns item's date and time of creation in UTC format. */
  cnrDataItemGetCreatedTime() { return this.#cnrItemCreatedTimeUTC; };

  /**	Returns item's date and time of last update in UTC format. */
  cnrDataItemGetUpdatedTime() { return this.#cnrItemUpdatedTimeUTC; };

  /**	Returns item's data type (Ex; string, json). */
  cnrDataItemGetType() { return this.#cnrItemType; };

  /**	Returns item's data type (Ex; string, json). */
  cnrDataItemGetStatus() { return this.#cnrItemStatus; };

  /**	Returns item's key. */
  cnrDataItemGetTag() { return this.#cnrItemTag; };

  /**	Returns item's data. */
  cnrDataItemGetData() {return this.#cnrItemData;};

  /**	Returns item as a JSON string. */
  cnrDataItemGetJSONString() {
    let cnrItemDataVar = this.#cnrItemData;
    if (typeof this.#cnrItemData == 'object') {
      cnrItemDataVar = JSON.stringify(this.#cnrItemData);
    };

    const cnrDataItemVar = {
      cnrItemID: this.#cnrItemID,
      cnrItemCreatedTimeUTC: this.#cnrItemCreatedTimeUTC,
      cnrItemUpdatedTimeUTC: this.#cnrItemUpdatedTimeUTC,
      cnrItemType: this.#cnrItemType,
      cnrItemStatus: this.#cnrItemStatus,
      cnrItemTag: this.#cnrItemTag,
      cnrItemData: cnrItemDataVar
    };

    const cnrJSONString = JSON.stringify(cnrDataItemVar);
    return cnrJSONString;
  };

  /**	Sets item's data type (Ex; string, json). 
   * Returns if passed type is null or empty.
   */
   cnrDataItemUpdateType(cnrTypeParam) {
    if (cnrTypeParam == null || cnrTypeParam == '') { return; };
    // update
    this.#cnrItemType = cnrTypeParam;
    // save change date
    this.#cnrItemUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
  };

  /**	Updates item's data status (Ex; active, inactive). 
   * Returns if passed status is null or empty.
   */
   cnrDataItemUpdateStatus(cnrStatusParam) {
    if (cnrStatusParam == null || cnrStatusParam == '') { return; };
    // update
    this.#cnrItemStatus = cnrStatusParam;
    // save change date
    this.#cnrItemUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
  };

  /**	Sets item's key. 
   * Returns if passed key is null or empty.
   * Key is not unique
   */
  cnrDataItemUpdateTag(cnrTagParam) {
    if (cnrTagParam == null || cnrTagParam == '') { return; };
    // update
    this.#cnrItemTag = cnrTagParam;
    // save change date
    this.#cnrItemUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
  };

}; // cnrDataItemClass

/* ************************************************************************* */
// EXPORTED CLASSES

export class cnrDataListClass {
  // PRIVATE

  #cnrDataListID;
  #cnrDataListCreatedTimeUTC;
  #cnrDataListUpdatedTimeUTC;
  #cnrDataListType;
  #cnrDataItemArray;

  constructor() {
    const cnrDateTimeUTCVar = cnrDataModuleGetCurrentTime();
    this.#cnrDataListID = self.crypto.randomUUID();
    this.#cnrDataListCreatedTimeUTC = cnrDateTimeUTCVar;
    this.#cnrDataListUpdatedTimeUTC = cnrDateTimeUTCVar;
    this.#cnrDataListType = "string";
    this.#cnrDataItemArray = new Array;
  };

  // PUBLIC

  // list
  /**	Returns data list's UUID. */
  cnrDataListGetID() { return this.#cnrDataListID; };

  /**	Returns data list's created time in UTC format. */
  cnrDataListGetCreatedTime() { return this.#cnrDataListCreatedTimeUTC; };

  /**	Returns data list's type. */
  cnrDataListGetType() { return this.#cnrDataListType; };

  /**	Returns data list's items array. Returns null if empty */
  cnrDataListGetItems() {
    if (this.#cnrDataItemArray.length <= 0) { return null; };
    return this.#cnrDataItemArray;
  };

  /**	Returns data list as a JSON string. 
   * Returns an empty string if empty */
  cnrDataListGetJSONString() {
    if (this.#cnrDataItemArray.length <= 0) { return ''; };

    let cnrItemsVar = [];
    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrDataItemArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      cnrItemsVar.push(this.#cnrDataItemArray[cnrCounterVar].cnrDataItemGetJSONString());
    };
    const cnrJSONString = JSON.stringify(cnrItemsVar);
    return cnrJSONString;
  };

  // items
  /**	Returns data list's items array length. */
  cnrDataListGetItemCount() { return this.#cnrDataItemArray.length; };

  /**	Returns item object for index.
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrDataListGetItemForIndex(cnrItemIndexParam) {
    if (this.#cnrDataItemArray.length == 0) { return null; };
    if (cnrItemIndexParam >= this.#cnrDataItemArray.length) { return null; };

    return this.#cnrDataItemArray[cnrItemIndexParam];
  };

  /**	Returns array of item objects for key. 
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrDataListGetItemsForTag(cnrItemKeyParam) {
    if (this.#cnrDataItemArray.length == 0) { return null; };

    const cnrItemsArray = [];
    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrDataItemArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrDataItemArray[cnrCounterVar].cnrDataItemGetTag().toString() == cnrItemKeyParam.toString()) {
        cnrItemsArray.push(this.#cnrDataItemArray[cnrCounterVar]);
      };
    };

    if (cnrItemsArray.length <= 0) {
      return null;
    };

    return cnrItemsArray;
  };

  /**	Returns item object for UUID. 
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrDataListGetItemForID(cnrItemIDParam) {
    if (this.#cnrDataItemArray.length == 0) { return null; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrDataItemArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrDataItemArray[cnrCounterVar].cnrDataItemGetID().toString() == cnrItemIDParam.toString()) {
        return this.#cnrDataItemArray[cnrCounterVar];
      };
    };

    return null;
  };

  /**	Returns item id for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrDataListGetItemIDForIndex(cnrItemIndexParam) {
    if (this.#cnrDataItemArray.length == 0) { return ''; };
    if (cnrItemIndexParam >= this.#cnrDataItemArray.length) { return ''; };

    return this.#cnrDataItemArray[cnrItemIndexParam].cnrDataItemGetID();
  };

  /**	Returns item status for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrDataListGetItemStatusForIndex(cnrItemIndexParam) {
    if (this.#cnrDataItemArray.length == 0) { return ''; };
    if (cnrItemIndexParam >= this.#cnrDataItemArray.length) { return ''; };

    return this.#cnrDataItemArray[cnrItemIndexParam].cnrDataItemGetStatus();
  };

  /**	Returns item's status for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrDataListGetItemStatusForID(cnrItemIDParam) {
    if (this.#cnrDataItemArray.length == 0) { return ''; };

    const cnrItemVar = this.cnrDataListGetItemForID(cnrItemIDParam);
    if (cnrItemVar == null || cnrItemVar == '') { return ''; };

    const cnrDataVar = cnrItemVar.cnrDataItemGetStatus();
    if (cnrDataVar == null || cnrDataVar == '') { return ''; };

    return cnrDataVar;
  };

  /**	Returns item data for index.
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
   cnrDataListGetItemDataForIndex(cnrItemIndexParam) {
    if (this.#cnrDataItemArray.length == 0) { return ''; };
    if (cnrItemIndexParam >= this.#cnrDataItemArray.length) { return ''; };

    return this.#cnrDataItemArray[cnrItemIndexParam].cnrDataItemGetData();
  };

  /**	Returns item's data for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
  cnrDataListGetItemDataForID(cnrItemIDParam) {
    if (this.#cnrDataItemArray.length == 0) { return ''; };

    const cnrItemVar = this.cnrDataListGetItemForID(cnrItemIDParam);
    if (cnrItemVar == null || cnrItemVar == '') { return ''; };

    const cnrDataVar = cnrItemVar.cnrDataItemGetData();
    if (cnrDataVar == null || cnrDataVar == '') { return ''; };

    return cnrDataVar;
  };
  
  /**	Adds a data item to the array. 
   * Type is required. 
   * Tag is required but not unique. 
   * Data can be empty. 
   * Returns new item on success. 
   * Returns null on errors.
   * */
  cnrDataListAddItem(cnrTypeParam, cnrTagParam, cnrDataParam) {
    if (cnrTypeParam == null || cnrTypeParam == '') { return null; };
    if (cnrTagParam == null || cnrTagParam == '') { return null; };

    let cnrPassedDataVar = cnrDataParam;
    if (cnrPassedDataVar == null || cnrPassedDataVar == '') {
      cnrPassedDataVar = '';
    };

    // create new item
    const cnrDateTimeVar = cnrDataModuleGetCurrentTime();
    const cnrNewIDVar = self.crypto.randomUUID();
    const cnrNewCreatedTimeUTCVar = cnrDateTimeVar;
    const cnrNewUpdatedTimeUTCVar = cnrDateTimeVar;
    const cnrNewTypeVar = cnrTypeParam;
    const cnrNewStatusVar = '-';
    const cnrNewTagVar = cnrTagParam;
    const cnrNewDataVar = cnrPassedDataVar;
    const cnrNewItemVar = new cnrDataItemClass(cnrNewIDVar, cnrNewCreatedTimeUTCVar, cnrNewUpdatedTimeUTCVar, cnrNewTypeVar, cnrNewStatusVar, cnrNewTagVar, cnrNewDataVar);

    // save new item
    this.#cnrDataItemArray.push(cnrNewItemVar);
    return cnrNewItemVar;
  };

  /**	Imports a previously created item to the array. 
   * Replaces current data with the imported values.
   * All values are required.
   * Returns new item on success. 
   * Returns null on errors.
   * */
  cnrDataListImportItem(cnrIDParam, cnrCreatedUTCParam, cnrUpdatedUTCParam, cnrItemTypeParam, cnrItemStatusParam, cnrTagParam, cnrDataParam) {
    // validate
    if (cnrIDParam == null || cnrIDParam == '') { return null; };
    if (cnrCreatedUTCParam == null || cnrCreatedUTCParam == '') { return null; };
    if (cnrUpdatedUTCParam == null || cnrUpdatedUTCParam == '') { return null; };
    if (cnrItemTypeParam == null || cnrItemTypeParam == '') { return null; };
    if (cnrItemStatusParam == null || cnrItemStatusParam == '') { cnrItemStatusParam = '-'; };
    if (cnrTagParam == null || cnrTagParam == '') { return null; };
    if (cnrDataParam == null || cnrDataParam == '') { return null; };

    // create new item
    const cnrNewItemVar = new cnrDataItemClass(cnrIDParam, cnrCreatedUTCParam, cnrUpdatedUTCParam, cnrItemTypeParam, cnrItemStatusParam, cnrTagParam, cnrDataParam);

    // save new item
    this.#cnrDataItemArray.push(cnrNewItemVar);
    return cnrNewItemVar;
  };

  /**	Removes a data item from the array.
   * UUID is required.
   * Returns the removed item on success. 
   * Returns null on errors.
   * */
  cnrDataListRemoveItemForID(cnrItemIDParam) {
    if (this.#cnrDataItemArray.length == 0) { return null; };
    if (cnrItemIDParam == null || cnrItemIDParam == '') { return null; };

    let cnrOldItemVar = this.cnrDataListGetItemForID(cnrItemIDParam);
    if (cnrOldItemVar == null || cnrOldItemVar == '') { return null; };

    let cnrCounterVar = 0;
    let cnrLengthVar = this.#cnrDataItemArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; ++cnrCounterVar){ 
      if (this.#cnrDataItemArray[cnrCounterVar].cnrDataItemGetID() === cnrItemIDParam) {
        // remove item
        this.#cnrDataItemArray.splice(cnrCounterVar, 1);
        // save change date
        this.#cnrDataListUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
        return cnrOldItemVar;
      };
    };

    return null;
  };

  /**	Updates an item's status by UUID.
   * UUID is required.
   * Returns the updated item on success. 
   * Returns null on errors.
   * */
   cnrDataListUpdateItemStatusForID(cnrItemIDParam) {
    if (this.#cnrDataItemArray.length == 0) { return null; };
    if (cnrItemIDParam == null || cnrItemIDParam == '') { return null; };

    let cnrOldItemVar = this.cnrDataListGetItemForID(cnrItemIDParam);
    if (cnrOldItemVar == null || cnrOldItemVar == '') { return null; };

    let cnrCounterVar = 0;
    let cnrLengthVar = this.#cnrDataItemArray.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; ++cnrCounterVar){ 
      if (this.#cnrDataItemArray[cnrCounterVar].cnrDataItemGetID() === cnrItemIDParam) {
        // update item
        if (this.#cnrDataItemArray[cnrCounterVar].cnrDataItemGetStatus() == '-') {
          this.#cnrDataItemArray[cnrCounterVar].cnrDataItemUpdateStatus('X');
        } else {
          this.#cnrDataItemArray[cnrCounterVar].cnrDataItemUpdateStatus('-');
        };

        // save change date
        this.#cnrDataListUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
        return cnrOldItemVar;
      };
    };

    return null;
  };

}; // cnrDataListClass
