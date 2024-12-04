/* 
 *  Declaring Variables in JavaScript
 */

// 1. Using var (function-scoped, avoid in modern code)
console.log("Using var:");
var name = "Alice";
console.log(name); // Output: Alice
var name = "Bob";  // Re-declaration is allowed with var
console.log(name); // Output: Bob

// 2. Using let (block-scoped)
console.log("\nUsing let:");
let age = 25;
console.log(age); // Output: 25
age = 30;         // Reassignment is allowed
console.log(age); // Output: 30
// let age = 35;  // Re-declaration in the same scope will throw an error

// 3. Using const (block-scoped, cannot be reassigned)
console.log("\nUsing const:");
const pi = 3.14159;
console.log(pi); // Output: 3.14159
// pi = 3.14;    // Reassignment will throw an error

// Note: Objects and arrays declared with const can have their contents modified
const person = { name: "John", age: 30 };
person.age = 31; // Allowed (modifying the object itself)
console.log(person); // Output: { name: "John", age: 31 }

// Variable Naming Rules
console.log("\nVariable Naming Rules:");
// Allowed
let _myVar = 10;
let $anotherVar = 20;
let camelCaseVariable = 30;
console.log(_myVar, $anotherVar, camelCaseVariable);

// Not Allowed
// let 123abc;  // Variables cannot start with a number
// let my-var;  // Hyphens are not allowed in variable names

// Data Types of Variables
console.log("\nVariable Data Types:");
let str = "Hello";     // String
let num = 42;          // Number
let isActive = true;   // Boolean
let nothing = null;    // Null
let notDefined;        // Undefined (value not assigned)
let obj = { a: 1 };    // Object
let arr = [1, 2, 3];   // Array (technically an object)

console.log(typeof str);      // Output: string
console.log(typeof num);      // Output: number
console.log(typeof isActive); // Output: boolean
console.log(typeof nothing);  // Output: object (historical quirk)
console.log(typeof notDefined); // Output: undefined
console.log(typeof obj);      // Output: object
console.log(typeof arr);      // Output: object

// Scope of Variables
console.log("\nVariable Scopes:");

// Global Scope
var globalVar = "I am global"; // Declared outside any function or block

function testScope() {
    // Local Scope
    let localVar = "I am local";
    console.log(globalVar); // Accessible
    console.log(localVar);  // Accessible
}
// console.log(localVar); // Error: localVar is not defined

// Block Scope
if (true) {
    let blockScoped = "I am block-scoped";
    console.log(blockScoped); // Accessible
}
// console.log(blockScoped); // Error: blockScoped is not defined

// Hoisting
console.log("\nVariable Hoisting:");
// var variables are hoisted (can be used before declaration)
console.log(hoistedVar); // Output: undefined
var hoistedVar = "I am hoisted";

// let and const are also hoisted but not initialized (Temporal Dead Zone)
// console.log(notHoisted); // Error: Cannot access before initialization
let notHoisted = "I am not hoisted";

// Best Practices
console.log("\nBest Practices:");
// Use `const` for values that shouldn't change
// Use `let` for variables that may change
// Avoid `var` in modern JavaScript
