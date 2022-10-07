/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


window.onload = function() {
  console.log("window.onload");
  const heroForm = document.forms['hero'];
  heroForm.addEventListener('submit', makeHero, false);
  heroForm.heroName.addEventListener('keyup', validateInline);

  const label = heroForm.querySelector('label');
  const error = document.createElement('div');
  error.classList.add('error');
  error.id = 'errordiv';
  error.textContent = '! Your name is not allowed to start with X.';
  label.append(error);

};

function makeHero(event) {
  event.preventDefault(); // prevent form submition

  const heroForm = document.forms['hero'];
  const hero = {};
  hero.name = heroForm.heroName.value;
  hero.realName = heroForm.realName.value;
  hero.age = heroForm.age.value;
  hero.category = heroForm.category.value;
  hero.powers = [...heroForm.powers].filter(box => box.checked).map(box => box.value);
  hero.city = heroForm.city.value;

  displayResult(hero);
  return hero;
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
