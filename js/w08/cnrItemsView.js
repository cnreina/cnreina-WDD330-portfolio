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

  // display items
  cnrDisplay.cnrRenderItems('cnrjscontainerdiv1', cnrHikesVar.cnrGetItemsDataForName('hike'));

  // cnrHikesVar.cnrSaveClassData();

}; // window.onload
