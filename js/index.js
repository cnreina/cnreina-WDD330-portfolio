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

const links = [
  {
    label: "Week 1 (Portfolio)",
    url: "html/w01/w01.html"
  },
  {
    label: "Week 2 (Quiz Ninja)",
    url: "html/w02/w02.html"
  },
  {
    label: "Week 2 (Assignment 01)",
    url: "html/w02/w02_01.html"
  },
  {
    label: "Week 2 (Assignment 02)",
    url: "html/w02/w02_02.html"
  },
  {
    label: "Week 2 (Assignment 03)",
    url: "html/w02/w02_03.html"
  },
  {
    label: "Week 2 (Stretch 03)",
    url: "html/w02/w02_04.html"
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
