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

/*	JS FORMS
  The form.submit() method will submit the form automatically but won’t
  trigger the form submit event.

  Spread operator:
    hero.powers = [...heroForm.powers].filter(box => box.checked).map(box => box.value);

    This uses the spread operator to turn the node list into an array.
    This then allows us to use the filter() method that returns an array
    containing only the check boxes that were checked (this is because
    their 'checked' property will be truthy).
    We then chain the map() method to the end, which replaces each checkbox
    in the array with its 'value' property.
    This array is then returned and stored in the hero.powers variable.
  
  Array iteration:
    hero.powers = [];
    for (let i=0; i < heroForm.powers.length; i++) {
        if (heroForm.powers[i].checked) {
            hero.powers.push(heroForm.powers[i].value);
        }
    }
  
*/

/*	JS ASYNC FUNCTION
    Async functions allow you to write asynchronous code as if it was synchronous.
    This is achieved by using the await operator before an asynchronous function.
    This will wrap the return value of the function in a promise that can then be
    assigned to a variable.
    The next line of code is not executed until the promise is resolved.

    async function loadGame(userName) {
      try {
          const user = await login(userName);
          const info = await getPlayerInfo (user.id);
          // load the game using the returned info
      }
      catch (error){
          throw error;
      }
    }
*/

/*	JS Classes (Object-Oriented Programming)
  A class defines a blueprint for an object.
  Objects are then created as an instance of that class, and inherit all the
  properties and methods of the class.
  
  Object-oriented programming is used to model representations of objects in
  the real world.
  There are three main concepts in OOP: encapsulation, polymorphism and inheritance.
  
  Encapsulation
    The inner workings are kept hidden inside the object and only the essential functionalities
    are exposed to the end user.
    In OOP, this involves keeping all the programming logic inside an object and making methods
    available to implement the functionality, without the outside world needing to know how it’s done.
    
  Polymorphism
    The same process can be used for different objects.
    In OOP, this means various objects can share the same method, but also have the ability to
    override shared methods with a more specific implementation.
    
  Inheritance
    Taking the features of one object then adding some new features.
    In OOP, this means we can take an object that already exists and inherit all its properties and methods.
    We can then improve on its functionality by adding new properties and methods.

  The static keyword can be used in class declarations to create a static method.
  These are called class methods in other programming languages.
  A static method is called by the class directly rather than by instances of the class.

    class Dice {
      constructor(sides=6) {
        this.sides = sides;
      }
      roll() {
          return Math.floor(this.sides * Math.random() + 1)
      }
      static description() {
          return 'A way of choosing random numbers'
      }
    }

  The prototype object is live, so if a new property or method is added to the prototype,
  any instances of its class will inherit the new properties and methods automatically, even if
  that instance has already been created. It should be used to define any properties that will
  remain the same for every instance of the class.

  Use variable scope to keep some properties and methods private inside of a class declaration.
  This will prevent them from being accessed or changed.
  Provide a getter method to return the values of any private properties.

    class Turtle {
      constructor(name,color) {
        this.name = name;
        let _color = color;
        this.setColor = color => { return _color = color; }
        this.getColor = () => _color;
      }
    }

  A class can inherit from another class using the extends keyword in a class declaration.

    class NinjaTurtle extends Turtle {
      constructor(name) {
        super(name);
        this.weapon = 'hands';
      }
      attack() { return `Feel the power of my ${this.weapon}!` } 
    }

  The get and set property descriptors are particularly useful for controlling
  the getting and setting of properties in classes.

    class Dice {
      constructor(sides=6){    
        Object.defineProperty(this, 'sides', {
          get() {
            return `This dice has ${sides} sides`;
          },
          set(value) {
            if(value > 0) {
              sides = value;
              return sides;
            } else {
              throw new Error('The number of sides must be positive');
            }
          }
        });

        this.roll = function() {
          return Math.floor(sides * Math.random() + 1)
        }
      }
    }

  Chaining Functions
    If a method returns this, its methods can be chained together to form a sequence
    of method calls that are called one after the other.

      superman.fly().move().xray();

  The for-of syntax for arrays and this does not require a nested function to be used,
  so this remains bound to the superman object:

    superman.findFriends = function() {
      for(const friend of this.friends) {
        console.log(`${friend.name} is friends with ${this.name}`);
      };
    }

  Arrow functions don't have their own this context, so this remains bound to the
  original object making the function call.

    superman.findFriends = function() {
      this.friends.forEach((friend) => {
        console.log(`${friend.name} is friends with ${this.name}`);
      });
    }

*/

/*	JS MODULES
  A module is a self-contained piece of code that provides functions and methods
  that can then be used in other files and by other modules.

  All code in modules is always in strict mode without the need for 'use strict'
  and there is no way to opt out of this.

  A module has its own global scope, any variables created in the top-level of a
  module can only be accessed within that module.

  The value of this in the top level of a module is undefined, rather than the global object.

  You can't use HTML-style comments in modules.

  Use default to export a single variable, function or class in a module that can
  be imported without having to be explicitly named.
  Having more than one default export will result in a syntax error.

  Export Variable:
    export const PI = 3.1415926;

  Import Variable:
    import { PI } from './pi.js';

  Export Function:
    function variance(array) {
      return sum(array,square)/array.length - square(mean(array))
    }

    function mean(array) {
      return sum(array) / array.length;
    }

    export {
      variance
    }

  Import Function:
    import  { variance } from './stats.js';
  
  Import all the functions from the stats.js module using a namespace of stats:
    import * as stats from './stats.js';
  
  The mean function could be used as follows:
    stats.mean([2,6,10]);

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
