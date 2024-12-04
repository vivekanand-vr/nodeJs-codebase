/* 
 *  Data Types
 */

console.log("\nVariable Data Types:");
let str = "Hello";     // String
let num = 42;          // Number
let isActive = true;   // Boolean
let nothing = null;    // Null
let notDefined;        // Undefined (value not assigned)
let obj = { a: 1 };    // Object
let arr = [1, 2, 3];   // Array (technically an object)

console.log(typeof str);        // Output: string
console.log(typeof num);        // Output: number
console.log(typeof isActive);   // Output: boolean
console.log(typeof nothing);    // Output: object (historical quirk)
console.log(typeof notDefined); // Output: undefined
console.log(typeof obj);        // Output: object
console.log(typeof arr);        // Output: object


// Number
console.log(12);
console.log(3.45);
console.log(-45);

// String
console.log("This is a string");
console.log('This is also a string under single quotes');
console.log(`This is also another kind of string inside backticks`);

// Boolean
console.log(true);
console.log(false);

// Undefined and null
console.log(undefined);
console.log(null);

// Objects
console.log({"name": "vivekanand"});