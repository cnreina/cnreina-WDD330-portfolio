/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/

/* ************************************************************************* */

/*	FORMS
  The form.submit() method will submit the form automatically but won’t
  trigger the form submit event.
  
*/

window.onload = function() {
  console.log("window.onload");
  const form = document.forms['search'];
  form.addEventListener('submit', search, false);

  // const input = form.elements.searchInput;
  // input.addEventListener('focus', function(){
  //   if (input.value==='Search Here') {
  //       input.value = ''
  //   }
  // }, false);

  // input.addEventListener('blur', function(){
  //   if(input.value === '') {
  //       input.value = 'Search Here';
  //   }
  // }, false);
  
  
};

function search(event) {
  event.preventDefault();
  alert(`You Searched for: ${input.value}`);
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
