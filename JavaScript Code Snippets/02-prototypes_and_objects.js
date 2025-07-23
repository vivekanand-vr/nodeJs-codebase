// =============================================================================
// JavaScript Interview Practice - File 2: Prototypes & Objects
// =============================================================================

// 1. Prototype Chain Confusion
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  return `Hello, I'm ${this.name}`;
};

const john = new Person('John');
console.log(john.sayHello()); // "Hello, I'm John"
console.log(john.hasOwnProperty('sayHello')); // false
console.log(john.__proto__ === Person.prototype); // true
// Explanation: Methods defined on prototype are shared among all instances.
// hasOwnProperty returns false because sayHello is on the prototype, not the instance.

// 2. Object.create vs Constructor Function
const animal = {
  type: 'animal',
  speak() { return `${this.type} makes a sound`; }
};

const dog = Object.create(animal);
dog.type = 'dog';
console.log(dog.speak()); // "dog makes a sound"
console.log(dog.hasOwnProperty('speak')); // false
// Explanation: Object.create creates a new object with animal as its prototype.
// speak method is inherited from prototype, not owned by the instance.

// 3. Property Descriptor Gotcha
const obj = {};
Object.defineProperty(obj, 'prop', {
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false
});

obj.prop = 100; // Silently fails in non-strict mode
console.log(obj.prop); // 42
console.log(Object.keys(obj)); // []
// Explanation: Property descriptors control property behavior.
// Non-writable properties can't be changed, non-enumerable don't show in Object.keys.

// 4. Prototype Pollution Example
const user = { name: 'John' };
const admin = { isAdmin: true };

// Dangerous - modifying Object.prototype
Object.prototype.isAdmin = true;
console.log(user.isAdmin); // true (pollution!)

// Safe approach
const safeAdmin = Object.assign(Object.create(null), { name: 'Admin', isAdmin: true });
// Explanation: Modifying Object.prototype affects all objects.
// Using Object.create(null) creates object without prototype chain.

// 5. Constructor Function vs Class
function FunctionConstructor(name) {
  this.name = name;
}
FunctionConstructor.prototype.greet = function() {
  return `Hello from ${this.name}`;
};

class ClassConstructor {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello from ${this.name}`;
  }
}

console.log(typeof FunctionConstructor); // function
console.log(typeof ClassConstructor); // function
// Explanation: Classes are syntactic sugar over constructor functions.
// Both create similar prototype chains, but classes have stricter behavior.

// 6. Getters and Setters Trap
const person = {
  _age: 0,
  get age() {
    console.log('Getting age');
    return this._age;
  },
  set age(value) {
    console.log('Setting age');
    this._age = value < 0 ? 0 : value;
  }
};

person.age = -5; // "Setting age"
console.log(person.age); // "Getting age", then 0
// Explanation: Getters/setters allow computed properties and validation.
// They're called every time property is accessed or modified.

// 7. Prototype Chain Method Overriding
function Vehicle() {}
Vehicle.prototype.start = function() { return 'Vehicle started'; };

function Car() {}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.start = function() { return 'Car started'; };

const myCar = new Car();
console.log(myCar.start()); // "Car started"
console.log(Vehicle.prototype.start.call(myCar)); // "Vehicle started"
// Explanation: Method resolution follows prototype chain.
// Closer methods in chain override distant ones. .call() can invoke parent method.

// 8. Object.freeze vs Object.seal vs Object.preventExtensions
const obj1 = { a: 1 };
Object.freeze(obj1);
obj1.a = 2; // Silently fails
obj1.b = 3; // Silently fails
console.log(obj1); // { a: 1 }

const obj2 = { a: 1 };
Object.seal(obj2);
obj2.a = 2; // Works
obj2.b = 3; // Silently fails
console.log(obj2); // { a: 2 }

const obj3 = { a: 1 };
Object.preventExtensions(obj3);
obj3.a = 2; // Works
obj3.b = 3; // Silently fails
console.log(obj3); // { a: 2 }
// Explanation: freeze prevents all changes, seal allows modifications but no additions/deletions,
// preventExtensions only prevents adding new properties.

// 9. Circular Reference in JSON
const objA = { name: 'A' };
const objB = { name: 'B' };
objA.ref = objB;
objB.ref = objA;

try {
  JSON.stringify(objA); // TypeError: Converting circular structure to JSON
} catch (e) {
  console.log('Circular reference error');
}

// Solution with replacer function
const safeStringify = JSON.stringify(objA, function(key, value) {
  if (key === 'ref') return '[Circular]';
  return value;
});
console.log(safeStringify); // {"name":"A","ref":"[Circular]"}
// Explanation: JSON.stringify can't handle circular references.
// Replacer function can be used to handle such cases.

// 10. WeakMap vs Map for Object Metadata
const map = new Map();
const weakMap = new WeakMap();
let obj = { id: 1 };

map.set(obj, 'metadata');
weakMap.set(obj, 'metadata');

console.log(map.has(obj)); // true
console.log(weakMap.has(obj)); // true

obj = null; // Remove reference

// In Map, the object is still referenced and won't be garbage collected
// In WeakMap, the object can be garbage collected
setTimeout(() => {
  // weakMap entry would be automatically removed (if GC runs)
  console.log('WeakMap allows garbage collection of keys');
}, 1000);
// Explanation: WeakMap keys are weakly referenced - they don't prevent garbage collection.
// Map keeps strong references, preventing GC of keys.