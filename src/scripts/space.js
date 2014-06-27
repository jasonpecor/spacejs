/**
 * SpaceJS
 * Created by Jason Pecor
 * v 0.0.1
 */

;var space = ( function ( global, undefined ) {
	"use strict";
	
	return function(arg1, arg2) {
		
		var ns, root, last;
		
		ns = typeof arg1 === 'string' ? arg1 : ( typeof arg2 === 'string' ? arg2 : undefined );
		root = typeof arg1 === 'object' ? arg1 : global;
		last = root;
		
		if (ns === undefined)
			return root;
		
		ns.split('.').forEach( function (key) {
			if (last[key] === undefined)
				last[key] = {};
			last = last[key];
		});
		
		return last;
	}
	
} )( window );