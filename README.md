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
    - Where are we using it?
    - NOTE: this isn't an exhaustive list. Going over the highlights.
- Basics
    - Implicitly in 'strict' mode.
    - Semicolons technically not required, but probably use out of force of habit.
    - let, const
        - let : lexical scope for our variables! No more hoisting. Scoped for the block it is defined in.
        ```javascript
        if (true) {
            let something = 'something';
        }
        console.log(something);
        ```
        - const : immutable variable
        ```javascript
        const something = 'yes';
        ```
    - template strings
        - can have true multiline strings
        ```javascript
        // multiline
        let templateString = `Can't
        touch
        this`
        ```
        - variable interpolation in strings
        ```javascript
        let superman = "Clark Kent"
        let templateString = `${superman} is cool`
        ```
    - Arrows
        - A function shorthand using the => syntax, similar in purpose with their usage in CoffeeScript
        - Share same lexical scope for `this` as their surrounding code
        - No more .bind() or .apply() or self = this to achieve this.
            - ES5 way
            ```javascript
            var $ = require('jquery');

            function Superman() {
                this.captain = "Kirk";
                this.crewMembers = ["Spock"];
                this.actions = ['fly', 'punch', 'kick', 'lazers'];
            };

            Superman.prototype.kickAss = function() {
                this.actions.forEach((function() {
                    console.log(this.captain);
                }).bind(this));
            }
            ```
            - ES6 way
            ```javascript
            class Enterprise {
                import $ from 'jquery';

                constructor(el) {
                    this.captain = "Kirk";
                    this.crewMembers = ["Spock"];
                    this.$el = $(el);
                }

                _setupEventListeners() {
                    this.$el.click(=> {
                        // This works.
                        console.log(this.captain);
                    });
                }
            }
            ```
    - default parameters
        - ES5 way
        ```javascript
        function(param1, param2) {}
        ```
        - ES6 way
        ```javascript
        function(param1, param2=defaultValue) {}
        ```
    - classes
        - syntactic sugar
        ```javascript
        class Enterprise {
            import $ from 'jquery';

            constructor(el) {
                this.captain = "Kirk";
                this.crewMembers = ["Spock"];
                this.$el = $(el);
            }

            _setupEventListeners() {
                this.$el.click(=> {
                    // This works.
                    console.log(this.captain);
                });
            }
        }
        ```
    - enhanced object literals
        - dynamic properties, no need for function, other things
        ```javascript
        let obj = {
            // dynamic properties-- not possible in ES5
            ['darth' + 'vader']: 'I am your father',
            // define functions without 'function' keyword
            skywalker() {
                return 'NOOOOOOO';
            }
        }
        ```
    - rest
        No more arguments nonsense.
        - in ES5
        ```javascript
        store.add = function(category) {
            var items = [].slice.call(arguments, 1);
            items.forEach(function(item) {
                store.aisle[category].push(item);
            });
        };
        ```
        - in ES6
        ```javascript
        store.add = function(category, ...items) {
            items.forEach(function(item) {
                store.aisle[category].push(item);
            });
        };
        ```
    - spread
        - before in ES5
        ```javascript
        function myFunction(x, y, z) {}
        var args = [0, 1, 2]
        myFunction.apply(null, args);
        ```
        - spread example
        ```javascript
        function myFunction(x, y, z) {}
        var args = [0, 1, 2];
        myFunction(...args);
        ```
        - array example
        ```javascript
        let arr1 = [0, 1, 2];
        let arr2 = [3, 4, 5];
        arr1.push(...arr2);
        ```
        - apply for new
        ```javascript
        var fields = [1, 2, 3]
        var myClass = new MyClass(...fields);
        ```
    - modules (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
    ```javascript
    // Will import default export
    import MyClass from 'packages/my-class';

    // Import individual functions from a module
    import {methodOne, methodTwo} from 'packages/my-class';

    // Import as alias
    import {longMethodNameThatIsRidiculous as saneMethod} from 'packages/my-class';
    ```
- Moderate
    - New primitive type: Symbol
        - Guaranteed unique reference
        ```javascript
        let mySymbol = Symbol('some descriptor');
        ```
    - iterators, for of
    ```javascript
    
    ```
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
