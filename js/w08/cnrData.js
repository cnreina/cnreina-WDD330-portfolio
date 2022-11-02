/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

/**	Container and interface for cnrItem objects. 
 * Use cnrType to create instances for different type of items. 
 * The first item (index = 0) is created at construction time and contains 
 * data to represent the item's schema and basic documentation.  
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
    if (cnrReturnVar < 0) {
      // load fake data
      const cnrItem1 = {
        cnrName: 'Bechler Falls',
        cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
        cnrLocation: 'Ashton, Texas',
        cnrRating: '3.5',
        cnrDifficulty: 'Easy',
        cnrDescription:
          'Beautiful short hike along the Bechler river to Bechler Falls',
        cnrDirections:
          'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
      };

      const cnrItem2 = {
        cnrName: 'Teton Canyon',
        cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
        cnrLocation: 'Driggs, Colorado',
        cnrRating: '4.5',
        cnrDifficulty: 'Easy',
        cnrDescription: 'Beautiful short (or long) hike through Teton Canyon.',
        cnrDirections:
          'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short time onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.'
      };
      
      const cnrItem3 = {
        cnrName: 'Denanda Falls',
        cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
        cnrLocation: 'Somewhere, Utah',
        cnrRating: '4.0',
        cnrDifficulty: 'Moderate',
        cnrDescription:
          'Beautiful hike through Bechler meadows river to Denanda Falls',
        cnrDirections:
          'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
      };

      this.cnrAddItem('hike', true, cnrItem1);
      this.cnrAddItem('hike', true, cnrItem2);
      this.cnrAddItem('hike', true, cnrItem3);
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
