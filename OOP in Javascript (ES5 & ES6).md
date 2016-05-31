## Object Oriented Programming in Javascript (ES5 & ES6)

Objective Oriented Programming (OOP) is a design philosophy that uses abstraction to create models based on the real world. Everything in OOP is grouped as self sustainable 'objects'; It is a collection of coorperating objects rather than a list of commands or an instructured collection of functions.

Please note that everything discussed has been written with ES5 in mind. I am aware that we have classes in ES6.


## Object

An object is a 'thing' that can perform a set of related tasks. The tasks the object can perform defines the behavior of the object. An object has properties and methods. A property is an object characteristic (like the color or shape) and a method is a capability of an object (like walk or swim).

Variables created inside of an object are called properties and methods are functions created inside of an object. As basically everything is an object in JavaScript I'll stick to this terminology.


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

Nested functions have access to variables defined in their outer scope. In other words: the scope of an inner function contains the scope of a parent function. The functions defined within another function won't be accessible outside the function unless they have been attached to an object that is accessible outside the function. This relationship between inner function and outer function we call Lexical scoping. The scope of variables is defined by their position in source code.

I would now like to introduce you to several keywords you must understand, in my opinion, when you are learning to implement OOP in JavaScript. 

## This

Now that you understand how the scope chain works in JavaScript I will be able to introduce the keyword `this`. To understand the concept I would like you to imagine the following:

Think of the scope chain like one of those large gumballs with those layers of different colors you can lick off. You start out with the most outer shell, the global object. In the browser we call this layer `window`. The keyword `this` always refers to the layer you are currently on. If you are on the outside of the gumball `this` refers to `window` but as you lick away beyond the outer layer you encounter a function. As you start to lick at this new layer and are referering to `this` layer you are talking about the layer you are currently on, not the outer layer you were on minutes ago.

And now in formal words: due to the scope chain, if we're inside a child object (an object inside an object), 'this' will refer to the child object and not the parent object.


## Classes

A well structured set of objects can be wrapped in something we call a class. A class is a representation of a type of object. It is the blueprint of the properties and methods of an object. From this blueprint individual objects can be created.

In ES5 we not have classes but we have functions to emulate the principle of classes. 

In ES6 we actually have classes in the traditional sense. I won't go into detail about it in this article but I highly recommend checking out the website [ES6 Features](http://es6-features.org/#ClassDefinition).


## Inheritance
	
A class can inherit characteristics and capabilities from other classes. In JavaScript inheritance refers to an object being able to inherit methods and properties from a parent function.


## Encapsulation

Encapsulation is an OOP concept that binds together the data and functions that manipulate the data, and that keeps both safe from outside interference and misuse.

Encapsulation in JavaScript refers to enclosing all the functionalities of an object within that object itself so that its methods and properties are hidden from the global scope. It allows us to abstract and modularize functionalities. Data encapsulation led to the important OOP concept of data hiding. 


## Data hiding

By default is in JavaScript everything outside of functions public (i.e., accessible to other parts of the program) due to the concept of the Lexical scope as I've mentioned before.

If you define a variable outside of all functions it will default to being public. This raises all kinds of security concerns and global namespace clutter because the function names you like to use someone else is probably using too.

Your goal should be to keep as many of the details of each parent function hidden from all other parent functions as possible. Do not allow other parent functions to harm the integrety of your one. 


## Encapsulation

Encapsulation is the inclusion within a program object of all the resources need for the object to function - basically, the methods and the data. The object is said to "publish its interfaces." Other objects adhere to these interfaces to use the object without having to be concerned with how the object accomplishes it. The idea is "don't tell me how you do it; just do it." An object can be thought of as a self-contained atom. The object interface consists of public methods and instantiated data.


## Conclusion

Now that we have a general overview of what OOP is and what it can do for us I would highly recommend reading my other article ['Design patterns and modular JavaScript'](https://www.github.com/timvanscherpenzeel/Articles) in which I introduce you to better ways of actually implementing OOP in JavaScript. 


## Object literal notation vs. constructor object notation

In JavaScript objects can be thought of as the main buidling blocks: every component is an object including functions and variables. We commonly use object literal notation or constructor object notation to create object.

Example of an object created in 'object literal notation':

```javascript
var myObject(){
	name : 'object literal notation',
	type : function() {
		console.log('Written using' + this.name);
	}
};

myObject.type();
```

Example of an object created as a 'constructor object notation':

```javascript
function myObject(){
	this.name = 'constructor object notation';
	this.type = function() {
		console.log('Written using' + this.name);
	};
};

var instanceOfMyObject = new myObject();
instanceOfMyObject.type();
```

You can see the advantage of the object literal notation straight away: you don't have to deal with the confusing `this` or worry about binding it, you don't need  To call a a literally notated object, you reference its variable name. To call a constructor object you first has to instantiate it using the `new` notation. With the object literal notation you are changing the actual object itself rather than an instance of the object, as you do with the constructor object notation.   
A clear downside is that you are effectively building a long list seperated by comma's. Missing one breaks the entire chain.

