/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
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
// EXPORTED CLASSES

export class cnrDataItemClass {
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
  cnrDataItemGetData() { return this.#cnrItemData; };

  /**	Returns item as a JSON string. */
  cnrDataItemGetJSONString() {
    const cnrItemDataVar = JSON.stringify(this.#cnrItemData);
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

  /**	Sets item's value. 
   * Sets it to empty string if passed value is null, empty, or not a string.
   */
  cnrDataItemUpdateData(cnrDataParam) {
    if (cnrDataParam == null || cnrDataParam == '' || typeof cnrDataParam != 'string') {
      this.#cnrItemData = '';
      return;
    };
    // update
    this.#cnrItemData = cnrDataParam;
    // save change date
    this.#cnrItemUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
  };

}; // cnrDataItemClass

/* ************************************************************************* */

export class cnrDataListClass {
  // PRIVATE

  #cnrDataListID;
  #cnrDataListCreatedTimeUTC;
  #cnrDataListUpdatedTimeUTC;
  #cnrDataListType;
  #cnrDataList = [];

  constructor() {
    this.#cnrDataListID = self.crypto.randomUUID();
    const cnrDateTimeUTCVar = cnrDataModuleGetCurrentTime();
    this.#cnrDataListCreatedTimeUTC = cnrDateTimeUTCVar;
    this.#cnrDataListUpdatedTimeUTC = cnrDateTimeUTCVar;
    this.#cnrDataListType = "string";
    this.#cnrDataList = [];
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
  cnrDataListGetList() {
    if (this.#cnrDataList.length <= 0) { return null; };
    return this.#cnrDataList;
  };

  /**	Returns data list's items as a JSON string. 
   * Returns an empty string if empty */
  cnrDataListGetJSONString() {
    if (this.#cnrDataList.length <= 0) { return ''; };

    let cnrItemsVar = [];
    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrDataList.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      cnrItemsVar.push(this.#cnrDataList[cnrCounterVar].cnrDataItemGetJSONString());
    };
    
    const cnrJSONString = JSON.stringify(cnrItemsVar);
    
    return cnrJSONString;
  };

  // items
  /**	Returns data list's items array length. */
  cnrDataListGetItemCount() { return this.#cnrDataList.length; };

  /**	Returns item object for index.
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrDataListGetItemForIndex(cnrItemIndexParam) {
    if (this.#cnrDataList.length == 0) { return null; };
    if (cnrItemIndexParam >= this.#cnrDataList.length) { return null; };

    return this.#cnrDataList[cnrItemIndexParam].cnrDataItemGetItem();
  };

  /**	Returns array of item objects for key. 
   * Returns null if empty. 
   * Returns null on errors.
  */
  cnrDataListGetItemsForTag(cnrItemKeyParam) {
    if (this.#cnrDataList.length == 0) { return null; };

    const cnrItemsArray = [];
    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrDataList.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrDataList[cnrCounterVar].cnrDataItemGetTag().toString() == cnrItemKeyParam.toString()) {
        cnrItemsArray.push(this.#cnrDataList[cnrCounterVar].cnrDataItemGetItem());
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
    if (this.#cnrDataList.length == 0) { return null; };

    let cnrCounterVar = 0;
    const cnrLengthVar = this.#cnrDataList.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; cnrCounterVar++) {
      if (this.#cnrDataList[cnrCounterVar].cnrDataItemGetID().toString() == cnrItemIDParam.toString()) {
        return this.#cnrDataList[cnrCounterVar].cnrDataItemGetItem();
      };
    };

    return null;
  };

  /**	Returns item's data for UUID. 
   * Returns empty string if empty. 
   * Returns empty string on errors.
  */
  cnrDataListGetItemDataForID(cnrItemIDParam) {
    if (this.#cnrDataList.length == 0) { return ''; };

    return this.cnrDataListGetItemsForTag(cnrItemIDParam).toString();
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

    let cnrDataVar = cnrDataParam;
    if (cnrDataParam == null || cnrDataParam == '') {
      cnrDataVar = '';
    };

    const cnrDateTimeVar = cnrDataModuleGetCurrentTime();
    const cnrItemIDVar = self.crypto.randomUUID();
    const cnrItemCreatedTimeUTCVar = cnrDateTimeVar;
    const cnrItemUpdatedTimeUTCVar = cnrDateTimeVar;
    const cnrItemTypeVar = cnrTypeParam;
    const cnrItemStatusVar = 'active';
    const cnrItemTagVar = cnrTagParam;
    const cnrItemDataVar = cnrDataParam;

    // add new item
    const cnrNewItemVar = new cnrDataItemClass(cnrItemIDVar, cnrItemCreatedTimeUTCVar, cnrItemUpdatedTimeUTCVar, cnrItemTypeVar, cnrItemStatusVar, cnrItemTagVar, cnrItemDataVar);
    this.#cnrDataList.push(cnrNewItemVar);
    return cnrNewItemVar;
  };

  /**	Imports a previously created item to the array. 
   * Replaces current data with the imported values.
   * All values are required.
   * Returns new item on success. 
   * Returns null on errors.
   * */
  cnrDataListImportItem(cnrIDParam, cnrCreatedUTCParam, cnrUpdatedUTCParam, cnrItemTypeParam, cnrDataListParam) {
    // validate
    if (cnrIDParam == null || cnrIDParam == '') { return null; };
    if (cnrCreatedUTCParam == null || cnrCreatedUTCParam == '') { return null; };
    if (cnrUpdatedUTCParam == null || cnrUpdatedUTCParam == '') { return null; };
    if (cnrItemTypeParam == null || cnrItemTypeParam == '') { return null; };
    if (cnrDataListParam == null || cnrDataListParam == '') { return null; };
    
    // add new item
    const cnrNewItemVar = new cnrDataItemClass(cnrIDParam, cnrCreatedUTCParam, cnrUpdatedUTCParam, cnrItemTypeParam, cnrDataListParam);
    this.#cnrDataList.push(cnrNewItemVar);

    return cnrNewItemVar;
  };

  /**	Removes a data item from the array.
   * UUID is required.
   * Returns the removed item on success. 
   * Returns null on errors.
   * */
  cnrDataListRemoveItemForID(cnrItemIDParam) {
    if (this.#cnrDataList.length == 0) { return null; };
    if (cnrItemIDParam == null || cnrItemIDParam == '') { return null; };

    let cnrOldItemVar = this.cnrDataListGetItemForID(cnrItemIDParam);
    if (cnrOldItemVar == null || cnrOldItemVar == '') { return null; };

    let cnrCounterVar = 0;
    let cnrLengthVar = this.#cnrDataList.length;
    for(cnrCounterVar = 0; cnrCounterVar < cnrLengthVar; ++cnrCounterVar){ 
      if (this.#cnrDataList[cnrCounterVar].cnrDataItemGetID() === cnrItemIDParam) {
        // remove item
        this.#cnrDataList.splice(cnrCounterVar, 1);
        // save change date
        this.#cnrDataListUpdatedTimeUTC = cnrDataModuleGetCurrentTime();
        return cnrOldItemVar;
      };
    };

    return null;
  };

}; // cnrDataListClass
