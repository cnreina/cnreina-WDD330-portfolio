/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */


window.onload = function() {
  // init event listeners
  const heroForm = document.forms['hero'];
  heroForm.addEventListener('submit', makeHero, false);
  heroForm.heroName.addEventListener('keyup', validateName);
  heroForm.realName.addEventListener('keyup', validateRealName);
  heroForm.age.addEventListener('change', validateAge);

  // init error elements
  const heroNameLabel = document.getElementById("heronamelabel");
  const heroNameError = document.createElement('div');
  heroNameError.classList.add('error');
  heroNameError.id = 'heronameerrordiv';
  heroNameLabel.append(heroNameError);

  const realNameLabel = document.getElementById("realnamelabel");
  const realNameError = document.createElement('div');
  realNameError.classList.add('error');
  realNameError.id = 'realnameerrordiv';
  realNameLabel.append(realNameError);

  const ageLabel = document.getElementById("agelabel");
  const ageError = document.createElement('div');
  ageError.classList.add('error');
  ageError.id = 'ageerrordiv';
  ageLabel.append(ageError);

  const categoryDiv = document.getElementById("categorydiv");
  const categoryError = document.createElement('div');
  categoryError.classList.add('error');
  categoryError.id = 'categoryerrordiv';
  categoryDiv.append(categoryError);

  const powersDiv = document.getElementById("powersdiv");
  const powersError = document.createElement('div');
  powersError.classList.add('error');
  powersError.id = 'powerserrordiv';
  powersDiv.append(powersError);

  const cityDiv = document.getElementById("citydiv");
  const cityError = document.createElement('div');
  cityError.classList.add('error');
  cityError.id = 'cityerrordiv';
  cityDiv.append(cityError);

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

  if (hero.name == null || hero.name == "") {
    return;
  };
  if (hero.realName == null || hero.realName == "") {
    return;
  };
  if (hero.age == null || hero.age == "") {
    return;
  };
  if (hero.category == null || hero.category == "") {
    return;
  };
  if (hero.powers == null || hero.powers.length == 0) {
    return;
  };
  if (hero.city == null || hero.city == "") {
    return;
  };

  TODO handle error views
  
  displayResult(hero);
  return hero;
};

// FORM VALIDATORS
function validateName() {
  const heroName = this.value.toUpperCase();
  if (heroName.startsWith('X')) {
    handleError(true, "ERROR: Name must not start with X", "heronameerrordiv");
    return false;
  } else {
    handleError(false, "", "heronameerrordiv");
    return true;
  };
};

function validateRealName() {
  const realName = this.value.toUpperCase();
  if (realName.startsWith('X')) {
    handleError(true, "ERROR: Real Name must not start with X", "realnameerrordiv");
  } else {
    handleError(false, "", "realnameerrordiv");
  };
};

function validateAge() {
  const age = this;
  if (age.value < 18) {
    handleError(true, "ERROR: Age must be 18 or older", "ageerrordiv");
  } else {
    handleError(false, "", "ageerrordiv");
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

function handleError(displayErrorParam, errorMessageParam, elementIdParam) {
  Event.preventDefault;

  const error = document.getElementById(elementIdParam);
  error.textContent = errorMessageParam;

  if (displayErrorParam) {
    error.style.display = 'block'
  } else {
    error.textContent = '';
    error.style.display = 'none'
  };
};
