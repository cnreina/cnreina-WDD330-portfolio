/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

/**	Container and interface for cnrItem objects. 
 * Use cnrDataType to create instances for different type of items. 
 * The first item (index 0) is created at construction time and contains 
 * data to represent the item's schema and basic documentation.  
 * Uses cnrDataType as key to save data.
*/
export class cnrItemsClass {
  #cnrLastErrorMessage = '';
  #cnrDataType = '';
  #cnrItemsArray = [];

  constructor(cnrDataTypeParam, cnrDataSchemaParam) {
    if (cnrDataTypeParam === null || cnrDataTypeParam === '') {
      this.#cnrLastErrorMessage = 'constructor > cnrTypeParam';
      return null;
    };
    if (cnrDataSchemaParam === null || cnrDataSchemaParam === '') {
      this.#cnrLastErrorMessage = 'constructor > cnrDataSchemaParam';
      return null;
    };

    // save data type
    this.#cnrDataType = cnrDataTypeParam;

    // create first item
    const cnrFirstItem = {
      cnrID: cnrGetNewUUID(),
      cnrCreated: cnrGetUTCDateTime(),
      cnrType: cnrDataTypeParam,
      cnrName: 'schema',
      cnrEnabled: true,
      cnrData: [cnrDataSchemaParam]
    };
    this.#cnrItemsArray.push(cnrFirstItem);

    // import class data from storage
    const cnrReturnVar = this.cnrImportClassData();

    // load fake data if storage is empty
    if (cnrReturnVar < 0) {
      this.#cnrLastErrorMessage = "constructor > cnrImportClassData";
    };

  }; // constructor

  /* ******************************** */

  /**	Returns class data type. 
   * Data type is set at class construction.
  */
  cnrGetClassDataType() { return this.#cnrDataType; };
  
  /**	Returns class created date and time. 
   * Data created date and time is set at class construction 
   * and stored in first item (Item[0]).
  */
   cnrGetClassCreated() { return this.#cnrItemsArray[0].cnrCreated; };

  /**	Returns last error message. 
   * Resets last error message on retrieval.
  */
  cnrGetLastErrorMessage() {
    const cnrErrorVar = this.#cnrLastErrorMessage;
    this.#cnrLastErrorMessage = '';
    return cnrErrorVar;
  };

  /**	Returns count of class data items. */
  cnrGetClassItemsCount() { return this.#cnrItemsArray.length; };
  
  /**	Imports class data from storage. 
   * Uses cnrDataType as key.
   * Returns 0 on success. 
   * Returns negative number on errors.
  */
  cnrImportClassData() {
    // get data
    const cnrDataVar = localStorage.getItem(this.#cnrDataType);
    if (cnrDataVar === null || cnrDataVar === '') {
      return -1;
    };
    const cnrJSONVar = JSON.parse(cnrDataVar);

    if (cnrJSONVar.cnrLastErrorMessage === null) {
      this.#cnrLastErrorMessage = "cnrImportClassData > cnrLastErrorMessage";
      return -1;
    };
    if (cnrJSONVar.cnrDataType === null || cnrJSONVar.cnrDataType === '') {
      this.#cnrLastErrorMessage = "cnrImportClassData > cnrDataType";
      return -1;
    };

    const cnrDataJSONVar = JSON.parse(cnrJSONVar.cnrItemsArray);
    if (cnrDataJSONVar === null) {
      this.#cnrLastErrorMessage = "cnrImportClassData > cnrDataJSONVar";
      return -1;
    };

    // save class data
    this.#cnrLastErrorMessage = cnrJSONVar.cnrLastErrorMessage;
    this.#cnrDataType = cnrJSONVar.cnrDataType;
    this.#cnrItemsArray = cnrDataJSONVar;

    return 0
  }; // cnrImportClassData

  /**	Saves class data in storage. 
   * Uses cnrDataType as key.
  */
   cnrSaveClassData() {
    if (this.#cnrDataType === null || this.#cnrDataType === '') {
      this.#cnrLastErrorMessage = 'cnrSaveData > cnrDataType';
      return;
    };
    if (this.#cnrItemsArray === null || this.#cnrItemsArray.length <= 0) {
      this.#cnrLastErrorMessage = 'cnrSaveData > cnrItemsArray';
      return;
    };
    
    // prepare data
    const cnrDataJSONStringVar = JSON.stringify(this.#cnrItemsArray);
    const cnrJSONObjectVar = {
      cnrLastErrorMessage: this.#cnrLastErrorMessage,
      cnrDataType: this.#cnrDataType,
      cnrItemsArray: cnrDataJSONStringVar
    };
    const cnrJSONStringVar = JSON.stringify(cnrJSONObjectVar);

    // save data
    localStorage.setItem(this.#cnrDataType, cnrJSONStringVar);
  };

  /* ******************************** */

  /**	Returns array of cnrItem objects. 
   * First item contains the schema and 
   * basic documentation.
  */
  cnrGetAllItems() { return this.#cnrItemsArray; };
  
  /**	Returns item created date and time. 
   * Data created date and time is set at item construction. 
   * Returns empty string on errors.
  */
   cnrGetItemForIndex(cnrIndexParam) {
    if (cnrIndexParam === null || isNaN(cnrIndexParam)) {
      this.#cnrLastErrorMessage = 'cnrGetItemCreatedForIndex > cnrIndexParam';
      return '';
    };
    if (cnrIndexParam < 0 || cnrIndexParam >= this.#cnrItemsArray.length) {
      this.#cnrLastErrorMessage = 'cnrGetItemCreatedForIndex > cnrIndexParam';
      return '';
    };

    return this.#cnrItemsArray[cnrIndexParam];
  };

   /**	Returns array of cnrItem objects. 
    * First item contains the schema and 
    * basic documentation. 
    * Returns null on errors or empty.
   */
   cnrGetItemsDataForName(cnrNameParam) {
     let cnrItemsVar = [];
     const cnrLength = this.#cnrItemsArray.length;
     let cnrCounter = 0;
     for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++){
       if (this.#cnrItemsArray[cnrCounter].cnrName === cnrNameParam) {
         cnrItemsVar.push(this.#cnrItemsArray[cnrCounter].cnrData[0]);
       };
     };

     if (cnrItemsVar.length <= 0) { return null; };
     return cnrItemsVar;
  };

  /**	Returns item created date and time. 
   * Data created date and time is set at item construction. 
   * Returns empty string on errors.
  */
  cnrGetItemCreatedForIndex(cnrIndexParam) {
    if (cnrIndexParam === nul || isNaN(cnrIndexParam)) {
      this.#cnrLastErrorMessage = 'cnrGetItemCreatedForIndex > cnrIndexParam';
      return '';
    };
    if (cnrIndexParam < 0 || cnrIndexParam >= this.#cnrItemsArray.length) {
      this.#cnrLastErrorMessage = 'cnrGetItemCreatedForIndex > cnrIndexParam';
      return '';
    };

    return this.#cnrItemsArray[cnrIndexParam].cnrCreated;
  };

  /**	Returns item created date and time. 
   * Item created date and time is set at item construction. 
   * Returns empty string on errors.
  */
   cnrGetItemCreatedForItemID(cnrIDParam) {
    if (cnrIDParam === null || cnrIDParam === '') {
      this.#cnrLastErrorMessage = 'cnrGetItemCreatedForItemID > cnrIDParam';
      return '';
    };
    
    const cnrLength = this.#cnrItemsArray.length;
     let cnrCounter = 0;
     for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++){
       if (this.#cnrItemsArray[cnrCounter].cnrID === cnrIDParam) {
         return this.#cnrItemsArray[cnrCounter].cnrCreated;
       };
     };
    
     return '';
  };
  
  /**	Adds a new item */
  cnrAddItem(cnrNameParam, cnrEnabledParam, cnrDataParam) {
    if (cnrNameParam === null || cnrNameParam === '') {
      this.#cnrLastErrorMessage = 'cnrAddItem > cnrNameParam';
      return null;
    };
    if (cnrEnabledParam === null || cnrEnabledParam === '') {
      this.#cnrLastErrorMessage = 'cnrAddItem > cnrEnabledParam';
      return null;
    };
    if (cnrDataParam === null || cnrDataParam === '') {
      this.#cnrLastErrorMessage = 'cnrAddItem > cnrDataParam';
      return null;
    };

    // create item
    const cnrNewItem = {
      cnrID: cnrGetNewUUID(),
      cnrCreated: cnrGetUTCDateTime(),
      cnrType: this.#cnrDataType,
      cnrName: cnrNameParam,
      cnrEnabled: cnrEnabledParam,
      cnrData: [cnrDataParam]
    };
    // save item
    this.#cnrItemsArray.push(cnrNewItem);
    
  };

}; // cnrItemsClass


/**	Returns current UTC date and time. */
function cnrGetUTCDateTime() {
  const cnrDateTimeVar = new Date();
  const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
  return cnrDateTimeUTCVar;
};

/**	Returns a new random UUID. */
function cnrGetNewUUID() {
  return self.crypto.randomUUID();
};
