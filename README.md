Dexter's Lab
============

A place to test interesting things out.

To run
======

`npm install`
`webpack-dev-server`

For Development
===============
`webpack-dev-server --inline`

Outline
=======

- ES6
    - What is it?
    - Where are we using it? NOTE: this isn't an exhaustive list. Going over the highlights.
- Basics
    - let, const
        - let : lexical scope for our variables! No more hoisting. Scoped for the block it is defined in.
        - const : immutable variable
    - template strings
        - syntactic sugar
        - can have true multiline strings
        - variable interpolation in strings
    - Arrows
        - a function shorthand using the => syntax, similar in purpose with their usage in CoffeeScript
        - Share same lexical scope for `this` as their surrounding code
        - No more .bind() or .apply() or self = this to achieve this.
    - default parameters
        - ES5 way
                function(param1, param2) {}
        - es6 way
                function(param1, param2=defaultValue) {}
    - classes
    - enhanced object literals
        - dynamic properties, no need for function, other things
                let obj = {
                    // dynamic properties
                    ['darth' + 'vader']: 'I am your father',
                    // define functions without 'function' keyword
                    skywalker() {
                        return 'NOOOOOOO';
                    }
                }
    - rest
        No more arguments nonsense.
        - in ES5
                store.add = function(category) {
                    var items = [].slice.call(arguments, 1);
                    items.forEach(function(item) {
                        store.aisle[category].push(item);
                    });
                };
        - in ES6
                store.add = function(category, ...items) {
                    items.forEach(function(item) {
                        store.aisle[category].push(item);
                    });
                };
    - spread
        - before in ES5
                function myFunction(x, y, z) {}
              var args = [0, 1, 2]
              myFunction.apply(null, args);
        - spread example
                function myFunction(x, y, z) {}
                var args = [0, 1, 2];
                myFunction(...args);
        - array example
                let arr1 = [0, 1, 2];
                let arr2 = [3, 4, 5];
                arr1.push(...arr2);
        - apply for new
                var fields = [1, 2, 3]
                var myClass = new MyClass(...fields);
    - modules
- Moderate
    - New primitive type: Symbol
        - Guaranteed unique reference
    - iterators, for of
    - Generators (\*function)
    - destructuring
        - binding using pattern matching
        - multiple return values
    - Map, Set, WeakSet, WeakMap
- Advanced
    - Reflect (proxies)
- Why are we using it?

- Resources
    - http://es6-features.org/
    - https://esdiscuss.org/
