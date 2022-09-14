/*	Carlos N Reina
  cnreina@gmail.com
*/


const links = [
  {
    label: "Week 1",
    url: "html/w01/w01.html"
  },
  {
    label: "Week 2",
    url: "html/w02/w02.html"
  }
];

window.onload = function() {
  console.log("window.onload");
  loadMainLinks();
};

function loadMainLinks() {
	console.log("loadLinks");
	// load links
  const linksElement = document.getElementById("links-list");
  var linksCounter = 0;
  var linksTotalCount = links.length;
  for (linksCounter = 0; linksCounter < linksTotalCount; linksCounter++) {
    // create new list item
    var liElement = document.createElement('li');
    // insert url
    var aElement = document.createElement('a');
    aElement.setAttribute("href", links[linksCounter].url);
    liElement.appendChild(aElement);
    // insert label
    var h3Element = document.createElement('h3');
    aElement.appendChild(h3Element);
    h3Element.appendChild(document.createTextNode(links[linksCounter].label));
    // add item to list
    linksElement.appendChild(liElement);
  }

};
