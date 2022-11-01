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

  constructor(cnrDataTypeParam, cnrNameParam, cnrDataSchemaParam) {
    if (cnrDataTypeParam === null || cnrDataTypeParam === '') {
      this.#cnrLastErrorMessage = 'constructor > cnrTypeParam';
      return null;
    };
    if (cnrNameParam === null || cnrNameParam === '') {
      this.#cnrLastErrorMessage = 'constructor > cnrNameParam';
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
      cnrName: cnrNameParam,
      cnrEnabled: true,
      cnrData: [cnrDataSchemaParam]
    };
    this.#cnrItemsArray.push(cnrFirstItem);

  }; // constructor

  /**	Returns array of cnrItem objects. 
   * First item contains the schema and 
   * basic documentation.
  */
  cnrGetAllItems() { return this.#cnrItemsArray; };

  /**	Returns array of cnrItem objects. 
   * First item contains the schema and 
   * basic documentation.
  */
  cnrGetAllItemsDataForName(cnrNameParam) {
    let cnrItemsVar = [];
    const cnrLength = this.#cnrItemsArray.length;
    let cnrCounter = 0;
    for (cnrCounter = 0; cnrCounter < cnrLength; cnrCounter++){
      if (this.#cnrItemsArray[cnrCounter].cnrName === cnrNameParam) {
        cnrItemsVar.push(this.#cnrItemsArray[cnrCounter].cnrData[0]);
      };
    };

    console.log("TEST = ", cnrItemsVar);
    

    return cnrItemsVar;
  };

  /**	Returns class data type. 
   * Data type is set at class construction.
  */
   cnrGetDataType() { return this.#cnrDataType; };

  /**	Returns last error message. 
   * Resets last error message on retrieval.
  */
  cnrGetLastErrorMessage() {
    const cnrErrorVar = this.#cnrLastErrorMessage;
    this.#cnrLastErrorMessage = '';
    return cnrErrorVar;
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
