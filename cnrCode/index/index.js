/*	Carlos N Reina
  cnreina@gmail.com
*/


/* ************************************************************************* */

const links = [
  {
    label: "Week 1 (Portfolio)",
    url: "cnrCode/w01/html/w0100.html"
  },
  {
    label: "Week 2 (Quiz Ninja)",
    url: "cnrCode/w02/html/w0200.html"
  },
  {
    label: "Week 2 (Assignment 01)",
    url: "cnrCode/w02/html/w0201.html"
  },
  {
    label: "Week 2 (Assignment 02)",
    url: "cnrCode/w02/html/w0202.html"
  },
  {
    label: "Week 2 (Assignment 03)",
    url: "cnrCode/w02/html/w0203.html"
  },
  {
    label: "Week 2 (Stretch 03 - Callbacks)",
    url: "cnrCode/w02/html/w0204.html"
  },
  {
    label: "Week 3 (Quiz Ninja)",
    url: "cnrCode/w03/html/w0300.html"
  },
  {
    label: "Week 3 (Assignment 01)",
    url: "cnrCode/w03/html/w0301.html"
  },
  {
    label: "Week 3 (Assignment 02)",
    url: "cnrCode/w03/html/w0302.html"
  },
  {
    label: "Week 3 (Assignment 03)",
    url: "cnrCode/w03/html/w0303.html"
  },
  {
    label: "Week 3 (Assignment 04)",
    url: "cnrCode/w03/html/w0304.html"
  },
  {
    label: "Week 3 (Assignment 05)",
    url: "cnrCode/w03/html/w0305.html"
  },
  {
    label: "Week 3 (Assignment 06 (Stretch))",
    url: "cnrCode/w03/html/w0306.html"
  },
  {
    label: "Week 4 (Hero)",
    url: "cnrCode/w04/html/w0400.html"
  },
  {
    label: "Week 4 (Assignment 01 Tic Tac Toe)",
    url: "cnrCode/w04/html/w0401.html"
  },
  {
    label: "Week 5 (Error Handling)",
    url: "cnrCode/w05/html/w0500.html"
  },
  {
    label: "Week 5 (Assignments 1-3 Stretch 1-2)",
    url: "cnrCode/w05/html/w0501.html"
  },
  {
    label: "Week 6 (ToDo List)",
    url: "cnrCode/w06/html/w0600.html"
  },
  {
    label: "Week 7 (Hikes)",
    url: "cnrCode/w07/html/cnrItemsView.html"
  },
  {
    label: "Week 8 (Fetch API)",
    url: "cnrCode/w08/html/cnrPeopleView.html"
  },
  {
    label: "Week 9 (Folder structure refactoring)",
    url: "cnrCode/w09/html/cnrDrumKeysView.html"
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
  };
};
