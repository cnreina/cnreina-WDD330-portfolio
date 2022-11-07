/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

const inventors = [
  { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
  { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
  { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
  { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
  { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
  { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
];

/* ************************************************************************* */

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's

window.onload = function() {
  document.getElementById('startbutton').addEventListener('click', validateInput);
};

function validateInput() {
  const validInput = inventors.filter(checkCentury);
  if (validInput !== undefined && validInput !== null) {
    displayResult(validInput);
  } else {
    displayResult("ERROR");
  }
};

function checkCentury(inventors) {
  return inventors.year >= 1500 && inventors.year <= 1599;
};

function displayResult(resultParam) {
  const displayElement = document.getElementById("displaydiv");
  clearContent(displayElement);

  const divElement = document.createElement('div');
  divElement.className = 'infodivs';
  const pElement = document.createElement('p');
  pElement.appendChild(document.createTextNode('const validInput = inventors.filter(checkCentury);'));
  divElement.appendChild(pElement);
  displayElement.appendChild(divElement);

  for (const value of Object.values(resultParam)) {
    const divElement = document.createElement('div');
    divElement.className = 'displaydivs';
    const pElement = document.createElement('p');
    pElement.appendChild(document.createTextNode(value.first + ' ' + value.last + '' + ' (' + value.year + ')'));
    divElement.appendChild(pElement);

    displayElement.appendChild(divElement);
  }
  displayElement.style.display = 'block';
};

function clearContent(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
};
