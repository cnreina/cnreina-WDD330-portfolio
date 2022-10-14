/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE
//create an array of hikes
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

export default class cnrHikesClass {
  constructor(cnrElementIdParam) {
    this.cnrContainerElementVar = document.getElementById(cnrElementIdParam);
  };

  cnrGetAllHikes() { return cnrHikeList; };
  
  cnrDisplayHikeList() {
    this.cnrContainerElementVar.innerHTML = '';
    cnrRenderHikeList(this.cnrContainerElementVar, this.cnrGetAllHikes());
  };
} // cnrHikesClass

function cnrRenderHikeList(cnrContainerElementParam, cnrHikeListParam) {
  cnrHikeListParam.forEach(cnrHikeVar => {
    cnrContainerElementParam.appendChild(cnrRenderOneHike(cnrHikeVar));
  });
}

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
    <div class="carddivs">
      <div class="headerdivs">
        <p class="headertitles">${cnrHikeParam.cnrName}</p>
      </div>

      <div class="gridcontainerdivs">
        <div class="gridcelldivs">
          <div class="imagedivs">
              <img class="images" src=${cnrHikeParam.cnrImageURL} alt="Image">
          </div>
        </div>

        <div class="gridcelldivs">
          <div class="hikeinfodivs">
            <div class="hikebasicinfodivs">
              <p><b>Name:</b></p><p>${cnrHikeParam.cnrName}</p>
              <p><b>Location:</b></p><p>${cnrHikeParam.cnrLocation}</p>
              <p><b>Rating:</b></p><p>${cnrHikeParam.cnrRating}</p>
              <a class="detailslinks" href="../../html/w05/w0501B.html?${cnrEncodedStringVar}">Details</a>
            </div>
            <div class="hikefullinfodivs">
              <p><b>Dificulty:</b></p><p>${cnrHikeParam.cnrDifficulty}</p>
              <p><b>cnrDirections:</b></p><p>Go north . . .</p>
              <p><b>cnrDescription:</b></p><p>blah blah blah . . .</p>
            </div>
          </div>
        </div>
      </div>
    </div>
`;

  return cnrCardDivVar;
};
