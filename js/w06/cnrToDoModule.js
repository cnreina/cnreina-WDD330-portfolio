/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


export default class cnrToDoClass {
  constructor() {};

  cnrToDoGetAll() { return cnrDataList; };
  
  /** Gets data from Local Storage and displays it in passed element. */
  cnrDisplayToDoList(cnrElementIdParam) {
    this.cnrContainerElementVar = document.getElementById(cnrElementIdParam);

    this.cnrContainerElementVar.innerHTML = '';
    cnrRenderHikeList(this.cnrContainerElementVar, this.cnrToDoGetAll());
  };
}; // cnrHikesClass

function cnrRenderHikeList(cnrContainerElementParam, cnrHikeListParam) {
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
      <div class="gridcontainerdivs" title="gridcontainerdivs">
        <div class="gridcelldivs" title="gridcelldivs">
          <div class="thumbnaildivs" title="thumbnaildivs">
              <img class="images" src=${cnrHikeParam.cnrImageURL} alt="Image">
          </div>
        </div>
        <div class="gridcelldivs" title="gridcelldivs">
          <div class="carddatadivs" title="carddatadivs">
            <div class="cardbasicdatadivs">
              <p><b>Name:</b></p><p>${cnrHikeParam.cnrName}</p>
              <p><b>Location:</b></p><p>${cnrHikeParam.cnrLocation}</p>
              <p><b>Rating:</b></p><p>${cnrHikeParam.cnrRating}</p>
              <a class="detailslinks" href="../../html/w06/w0601.html?${cnrEncodedStringVar}">Details</a>
            </div>
            <div class="cardfulldatadivs">
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
}; // cnrRenderOneHike

const cnrDataList = [
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
