/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/* ************************************************************************* */

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
// goto the link above and open the console. Paste the following two lines in.
// That will create a list of links in memory that you can reference through the console.
// Use that list to finish the problem.
// const category = document.querySelector('.mw-category');
// const links = Array.from(category.querySelectorAll('a'));

/*	Console Code
  1. Navigate to https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris<br>
  2. Paste the following code in the console:

      const category = document.querySelector('.mw-category');
      const links = Array.from(category.querySelectorAll('a'));
      const newArray = links.map(arr => arr.textContent);
      newArray.filter(streets => streets.includes('de'));

*/

window.onload = function() {
  console.log("window.onload");
  document.getElementById('startbutton').addEventListener('click', run);
};

function run() {
  displayResult();
};

function displayResult(resultParam) {
  const displayElement = document.getElementById("displaydiv");
  clearContent(displayElement);

  const divElement = document.createElement('div');
  divElement.className = 'displaydivs';
  const pElement = document.createElement('p');
  pElement.innerHTML = '1. Navigate to https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris<br>2. Paste the following code in the console:<br><br>const category = document.querySelector(\'.mw-category\');<br>const links = Array.from(category.querySelectorAll(\'a\'));<br>const newArray = links.map(arr => arr.textContent);<br>newArray.filter(streets => streets.includes(\'de\'));';
  divElement.appendChild(pElement);
  displayElement.appendChild(divElement);
  displayElement.style.display = 'block';
};

function clearContent(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
};
