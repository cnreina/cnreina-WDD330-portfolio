/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

export class cnrDataItemClass {
  // PRIVATE

  #cnrItemID;
  #cnrItemCreatedTimeUTC;
  #cnrItemType;
  #cnrItemTag;
  #cnrItemData;

  constructor(cnrTypeParam, cnrTagParam, cnrDataParam) {
    this.#cnrItemID = self.crypto.randomUUID();
    const cnrDateTimeVar = new Date();
    const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
    this.#cnrItemCreatedTimeUTC = cnrDateTimeUTCVar;
    this.#cnrItemType = cnrTypeParam;
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

  /**	Returns item's data type (Ex; string, json). */
  cnrDataItemGetType() { return this.#cnrItemType; };

  /**	Returns item's key. */
  cnrDataItemGetTag() { return this.#cnrItemTag; };

  /**	Returns item's data. */
  cnrDataItemGetData() { return this.#cnrItemData; };

  /**	Sets item's data type (Ex; string, json). 
   * Returns if passed type is null or empty.
   */
   cnrDataItemUpdateType(cnrTypeParam) {
    if (cnrTypeParam == null || cnrTypeParam == '') { return; };

    this.#cnrItemType = cnrTypeParam;
  };

  /**	Sets item's key. 
   * Returns if passed key is null or empty.
   * Key is not unique
   */
  cnrDataItemUpdateTag(cnrTagParam) {
    if (cnrTagParam == null || cnrTagParam == '') { return; };

    this.#cnrItemTag = cnrTagParam;
  };

  /**	Sets item's value. 
   * Sets it to empty string if passed value is null, empty, or not a string.
   */
  cnrDataItemUpdateData(cnrDataParam) {
    if (cnrDataParam == null || cnrDataParam == '' || typeof cnrDataParam != 'string') {
      this.#cnrItemData = '';
      return;
    };

    this.#cnrItemData = cnrDataParam;
  };

}; // cnrDataItemClass

/* ************************************************************************* */

export class cnrDataListClass {
  // PRIVATE

  #cnrDataListID;
  #cnrDataListCreatedTimeUTC;
  #cnrDataListType;
  #cnrDataList = [];

  constructor() {
    this.#cnrDataListID = self.crypto.randomUUID();
    const cnrDateTimeVar = new Date();
    const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
    this.#cnrDataListCreatedTimeUTC = cnrDateTimeUTCVar;
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

  /**	Returns data list's items array. */
  cnrDataListGetList() { return this.#cnrDataList; };

  // items
  /**	Returns data list's items array length. */
  cnrDataListGetItemCount() { return this.#cnrDataList.length; };

  /**	Returns item object for index. */
  cnrDataListGetItemForIndex(cnrItemIndexParam) {
    if (this.#cnrDataList.length == 0) { return null; };
    if (cnrItemIndexParam >= this.#cnrDataList.length) { return null; };

    return this.#cnrDataList[cnrItemIndexParam].cnrDataItemGetItem();
  };

  /**	Returns array of item objects for key. */
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

  /**	Returns item object for UUID. */
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

  /**	Returns item's data for key. */
  cnrDataListGetItemDataForID(cnrItemIDParam) {
    if (this.#cnrDataList.length == 0) { return ''; };

    return this.cnrDataListGetItemsForTag(cnrItemIDParam).toString();
  };
  
  /**	Adds a data item to the array.
   * Type is required.
   * Tag is required but not unique.
   * Data can be empty 
   * */
  cnrDataListAddItem(cnrTypeParam, cnrTagParam, cnrDataParam) {
    if (cnrTypeParam == null || cnrTypeParam == '') { return; };
    if (cnrTagParam == null || cnrTagParam == '') { return; };

    let cnrDataVar = cnrDataParam;
    if (cnrDataParam == null || cnrDataParam == '' || typeof cnrDataParam != 'string') {
      cnrDataVar = '';
    };

    const cnrNewItemVar = new cnrDataItemClass(cnrTypeParam, cnrTagParam, cnrDataVar);
    this.#cnrDataList.push(cnrNewItemVar);

    return cnrNewItemVar;
  };

}; // cnrDataListClass
