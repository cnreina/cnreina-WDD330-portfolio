/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* 
INITIALIZE */

const cnrPersonURL = "../../html/w08fetch/cnrItemView.html";


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
  cnrRenderItemsHeader(cnrContainerIDParam);
  cnrItemsParam.forEach(cnrItemVar => {
    cnrRenderItem(cnrContainerIDParam, cnrItemVar);
  });
}; // cnrRenderItems

function cnrRenderItemsHeader(cnrContainerElementParam) {
  if (cnrContainerElementParam === null || cnrContainerElementParam === '') {
    console.log("ERROR: cnrRenderItemsHeader > cnrContainerElementParam", cnrContainerElementParam);
    return;
  };
  
  const cnrContainerElementVar = document.getElementById(cnrContainerElementParam);
  if (cnrContainerElementVar === null || cnrContainerElementVar === '') {
    console.log("ERROR: cnrRenderItemsHeader > cnrContainerElementVar", cnrContainerElementVar);
    return;
  };

  // prepare element
  const cnrItemsHeaderDivVar = document.createElement('div');
  cnrItemsHeaderDivVar.classList.add('cnrmainheaderdivs');
  cnrItemsHeaderDivVar.title = 'cnrmainheaderdivs';
  cnrItemsHeaderDivVar.innerHTML = `People`;
  // render element
  cnrContainerElementVar.appendChild(cnrItemsHeaderDivVar);

}; // cnrRenderItemsHeader

function cnrRenderItem(cnrContainerElementParam, cnrItemParam) {
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
    cnrHeight: cnrItemParam.cnrHeight,
    cnrMass: cnrItemParam.cnrMass
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
            <p><b>Height:</b></p><p>${cnrItemParam.cnrHeight}</p>
            <p><b>Mass:</b></p><p>${cnrItemParam.cnrMass}</p>
            <a class="cnrcarddetailslinks" href="${cnrPersonURL}?${cnrEncodedStringVar}">Details</a>
          </div>
        </div>
      </div>
    </div>
`;
  
  // render element
  cnrContainerElementVar.appendChild(cnrCardDivVar);
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
