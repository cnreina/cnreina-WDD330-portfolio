/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* */


const links = [
  {
    label: "Week 1 (Portfolio)",
    url: "html/w01/w0100.html"
  },
  {
    label: "Week 2 (Quiz Ninja)",
    url: "html/w02/w0200.html"
  },
  {
    label: "Week 2 (Assignment 01)",
    url: "html/w02/w0201.html"
  },
  {
    label: "Week 2 (Assignment 02)",
    url: "html/w02/w0202.html"
  },
  {
    label: "Week 2 (Assignment 03)",
    url: "html/w02/w0203.html"
  },
  {
    label: "Week 2 (Stretch 03 - Callbacks)",
    url: "html/w02/w0204.html"
  },
  {
    label: "Week 3 (Quiz Ninja)",
    url: "html/w03/w0300.html"
  },
  {
    label: "Week 3 (Assignment 01)",
    url: "html/w03/w0301.html"
  },
  {
    label: "Week 3 (Assignment 02)",
    url: "html/w03/w0302.html"
  },
  {
    label: "Week 3 (Assignment 03)",
    url: "html/w03/w0303.html"
  },
  {
    label: "Week 3 (Assignment 04)",
    url: "html/w03/w0304.html"
  },
  {
    label: "Week 3 (Assignment 05)",
    url: "html/w03/w0305.html"
  },
  {
    label: "Week 3 (Assignment 06 (Stretch))",
    url: "html/w03/w0306.html"
  },
  {
    label: "Week 4 (Hero)",
    url: "html/w04/w0400.html"
  },
  {
    label: "Week 4 (Assignment 01 Tic Tac Toe)",
    url: "html/w04/w0401.html"
  },
  {
    label: "Week 5 (Error Handling)",
    url: "html/w05/w0500.html"
  },
  {
    label: "Week 5 (Assignments 1-3 Stretch 1-2)",
    url: "html/w05/w0501.html"
  },
  {
    label: "Week 6 (ToDo List)",
    url: "html/w06/w0600.html"
  },
  {
    label: "Week 7 (Hikes)",
    url: "html/w07/w07hikes.html"
  }
];

window.onload = function() {
  console.log("window.onload");
  loadMainLinks();
};

function loadMainLinks() {
	console.log("loadMainLinks");
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
    var h3Element = document.createElement('p');
    aElement.appendChild(h3Element);
    h3Element.appendChild(document.createTextNode(links[linksCounter].label));
    // add item to list
    linksElement.appendChild(liElement);
  }

};
