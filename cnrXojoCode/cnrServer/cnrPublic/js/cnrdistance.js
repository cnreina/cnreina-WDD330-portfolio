/*
	BYU Idaho 2019
	CS213 Web Engineering I
	Carlos N Reina
*/

/* ===== assign12.js ===== */

/* *************** initialize *************** */
console.log("initialize");

var startCityInput;
var startStateInput;
var endCityInput;
var endStateInput;
var responseTable;
var submitButton;
var resetButton;
var ready           = false;
var startCityReady  = false;
var startStateReady = false;
var endCityReady    = false;
var endStateReady   = false;
var response        = "";
var trip = null;

window.onload = function() {
    console.log("window.onload");

    startCityInput          = document.getElementById("startCity");
    startStateInput         = document.getElementById("startState");
    endCityInput            = document.getElementById("endCity");
    endStateInput           = document.getElementById("endState");
    responseTable       		= document.getElementById("responseTable");
    submitButton            = document.getElementById("submitButton");
    resetButton             = document.getElementById("resetButton");

    startCityInput.onkeyup  = validate_input;
    startStateInput.onkeyup = validate_input;
    endCityInput.onkeyup    = validate_input;
    endStateInput.onkeyup   = validate_input;

		startCityInput.onblur  	= capitalizeString;
    endCityInput.onblur    	= capitalizeString;

    submitButton.onclick    = submit_request;
    resetButton.onclick     = reset_page;

    validate_input();

};

/* ************* validate input ************* */

function validate_input() {
	// startCityInput.onkeyup
	// startStateInput.onkeyup
	// endCityInput.onkeyup
	// endStateInput.onkeyup
	console.log("validate_input");

	if (startCity.value == "") {
			startCity.style.border = "1px solid red";
			startCityReady = false;
	} else {
			startCity.style.border = "1px solid lightgray";
			startCityReady = true;
	}

	if (startState.value == "" ||
			startState.value.length > 2) {
			startState.style.border = "1px solid red";
			startState.value = "";
			startStateReady = false;
	} else {
			startState.style.border = "1px solid lightgray";
			startState.value = startState.value.toUpperCase();
			startStateReady = true;
	}

	if (endCity.value == "") {
			endCity.style.border = "1px solid red";
			endCityReady = false;
	} else {
			endCity.style.border = "1px solid lightgray";
			endCityReady = true;
	}

	if (endState.value == "" ||
			endState.value.length > 2) {
			endState.style.border = "1px solid red";
			endState.value = "";
			endStateReady = false;
	} else {
			endState.style.border = "1px solid lightgray";
			endState.value = endState.value.toUpperCase();
			endStateReady = true;
	}

	if (startCityReady  &&
			startStateReady &&
			endCityReady    &&
			endStateReady) {
			ready = true;
	} else {
			ready = false;
	}

};

function capitalizeString() {
	// startCityInput.onblur
  // endCityInput.onblur
	console.log("capitalizeString");

	var tempWords = Array;
	
	if (this.id == "startCity") {
		tempWords = startCity.value.split(" ");
		for (let index = 0; index < tempWords.length; index++) {
			var temp1 				= tempWords[index].charAt(0).toUpperCase();
			var temp2 				= tempWords[index].slice(1);
			tempWords[index] 	= temp1 + temp2;
		}
		startCity.value 		= tempWords.join(" ");
	}

	if (this.id == "endCity") {
		tempWords = endCity.value.split(" ");
		for (let index = 0; index < tempWords.length; index++) {
			var temp1 				= tempWords[index].charAt(0).toUpperCase();
			var temp2 				= tempWords[index].slice(1);
			tempWords[index] 	= temp1 + temp2;
		}
		endCity.value 			= tempWords.join(" ");
	}

};

/* ************* submit request ************* */
function submit_request() {
	// submitButton.onclick
  console.log("submit_request");

	if (!ready) {
			return;
	}
    
	for (let index = responseTable.rows.length - 1; index >= 0; index--) {
		responseTable.deleteRow(index);
	}

	var fileRequest = new XMLHttpRequest();
	var fileName 		= "";

	fileName = "/cgi-bin/ercanbracks/mileage/mileageAjaxJSON?";
	fileName += "startCity="    + startCityInput.value  + "&";
	fileName += "startState="   + startStateInput.value + "&";
	fileName += "endCity="      + endCityInput.value    + "&";
	fileName += "endState="     + endStateInput.value;
	console.log(fileName);

	fileRequest.open("GET", fileName, true);
	fileRequest.send();

	fileRequest.onreadystatechange = function() {
		if (this.readyState == 4) {
			switch (this.status) {
				case 200:
					response = this.responseText;
					parseJsonFile(response);
					break;
				case 404:
					displayError(404);
					break;
				default:
          break;
			}
		}
	}
};

function parseJsonFile(jsonData) {
	// submit_request(), fileRequest.onreadystatechange
  console.log("parseJsonFile");

  var jsObject        = JSON.parse(response);
	var jsObjectKeys    = Object.keys(jsObject);
	//var jsonValues      = Object.values(jsObject);
	var displayData     = "";

	trip = jsObject[jsObjectKeys[0]];
	if (trip == null) {
		console.log("ERROR - trip == null");
		return;
	}

	displayData = "Start City: " 		+ trip.startcity 	+ "\n";
	displayData += "Start State: " 	+ trip.startstate + "\n";
	displayData += "End City: " 		+ trip.endcity 		+ "\n";
	displayData += "End State: " 		+ trip.endstate 	+ "\n";
	displayData += "Distance: " 		+ trip.miles			+ " miles\n";

	response = displayData;
	display_response();
};

/* **************** display **************** */
function display_response() {
	console.log("display_response");
	if (trip == null) {
		console.log("ERROR - trip == null");
		return;
	}

	for (let index = responseTable.rows.length - 1; index >= 0; index--) {
		responseTable.deleteRow(index);
	}

  var row1 	= responseTable.insertRow(0);
	var row2 	= responseTable.insertRow(1);
	var row3 	= responseTable.insertRow(2);
	var row4 	= responseTable.insertRow(3);
	var row5 	= responseTable.insertRow(4);
	var cell1;
  var cell2;

  cell1 = row1.insertCell(0);
  cell2 = row1.insertCell(1);
  cell1.innerHTML = "Start City";
  cell2.innerHTML = trip.startcity;

	cell1 = row2.insertCell(0);
  cell2 = row2.insertCell(1);
  cell1.innerHTML = "Start State";
  cell2.innerHTML = trip.startstate;

	cell1 = row3.insertCell(0);
  cell2 = row3.insertCell(1);
  cell1.innerHTML = "End City";
  cell2.innerHTML = trip.endcity;

	cell1 = row4.insertCell(0);
  cell2 = row4.insertCell(1);
  cell1.innerHTML = "End State";
  cell2.innerHTML = trip.endstate;

	cell1 = row5.insertCell(0);
  cell2 = row5.insertCell(1);
  cell1.innerHTML = "Distance";
  cell2.innerHTML = trip.miles;

};

function displayError(errorCode) {
    console.log("displayError " + errorCode);
};

/* ***************** reset ***************** */
function reset_page() {
	console.log("reset_page");

	startCityInput.value    = "";
	startStateInput.value   = "";
	endCityInput.value      = "";
	endStateInput.value     = "";
	responseTable.value  		= "";

	startCityReady  				= false;
	startStateReady 				= false;
	endCityReady    				= false;
	endStateReady   				= false;

	response 								= "";
	ready 									= false;
	trip 										= null;

	for (let index = responseTable.rows.length - 1; index >= 0; index--) {
		responseTable.deleteRow(index);
	}

	validate_input();

};
