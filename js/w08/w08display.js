/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* 
INITIALIZE */

const cnrHikeURL = "../../html/w08/w08item.html";


/* ************************************************************************* 
TOOLS */

/**	Removes all items from display element. */
function cnrClearElement(cnrElementIDParam) {
  // console.clear();
  // remove from element
  const cnrContainerElementVar = document.getElementById(cnrElementIDParam);
  while (cnrContainerElementVar.firstChild) {
    cnrContainerElementVar.removeChild(cnrContainerElementVar.firstChild);
  };
}; // cnrClearElement


/* ************************************************************************* 
ITEMS */

export function cnrRenderItems(cnrContainerIDParam, cnrItemsParam) {
  if (cnrContainerIDParam === null || cnrContainerIDParam === '') {
    console.log("ERROR: cnrRenderItems > cnrContainerIDParam", cnrContainerIDParam);
    return;
  };
  if (cnrItemsParam === null || cnrItemsParam === '') {
    console.log("ERROR: cnrRenderItems > cnrItemsParam", cnrItemsParam);
    return;
  };

  cnrClearElement(cnrContainerIDParam);
  cnrItemsParam.forEach(cnrItemVar => {
    cnrRenderItem(cnrContainerIDParam, cnrItemVar);
  });
}; // cnrRenderItems

export function cnrRenderItem(cnrContainerElementParam, cnrItemParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderItem > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  if (cnrItemParam === null || cnrItemParam === '') {
    console.log("ERROR: cnrRenderItem > cnrItemParam", cnrItemParam);
    return;
  };

  const cnrContainerElementVar = document.getElementById(cnrContainerElementParam);
  if (cnrContainerElementVar === null || cnrContainerElementVar === '') {
    console.log("ERROR: cnrRenderItem > cnrContainerElementVar", cnrContainerElementVar);
    return;
  };

  // prepare querystring data sent to hike detail page
  const cnrItemObject = {
    cnrName: cnrItemParam.cnrName,
    cnrImageURL: cnrItemParam.cnrImageURL,
    cnrLocation: cnrItemParam.cnrLocation,
    cnrRating: cnrItemParam.cnrRating,
    cnrDifficulty: cnrItemParam.cnrDifficulty,
    cnrDescription: cnrItemParam.cnrDescription,
    cnrDirections: cnrItemParam.cnrDirections
  };
  const cnrEncodedStringVar = new URLSearchParams(cnrItemObject).toString();
  
  // prepare element
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('cnrjscontentdivs');
  cnrCardDivVar.innerHTML = `
    <div class="cnrcardheaderdivs">
      <p class="cnrcardheadertitles">${cnrItemParam.cnrName}</p>
    </div>
    <div class="cnrcardcontentdivs">
      <div class="cnrcardcelldivs">
        <div class="cnrcardimagedivs">
            <img class="cnrcardimages" src=${cnrItemParam.cnrImageURL} alt="Image">
        </div>
      </div>
      <div class="cnrcardcelldivs">
        <div class="cnrcardinfodivs">
          <div class="cnrcardbasicinfodivs">
            <p><b>Name:</b></p><p>${cnrItemParam.cnrName}</p>
            <p><b>Location:</b></p><p>${cnrItemParam.cnrLocation}</p>
            <p><b>Rating:</b></p><p>${cnrItemParam.cnrRating}</p>
            <a class="cnrcarddetailslinks" href="${cnrHikeURL}?${cnrEncodedStringVar}">Details</a>
          </div>
          <div class="cnrcardfullinfodivs">
            <p><b>Dificulty:</b></p><p>${cnrItemParam.cnrDifficulty}</p>
          </div>
        </div>
      </div>
    </div>
`;
  
  // render element
  cnrContainerElementVar.appendChild(cnrCardDivVar);
}; // cnrRenderItem


/* ************************************************************************* 
COMMENTS */

export function cnrRenderComments(cnrContainerIDParam, cnrCommentsParam) {
  if (cnrContainerIDParam === null || cnrContainerIDParam === '') {
    console.log("ERROR: cnrRenderComments > cnrContainerElementParam", cnrContainerIDParam);
    return;
  };
  if (cnrCommentsParam === null || cnrCommentsParam === '') {
    console.log("ERROR: cnrRenderComments > cnrCommentsParam", cnrCommentsParam);
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
    console.log("ERROR: cnrRenderComments > cnrCommentsParam", cnrCommentTextParam);
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
    console.log("ERROR: cnrRenderComment > cnrCommentParam", cnrCommentParam);
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
