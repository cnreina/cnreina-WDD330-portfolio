/*	Carlos N Reina
  cnreina@gmail.com
*/

/*	JS Primitive Data Types
  String
  Symbol
  Number
  Boolean
  Undefined
  Null
*/

/*	JS Reserved Words
  abstract
  await
  boolean
  break
  byte
  case
  catch
  char
  class
  const
  continue
  debugger
  default
  delete
  do
  double
  else
  enum
  export
  extends
  false
  final
  finally
  float
  for
  function
  goto
  if
  implements
  import
  in
  Infinity
  instanceof
  int
  interface
  let
  long
  NaN
  native
  new
  null
  package
  private
  protected
  public
  return
  short
  static
  super
  switch
  synchronized
  this
  throw
  throws
  transient
  true
  try
  typeof
  undefined
  var
  volatile
  void
  while
  with
  yield
*/

/*	JS Variables
  Constant and variable names can start with any upper or lower-case letter, an underscore, or dollar character.
  Constant and variable names are case sensitive.
  Variables that start with an underscore generally refer to private properties and methods, it's best to not
  follow this convention for your own variable names.
  The $ character is also used by the popular jQuery library, so using this in your variable names may also cause problems.

  From ES6 onwards, JavaScript uses the keywords const and let to declare variables.
  Variables declared using let and const have block scope.

  If the variable references a non-primitive data type, such as an array, function or object, then
  using const will not make it immutable.
  This means the underlying data inside the object can change (known as mutating the object).

*/

/*	JS Data Structures
    Arrays
      The array length property is mutable.

    Sets
      A set is a data structure that represents a collection of unique values, so it
      cannot include any duplicate values.
      If you try to add a value already contained in the set, the operation is ignored.
      It's quick and easy to check if a particular value is in a set, which can be a
      slow operation if an array is used.
      Type coercion is not used when values are added to a set.
      Use the Array.from() method to convert a set into an array.

    Weak Sets
      Weak sets avoid memory leaks by garbage collecting any references to a 'dead object'
      that’s had its original reference removed.
      Only non-primitive data types can be added to weak sets.
      Weak sets are non-enumerable, so it's not possible to loop over them with an iterator.

    Maps
      A convenient way of keeping a list of key and value pairs, and are similar to 'hashes', or
      'hash tables' or 'dictionaries' in other programming languages.
      Maps can use any data type as a key.
      Finding the number of key-value pairs an object has is easy to do using the size property.
      Maps are solely focused on the storage and retrieval of key-value pairs.
      Maps can be converted into a nested array of key-value pairs using the Array.from() method.

    Weak Maps
      Weak maps work in the same way as weak sets.
      They are the same as maps, except their keys cannot be primitives, and the garbage collector
      will automatically remove any dead entries when the reference to the original object is deleted.
      Weak maps are non-enumerable, so it's not possible to loop over them with an iterator.

*/

/*	JS Notes
  JavaScript is a weakly typed or loosely typed language.

  Function Hoisting is the JavaScript interpreter’s action of moving all variable and function
  declarations to the top of the current scope, regardless of where they are defined.

  You can check if a value is a number by using the Number.isFinite() method.
  This will return true if the value is a number that isn't Infinity, -Infinity or NaN.

  In general, values tend to be set to undefined by JavaScript, whereas values are usually
  set to null manually by the programmer.

  JavaScript uses lazy evaluation when processing the logical AND and OR operators.
  This means it stops evaluating any further operands once the result is clear.

  Bitwise operators work with operands that are 32-bit integers.

  Use the rest operator to deal with multiple arguments by creating an array of arguments
  that are available inside the body of a function.
  To use the rest operator, simply place three dots in front of the last parameter in a
  function declaration.
  This will then collect all the arguments entered into an array.
    Example:
      function rest(...args){
        for(arg of args){
          console.log(arg);
        }
      }

*/

/*	JS Objects
  All objects are mutable at any time when a program is running. Even if it
  was declared using const.

  Objects are assigned by reference. If a variable is assigned to an object
  that already exists, it will simply point to the exact same space in memory.
  This doesn't happen when primitive values are used instead of objects.

  The object literal notation is the preferred way of creating objects:
    const objectVar = {
      objectProperty: 'objectValue',
      'tringProperty': 'stringValue',
      numberProperty: 0,
      booleanProperty: false,
      arrayProperty: ['arrayValue1','arrayValue2','arrayValue3'],
      functionProperty() {
        return 'Hello World!';
    }
  };

  A new property can be added to an object using a symbol as a key if
  the square bracket notation is used:
    const propertyName = Symbol('Symbol Value');
    objectVar[propertyName] = 'Property Value';

  Check whether an object has a property that is its own, rather than one
  that has been inherited from another object:
    objectVar.hasOwnProperty('objectProperty');

  Iterate over an object's own properties:
    for(const key of Object.keys(objectVar)){
      console.log(key);
    };

    for(const key in objectVar){
      if(objectVar.hasOwnProperty(key)){
        console.log(key + ": " + objectVar[key]);
      };
    };

  Objects as Parameters to Functions:
    function greet({greeting,name,age}) {
      return `${greeting}! My name is ${name} and I am ${age} years old.`;
    };

*/

/*	JS Namespacing
  Use the object literal pattern to create a namespace for related functions:
    const myMaths = {
      square(x) {
        return x * x;
      },
      mean(array,callback) {
        if (callback) {
          array.map( callback );
        }
        const total = array.reduce((a, b) => a + b);
        return total/array.length;
      }
    };

*/

/*	JSON
  JavaScript Object Notation, or JSON, is a lightweight data-storage format
  for data serialization and configuration.

  JSON is a string representation of an object literal notation.
  There are, however, a couple of key differences:
    1. Property names must be double-quoted
    2. Permitted values are double-quoted strings, numbers, true, false, null, arrays and objects
    3. Functions are not permitted values

*/

/*	JS Math
  The Math object has eight properties to represent commonly used math constants:
    Math.PI // The ratio of the circumference and diameter of a circle
    Math.SQRT2 // The square root of 2
    Math.SQRT1_2 // The reciprocal of the square root of 2
    Math.E // Euler's constant
    Math.LN2 // The natural logarithm of 2
    Math.LN10 // The natural logarithm of 10
    Math.LOG2E // Log base 2 of Euler's constant
    Math.LOG10E // Log base 10 of Euler's constant

*/

/*	JS DOM Access
  The DOM treats everything on a web page as a node.
  The HTML tag is the root node, and every other part of the
  document is a child node of this.
  The DOM stores any whitespace in the HTML document as text nodes.

  We can use JavaScript to access and modify different parts of a
  web page using a special built-in object called document.

  Any CSS property names that are separated by dashes must be written
  in camelCase notation, so the dash is removed.

  When you click on an element, you are actually clicking on all the elements
  it’s nested inside of.
  Event propagation is the order that the events fire on each element.
  There are two forms of event propagation: bubbling and capturing.
  Bubbling is when the event fires on the element clicked on first, then
  bubbles up the document tree, firing an event on each parent element until
  it reaches the root node.
  Capturing starts by firing an event on the root element, then propagates
  downwards, firing an event on each child element until it reaches the target
  element that was clicked on.
  The addEventListener() method has a third parameter, which is a boolean value
  that specifies whether capturing should be used or not.

  Stopping event propagattion:
    liElement.addEventListener('click', eventHandler, false);
    eventHandler(event){
      event.stopPropagation();
    }
  
  The click event is safer than the touchstart event as it still fires when
  the screen is touched, but there’s a slight delay of 300ms, allowing the user
  time to perform another action with the device.
  The click event can be thought of as a "tap" in the context of a touch event.

  Swipe events need to be created by using a combination of touchstart,
  touchmove, and touchleave events that monitor the distance and direction
  moved from start to finish of a touch event.

  All nodes have a numerical code to signify what type they are:
    Code	Type
    1	    element
    2	    attribute
    3	    text
    8	    comment
    9	    body

    Ex; body.nodeType;
    Ex; body.nodeName;
  
  Turn a node list into an array:
    const imageArray = Array.from(document.images);
    const imageArray = [...document.images];

  Getting elements:
    const h1 = document.getElementById('title');
    const heroes = document.getElementsByClassName('hero');
    const listItems = document.getElementsByTagName('li');
    document.querySelector('#bats');
    document.querySelectorAll('.hero');
  
  Getting attributes:
    wonderWoman.getAttribute('class');
    wonderWoman.classList.contains('hero');

  Setting attributes:
    wonderWoman.setAttribute('class', 'hero');
    wonderWoman.classList.add('warrior');
    wonderWoman.classList.remove('warrior');

  Creating elements:
    const flash = document.createElement('li');
    flash.textContent = 'Flash';
    flash.style.border = "red 2px solid";
    heroes.appendChild(flash);
    heroes.insertBefore(flash,wonderWoman);

    function createElement (tag,text) {
      const el = document.createElement(tag);
      el.textContent = text;
      return el
    }
    const aquaman = createElement('li','Aquaman');

    const h1 = document.getElementById('title');
    const oldText = h1.firstChild;
    const newText = document.createTextNode('Justice League of America');
    h1.replaceChild(newText,oldText);

    heroes.innerHTML = 
      '<li>Harley Quinn</li>
      <li>Deadshot</li>';
    NOTE: To stop malicious content using innerHTML, any code contained
          within <script> tags is not executed.
  
  Using Event Listeners:
    addEventListener('keypress', (event) => console.log(`You pressed the ${event.key} character`));

    document.body.addEventListener('click',doSomething);
    function doSomething(event){
      console.log(event.type);
      console.log(event.target);
      console.log(
        `screen: (${event.screenX},${event.screenY}),
        page: (${event.pageX},${event.pageY}),
        client: (${event.screenX},${event.screenY})`
      )
    }

*/

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
    label: "Week 2 (Stretch 03)",
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
    label: "Week 4 (Search Demo)",
    url: "html/w04/w0400.html"
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
    var h3Element = document.createElement('p');
    aElement.appendChild(h3Element);
    h3Element.appendChild(document.createTextNode(links[linksCounter].label));
    // add item to list
    linksElement.appendChild(liElement);
  }

};
