/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


window.onload = function() {
  console.log("window.onload");
  const resetButton = document.getElementById('resetbutton');
  resetButton.addEventListener('click', handleResetButtonEvent);

  const gridContainer = document.getElementById('gridcontainer');
  gridContainer.addEventListener('touchend', handleGridContainerEvent);

};

function handleResetButtonEvent(event) {
  event.preventDefault();
};

function handleGridContainerEvent(event) {
  event.preventDefault();
};

function currentPlayer() {
  const player = document.getElementById('playerinfo');
};


function validateInline() {
  const error = document.getElementById('errordiv');
  const heroName = this.value.toUpperCase();
  if (heroName.startsWith('X')) {
    error.style.display = 'block'
  } else {
    error.style.display = 'none'
  };
};

function displayResult(resultParam) {
  const displayElement = document.getElementById("displaydiv");
  clearContent(displayElement);

  const divElement = document.createElement('div');
  divElement.className = 'displaydivs';
  const pElement = document.createElement('p');
  pElement.innerHTML = JSON.stringify(resultParam);
  divElement.appendChild(pElement);
  displayElement.appendChild(divElement);
  displayElement.style.display = 'block';
};

function clearContent(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  };
};
