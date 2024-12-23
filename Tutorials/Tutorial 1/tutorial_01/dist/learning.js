"use strict";
// basic types string, number, boolean
let num = 42;
let str = "Hello, TypeScript";
let bool = true;
// let num: number = "This is a string"; // Error: Type 'string' is not assignable to type 'number'.
// array definitions
let arrNum = [1, 2, 3, 4, 5];
let arrStr = ["a", "b", "c", "d", "e"];
// let numbers: number[] = [1, 2, 3, "four"]; // Error: Type 'string' is not assignable to type 'number'.
// tuples (array definitions for multiple types in specific order)
let tuple;
tuple = ["hello", 10];
// tuple = [10, "hello"]; // Error: Type 'number' is not assignable to type 'string'.
// union types (combining multiple types)
let union;
union = "hello";
union = 10;
// union = 
// intersection types (combining multiple types
// enums ()
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
let c = Color.Green;
var Color1;
(function (Color1) {
    Color1[Color1["Red"] = 1] = "Red";
    Color1[Color1["Green"] = 2] = "Green";
    Color1[Color1["Blue"] = 4] = "Blue";
})(Color1 || (Color1 = {}));
let b = Color1.Green; // 2
let myType;
myType = "hello";
myType = 10;
let person = {
    name: "John Doe",
    age: 30
};
let personOptional = {
    name: "John Doe"
};
let personReadonly = {
    name: "John Doe",
    age: 30
};
let greetFunction = function (name) {
    console.log(`Hello, ${name}!`);
};
let greetReturnFunction = function () {
    return "Hello, TypeScript!";
};
// function definitions
function greet(name) {
    console.log(`Hello, ${name}!`);
}
greet("John Doe");
function add(a, b) {
    return a + b;
}
console.log(add(5, 10));
// optional and default parameters
function greetOptional(name, age) {
    if (age) {
        console.log(`Hello, ${name} (${age} years old)!`);
    }
    else {
        console.log(`Hello, ${name}!`);
    }
}
greetOptional("John Doe");
greetOptional("John Doe", 30);
function greetDefault(name, age = 20) {
    console.log(`Hello, ${name} (${age} years old)!`);
}
greetDefault("John Doe");
// rest parameters
function greetRest(name, ...ages) {
    console.log(`Hello, ${name}! You are ${ages.length} years old.`);
    ages.forEach((age) => console.log(`- ${age} years old`));
}
greetRest("John Doe", 30, 25, 20);
// spread operator
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combinedArr = [...arr1, ...arr2];
console.log(combinedArr); // [1, 2, 3, 4, 5, 6]
// destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
// type assertions
let anyVar = "Hello, TypeScript!";
let strLength = anyVar.length;
console.log(strLength); // 18
// type guards
function isString(value) {
    return typeof value === "string";
}
if (isString(anyVar)) {
    let strLength = anyVar.length;
    console.log(strLength); // 18
}
// generics
function createArray(length, value) {
    return Array.from({ length }, () => value);
}
let numArray = createArray(5, 5);
console.log(numArray); // [5, 5, 5, 5, 5]
// classes
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}
let animal = new Animal("Lion");
animal.speak(); // Lion makes a sound.
// abstract classes
class Vehicle {
}
class Car extends Vehicle {
    makeSound() {
        console.log("Car makes a vroom sound.");
    }
}
let car = new Car();
car.makeSound(); // Car makes a vroom sound.
// private and protected members
class AnimalWithPrivateProperty {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (typeof value === "string") {
            this._name = value;
        }
        else {
            throw new Error("Name must be a string.");
        }
    }
}
let animalWithPrivateProperty = new AnimalWithPrivateProperty("Lion");
console.log(animalWithPrivateProperty.name); // Lion
animalWithPrivateProperty.name = "Tiger";
console.log(animalWithPrivateProperty.name); // Tiger
class AnimalWithProtectedProperty {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        if (typeof value === "string") {
            this._name = value;
        }
        else {
            throw new Error("Name must be a string.");
        }
    }
    makeSound() {
        console.log(`${this.name} makes a sound.`);
    }
    makeSoundProtected() {
        console.log(`${this.name} makes a sound (protected).`);
    }
    static incrementStaticProperty() {
        AnimalWithProtectedProperty.staticProperty++;
    }
    static decrementStaticProperty() {
        AnimalWithProtectedProperty.staticProperty--;
    }
    static getStaticProperty() {
        return AnimalWithProtectedProperty.staticProperty;
    }
    static createAnimalWithProtectedProperty(name) {
        return new AnimalWithProtectedProperty(name);
    }
}
AnimalWithProtectedProperty.staticProperty = 0;
let animalWithProtectedProperty = AnimalWithProtectedProperty.createAnimalWithProtectedProperty("Tiger");
console.log(animalWithProtectedProperty.name); // Tiger
animalWithProtectedProperty.makeSound(); // Tiger makes a sound.
animalWithProtectedProperty.makeSoundProtected(); // Tiger makes a sound (protected).
AnimalWithProtectedProperty.incrementStaticProperty();
console.log(AnimalWithProtectedProperty.getStaticProperty()); // 1
AnimalWithProtectedProperty.decrementStaticProperty();
console.log(AnimalWithProtectedProperty.getStaticProperty()); // 0
// static members
class AnimalWithStaticProperty {
    static incrementStaticProperty() {
        AnimalWithStaticProperty.staticProperty++;
    }
    static decrementStaticProperty() {
        AnimalWithStaticProperty.staticProperty--;
    }
    static getStaticProperty() {
        return AnimalWithStaticProperty.staticProperty;
    }
}
AnimalWithStaticProperty.staticProperty = 0;
AnimalWithStaticProperty.incrementStaticProperty();
console.log(AnimalWithStaticProperty.getStaticProperty()); // 1
AnimalWithStaticProperty.decrementStaticProperty();
console.log(AnimalWithStaticProperty.getStaticProperty()); // 0
// type inference
// let num: number = 10;
// let str: string = num.toString();
// inheritance
class Cat extends Animal {
    constructor(name) {
        super(name);
    }
    speak() {
        console.log(`${this.name} meows.`);
    }
}
let cat = new Cat("Tom");
cat.speak(); // Tom meows.
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}
let rectangle = new Rectangle(5, 10);
console.log(rectangle.area()); // 50
// any, never, void, unkown
let anyValue = "Hello, TypeScript!";
anyValue = 10;
let neverValue;
function errorFunction() {
    throw new Error("An error occurred!");
}
let voidValue;
voidValue = undefined;
let unknownValue;
unknownValue = "Hello, TypeScript!";
if (typeof unknownValue === "string") {
    let strLength = unknownValue.length;
    console.log(strLength); // 18
}
