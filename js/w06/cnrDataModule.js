/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


export class cnrDataListClass {
  constructor() {
    this.cnrDataList = new [{}];
    cnrDataList.add
  };

  cnrDataGetList() { return this.cnrDataList; };

  cnrDataCreateItem() {
    cnrNewItemVar = new cnrDataItemClass();
    return cnrNewItemVar;
  };

}; // cnrDataListClass

export class cnrDataItemClass {
  constructor() {
    this.cnrItemID = "cnrItemID";
    this.cnrItemCreatedTime = "cnrItemCreatedTime";
    this.cnrItemType = "cnrItemType";
    this.cnrItemData = {
      cnrTitle: 'cnrTitle',
      cnrStatus: 'x'
    };
  };
}; // cnrDataItemClass


function cnrDataRenderList(cnrContainerElementParam, cnrHikeListParam) {
  cnrHikeListParam.forEach(cnrHikeVar => {
    cnrContainerElementParam.appendChild(cnrDataRenderItem(cnrHikeVar));
  });
};

function cnrDataRenderItem(cnrDataObjectParam) {
  const cnrHikeObject = {
    cnrTitle: cnrDataObjectParam.cnrTitle,
    cnrStatus: cnrDataObjectParam.cnrStatus
  };
  const cnrEncodedStringVar = new URLSearchParams(cnrHikeObject).toString();
  
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('carddivs');
  cnrCardDivVar.innerHTML = `
    <div class="carddivs" title="carddivs">
      <div class="cardheaderdivs" title="cardheaderdivs">
        <p class="cardheadertitles">${cnrHikeParam.cnrName}</p>
        <p class="cardheadertitles">${cnrHikeParam.cnrName}</p>
        <p class="cardheadertitles">${cnrHikeParam.cnrName}</p>
      </div>
    </div>
`;

  return cnrCardDivVar;
}; // cnrRenderOneHike

// const cnrDataList = [
//   {
//     cnrName: 'Bechler Falls',
//     cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
//     cnrLocation: 'Ashton, Texas',
//     cnrRating: '3.5',
//     cnrDifficulty: 'Easy',
//     cnrDescription:
//       'Beautiful short hike along the Bechler river to Bechler Falls',
//     cnrDirections:
//       'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
//   }
// ];

// const cnrDataObject = Object({
//   cnrDataID: "",
//   cnrDataCreatedTime: "",
//   cnrDataType: "",
//   cnrData: {
//     cnrName: 'Bechler Falls',
//     cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
//     cnrLocation: 'Ashton, Texas',
//     cnrRating: '3.5',
//     cnrDifficulty: 'Easy',
//     cnrDescription:
//       'Beautiful short hike along the Bechler river to Bechler Falls',
//     cnrDirections:
//       'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
//   }
// });
