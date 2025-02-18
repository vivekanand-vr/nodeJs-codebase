/* 
 *  'typeof' Operator
 */

// typeof Operator in JavaScript
// The `typeof` operator is used to determine the type of a variable or value.

console.log("Basic Examples of typeof:");

// String
let str = "Hello, World!";
console.log(typeof str); // Output: string

// Number
let num = 42;
console.log(typeof num); // Output: number

// Boolean
let isActive = true;
console.log(typeof isActive); // Output: boolean

// Undefined
let notDefined;
console.log(typeof notDefined); // Output: undefined

// Null (special case)
let empty = null;
console.log(typeof empty); // Output: object (this is a known quirk in JavaScript)

// Object
let obj = { name: "Alice", age: 25 };
console.log(typeof obj); // Output: object

// Array (technically an object)
let arr = [1, 2, 3];
console.log(typeof arr); // Output: object

// Function
function greet() {
    return "Hello!";
}
console.log(typeof greet); // Output: function

// Symbol
let sym = Symbol("unique");
console.log(typeof sym); // Output: symbol

// BigInt
let bigIntNum = 12345678901234567890n;
console.log(typeof bigIntNum); // Output: bigint

// Special Cases with typeof
console.log("\nSpecial Cases:");

// typeof a variable that hasn't been declared
// console.log(typeof undeclaredVariable); // Output: undefined (no error)

// Checking typeof NaN (Not a Number)
let invalidNumber = NaN;
console.log(typeof invalidNumber); // Output: number

// typeof Infinity
let infiniteValue = Infinity;
console.log(typeof infiniteValue); // Output: number

// typeof with primitives vs objects
console.log("\nPrimitives vs Objects:");
let primitiveValue = 10; // Primitive type
let objectValue = new Number(10); // Object wrapper
console.log(typeof primitiveValue); // Output: number
console.log(typeof objectValue);   // Output: object

// Using typeof in Conditional Statements
console.log("\nUsing typeof in Conditions:");
let value = "123";
if (typeof value === "string") {
    console.log("The value is a string!"); // Output: The value is a string!
}

// Common typeof Use Cases
console.log("\nCommon Use Cases:");
let dynamicValue = 100;
if (typeof dynamicValue === "number") {
    console.log("It's a number!");
}

dynamicValue = "Dynamic String";
if (typeof dynamicValue === "string") {
    console.log("Now it's a string!");
}

// typeof with Classes and Instances
console.log("\nClasses and Instances:");
class Person {
    constructor(name) {
        this.name = name;
    }
}
let personInstance = new Person("John");
console.log(typeof Person);          // Output: function (class is syntactic sugar for a function)
console.log(typeof personInstance); // Output: object


console.log(typeof 12);     // number
console.log(typeof 12.4);

console.log(typeof "abc");  // string
console.log(typeof 'name'); // string

console.log(typeof true);   // boolean

console.log(typeof undefined); // undefined

console.log(typeof null); // object (corner case)

console.log(typeof {"name": "vivekanand"}); // object

console.log(typeof NaN); // number

// The return type of "typeof" is string
console.log(typeof (typeof 12));

// Summary
console.log("\nSummary:");
console.log("typeof is a powerful tool for determining the data type of variables and values.");




