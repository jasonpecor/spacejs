#spacejs
SpaceJS is a namespacing utility for JavaScript

##Usage
**Create a namespace**
Here is how to create and access a namespace.  Let's call this one "utils".
```js
space('utils'); // creates the object 'utils' on the global 'window' objecct

window.utils; // Object {}
```

**Extend a namespace**
Now that we have created the 'utils' namespace on 'window' there are two ways to extend it.  The following examples are equivilent.
```js
space('utils.filters');
space(window.utils, 'filters');
space(utils, 'filters');
```
> NOTE: In the first example above, we specify only one parameter, the namespace to create/access. This will extend the default global object, which is 'window'.  In the second and third examples, we are specifying which object to extend, which in these examples is 'utils' on the global 'window' object.

**The Global Object**
By default, the global object for SpaceJS is set to 'window.'  To change this, call *scope.global()*, passing in a new global object.
```js
var myCustomGlobal = {};

space.global(myCustomGlobal); // replace default global namespace object

space('dist').version = 2.1;
myCustomGlobal.dist.version; // 2.1
```

**Non-destructive**
Use SpaceJS without worrying about clobbering existing objects.
```js
space('utils.math');
space('utils.iteration');
utils.math; // Object {} -> The 'utils' object was untouched by the second call, leaving utils.math intact
```

**Use a namespace right away**
SpaceJS immediately returns the referenced namespace, allowing you to use it immediately.
```js
space('utils.arrays').getLastItem = function (arr) {
  return arr[arr.length-1];
};

utils.arrays.getLastItem([10,20,30]); // returns 30
```

**TypeErrors using SpaceJS**
If you attempt to extend an object of a type which cannot be extended, such as a number, SpaceJS will throw a TypeError.
```js
space('utils').version = 2.1; // this works file
space('utils.version').details = { v: 2.2, date: '2014-08-12' }; // TypeError: Cannot extend `version` of `utils.version`: `version` is a number
```




