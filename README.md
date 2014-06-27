#spacejs
SpaceJS is a namespacing utility for JavaScript

##Usage
###Create a namespace
Here is how to create and access a namespace.  Let's call this one "utils".
```js
space('utils'); // creates the object 'utils' on the global 'window' objecct

window.utils; // Object {}
```

###Extend a namespace
Now that we have created the 'utils' namespace on 'window' there are three ways to extend it.  The following examples are equivilent.
```js
space('utils.filters');
space(window.utils, 'filters');
space(utils, 'filters');
```
> NOTE: In the first example above, we specify only one parameter, the namespace to create/access. This will extend the default global namespace object, which is 'window'.  In the second and third examples, we are specifying which object to namespace, which in these examples is 'utils'.

###The Global Namespace Object
By default, the global namespace object for SpaceJS is 'window.'  To change this, call *scope.global()*, passing in a new global object.
```js
var myCustomGlobal = {};

space.global(myCustomGlobal); // replace default global namespace object

space('dist').version = 2.1;
myCustomGlobal.dist.version; // 2.1
```
To get the current global namespace object, you can do one of the following.
```js
space.global(); // returns 'window' or whatever you've set as global
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
space('utils').version = 2.1; // this works fine
space('utils.version').details = { v: 2.2, date: '2014-08-12' }; // TypeError: Cannot extend `version` of `utils.version`: `version` is a number
```




