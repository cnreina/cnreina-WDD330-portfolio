/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* */
// INITIALIZE

export function cnrRenderItems(cnrContainerElementParam, cnrItemListParam) {
  cnrItemListParam.forEach(cnrItemVar => {
    cnrRenderItem(cnrContainerElementParam, cnrItemVar);
  });
};

function cnrRenderItem(cnrContainerElementParam, cnrItemParam) {
  const cnrContainerElementVar = document.getElementById(cnrContainerElementParam);

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
