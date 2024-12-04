/* 
 *  Operator Types
 */

console.log("Unary, Binary, and Ternary Operators in JavaScript");

// 1. Unary Operators
// These operate on a single operand.

console.log("\nUnary Operators:");

// Unary Plus (+) - Converts a value to a number
let strNum = "42";
console.log(+strNum); // Output: 42 (string to number)

// Unary Negation (-) - Negates a number
let num = 5;
console.log(-num); // Output: -5

// Increment (++) - Increases a number by one
let count = 10;
console.log(++count); // Output: 11 (pre-increment)
console.log(count++); // Output: 11 (post-increment, then adds 1)
console.log(count);   // Output: 12

// Decrement (--) - Decreases a number by one
let decrement = 10;
console.log(--decrement); // Output: 9 (pre-decrement)
console.log(decrement--); // Output: 9 (post-decrement, then subtracts 1)
console.log(decrement);   // Output: 8

// Logical NOT (!) - Inverts the truthiness of a value
let isTrue = true;
console.log(!isTrue); // Output: false

// typeof - Returns the type of a value
let value = 100;
console.log(typeof value); // Output: number

// delete - Removes a property from an object
let obj = { name: "Alice", age: 25 };
delete obj.age;
console.log(obj); // Output: { name: "Alice" }

// void - Evaluates an expression and returns undefined
console.log(void 0); // Output: undefined

// 2. Binary Operators
// These operate on two operands.

console.log("\nBinary Operators:");

// Arithmetic Operators
let a = 10, b = 5;
console.log(a + b); // Output: 15 (Addition)
console.log(a - b); // Output: 5 (Subtraction)
console.log(a * b); // Output: 50 (Multiplication)
console.log(a / b); // Output: 2 (Division)
console.log(a % b); // Output: 0 (Modulus)

// Comparison Operators
console.log(a > b);  // Output: true
console.log(a < b);  // Output: false
console.log(a >= b); // Output: true
console.log(a <= b); // Output: false
console.log(a == b); // Output: false
console.log(a != b); // Output: true

// Logical Operators
console.log((a > b) && (b > 0)); // Output: true (AND)
console.log((a < b) || (b > 0)); // Output: true (OR)

// Bitwise Operators
console.log(a & b);  // Output: 0 (Bitwise AND)
console.log(a | b);  // Output: 15 (Bitwise OR)
console.log(a ^ b);  // Output: 15 (Bitwise XOR)

// Assignment Operators
let c = 20;
c += 10; // Equivalent to c = c + 10
console.log(c); // Output: 30

// 3. Ternary Operator
// A shorthand for an if-else condition with three parts: condition ? expr1 : expr2

console.log("\nTernary Operator:");
let age = 18;
let message = (age >= 18) ? "Eligible to vote" : "Not eligible to vote";
console.log(message); // Output: Eligible to vote

// Ternary Operator with nested conditions
let marks = 75;
let grade = (marks >= 90) ? "A+" :
            (marks >= 80) ? "A" :
            (marks >= 70) ? "B" : "C";
console.log(grade); // Output: B

// Summary
console.log("\nSummary:");
console.log("Unary: Operates on one operand (e.g., ++, typeof).");
console.log("Binary: Operates on two operands (e.g., +, -, &&).");
console.log("Ternary: Operates on three parts: condition ? expr1 : expr2.");
