#spacejs
SpaceJS is a namespacing utility for JavaScript
##Try it
You can try out SpaceJS here: http://codepen.io/jasonpecor/pen/vnsog
##Usage
###Create a namespace
Here is how to create and access a namespace.  Pass a string representation of the namespace you wish to create / access.
```js
space('utils'); // creates the namespace object 'utils'
utils; // Object {}

space('app.ui.widgets'); // create a deeper level namespace
app.ui.widgets; // Object {}

space('app.ui.effects.3d.particle'); // here is a special case
app.ui.effects['3d'].particle; // Object {}
```
###Non-destructive Namespacing
Use SpaceJS without worrying about clobbering existing objects.
```js
space('utils.math');
space('utils.iteration');
utils.math; // Object {} -> The 'utils' object was untouched by the second call, leaving utils.math intact
```

###Use a namespace right away
SpaceJS immediately returns the referenced namespace, allowing you to assign a property to it.
```js
space('utils.arrays').getLastItem = function (arr) {
  return arr[arr.length-1];
};

utils.arrays.getLastItem([10,20,30]); // returns 30
```
###Extend a namespace
There are three ways to namespace an object.  The following examples are equivilent.
```js
space('utils.filters');
space(window.utils, 'filters'); // assuming 'window' is set as the global namespace object (see below)
space(utils, 'filters');
```
> NOTE: In the first example above, we specify only one parameter, the namespace to create/access. This will extend the default global namespace object, which is 'window'.  In the second and third examples, we are specifying which object to namespace, which in these examples is 'utils'.

###The Global Namespace Object
In the browser, the default global namespace object for SpaceJS is 'window.'  In NodeJS, the default global namespace object is 'global.'  If neither 'window' nor 'global' are defined, an empty object will be used as the default.  You should not need to do this, but you can change the default global namespace object by calling *scope.global()*, passing in a new global namespace object (example below).
```js
var myCustomGlobal = {};

space.global(myCustomGlobal); // replace default global namespace object

space('dist').version = 2.1;
myCustomGlobal.dist.version; // 2.1
```
To get the current global namespace object, you can do one of the following.
```js
space.global(); // returns 'window', 'global' or whatever you've set as global
space(); // does the same thing
```
To set a value on the global namespace object, do one of the following.
```js
space.global().ver = 2.2;
space().ver = 2.2;
```
####Global Gotchas
After you have set an object as your global namespace object, you should not include it in the string representation of the namespace you wish to create or access, because you will duplicate the name of the global namespace object *on* the global namespace object.
```js
space('utils');
space.global(utils);
space('utils.geometry');

utils.geometry; // undefined -> Huh?!
utils.utils.geometry; // Object {} -> oh.

space('geometry');
utils.geometry; // Object {} -> that's better
```
###RequireJS
As of version 0.0.2, you can use SpaceJS with RequireJS.
```js
var space = require('./dist/js/space.js');

space('app.controller');
app.controller; // Object {}
```
###Modules
Easily create modules for your application.
```js

// class app.geometry.Circle
space('app.geometry').Circle = ( function () {
  "use strict";
  
  var pi = Math.PI;
  
  function Circle(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  
  Circle.prototype.getArea = function () {
    return pi * this.r * this.r;
  };
  
  return Circle;
})();

// class app.geometry.Rectangle
space('app.geometry').Rectangle = ( function () {
  "use strict";
  
  function Rectangle(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  Rectangle.prototype.getArea = function () {
    return this.w * this.h;
  };
  
  return Rectangle;
})();

var circle = new app.geometry.Circle(2,4,10);
var square = new app.geometry.Rectangle(8,10,20,20);

circle.getArea(); // 314.1592653589793
square.getArea(); // 400
```
###Errors
If you attempt to extend an object of a type which cannot be extended, such as a number, SpaceJS will throw a TypeError.
```js

var person = "Bob";
space('person').age = 33; // TypeError: Cannot extend `person`: `person` is a string

space('utils').version = 2.1; // this works fine
space('utils.version').details = { v: 2.2, date: '2014-08-12' }; // TypeError: Cannot extend `version` of `utils.version`: `version` is a number
```




