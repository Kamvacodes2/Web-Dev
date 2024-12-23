// basic types string, number, boolean

let num: number = 42;
let str: string = "Hello, TypeScript";
let bool: boolean = true;
// let num: number = "This is a string"; // Error: Type 'string' is not assignable to type 'number'.

// array definitions

let arrNum: number[] = [1, 2, 3, 4, 5];
let arrStr: Array<string> = ["a", "b", "c", "d", "e"];
// let numbers: number[] = [1, 2, 3, "four"]; // Error: Type 'string' is not assignable to type 'number'.

// tuples (array definitions for multiple types in specific order)

let tuple: [string, number];
tuple = ["hello", 10];
// tuple = [10, "hello"]; // Error: Type 'number' is not assignable to type 'string'.

// union types (combining multiple types)

let union: string | number;
union = "hello";
union = 10;
// union =

// intersection types (combining multiple types

// enums ()

enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;

enum Color1 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let b: Color1 = Color1.Green; // 2

// type aliases (creating new names for types)

type MyType = string | number;
let myType: MyType;
myType = "hello";
myType = 10;

// interfaces (defining a structure of an object)

interface Person {
  name: string;
  age: number;
}

let person: Person = {
  name: "John Doe",
  age: 30,
};

// optional properties

interface PersonOptional {
  name: string;
  age?: number;
}

let personOptional: PersonOptional = {
  name: "John Doe",
};

// readonly properties

interface PersonReadonly {
  readonly name: string;
  age?: number;
}

let personReadonly: PersonReadonly = {
  name: "John Doe",
  age: 30,
};

// interfaces describing function types

interface GreetFunction {
  (name: string): void;
}

let greetFunction: GreetFunction = function (name: string): void {
  console.log(`Hello, ${name}!`);
};

// interfaces describing function types with return values

interface GreetReturnFunction {
  (): string;
}

let greetReturnFunction: GreetReturnFunction = function (): string {
  return "Hello, TypeScript!";
};

// function definitions

function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

greet("John Doe");

function add(a: number, b: number): number {
  return a + b;
}

console.log(add(5, 10));

// optional and default parameters

function greetOptional(name: string, age?: number): void {
  if (age) {
    console.log(`Hello, ${name} (${age} years old)!`);
  } else {
    console.log(`Hello, ${name}!`);
  }
}

greetOptional("John Doe");

greetOptional("John Doe", 30);

function greetDefault(name: string, age: number = 20): void {
  console.log(`Hello, ${name} (${age} years old)!`);
}

greetDefault("John Doe");

// rest parameters

function greetRest(name: string, ...ages: number[]): void {
  console.log(`Hello, ${name}! You are ${ages.length} years old.`);
  ages.forEach((age) => console.log(`- ${age} years old`));
}

greetRest("John Doe", 30, 25, 20);

// spread operator

let arr1: number[] = [1, 2, 3];
let arr2: number[] = [4, 5, 6];

let combinedArr: number[] = [...arr1, ...arr2];

console.log(combinedArr); // [1, 2, 3, 4, 5, 6]

// destructuring

let [first, second, ...rest] = [1, 2, 3, 4, 5];

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

// type assertions

let anyVar: any = "Hello, TypeScript!";
let strLength: number = (<string>anyVar).length;

console.log(strLength); // 18

// type guards

function isString(value: any): value is string {
  return typeof value === "string";
}

if (isString(anyVar)) {
  let strLength: number = anyVar.length;
  console.log(strLength); // 18
}

// generics

function createArray<T>(length: number, value: T): T[] {
  return Array.from({ length }, () => value);
}

let numArray: number[] = createArray(5, 5);

console.log(numArray); // [5, 5, 5, 5, 5]

// classes

class Animal {
  constructor(public name: string) {}

  speak(): void {
    console.log(`${this.name} makes a sound.`);
  }
}

let animal: Animal = new Animal("Lion");

animal.speak(); // Lion makes a sound.

// abstract classes

abstract class Vehicle {
  abstract makeSound(): void;
}

class Car extends Vehicle {
  makeSound(): void {
    console.log("Car makes a vroom sound.");
  }
}

let car: Car = new Car();

car.makeSound(); // Car makes a vroom sound.

// private and protected members

class AnimalWithPrivateProperty {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (typeof value === "string") {
      this._name = value;
    } else {
      throw new Error("Name must be a string.");
    }
  }
}

let animalWithPrivateProperty: AnimalWithPrivateProperty =
  new AnimalWithPrivateProperty("Lion");

console.log(animalWithPrivateProperty.name); // Lion

animalWithPrivateProperty.name = "Tiger";

console.log(animalWithPrivateProperty.name); // Tiger

class AnimalWithProtectedProperty {
  protected _name: string;
  protected constructor(name: string) {
    this._name = name;
  }
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    if (typeof value === "string") {
      this._name = value;
    } else {
      throw new Error("Name must be a string.");
    }
  }
  makeSound(): void {
    console.log(`${this.name} makes a sound.`);
  }
  makeSoundProtected(): void {
    console.log(`${this.name} makes a sound (protected).`);
  }
  static staticProperty: number = 0;

  static incrementStaticProperty(): void {
    AnimalWithProtectedProperty.staticProperty++;
  }
  static decrementStaticProperty(): void {
    AnimalWithProtectedProperty.staticProperty--;
  }
  static getStaticProperty(): number {
    return AnimalWithProtectedProperty.staticProperty;
  }
  static createAnimalWithProtectedProperty(
    name: string
  ): AnimalWithProtectedProperty {
    return new AnimalWithProtectedProperty(name);
  }
}

let animalWithProtectedProperty: AnimalWithProtectedProperty =
  AnimalWithProtectedProperty.createAnimalWithProtectedProperty("Tiger");

console.log(animalWithProtectedProperty.name); // Tiger

animalWithProtectedProperty.makeSound(); // Tiger makes a sound.

animalWithProtectedProperty.makeSoundProtected(); // Tiger makes a sound (protected).

AnimalWithProtectedProperty.incrementStaticProperty();

console.log(AnimalWithProtectedProperty.getStaticProperty()); // 1

AnimalWithProtectedProperty.decrementStaticProperty();

console.log(AnimalWithProtectedProperty.getStaticProperty()); // 0

// static members

class AnimalWithStaticProperty {
  static staticProperty: number = 0;

  static incrementStaticProperty(): void {
    AnimalWithStaticProperty.staticProperty++;
  }
  static decrementStaticProperty(): void {
    AnimalWithStaticProperty.staticProperty--;
  }
  static getStaticProperty(): number {
    return AnimalWithStaticProperty.staticProperty;
  }
}

AnimalWithStaticProperty.incrementStaticProperty();

console.log(AnimalWithStaticProperty.getStaticProperty()); // 1

AnimalWithStaticProperty.decrementStaticProperty();

console.log(AnimalWithStaticProperty.getStaticProperty()); // 0

// type inference

// let num: number = 10;
// let str: string = num.toString();

// inheritance

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  speak(): void {
    console.log(`${this.name} meows.`);
  }
}

let cat: Cat = new Cat("Tom");

cat.speak(); // Tom meows.

// interfaces vs. classes

interface Shape {
  area(): number;
}

class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  area(): number {
    return this.width * this.height;
  }
}

let rectangle: Rectangle = new Rectangle(5, 10);

console.log(rectangle.area()); // 50

// any, never, void, unkown

let anyValue: any = "Hello, TypeScript!";
anyValue = 10;

let neverValue: never;

function errorFunction(): never {
  throw new Error("An error occurred!");
}

let voidValue: void;

voidValue = undefined;

let unknownValue: unknown;

unknownValue = "Hello, TypeScript!";

if (typeof unknownValue === "string") {
  let strLength: number = unknownValue.length;
  console.log(strLength); // 18
}
