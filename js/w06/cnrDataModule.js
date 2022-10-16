/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


export class cnrDataListClass {
  constructor() {
    this.cnrDataList = new Object;
    cnrDataList.appendChild()
  };

  cnrDataGetList() { return this.cnrDataList; };

  cnrDataCreateItem() {
    cnrNewItemVar = new cnrDataItemClass();
    return cnrNewItemVar;
  };

}; // cnrHikesClass

export class cnrDataItemClass {
  constructor() {
    this.cnrItemID = "cnrItemID";
    this.cnrItemCreatedTime = "cnrItemCreatedTime";
    this.cnrItemType = "cnrItemType";
    this.cnrItemData = {
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
  };
}; // cnrDataItemClass

function cnrDisplayLog(cnrParam) {
  console.log(cnrParam);
};

function cnrDataRenderList(cnrContainerElementParam, cnrHikeListParam) {
  cnrHikeListParam.forEach(cnrHikeVar => {
    cnrContainerElementParam.appendChild(cnrRenderOneHike(cnrHikeVar));
  });
};

function cnrRenderOneHike(cnrHikeParam) {
  const cnrHikeObject = {
    cnrName: cnrHikeParam.cnrName,
    cnrImageURL: cnrHikeParam.cnrImageURL,
    cnrLocation: cnrHikeParam.cnrLocation,
    cnrRating: cnrHikeParam.cnrRating,
    cnrDifficulty: cnrHikeParam.cnrDifficulty,
    cnrDescription: cnrHikeParam.cnrDescription,
    cnrDirections: cnrHikeParam.cnrDirections
  };
  const cnrEncodedStringVar = new URLSearchParams(cnrHikeObject).toString();
  
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('carddivs');
  cnrCardDivVar.innerHTML = `
    <div class="carddivs" title="carddivs">
      <div class="cardheaderdivs" title="cardheaderdivs">
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
