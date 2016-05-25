//Private properties

As variables inside a constructor

Class
Object

class Mammel {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
}

var Mammel = class Mammel {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
}


Javascript transpiling ES6 --> ES5 with Babel.js




//Functions and variables are hoisted


//All properties are public in that any function can modify or delete the properties

function PrivateCode(){
	var privateNum = 78;
	this.guessPrivateNum = function(num){

	}
}

var private = new PrivateCode();



// Javascript Objects
// Passing Objects to Functions
// Prototypes


Object

var Foo = { };
Foo.Bar = function() { ... };

function Foo() { };
Foo.Bar = function() { ... };

Getters / Setters

Method notation in object property definitions
var addStuff = {
	sum: function(num1, num2){
		return num1 + num2;
	}
};

var addStuff = {
	sum(num1, num2){
		return num1 + num2;
	}
}

//Classes ES5 (don't exist in Javascript yet)

// ES5 Class
var Point = function(xPos, yPos) {
	this.xPos = xPos;
	this.yPos = yPos;
}

Point.prototype.getPos = function(){
	return "X: " + this.xPos + " Y: " + this.yPos;
};

var point = new Point(100, 200);

document.write("Point position : " + point.getPos() + "<br/>");


// ES6 Class
class Point {
	constructor(xPos, yPos) {
		this.xPos = xPos;
		this.yPos = yPos;
	}

	getPos(){
		return "X: " + this.xPos + " Y: " + this.yPos;
	}
}

var point = new Point(100, 200);

document.write("Point position : " + point.getPos() + "<br/>");

class Animal {
	constructor(name){
		this.name = name;
	}

	toString(){
		return "Animal's name is " + this.name;
	}

	static getAnimal(){
		return new Animal("No name");
	}
}

class Dog extends Animal {
	constructor(name, owner){
		super(name);
		this.owner = owner;
	}

	toString(){
		return super.toString() + this.name;
	}
}

// Design patterns

// ---------- SINGLETON PATTERN ----------
// Singletons are used when you only ever want 1 object to
// be created
// Let's say you want to create a game character with fixed
// stats
function Hero(name){

  // Check if the object exists
  if(typeof Hero.instance === 'object'){

    // If it does return it
    return Hero.instance;
  }

  // if it doesn't then create the hero
  this.name = name;
  Hero.instance = this;

  return this;
}

var derekHero = new Hero("Derek");
document.write("Are hero is " + derekHero.name + "<br />");

// This won't change the name to Paul
var paulHero = new Hero("Paul");
document.write("Are hero is " + paulHero.name + "<br />");


// ---------- FACTORY PATTERN ----------
// The factory pattern can be used to generate different
// objects on request

function Sword(desc){
  this.weaponType = "Sword";
  this.metal = desc.metal || "Steel";
  this.style = desc.style || "Longsword";
  this.hasMagic = desc.hasMagic || false;
}

function Bow(desc){
  this.weaponType = "Bow";
  this.material = desc.material || "Wood";
  this.style = desc.style || "Longbow";
  this.hasMagic = desc.hasMagic || false;
}

function WeaponFactory(){};

WeaponFactory.prototype.makeWeapon = function(desc){
  var weaponClass = null;

  if(desc.weaponType === "Sword"){
    weaponClass = Sword;
  } else if (desc.weaponType === "Bow"){
    weaponClass = Bow;
  } else {
    return false;
  }

  return new weaponClass(desc);

}

var myWeaponFact = new WeaponFactory();

var bladeFist = myWeaponFact.makeWeapon({
  weaponType: "Sword",
  metal: "Dark Iron",
  style: "Scythe",
  hasMagic: true
});

document.write(bladeFist.weaponType + " of type " + bladeFist.style + " crafted from " + bladeFist.metal + "<br />");


// ---------- DECORATOR PATTERN ----------
// The decorator pattern allows you alter an object at run time
function Pizza(price){
  this.price = price || 10;
}

Pizza.prototype.getPrice = function(){
  return this.price;
}

function ExtraCheese(pizza){
  var prevPrice = pizza.price;

  pizza.price = prevPrice + 1;
}

var myPizza = new Pizza(10);

ExtraCheese(myPizza);

document.write("Cost of Pizza : $" + myPizza.price + "<br />");

// ---------- OBSERVER PATTERN ----------
// A single object notifies many objects (observers) when a
// state change occurs
var Observable = function() {
    this.subscribers = [];
}

Observable.prototype = {
    subscribe: function(subscriber) {
        // Add the subscriber object to the list
        this.subscribers.push(subscriber);
    },
    unsubscribe: function(unsubscriber) {

        // Cycle through the subscriber array and delete
        // the unsubscriber
        for (i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === unsubscriber) {
                this.subscribers.splice(i, 1);

                // We assume it only subscribed once so we
                // leave after it is found
                return unsubscriber.name;
            }
        }
    },
    publish: function(data) {

        // Cycle through all subscribers and send them the update
        for (i = 0; i < this.subscribers.length; i++) {
            this.subscribers[i].receiveData(data);
        }
    }
};

var OrganFanny = {
  name: "Organ Fanny",
  receiveData: function(data){
    document.write(this.name + " received your info : " + data + "<br />");
  }
}

var BoldmanYaks = {
  name: "Boldman Yaks",
    receiveData: function(data){
      document.write(this.name + " received your info : " + data + "<br />");
    }
}

// Add subscribers and alert them
observable = new Observable();
observable.subscribe(OrganFanny);
observable.subscribe(BoldmanYaks);
observable.publish('IBM at $145.30');

document.write(observable.unsubscribe(OrganFanny) + " Unsubscribed<br />");

observable.publish('IBM at $145.33');



</script>

