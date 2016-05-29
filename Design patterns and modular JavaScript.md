## Design Patterns

Design patterns are reusable structures and ways of thinking to solve commonly occuring problems in software design.
A great advantage of using a design pattern to structure your code is that most patterns provide an out-of-the-box solution. Being out-of-the-box enables other programmers to easily step in, fix bugs or expand the existing codebase. Once a programmer is familiar with a popular design pattern such as the Module Pattern and becomes used to writing modular JavaScript, one can contribute to the development of libraries such as jQuery, Node and other open source projects. 

Patterns are not exact solutions to your problem; you still have to write your code. It rather provides a mental 'framework' or a solution scheme. If the programmers working on an application are able to think in the same way of structuring the code they are able to worry less about the structure and rather focus on the actual quality and optimization of the solution.

Now that we have gotton this general introduction out of the way I would like to introduce a commonly used JavaScript design pattern: the Module Pattern. 


## The Module Pattern

The Module Pattern was popularized by Eric Miraglia in a [blogpost](http://yuiblog.com/blog/2007/06/12/module-pattern/) back in 2007. He introduces us to the [work](http://javascript.crockford.com/private.html) of Douglas Crockford. His Module Pattern focuses on a couple of key principles in OOP (Object Oriented Programming). It is used to mimic classes in conventional software engineering and focuses on encapsulation of methods and variables. The pattern strives to improve the reduction of globally scoped variables and global namespace pollution.  

It enables programmers to write private methods and variables in anonymous functions prior to a return statement. Anything that is returned is regarded as public. This enables us to write API like strucutures in which programmers can interact with a piece of code in a limited way. 

To do all this funky stuff the Module Pattern relies on a couple of really sweet features in JavaScript. To understand how it works I will go back to the basics and gradually build it up to show you how. If you are already comfortable with specific topics feel free to skip chapters. In the end I will expand further on the Module Pattern and the Revealing Module Pattern.


## Classes in JavaScript

An important thing to note immediatly is that JavaScript is a class-less language, however classes can be simulated using functions. If you would like to learn more about OOP (Objective Oriented Programming) in JavaScript please read my [article](https://github.com/TimvanScherpenzeel/Articles/) on it here.


## Scope in JavaScript

A scope is the lifespan of a variable. Like humans every variable is born, lives and dies. The beginning of a scope marks the time the variable is born and the end of the scope marks the time it dies. In other words: A scope is the current context of execution. In this context variables and expressions are 'visible'. If a variable is not in the current scope then it is unavaible to use and will return as undefined.

Global variables are alive as soon as the program starts and die when the program ends. They are called global because once they are alive they can be accessed by any function inside and outside of the context. In most cases you want to limit the amount of global variables and global methods as this raises security concerns and clogs up the global namespace. But how do we do that? How do we prevent JavaScript from exposing our variables, methods and functions as it does by default?

In JavaScript a variable or method defined inside of a function are not accessable from outside of that function. 'Local' or 'private' variables (variables inside functions) are only alive as long as the function is being executed. Variables inside of the global scope are called 'public' and remain alive for as long the program is being executed.

In the following piece of code I show the workings of a global variable. Do you see that it is visible anywhere in the program? As Chief Keef would say: "that's that shit I don't like".

```javascript
var globalVar = 'global'; // global variable

var parent = function () {
	var _privateVar = 'private';

	console.log(globalVar); // globalVar is defined
	console.log(_privateVar); // privateVar is defined

	var child = function () {
		console.log(globalVar); // globalVar is defined
		console.log(_privateVar); // privateVar is defined
	};
};
```

A variable defined on the child level is not available to the parent level. `_childVar` is not available to the scope of the parent or to the global scope. However `_parentVar` is available to the scope of the child but not available to the global scope. Note that this only works whilst going down the scope chain, not up. 

```javascript
var parent = function () {
	var _parentVar = 'private'

	console.log(_parentVar); // _parentVar is defined
	console.log(_privateVar); // _childVar is undefined

	var child = function () {
		var _childVar = 'private';

		console.log(_parentVar); // _parentVar is defined
		console.log(_childVar); // _childVar is defined
	};
};
```

So how does this work?

Nested functions have access to variables declared in their outer scope. In other words: the scope of an inner function contains the scope of a parent function. The functions defined within another function won't be accessible outside the function unless they have been attached to an object that is accessible outside the function. This relationship between inner function and outer function we call Lexical scoping. The scope of variables is defined by their position in source code. 


## Closures in JavaScript

A closure is a subset of the lexical scope. Accessing a variable outside of the immediate scope creates a closure. 

A closure is a special kind of object that combines two things: a function, and the environment in which that function was created. The environment consists of any local variables that were in-scope at the time that the closure was created. It has three scopes: it has access to its own scope, its enclosing scope and the global scope.

```javascript
var globalVar = 'global';

function parentFunction() {
	var _privateVar = 'private';
	function childFunction() {
		print(_privateVar);
  	}
	return childFunction;
}

var child = parentFunction();
child();
```

`child();` calls the function `parentFunction`.
`parentFunction` returns its internal function `childFunction`. Even though `parentFunction` has finished executing at this point, the local scope where `_privateVar` has the value `private` still exists and the `childFunction` still uses it.


## Anonymous self-executing functions

An anonymous self-executing function is an immediately invoked function expression (IIFE). Many words to say that something look like this:

```javascript
(function(){
	// ...
})();
```

Take note of the parentheses around the entire function and the extra `();` at the end of the function.

Those two parentheses enable everything contained to be executed immediately. Because of lexical scoping all variables and functions defined within the anonymous function aren’t available to the code outside of it, effectively using a closure to seal itself from other libraries and code. An IIFE can have a return value just like any other function. This means that we can choose what we would like to expose to the public. 


## Global import

JavaScript has a feature known as implied globals. Whenever a name is used, the interpreter walks the scope chain backwards looking for a var statement for that name. If none is found, that variable is assumed to be global. 

Anonymous functions provide an easy alternative. By passing globals as parameters to our anonymous function, we import them into our code, which is both clearer and faster than implied globals. Here’s an example:

```javascript
(function ($) {
	// you now have access to the global jQuery (as $)
}(jQuery));
```

A major advantage of this solution is that we can write code that is truely modular. Even though jQuery exists in the global namespace we can make sure that it is only applied where we find it necessary.


## Global export

You can declare your name in the global namespace by simple naming your anonymous function. `return Module` returns the object `var Module = {};`. To this empty object methods and variables are added to be exposed publicly. An example of this is `Module.publicMethod`. This function is able to call the private function and return the result. Everything else is still protected using the closure of the anonymous function. Please also note the underscores in front of `_privateVar` and `_privateMethod`. It is a naming convention that private variables and functions are proceeded by an underscore. Usually variables and functions start with a lowercase letter but with modules, that is not the case. The general tradition is to start them with a capital letter instead.

```javascript	
// Global module
var globalModule = (function (){
	
	// Module object
	var Module = {};
	var _privateVar = 'private';

	function _privateMethod() {
		// ...
	}

	Module.publicProperty = 'public';
	Module.publicMethod = function () {
		console.log(_privateVar);
	};

	return Module;
})();
```

## Object literals

In object literal notation, an object is described as a set of comma-separated name/value pairs enclosed in curly braces `var ... = { ... };`. Names inside the object may be either strings or identifiers that are followed by a colon. Object literals encapsulate data to minimize the use of global variables. Property values can be of any data type, including array literals, functions, and nested object literals.

```javascript
var myObject = {
	string: 'string',
	number: 2,
	boolean: false,
	array: ["item-0", "item-1", "item-2"],
	nested: {
		x: 100,
		y: 200
	},
	function: function() {
		// ...
	}
};
```

## The Module Pattern continued

Now that we've acquired the basic knowledge I will expand further on the Module Pattern and it's brother: the Revealing Module Pattern.

To start a module pattern it is highly recommended to define a name in the global namespace to which you can attach the different modules.

```javascript
var App = App || {};
```

the Module Pattern has the following structure:

```javascript
var App = App || {};

// the Module Pattern
App.ModulePattern = (function(){
  
    // Private vars and functions
    var _greeting = "Hello";
    var _getGreeting = function(){
        return _greeting;
    };

    // Public vars and functions
    return {
        greetSomeone: function(name){
          console.log(_getGreeting() + ", " + name + "!");
        }
    };
})();

App.ModulePattern.greetSomeone("World");

//console logs 'Hello World!'
```

You attach the `ModulePattern` module to the global name `App` to expose the return values to the public. Anything outside of the return statement is by default private. You access the module from the outside using `App.ModulePattern.greetSomeone("World");`. The public function `greetSomeone` has access to the private function `_getGreeting`. You are not able to access `_getGreeting` directly from the outside.


### Advantages

	- The Module Pattern fully supports encapsulation.
	- Clean approach for developers.
	- Less clutter in the global namespace.
	- Localization of functions and variables through closures.

### Disadvantages

	- Private methods are unaccessible and lose extendability.
	- Public and private members are treated differently and are bound to their place in the source code.


## The Revealing Module Pattern

The Revealing Module Pattern has the following structure:

```javascript
var App = App || {};

// the Revealing Module Pattern
App.RevealingModulePattern = (function() {
    
    // Private vars and functions
    var _greeting = "Hello";
    var _getGreeting = function(){
        return _greeting;
    };

    var greetSomeone = function(name){
        console.log(_getGreeting() + ", " + name + "!");
    };

    // Public vars and functions
    return {
        greetSomeone : greetSomeone
    };
})();

App.RevealingModulePattern.greetSomeone("World");

//console logs 'Hello World!'
```

In the same way as before you attach the `RevealingModulePattern` module to the global name `App` to be able to reveal the module to the outside world in an API-like fashion. The main difference between the Revealing Module Pattern and the Module Pattern is the way it references in the return statement. The pattern was engineered as a way to ensure that all methods and variables are kept private until they are explicitly exposed; usually through an object literal returned by the closure from which it's defined.

```javascript
var greetSomeone = function(name){
    console.log(_getGreeting() + ", " + name + "!");
};
```

Is able to be placed outside of the return statement and is referenced indirectly. It is naming convention to name both the references the same but it can be a bit confusing at first.
	
```javascript
// Public vars and functions
return {
    foo : greetSomeone
};

'App.RevealingModulePattern.foo("World");' // returns 'Hello World!'
'App.RevealingModulePattern.greetSomeone("World");' returns 'undefined'
```

### Advantages

	- The Module Pattern fully supports encapsulation.
	- Clean approach for developers.
	- Less clutter in the global namespace.
	- Localization of functions and variables through closures.
    - The syntax of our code is even more consistent.
    - Public methods and variables are explicitly defined which lead to increased readability.


### Disadvantages

	- Private methods are unaccessible and lose extendability.
	- It's harder to patch public methods and variables that are referred to by something private.


## Conclusion

I hope you all enjoyed my introduction to design patterns, the Module Pattern and the Revealing Module Pattern. My goal was to give a general overview and build up knowledge step by step to understand the patterns myself and help you along the way.

I would like to thank Addy Osmani for writing the great book ['Learning JavaScript Design Patterns'](https://addyosmani.com/resources/essentialjsdesignpatterns/book/index.html) which I highly recommend reading.

Another great article to read is ['Javascript Module In Depth'](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html) by Ben Cherry especially the parts on global imports and exports.

Final thanks goes out to Carl Danley and his two articles ['The Module Pattern'](https://carldanley.com/js-module-pattern/) and ['The Revealing Module Pattern'](https://carldanley.com/js-revealing-module-pattern/). He gives a great overview of the two patterns and provides a learning source for many more. 
















