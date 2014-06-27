/**
 * SpaceJS
 * Created by Jason Pecor
 * v 0.0.1
 */

;var space = ( function ( global, undefined ) {
	"use strict";
	
	function setGlobal(g) {
		if (g) global = g;
		else return global;
	}
	
	function space(arg1, arg2) {
		
		var ns, root, last;
		
		ns = typeof arg1 === 'string' ? arg1 : ( typeof arg2 === 'string' ? arg2 : undefined );
		root = typeof arg1 === 'object' ? arg1 : global;
		last = root;
		
		if (ns === undefined)
			return root;
		
		ns.split('.').forEach( function (key) {
			if (last[key] === undefined)
				last[key] = {};
			else if (typeof last[key] !== 'object')
				throw new TypeError('Cannot extend `' + key + (last !== root ? '` of `' + ns : '') + '`: `' + key + '` is a ' + typeof last[key]);
			else if (last[key] === null)
				throw new TypeError('Cannot extend `' + key + (last !== root ? '` of `' + ns : '') + '`: `' + key + '` is null');
			last = last[key];
		});
		
		return last;
	}
	
	space.global = setGlobal;
	
	return space;
	
} )( window );