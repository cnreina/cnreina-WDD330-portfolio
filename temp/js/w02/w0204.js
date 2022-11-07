/*	Carlos N Reina
  cnreina@gmail.com
*/

let displayTextButton;

window.onload = function() {
  console.log("window.onload");

  displayTextButton = document.getElementById("text-button");
  displayTextButton.onclick = validateInput;
};

function validateInput(){
  let inputHTML = document.getElementById("text-input").value;
  let inputHTML2 = document.getElementById("text-input2").value;
  if (isFinite(inputHTML) === true && isFinite(inputHTML2) === true) {
    sumNumbers(inputHTML, inputHTML2, displayResult);
  } else {
    displayResult("ERROR");
  }
};

function sumNumbers(numberParam1, numberParam2, callbackParam) {
  let sumResult = 0;
  sumResult = parseInt(numberParam1) + parseInt(numberParam2);
  callbackParam(sumResult);
};

function displayResult(resultParam){
  document.getElementById("result-div").innerHTML = resultParam;
};
