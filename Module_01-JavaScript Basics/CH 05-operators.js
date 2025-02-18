/* 
 *  Operators
 */

// Arithmetic Operators: +, -, *, /, %, **
console.log("Arithmetic Operators:");
console.log(15 + 5);  // addition (20)
console.log(15 - 5);  // subtraction (10)
console.log(15 * 5);  // multiplication (75)
console.log(15 / 5);  // division (3)
console.log(15 % 4);  // modulus (3)
console.log(2 ** 3);  // exponentiation (2^3 = 8)
/*
 *  Note: If we want to have floor divisions like c++
 *       1. Method -> parseint(5/2);
 *       2. Method -> Math.floor(5/2);
*/

// Shorthand Arithmetic
let num = 10;
num += 5;  // equivalent to num = num + 5
console.log(num); // 15
num *= 2;  // equivalent to num = num * 2
console.log(num); // 30

// Logical Operators: &&, ||, !
console.log("\nLogical Operators:");
console.log(true && false); // false
console.log(true || false); // true
console.log(!true);         // false

// Logical Short-Circuiting
console.log(10 && 0); // 0 (returns the first falsy value)
console.log(0 || 5);  // 5 (returns the first truthy value)

// Comparison Operators: >, <, >=, <=, ==, ===, !=, !==
console.log("\nComparison Operators:");
console.log(10 > 5);       // true
console.log(10 >= 10);     // true
console.log(5 < 10);       // true
console.log(10 === "10");  // false (strict equality)
console.log(10 == "10");   // true (loose equality)
console.log(10 !== 5);     // true

// Bitwise Operators: &, |, ^, <<, >>
console.log("\nBitwise Operators:");
console.log(5 & 3);  // AND (1) -> 0101 & 0011 = 0001
console.log(5 | 3);  // OR (7) -> 0101 | 0011 = 0111
console.log(5 ^ 3);  // XOR (6) -> 0101 ^ 0011 = 0110
console.log(5 << 1); // Left Shift (10) -> 0101 << 1 = 1010
console.log(5 >> 1); // Right Shift (2) -> 0101 >> 1 = 0010

// String Operators
console.log("\nString Concatenation:");
console.log("Hello " + "World!"); // "Hello World!"
console.log(5 + "5");             // "55" (string)

/* 
 *  String concatenation
 *      console.log("Vivek " + "Vernekar");
 *      console.log(5 + 5 + "5" + 5 + 5);
*/
console.log(5 + 5 + "5" + 5 + 5); // 10555 (as a string)

// Ternary Operator (condition) ? { expression1 } : { expression2 };
console.log("\nTernary Operator:");
let age = 20;
let status = (age >= 18) ? "Adult" : "Minor";
console.log(status); // "Adult"
console.log((10 > 5) ? "a" : "b"); // a


// Conditional Statements
console.log("\nConditional Operators:");
let numCheck = 15;
if (numCheck > 10) {
    console.log("Number is greater than 10");
} else if (numCheck === 10) {
    console.log("Number is exactly 10");
} else {
    console.log("Number is less than 10");
}

// Nullish Coalescing Operator: ??
console.log("\nNullish Coalescing Operator:");
let name = null;
console.log(name ?? "Default Name"); // "Default Name"

// Optional Chaining Operator: ?.
console.log("\nOptional Chaining:");
let user = { address: { city: "New York" } };
console.log(user?.address?.city); // "New York"
console.log(user?.profile?.age); // undefined
