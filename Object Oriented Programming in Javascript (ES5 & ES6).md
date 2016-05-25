## Object Oriented Programming in Javascript (ES5 & ES6)

A comparison between OOP Javascript in ES5 and the improvements in ES6.


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

Class
	Defines the object's characteristics. A class is a template definition of an object's properties and methods.

Object
	An instance of a class.

Property
	An object characteristic, such as color.

Method
	An object capability, such as walk. It is a subroutine or function associated with a class.

Constructor
	A method called at the moment an object is instantiated. It usually has the same name as the class containing it.

Inheritance
	A class can inherit characteristics from another class.

Encapsulation
	A technique which involves bundling the data and the methods that use the data together.

Abstraction
	The conjunction of an object's complex inheritance, methods, and properties must adequately reflect a reality model.

Polymorphism
	Poly means "many" and morphism means "forms". Different classes might define the same method or property.


Class

JavaScript is a class-less language, however classes can be simulated using functions.

	// A car "class"
	function Car( model ) {
	 
	  this.model = model;
	  this.color = "silver";
	  this.year = "2012";
	 
	  this.getInfo = function () {
	    return this.model + " " + this.year;
	  };
	  
	}

	var myCar = new Car("ford");

	myCar.year = "2010";
	 
	console.log( myCar.getInfo() );
