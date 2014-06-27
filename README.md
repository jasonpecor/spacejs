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




