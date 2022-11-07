/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

import * as cnrStorage from './w07storage.js';


export class cnrCommentsClass {
  constructor() {
    // find comments in local storage
    let cnrCommentsJSONString = '';
    if (cnrStorage.cnrLocalStorageHasKey('cnrComments') === true) {
      cnrCommentsJSONString = cnrStorage.cnrLocalStorageRetrieve('cnrComments');
    };
    if (cnrCommentsJSONString === null || cnrCommentsJSONString === '') {
      // create fake comments
      this.cnrAddComment('Bechler Falls', 'Bechler Falls is cool.');
      this.cnrAddComment('Teton Canyon', 'Teton Canyon is cool.');
      this.cnrAddComment('Denanda Falls', 'Denanda Falls is cool.');
      return;
    };

    // import comments from local storage
    const cnrDataJSONObject = JSON.parse(cnrCommentsJSONString);
    const cnrDataJSONKeys = Object.keys(cnrDataJSONObject);
    // get objects
    const cnrLength = cnrDataJSONKeys.length;
    let cnrCounter = 0;
    for (cnrCounter = 0; cnrCounter < cnrLength; ++cnrCounter){
      const cnrDataItemVar = cnrDataJSONObject[cnrDataJSONKeys[cnrCounter]];
      if (cnrDataItemVar == null) { console.log("ERROR: cnrCommentsClass > constructor > cnrDataItemVa"); return; };

      // load new list
      const cnrNewCommentVar = {
        cnrID: cnrDataItemVar.cnrID,
        cnrDate: cnrDataItemVar.cnrDate,
        cnrComment: cnrDataItemVar.cnrComment
      };
      cnrCommentsList.push(cnrNewCommentVar);
    };
  }; // constructor

  cnrGetAllComments() { return cnrCommentsList; };

  cnrGetAllCommentsAsJSONString() {
    const cnrCommentsJSONVar = JSON.stringify(cnrCommentsList);
    return cnrCommentsJSONVar;
  };
  
  cnrGetCommentsForID(cnrIdParam) {
    if (cnrIdParam === null || cnrIdParam === '') {
      console.log("ERROR: cnrCommentsClass > cnrGetCommentsForID > cnrIdParam", cnrIdParam);
      return null;
    };

    const cnrCommentsForIDVar = {};
    cnrCommentsForIDVar.cnrComments = [...cnrCommentsList.cnrComment].filter(cnrIDVar => cnrIDVar.cnrID === cnrIdParam).map(cnrIDVar => cnrIDVar.cnrComment);
    if (cnrCommentsForIDVar === null) {
      console.log("ERROR: cnrCommentsClass > cnrGetCommentsForID > cnrCommentsForIDVar", cnrCommentsForIDVar);
      return null;
    };

    return cnrCommentsForIDVar;
  };

  cnrAddComment(cnrIdParam, cnrCommentParam) {
    if (cnrIdParam === null || cnrIdParam === '') {
      console.log("ERROR: cnrCommentsClass > cnrAddComment > cnrIdParam", cnrIdParam);
      return null;
    };
    if (cnrCommentParam === null || cnrCommentParam === '') {
      console.log("ERROR: cnrCommentsClass > cnrAddComment > cnrCommentParam", cnrCommentParam);
      return null;
    };

    const cnrDateVar = cnrGetUTCTimeString();
    const cnrNewCommentVar = {
      cnrID: cnrIdParam,
      cnrDate: cnrDateVar,
      cnrComment: cnrCommentParam
    };
  
    cnrCommentsList.push(cnrNewCommentVar);
    return cnrNewCommentVar;
  };

}; // cnrCommentsClass

/**	Returns current UTC time. */
function cnrGetUTCTimeString() {
  const cnrDateTimeVar = new Date();
  const cnrDateTimeUTCVar = cnrDateTimeVar.toUTCString();
  return cnrDateTimeUTCVar;
};

const cnrCommentsList = [];
