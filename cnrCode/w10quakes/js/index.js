/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

// https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=43.814540699999995&longitude=-111.78491029999999&maxradiuskm=100

/* ************************************************************************* */
// INITIALIZE

import { cnrGetJSON, cnrGetLocation } from './cnrFetchAPI.js';

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query';
const format = 'geojson';
const starttime = '2019-01-01';
const endtime = '2019-02-02';
const maxradiuskm = '100';


/* ************************************************************************* */
// TOOLS

function cnrGetQuakesForLocation() {
  // call the getLocation function to get the lat/long

  const latitud = '43.814540699999995';
  const longitud = '111.78491029999999';
  const requestUrl = `${baseUrl}?format=${format}&starttime=${starttime}&endtime=${endtime}&maxradiuskm=${maxradiuskm}`;
  
  const response = cnrGetJSON(requestUrl);

  //log out the quakes for now.
  console.table(response);

};

cnrGetQuakesForLocation();

