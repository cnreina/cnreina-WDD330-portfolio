/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* 
INITIALIZE */

import * as cnrData from './cnrData.js';

const cnrQuakeURL = "../html/cnrQuakeView.html";


/* ************************************************************************* 
TOOLS */

/**	Removes all items from display element. 
 * Returns null on errors. 
*/
function cnrClearElement(cnrElementIDParam) {
  // console.clear();
  // remove from element
  const cnrContainerElementVar = document.getElementById(cnrElementIDParam);
  if (cnrContainerElementVar === null || cnrContainerElementVar === '') {
    console.log("ERROR: cnrClearElement > cnrContainerElementVar", cnrContainerElementVar);
    return null;
  };
  while (cnrContainerElementVar.firstChild) {
    cnrContainerElementVar.removeChild(cnrContainerElementVar.firstChild);
  };
}; // cnrClearElement


/* ************************************************************************* 
PEOPLE */

/**	cnrRenderItems. 
 * Renders passed items in passed element. 
 * Returns null on errors. 
 * 
*/
export function cnrRenderItems(cnrContainerIDParam, cnrItemsParam) {
  if (cnrContainerIDParam === null || cnrContainerIDParam === '') {
    console.log("ERROR: cnrRenderItems > cnrContainerIDParam", cnrContainerIDParam);
    return null;
  };
  if (cnrItemsParam === null || cnrItemsParam === '') {
    console.log("ERROR: cnrRenderItems > cnrItemsParam", cnrItemsParam);
    return null;
  };

  cnrClearElement(cnrContainerIDParam);

  // render items
  const cnrItemsVar = cnrItemsParam.cnrGetItemsDataForName('cnrQuake');
  cnrItemsVar.forEach(cnrItemVar => {
    cnrRenderItem(cnrContainerIDParam, cnrItemVar);
  });
}; // cnrRenderItems


function cnrRenderItem(cnrContainerElementParam, cnrItemParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderItem > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  if (cnrItemParam === null || cnrItemParam === '') {
    console.log("ERROR: cnrRenderItem > cnrItemParam", cnrItemParam);
    return;
  };

  // prepare container
  const cnrContainerElementVar = document.getElementById(cnrContainerElementParam);
  if (cnrContainerElementVar === null || cnrContainerElementVar === '') {
    console.log("ERROR: cnrRenderItem > cnrContainerElementVar", cnrContainerElementVar);
    return;
  };

  // prepare querystring data to send to quake detail page
  const cnrItemObject = {
    cnrTime: cnrItemParam.cnrTime,
    cnrLocation: cnrItemParam.cnrLocation,
    cnrMagnitude: cnrItemParam.cnrMagnitude,
    cnrDetails: cnrItemParam.cnrDetails
  };
  const cnrEncodedStringVar = new URLSearchParams(cnrItemObject).toString();

  // prepare quake detail url
  const cnrQuakeURLVar = `${cnrQuakeURL}?${cnrEncodedStringVar}`;

  // prepare display element
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('cnrjscontentdivs');
  cnrCardDivVar.innerHTML = `
    <div class="cnrcardheaderdivs">
      <p class="cnrcardheadertitles"><a href="${cnrQuakeURLVar}">${cnrItemParam.cnrLocation} (${cnrItemParam.cnrMagnitude})</a></p>
    </div>
  `;

  // render element
  cnrContainerElementVar.appendChild(cnrCardDivVar);
  cnrCardDivVar.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
}; // cnrRenderItem


/* ************************************************************************* 
PAGINATION */

export function cnrRenderPagination(cnrContainerIDParam, cnrCurrentPageParam, cnrPagesCountParam) {
  if (cnrContainerIDParam === null || cnrContainerIDParam === '') {
    console.log("ERROR: cnrRenderPagination > cnrContainerIDParam", cnrContainerIDParam);
    return;
  };
  if (cnrCurrentPageParam === null || cnrCurrentPageParam === '') {
    console.log("ERROR: cnrRenderPagination > cnrCurrentPageParam", cnrCurrentPageParam);
    return;
  };
  if (cnrPagesCountParam === null || cnrPagesCountParam === '') {
    console.log("ERROR: cnrRenderPagination > cnrPagesCountParam", cnrPagesCountParam);
    return;
  };

  const cnrContainerElementVar = document.getElementById(cnrContainerIDParam);
  if (cnrContainerElementVar === null || cnrContainerElementVar === '') {
    console.log("ERROR: cnrRenderPagination > cnrContainerElementVar", cnrContainerElementVar);
    return;
  };

  cnrClearElement(cnrContainerIDParam);
  
  const cnrLength = cnrPagesCountParam;
  let cnrCounter = 1;
  for (cnrCounter = 1; cnrCounter < cnrLength; cnrCounter++){
    // prepare element
    const cnrPaginationDivVar = document.createElement('div');
    cnrPaginationDivVar.classList.add('cnrpaginationlinksdivs');
    cnrPaginationDivVar.id = 'cnrpaginationlink' + cnrCounter.toString();
    cnrPaginationDivVar.dataset.cnrvalue = cnrCounter.toString();
    cnrPaginationDivVar.innerHTML = cnrCounter.toString();
    if (cnrCounter.toString() === cnrCurrentPageParam.toString()) {
      cnrPaginationDivVar.classList.add('cnrpaginationlinkactive');
    };
    // render element
    cnrContainerElementVar.appendChild(cnrPaginationDivVar);
    cnrPaginationDivVar.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  };

}; // cnrRenderPagination

/* ************************************************************************* 
COMMENTS */

export function cnrRenderComments(cnrContainerIDParam, cnrCommentsParam) {
  if (cnrContainerIDParam === null || cnrContainerIDParam === '') {
    console.log("ERROR: cnrRenderComments > cnrContainerElementParam", cnrContainerIDParam);
    return;
  };
  if (cnrCommentsParam === null || cnrCommentsParam === '') {
    return;
  };

  cnrClearElement(cnrContainerIDParam);
  cnrCommentsParam.forEach(cnrCommentVar => {
    cnrRenderComment(cnrContainerIDParam, cnrCommentVar);
  });
}; // cnrRenderComments

export function cnrRenderCommentsForID(cnrContainerIDParam, cnrCommentTextParam, cnrCommentIDParam) {
  if (cnrContainerIDParam === null || cnrContainerIDParam === '') {
    console.log("ERROR: cnrRenderComments > cnrContainerElementParam", cnrContainerIDParam);
    return;
  };
  if (cnrCommentTextParam === null || cnrCommentTextParam === '') {
    return;
  };
  if (cnrCommentIDParam === null || cnrCommentIDParam === '') {
    console.log("ERROR: cnrRenderComments > cnrIDParam", cnrCommentIDParam);
    return;
  };

  cnrClearElement(cnrContainerIDParam);
  cnrCommentTextParam.forEach(cnrCommentVar => {
    if (cnrCommentVar.cnrID.toString() === cnrCommentIDParam.toString()) {
      cnrRenderComment(cnrContainerIDParam, cnrCommentVar);
    };
  });
}; // cnrRenderCommentsForID

export function cnrRenderComment(cnrContainerElementParam, cnrCommentParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderComment > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  if (cnrCommentParam === null || cnrCommentParam === '') {
    return;
  };

  const cnrContainerElementVar = document.getElementById(cnrContainerElementParam);
  if (cnrContainerElementVar === null || cnrContainerElementVar === '') {
    console.log("ERROR: cnrRenderComment > cnrContainerElementVar", cnrContainerElementVar);
    return;
  };

  // prepare element
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('cnrcardcommentdivs');
  cnrCardDivVar.innerHTML = `
    <p class="cnrcardcommentdates">${cnrCommentParam.cnrDate}</p>
    <p class="cnrcardcommenttexts">${cnrCommentParam.cnrComment}</p>
  `;
  
  // render element
  cnrContainerElementVar.appendChild(cnrCardDivVar);
  cnrCardDivVar.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

}; // cnrRenderComment
