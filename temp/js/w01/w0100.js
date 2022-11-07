/*	Carlos N Reina
  cnreina@gmail.com
*/

var loadStoryButton;
var saveStoryButton;
var displayStoryButton;

window.onload = function() {
  console.log("window.onload");

  loadStoryButton = document.getElementById("loadStoryButton");
  saveStoryButton = document.getElementById("saveStoryButton");
  displayStoryButton = document.getElementById("displayStoryButton");

  loadStoryButton.onclick = loadStory;
  saveStoryButton.onclick = saveStory;
  displayStoryButton.onclick = displayStory;
};

function loadStory(){
  var storyName = document.getElementById("name_input").value
  var storyHTML = localStorage.getItem(storyName)
  document.getElementById("story_editor").value = storyHTML
};

function saveStory(){
  var storyName = document.getElementById("name_input").value
  var storyHTML = document.getElementById("story_editor").value
  localStorage.setItem(storyName,storyHTML)
};

function displayStory(){
  var storyHTML = document.getElementById("story_editor").value
  document.getElementById("story_display").innerHTML = storyHTML
};
