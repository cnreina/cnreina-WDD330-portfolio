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
  if (isFinite(inputHTML) === true) {
    sumNumbers(inputHTML);
  } else {
    displayResult("ERROR");
  }
};

function sumNumbers(numberParam) {
  let sumResult = 0;
  for (let index = 1; index < numberParam; index++) {
    sumResult += (sumResult + 1);
  }
  displayResult(sumResult);
};

function displayResult(resultParam){
  document.getElementById("result-div").innerHTML = "Sum = " + resultParam;
};
