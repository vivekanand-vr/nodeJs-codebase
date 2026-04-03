/*
 * ============================================================
 *  CH 01 - Data Types in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  JavaScript is a dynamically typed language — variables do not
 *  have a fixed type; the type is determined by the value assigned.
 *
 *  There are 8 built-in data types split into two main categories:
 *
 *  PRIMITIVE TYPES (immutable, stored by value):
 *    1. String    — textual data: "hello", 'hi', `world`
 *    2. Number    — integers and floats: 42, 3.14, -7
 *    3. Boolean   — logical: true or false
 *    4. Undefined — declared but no value assigned
 *    5. Null      — intentional absence of any value
 *    6. Symbol    — unique, immutable identifier (ES6+)
 *    7. BigInt    — arbitrarily large integers (ES2020+)
 *
 *  REFERENCE TYPES (mutable, stored by reference):
 *    8. Object    — collections of key-value pairs
 *       - Plain objects: { key: value }
 *       - Arrays:        [1, 2, 3]        (typeof → "object")
 *       - Functions:     function() {}    (typeof → "function")
 *       - Date, RegExp, Map, Set, etc.
 *
 *  KEY POINTS:
 *  -----------
 *  - Primitives are compared by VALUE; objects are compared by REFERENCE.
 *  - `typeof null` returns "object" — this is a long-standing JS bug, not a feature.
 *  - Arrays are objects; use Array.isArray() to distinguish them.
 *  - NaN (Not a Number) is of type "number" — another JS quirk.
 *  - Infinity and -Infinity are valid number values.
 *  - Template literals (backticks) support multi-line strings and interpolation.
 * ============================================================
 */

// ─── 1. PRIMITIVE TYPES ────────────────────────────────────────

// String — three quoting styles
let strDouble  = "Hello, World!";       // double quotes
let strSingle  = 'Hello, World!';       // single quotes
let strTemplate = `Hello, ${"World"}!`; // template literal (supports expressions)

console.log(strDouble);   // Output: Hello, World!
console.log(strSingle);   // Output: Hello, World!
console.log(strTemplate); // Output: Hello, World!

// Multi-line string with template literal
let multiLine = `Line 1
Line 2
Line 3`;
console.log(multiLine);
// Output:
//   Line 1
//   Line 2
//   Line 3

// Number — integers, floats, special values
console.log(42);         // integer
console.log(3.14);       // float
console.log(-7);         // negative
console.log(0.1 + 0.2);  // Output: 0.30000000000000004 (floating-point precision issue!)
console.log(Infinity);   // Output: Infinity
console.log(-Infinity);  // Output: -Infinity
console.log(NaN);        // Output: NaN (result of invalid math, e.g. 0/0 or "a" * 2)

// Boolean
console.log(true);   // Output: true
console.log(false);  // Output: false
console.log(1 > 2);  // Output: false (comparison produces boolean)

// Undefined — declared but never assigned
let notDefined;
console.log(notDefined); // Output: undefined

function returnsNothing() {}
console.log(returnsNothing()); // Output: undefined (functions with no return yield undefined)

// Null — intentional "empty" value, must be explicitly set
let nothing = null;
console.log(nothing);        // Output: null
console.log(typeof nothing); // Output: object  ← JS historical bug, null is NOT an object

// Symbol — always unique, even with the same description
let sym1 = Symbol("id");
let sym2 = Symbol("id");
console.log(sym1 === sym2);   // Output: false — every Symbol() call creates a unique value
console.log(typeof sym1);     // Output: symbol

// BigInt — for integers beyond Number.MAX_SAFE_INTEGER (2^53 - 1)
let bigNum = 9007199254740993n; // append 'n' to create a BigInt literal
console.log(bigNum);           // Output: 9007199254740993n
console.log(typeof bigNum);    // Output: bigint
// Note: you cannot mix BigInt and Number in arithmetic without explicit conversion

// ─── 2. REFERENCE TYPES ────────────────────────────────────────

// Object — key-value pairs
let person = { name: "Vivekanand", age: 25 };
console.log(person);        // Output: { name: 'Vivekanand', age: 25 }
console.log(typeof person); // Output: object

// Array — ordered list (an object under the hood)
let colors = ["red", "green", "blue"];
console.log(colors);              // Output: [ 'red', 'green', 'blue' ]
console.log(typeof colors);       // Output: object  ← NOT "array"
console.log(Array.isArray(colors)); // Output: true  ← correct way to check for array

// Function — also an object, but typeof returns "function"
function greet() { return "Hi!"; }
console.log(typeof greet); // Output: function

// ─── 3. PRIMITIVES vs REFERENCE — HOW THEY ARE STORED ─────────

// Primitives: copied by VALUE
let a = 10;
let b = a;
b = 20;
console.log(a); // Output: 10 — 'a' is unaffected, 'b' got its own copy

// Objects: copied by REFERENCE
let obj1 = { x: 1 };
let obj2 = obj1;     // obj2 points to the SAME object in memory
obj2.x = 99;
console.log(obj1.x); // Output: 99 — modifying obj2 also changed obj1!

// ─── 4. SPECIAL NUMERIC VALUES ─────────────────────────────────

console.log(Number.MAX_SAFE_INTEGER); // Output: 9007199254740991
console.log(Number.MIN_SAFE_INTEGER); // Output: -9007199254740991
console.log(isNaN("hello" * 2));      // Output: true
console.log(isFinite(1 / 0));         // Output: false

// ─── 5. typeof QUICK REFERENCE ─────────────────────────────────

let str = "Hello";     // String
let num = 42;          // Number
let isActive = true;   // Boolean
let obj = { a: 1 };    // Object
let arr = [1, 2, 3];   // Array

console.log(typeof str);        // Output: string
console.log(typeof num);        // Output: number
console.log(typeof isActive);   // Output: boolean
console.log(typeof nothing);    // Output: object  ← null quirk
console.log(typeof notDefined); // Output: undefined
console.log(typeof obj);        // Output: object
console.log(typeof arr);        // Output: object  ← arrays are objects

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. JavaScript has 7 primitive types + 1 reference type (Object).
 *  2. Primitives are immutable and copied by value.
 *     Objects/Arrays are mutable and copied by reference.
 *  3. `typeof null === "object"` is a known bug — always check
 *     null explicitly with `=== null`, not with typeof.
 *  4. Use Array.isArray() to test for arrays, not typeof.
 *  5. NaN is of type "number" — always use isNaN() or
 *     Number.isNaN() to test for it.
 *  6. BigInt and Number cannot be mixed in arithmetic directly;
 *     convert explicitly: Number(bigInt) or BigInt(num).
 *  7. Floating-point arithmetic is not exact (0.1 + 0.2 ≠ 0.3);
 *     use toFixed() or rounding for display purposes.
 *  8. Template literals (backticks) are the modern way to build
 *     strings — they support multi-line and ${expression} syntax.
 * ============================================================
 */