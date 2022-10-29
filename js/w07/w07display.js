/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* 
INITIALIZE */

const cnrHikeURL = "../../html/w07/w07hike.html";

/* ************************************************************************* 
ITEMS */

export function cnrRenderItems(cnrContainerElementParam, cnrItemsParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderItems > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  if (cnrItemsParam === null || cnrItemsParam === '') {
    console.log("ERROR: cnrRenderItems > cnrItemsParam", cnrItemsParam);
    return;
  };

  cnrItemsParam.forEach(cnrItemVar => {
    cnrRenderItem(cnrContainerElementParam, cnrItemVar);
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

export function cnrRenderComments(cnrContainerElementParam, cnrCommentsParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderComments > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  if (cnrCommentsParam === null || cnrCommentsParam === '') {
    console.log("ERROR: cnrRenderComments > cnrCommentsParam", cnrCommentsParam);
    return;
  };

  cnrCommentsParam.forEach(cnrCommentVar => {
    cnrRenderComment(cnrContainerElementParam, cnrCommentVar);
  });
}; // cnrRenderComments

export function cnrRenderCommentsForID(cnrContainerElementParam, cnrCommentsParam, cnrIDParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderComments > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  if (cnrCommentsParam === null || cnrCommentsParam === '') {
    console.log("ERROR: cnrRenderComments > cnrCommentsParam", cnrCommentsParam);
    return;
  };
  if (cnrIDParam === null || cnrIDParam === '') {
    console.log("ERROR: cnrRenderComments > cnrIDParam", cnrIDParam);
    return;
  };

  cnrCommentsParam.forEach(cnrCommentVar => {
    if (cnrCommentVar.cnrID.toString() === cnrIDParam.toString()) {
      cnrRenderComment(cnrContainerElementParam, cnrCommentVar);
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
    <p>${cnrCommentParam.cnrID}</p>
    <p>${cnrCommentParam.cnrDate}</p>
    <p>${cnrCommentParam.cnrComment}</p>
  `;
  
  // render element
  cnrContainerElementVar.appendChild(cnrCardDivVar);
}; // cnrRenderComment
