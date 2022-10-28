/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

const cnrHikeURL = "../../html/w07/w07hike.html";

export default class cnrHikesClass {
  constructor() {};

  cnrGetAllHikes() { return cnrHikeList; };
  
  cnrDisplayHikeList(cnrElementIdParam) {
    this.cnrContainerElementVar = document.getElementById(cnrElementIdParam);

    this.cnrContainerElementVar.innerHTML = '';
    cnrRenderHikeList(this.cnrContainerElementVar, this.cnrGetAllHikes());
  };
}; // cnrHikesClass

function cnrRenderHikeList(cnrContainerElementParam, cnrHikeListParam) {
  cnrHikeListParam.forEach(cnrHikeVar => {
    cnrContainerElementParam.appendChild(cnrRenderOneHike(cnrHikeVar));
  });
};

function cnrRenderOneHike(cnrHikeParam) {
  // prepare querystring data sent to hike detail page
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
  
  // prepare hike element
  const cnrCardDivVar = document.createElement('div');
  cnrCardDivVar.classList.add('cnrjscontentdivs');
  cnrCardDivVar.innerHTML = `
    <div class="cnrcardheaderdivs">
      <p class="cnrcardheadertitles">${cnrHikeParam.cnrName}</p>
    </div>
    <div class="cnrcardcontentdivs">
      <div class="cnrcardcelldivs">
        <div class="cnrcardimagedivs">
            <img class="cnrcardimages" src=${cnrHikeParam.cnrImageURL} alt="Image">
        </div>
      </div>
      <div class="cnrcardcelldivs">
        <div class="cnrcardinfodivs">
          <div class="cnrcardbasicinfodivs">
            <p><b>Name:</b></p><p>${cnrHikeParam.cnrName}</p>
            <p><b>Location:</b></p><p>${cnrHikeParam.cnrLocation}</p>
            <p><b>Rating:</b></p><p>${cnrHikeParam.cnrRating}</p>
            <a class="cnrcarddetailslinks" href="${cnrHikeURL}?${cnrEncodedStringVar}">Details</a>
          </div>
          <div class="cnrcardfullinfodivs">
            <p><b>Dificulty:</b></p><p>${cnrHikeParam.cnrDifficulty}</p>
          </div>
        </div>
      </div>
    </div>
`;

  return cnrCardDivVar;
}; // cnrRenderOneHike

const cnrHikeList = [
  {
    cnrName: 'Bechler Falls',
    cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
    cnrLocation: 'Ashton, Texas',
    cnrRating: '3.5',
    cnrDifficulty: 'Easy',
    cnrDescription:
      'Beautiful short hike along the Bechler river to Bechler Falls',
    cnrDirections:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
  },
  {
    cnrName: 'Teton Canyon',
    cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
    cnrLocation: 'Driggs, Colorado',
    cnrRating: '4.5',
    cnrDifficulty: 'Easy',
    cnrDescription: 'Beautiful short (or long) hike through Teton Canyon.',
    cnrDirections:
      'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short time onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.'
  },
  {
    cnrName: 'Denanda Falls',
    cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
    cnrLocation: 'Somewhere, Utah',
    cnrRating: '4.0',
    cnrDifficulty: 'Moderate',
    cnrDescription:
      'Beautiful hike through Bechler meadows river to Denanda Falls',
    cnrDirections:
      'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
  }
];
