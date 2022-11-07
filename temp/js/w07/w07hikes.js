/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */
// INITIALIZE

const cnrHikeURL = "../../html/w07/w07hike.html";

export class cnrHikesClass {
  constructor() {};

  cnrGetAllHikes() { return cnrHikeList; };
}; // cnrHikesClass

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
