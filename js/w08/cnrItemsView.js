/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

import * as cnrData from './cnrData.js';
import * as cnrDisplay from './cnrDisplay.js';

// INITIALIZE
window.onload = function () {
  // create new hikes object
  const cnrDataSchema = {
    cnrName: 'Hike name or title.',
    cnrImageURL: 'Hike image url.',
    cnrLocation: 'Hike location (City and State).',
    cnrRating: 'Hike\'s user rating.',
    cnrDifficulty: 'Hike\'s difficulty level (Low, Medium, High).',
    cnrDescription: 'A short description of the hike.',
    cnrDirections: 'Directions to find this hike place.'
  };
  const cnrHikesVar = new cnrData.cnrItemsClass('cnrHikes', cnrDataSchema);

  // load fake data if storage is empty
  if (cnrHikesVar.cnrGetClassItemsCount() <= 1) {
    console.log('window.onload > Loading fake data because storage is empty');

    const cnrItem1 = {
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
    cnrHikesVar.cnrAddItem('hike', true, cnrItem1);

    const cnrItem2 = {
      cnrName: 'Teton Canyon',
      cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
      cnrLocation: 'Driggs, Colorado',
      cnrRating: '4.5',
      cnrDifficulty: 'Easy',
      cnrDescription: 'Beautiful short (or long) hike through Teton Canyon.',
      cnrDirections:
        'Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short time onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.'
    };
    cnrHikesVar.cnrAddItem('hike', true, cnrItem2);
    
    const cnrItem3 = {
      cnrName: 'Denanda Falls',
      cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
      cnrLocation: 'Somewhere, Utah',
      cnrRating: '4.0',
      cnrDifficulty: 'Moderate',
      cnrDescription:
        'Beautiful hike through Bechler meadows river to Denanda Falls',
      cnrDirections:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
    };
    cnrHikesVar.cnrAddItem('hike', true, cnrItem3);

    const cnrItem4 = {
      cnrName: 'Item 4',
      cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
      cnrLocation: 'Somewhere, Utah',
      cnrRating: '4.0',
      cnrDifficulty: 'Moderate',
      cnrDescription:
        'Beautiful hike through Bechler meadows river to Denanda Falls',
      cnrDirections:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
    };
    cnrHikesVar.cnrAddItem('hike', true, cnrItem4);

    const cnrItem5 = {
      cnrName: 'Item 5',
      cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
      cnrLocation: 'Somewhere, Utah',
      cnrRating: '4.0',
      cnrDifficulty: 'Moderate',
      cnrDescription:
        'Beautiful hike through Bechler meadows river to Denanda Falls',
      cnrDirections:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
    };
    cnrHikesVar.cnrAddItem('hike', true, cnrItem5);

    const cnrItem6 = {
      cnrName: 'Item 6',
      cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
      cnrLocation: 'Somewhere, Utah',
      cnrRating: '4.0',
      cnrDifficulty: 'Moderate',
      cnrDescription:
        'Beautiful hike through Bechler meadows river to Denanda Falls',
      cnrDirections:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
    };
    cnrHikesVar.cnrAddItem('hike', true, cnrItem6);

    const cnrItem7 = {
      cnrName: 'Item 7',
      cnrImageURL: 'http://byui-cit.github.io/cit261/examples/falls.jpg',
      cnrLocation: 'Somewhere, Utah',
      cnrRating: '4.0',
      cnrDifficulty: 'Moderate',
      cnrDescription:
        'Beautiful hike through Bechler meadows river to Denanda Falls',
      cnrDirections:
        'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.'
    };
    cnrHikesVar.cnrAddItem('hike', true, cnrItem7);

    // save fake data
    cnrHikesVar.cnrSaveClassData();
  };

  // display items
  cnrDisplay.cnrRenderItems('cnrjscontainerdiv1', cnrHikesVar.cnrGetItemsDataForName('hike'));

}; // window.onload
