/*	Carlos N Reina
  cnreina@gmail.com
*/

let displayTextButton;

window.onload = function() {
  console.log("window.onload");

  displayTextButton = document.getElementById("text-button");
  displayTextButton.onclick = displayText;
};

function displayText(){
  let textHTML = document.getElementById("text-input").value;
  document.getElementById("result-div").innerHTML = textHTML;
};
