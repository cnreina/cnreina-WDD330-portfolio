/*	Carlos N Reina
  cnreina@gmail.com
  cnreina.com
*/


/* ************************************************************************* */

// INITIALIZE
window.onload = function() {
  // init event listeners
  const heroForm = document.forms['hero'];
  heroForm.addEventListener('submit', makeHero, false);
  heroForm.addEventListener('reset', resetForm, false);
  heroForm.heroName.addEventListener('keyup', validateName);
  heroForm.realName.addEventListener('keyup', validateRealName);
  heroForm.age.addEventListener('change', validateAge);
  document.getElementById('categorydiv').addEventListener('change', resetCategoryError);
  document.getElementById('powersdiv').addEventListener('change', resetPowersError);
  document.getElementById('citydiv').addEventListener('change', resetCityError);

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

// CREATE OBJECT
function makeHero(event) {
  event.preventDefault(); // prevent form submition

  let errorCounter = 0;

  const heroForm = document.forms['hero'];
  const hero = {};
  hero.name = heroForm.heroName.value;
  hero.realName = heroForm.realName.value;
  hero.age = heroForm.age.value;
  hero.category = heroForm.category.value;
  hero.powers = [...heroForm.powers].filter(box => box.checked).map(box => box.value);
  hero.city = heroForm.city.value;

  if (hero.name == null || hero.name == "") {
    handleError(true, "ERROR: Name is required", "heronameerrordiv");
    errorCounter++;
  } else {
    handleError(false, "", "heronameerrordiv");
  };

  if (hero.realName == null || hero.realName == "") {
    handleError(true, "ERROR: Real Name is required", "realnameerrordiv");
    errorCounter++;
  } else {
    handleError(false, "", "realnameerrordiv");
  };

  if (hero.age == null || hero.age == "") {
    handleError(true, "ERROR: Age is required", "ageerrordiv");
    errorCounter++;
  } else {
    handleError(false, "", "ageerrordiv");
  };

  if (hero.category == null || hero.category == "") {
    handleError(true, "ERROR: Category is required", "categoryerrordiv");
    errorCounter++;
  } else {
    handleError(false, "", "categoryerrordiv");
  };

  if (hero.powers == null || hero.powers.length == 0) {
    handleError(true, "ERROR: Powers is required", "powerserrordiv");
    errorCounter++;
  } else {
    handleError(false, "", "powerserrordiv");
  };

  if (hero.city == null || hero.city == "") {
    handleError(true, "ERROR: City is required", "cityerrordiv");
    errorCounter++;
  } else {
    handleError(false, "", "cityerrordiv");
  };
  
  if (errorCounter == 0) {
    displayResult(hero);
    return hero;
  };

  return null;
  
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

// RESET
function resetCategoryError() {
  handleError(false, "", "categoryerrordiv");
};

function resetPowersError() {
  handleError(false, "", "powerserrordiv");
};

function resetCityError() {
  handleError(false, "", "cityerrordiv");
};

function clearContent(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  };
};

function resetForm() {
  // called by form reset event
  handleError(false, "", "heronameerrordiv");
  handleError(false, "", "realnameerrordiv");
  handleError(false, "", "ageerrordiv");
  handleError(false, "", "categoryerrordiv");
  handleError(false, "", "powerserrordiv");
  handleError(false, "", "cityerrordiv");
};

// DISPLAY
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
