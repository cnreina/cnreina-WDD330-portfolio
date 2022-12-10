/*
	Carlos N Reina
*/

/* ===== main.js ===== */

/*	TODO
	replace console.log with last error message functions.
*/

/* *************** initialize *************** */

let cnrFormObject;
let cnrPerformanceObject;
let cnrLocationObject;
let cnrRoomObject;
let cnrTimeSlotObject;
let cnrTableStudentsObject;

let cnrStudent1Object;
let cnrStudent2Object;
let cnrButtonRegister;
let cnrButtonClear;

let cnrFirstNameObject;
let cnrLastNameObject;
let cnrStudentIdObject;
let cnrSkillObject;
let cnrInstrumentObject;

let cnrFirstName2Object;
let cnrLastName2Object;
let cnrStudentId2Object;
let cnrSkill2Object;
let cnrInstrument2Object;

let cnrXMLHTTPRequest;

const cnrXHR_READY_STATE_DONE 		= 4;

var cnrFormFilledVar 				= false;
var cnrStudent1FilledVar 			= false;
var cnrStudent2FilledVar 			= false;

var cnrFormPathVar 					= "/cnrForm";
// var cnrStudentsArrayVar 			= Array();


window.onload = function() {
    console.log("window.onload");

    cnrFormObject 					= document.getElementById("cnrform");
    cnrPerformanceObject 			= document.getElementById("cnrperformance");
	cnrLocationObject 				= document.getElementById("cnrlocation");
	cnrRoomObject 					= document.getElementById("cnrroom");
	cnrTimeSlotObject 				= document.getElementById("cnrtime_slot");
	cnrTableStudentsObject 			= document.getElementById("cnrtable_students_1");
	cnrButtonRegister 				= document.getElementById("cnrregister");
    cnrButtonClear 					= document.getElementById("cnrclear");

		// student 1
	cnrStudent1Object 				= document.getElementById("cnrstudent1_container");
    cnrFirstNameObject 				= document.getElementById("cnrfirst_name");
    cnrLastNameObject 				= document.getElementById("cnrlast_name");
    cnrStudentIdObject 				= document.getElementById("cnrstudent_id");
    cnrSkillObject 					= document.getElementById("cnrskill");
    cnrInstrumentObject 			= document.getElementById("cnrinstrument");

		// student 2
	cnrStudent2Object 				= document.getElementById("cnrstudent2_container");
	cnrFirstName2Object 			= document.getElementById("cnrfirst_name_2");
    cnrLastName2Object 				= document.getElementById("cnrlast_name_2");
    cnrStudentId2Object 			= document.getElementById("cnrstudent_id_2");
    cnrSkill2Object 				= document.getElementById("cnrskill_2");
    cnrInstrument2Object 			= document.getElementById("cnrinstrument_2");
    
    cnrPerformanceObject.onchange 	= cnrValidatePerformanceType;
	cnrButtonRegister.onclick 		= cnrSubmitForm;
    cnrButtonClear.onclick 			= cnrResetForm;

    cnrFirstNameObject.onkeyup 		= cnrValidateStudent1;
    cnrLastNameObject.onkeyup 		= cnrValidateStudent1;
    cnrStudentIdObject.onkeyup 		= cnrValidateStudent1;

	cnrFirstName2Object.onkeyup 	= cnrValidateStudent2;
    cnrLastName2Object.onkeyup 		= cnrValidateStudent2;
    cnrStudentId2Object.onkeyup 	= cnrValidateStudent2;

    cnrResetForm();
};


/* ************* validate input ************* */

function cnrValidatePerformanceType() {
    console.log("cnrValidatePerformanceType");

    if (cnrPerformanceObject == null || cnrPerformanceObject.value == "") {
        console.log("ERROR: cnrValidatePerformanceType");
        return;
    }

    switch (cnrPerformanceObject.value) {
        case "Solo":
            cnrStudent2Object.style="display:none";
            break;
        case "Duet":
            cnrStudent2Object.style="display:block";
            break;
        case "Concerto":
            cnrStudent2Object.style="display:block";
            break;
    
        default:
            cnrStudent2Object.style="display:none";
            break;
    }
	
	return true;
};

/* ************* validate form ************* */

function cnrValidateForm() {
	console.log("cnrValidateForm");

	cnrFormFilledVar = false;

	if (!cnrValidateStudent1()) {return false;}

	if (cnrPerformanceObject.value != "Solo") {
		if (!cnrValidateStudent2()) {
			return false;
		}
	}

	cnrFormFilledVar = true;
	return true;
};

function cnrValidateStudent1() {
	console.log("cnrValidateStudent1");

	cnrStudent1FilledVar = true;

	var cnrFormElements 	= cnrStudent1Object.getElementsByTagName('cnrinput');
	var cnrElementsCount 	= cnrFormElements.length;
	for (let cnrIndex = 0; cnrIndex < cnrElementsCount; cnrIndex++) {
		const cnrElementConst = cnrFormElements[cnrIndex];
		if (cnrElementConst.type == "text") {
			if (cnrElementConst.value == "") {
				cnrStudent1FilledVar = false;
				cnrElementConst.style="border:2px solid red";
			} else {
				cnrElementConst.style="border:2px solid green";
			}
		}
	}

	return cnrStudent1FilledVar;
};

function cnrValidateStudent2() {
	console.log("cnrValidateStudent2");

	cnrStudent2FilledVar = true;

	var cnrFormElements = cnrStudent2Object.getElementsByTagName('cnrinput');
	var cnrElementsCount = cnrFormElements.length;
	for (let cnrIndex = 0; cnrIndex < cnrElementsCount; cnrIndex++) {
		const cnrElementConst = cnrFormElements[cnrIndex];
		if (cnrElementConst.type == "text") {
			if (cnrElementConst.value == "") {
				cnrStudent2FilledVar = false;
				cnrElementConst.style="border:2px solid red";
			} else {
				cnrElementConst.style="border:2px solid green";
			}
		}
	}
	return cnrStudent2FilledVar;
};

/* ************* submit form ************* */

function cnrSubmitForm() {
    console.log("cnrSubmitForm");

    if (cnrValidateForm()) {
		// submit to server
		//cnrFormObject.submit();
		cnrPostAjax();

    } else {
		console.log("Inclomplete data (not submitted)");
		return false;
    }
	
	return true;
};

function cnrGetNewUUID() {
	/*	JavaScript RegExp
		g		Perform a global match.
				Finds all matches rather than stopping after the first match.
		[abc]	Find any character between the brackets.

		https://www.w3schools.com/jsref/jsref_obj_regexp.asp
	*/
	return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(cnrCharParam) {
		var cnrRandomVar = Math.random() * 16 | 0;
		var cnrReplacementVar = cnrCharParam == 'x' ? cnrRandomVar : (cnrRandomVar & 0x3 | 0x8);
		return cnrReplacementVar.toString(16);
	});
};

/*	AJAX (Asynchronous JavaScript and XML)
	A programming practice of building complex, dynamic webpages
	using a technology known as XMLHttpRequest.
	https://developer.mozilla.org/en-US/docs/Glossary/AJAX

*/
/*	XMLHttpRequest (XHR)
	A JavaScript API to create AJAX requests.
	Its methods provide the ability to send network requests
	between the browser and a server.
	Can be used to retrieve any type of data, not just XML.
	https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

*/
function cnrPostAjax() {
	console.log("cnrPostAjax");

	var cnrUUIDVar = cnrGetNewUUID();
	console.log("cnrUUIDVar: " + cnrUUIDVar);

	cnrXMLHTTPRequest 			= new XMLHttpRequest();
	const cnrAjaxFormDataConst 	= new FormData(cnrFormObject);

	cnrXMLHTTPRequest.open("POST", cnrFormPathVar, true);
	cnrXMLHTTPRequest.setRequestHeader('X-Request-ID', cnrGetNewUUID());
	cnrXMLHTTPRequest.overrideMimeType('application/javascript');
	cnrXMLHTTPRequest.onreadystatechange = cnrHandleXHRDataAvailableEvent;
	cnrXMLHTTPRequest.send(cnrAjaxFormDataConst);
	
	cnrResetForm();

};

/*	XMLHttpRequest.readyState
	Returns the state an XMLHttpRequest client is in.

	States:
	Value	State				Description
	0 		UNSENT 				Client has been created. open() not called yet.
	1 		OPENED 				open() has been called. During this state, the 
								equest headers can be set using the setRequestHeader()
								method and the send() method can be called which will
								initiate the fetch.
	2 		HEADERS_RECEIVED 	send() has been called, and headers and status are available.
	3 		LOADING 			Downloading; response's body is being received.
								If responseType is "text" or empty string, responseText will
								have the partial text response as it loads.
	4 		DONE 				The operation is complete. This could mean that either the data
								transfer has been completed successfully or failed.

	https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
	https://xhr.spec.whatwg.org/#states
	
*/
function cnrHandleXHRDataAvailableEvent() {	
	// state 'DONE'
	if (this.readyState === 4 && (this.status === 0 || (this.status >= 200 && this.status < 400))) {
		// parse object
		let cnrJSONObject = JSON.parse(this.response);
		if (cnrJSONObject === null) {console.log('cnrJSONObject === null'); return;};

		// clear table
		if (cnrTableStudentsObject === null) {console.log('cnrTableStudentsObject === null'); return;};
		for(var cnrIndex = cnrTableStudentsObject.rows.length - 1; cnrIndex > 0; cnrIndex--) {
			cnrTableStudentsObject.deleteRow(cnrIndex);
		};

		// load table
		cnrJSONObject.forEach(cnrItem => {
			// insert rows
			let row 						= cnrTableStudentsObject.insertRow(-1);
			// insert cells
			let cnrCellName 				= row.insertCell(0);
			let cnrCellLocation 			= row.insertCell(1);
			let cnrCellTime 				= row.insertCell(2);
			let cnrCellPerformance 			= row.insertCell(3);
			let cnrCellInstrument 			= row.insertCell(4);
			let cnrCellSkill 				= row.insertCell(5);
			// set row class
			row.className 					= "cnrtable_students_rows";
			// set cell class
			cnrCellPerformance.className 	= "cnrtable_students_rows";
			cnrCellLocation.className 		= "cnrtable_students_rows";
			cnrCellTime.className 			= "cnrtable_students_rows";
			cnrCellName.className 			= "cnrtable_students_rows";
			cnrCellInstrument.className 	= "cnrtable_students_rows";
			cnrCellSkill.className 			= "cnrtable_students_rows";
			// load data to cells
			cnrCellPerformance.innerHTML 	= cnrItem.cnrperformance;
			cnrCellLocation.innerHTML 		= cnrItem.cnrlocation + "<br>" + cnrItem.cnrroom;
			cnrCellTime.innerHTML 			= cnrItem.cnrtime_slot;
			cnrCellName.innerHTML 			= cnrItem.cnrfirst_name + " " + cnrItem.cnrlast_name;
			cnrCellInstrument.innerHTML 	= cnrItem.cnrinstrument;
			cnrCellSkill.innerHTML 			= cnrItem.cnrskill;
		});
	};
};

/* *************** clear form *************** */

function cnrResetForm() {

	console.log("cnrfResetForm");

	cnrFormFilledVar 								= false;
	cnrStudent1FilledVar 							= false;
	cnrStudent2FilledVar 							= false;

	cnrPerformanceObject.selectedcnrIndex 	= 0;
	cnrLocationObject.selectedcnrIndex 		= 0;
	cnrRoomObject.selectedcnrIndex 			= 0;
	cnrTimeSlotObject.selectedcnrIndex 		= 0;

	cnrFirstNameObject.value				="";
	cnrLastNameObject.value					="";
	cnrStudentIdObject.value				="";
	cnrSkillObject.selectedcnrIndex 		= 0;
	cnrInstrumentObject.selectedcnrIndex 	= 0;

	cnrFirstName2Object.value				="";
	cnrLastName2Object.value				="";
	cnrStudentId2Object.value				="";
	cnrSkill2Object.selectedcnrIndex 		= 0;
	cnrInstrument2Object.selectedcnrIndex 	= 0;

	cnrValidatePerformanceType();
	cnrValidateStudent1();
	cnrValidateStudent2();
	cnrFirstNameObject.focus();
};

