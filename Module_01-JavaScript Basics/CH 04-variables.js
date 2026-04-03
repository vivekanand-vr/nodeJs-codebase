/*
 * ============================================================
 *  CH 04 - Variables in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  A variable is a named container that holds a value in memory.
 *  JavaScript has three keywords for declaring variables:
 *
 *    var   — function-scoped, hoisted, re-declarable (legacy, avoid)
 *    let   — block-scoped, hoisted but in TDZ, NOT re-declarable
 *    const — block-scoped, hoisted but in TDZ, NOT re-declarable,
 *            NOT re-assignable (but object contents CAN change)
 *
 *  SCOPING RULES:
 *  --------------
 *    Global scope  — declared outside any function or block
 *    Function scope — declared inside a function; not accessible outside
 *    Block scope   — declared inside {} (if, for, etc.); let/const only
 *
 *  HOISTING:
 *  ---------
 *    var declarations are hoisted to the top of their function/global
 *    scope and initialized to `undefined`.
 *    let and const are also hoisted but remain in the
 *    "Temporal Dead Zone" (TDZ) until the line of declaration is reached.
 *    Accessing a let/const before its declaration throws ReferenceError.
 *
 *  KEY POINTS:
 *  -----------
 *  - Always prefer const → then let → avoid var.
 *  - const does NOT make objects immutable; it only prevents reassignment
 *    of the binding. Use Object.freeze() for true immutability.
 *  - var ignores blocks; it leaks out of if/for into the enclosing function.
 *  - let/const in a block create a new binding even if the same name
 *    exists in an outer scope (shadowing).
 *  - Variable names: can start with a letter, _ or $;
 *    cannot start with a digit; cannot use hyphens.
 * ============================================================
 */

// ─── 1. var — FUNCTION-SCOPED ──────────────────────────────────

console.log("Using var:");
var userName = "Alice";
console.log(userName); // Output: Alice

var userName = "Bob";  // Re-declaration is allowed — no error
console.log(userName); // Output: Bob

// var leaks out of blocks (if/for) — it is NOT block-scoped
if (true) {
    var leakedVar = "I escaped the block!";
}
console.log(leakedVar); // Output: I escaped the block!  ← NOT what you'd expect

// ─── 2. let — BLOCK-SCOPED ─────────────────────────────────────

console.log("\nUsing let:");
let age = 25;
console.log(age); // Output: 25

age = 30;         // Reassignment is allowed
console.log(age); // Output: 30

// let age = 35; // ❌ SyntaxError: re-declaration in the same scope

// let is block-scoped — not accessible outside {}
if (true) {
    let blockAge = 40;
    console.log(blockAge); // Output: 40
}
// console.log(blockAge); // ❌ ReferenceError: blockAge is not defined

// ─── 3. const — BLOCK-SCOPED, NO REASSIGNMENT ──────────────────

console.log("\nUsing const:");
const PI = 3.14159;
console.log(PI); // Output: 3.14159

// PI = 3.14; // ❌ TypeError: Assignment to constant variable

// const with objects — binding is locked, but contents can mutate
const person = { name: "John", age: 30 };
person.age = 31;        // ✅ Allowed — mutating the object property
console.log(person);    // Output: { name: 'John', age: 31 }

// person = {}; // ❌ TypeError — reassigning the binding is not allowed

// const with arrays — same rule: elements can change
const colors = ["red", "green"];
colors.push("blue");     // ✅ Allowed — mutating the array
console.log(colors);     // Output: [ 'red', 'green', 'blue' ]

// ─── 4. TRUE IMMUTABILITY — Object.freeze() ────────────────────

const frozen = Object.freeze({ x: 1, y: 2 });
frozen.x = 99;           // Silently ignored in non-strict mode
console.log(frozen.x);   // Output: 1  ← unchanged, freeze worked

// ─── 5. VARIABLE NAMING RULES ──────────────────────────────────

console.log("\nVariable Naming Rules:");

let _myVar         = 10;  // ✅ underscore prefix
let $anotherVar    = 20;  // ✅ dollar sign prefix
let camelCaseVar   = 30;  // ✅ camelCase (JS convention)
let UPPER_CASE     = 40;  // ✅ used for constants by convention
console.log(_myVar, $anotherVar, camelCaseVar, UPPER_CASE); // 10 20 30 40

// let 123abc  = 1; // ❌ SyntaxError — cannot start with a digit
// let my-var  = 2; // ❌ SyntaxError — hyphens not allowed
// let let     = 3; // ❌ SyntaxError — reserved keyword

// ─── 6. SCOPE COMPARISON ───────────────────────────────────────

console.log("\nScope Comparison:");

var globalVar = "I am global (var)";

function scopeDemo() {
    var funcVar  = "I am function-scoped";
    let blockLet = "I am block-scoped (let)";
    console.log(globalVar); // Output: I am global (var)
    console.log(funcVar);   // Output: I am function-scoped
    console.log(blockLet);  // Output: I am block-scoped (let)
}
scopeDemo();
// console.log(funcVar);  // ❌ ReferenceError — not accessible here
// console.log(blockLet); // ❌ ReferenceError — not accessible here

// ─── 7. HOISTING ───────────────────────────────────────────────

console.log("\nHoisting:");

// var is hoisted and initialized to undefined before code runs
console.log(hoistedVar); // Output: undefined  ← NOT an error, but risky
var hoistedVar = "I was hoisted";
console.log(hoistedVar); // Output: I was hoisted

// let/const: hoisted but NOT initialized → Temporal Dead Zone (TDZ)
// console.log(tdzVar); // ❌ ReferenceError: Cannot access 'tdzVar' before initialization
let tdzVar = "I respect the TDZ";
console.log(tdzVar); // Output: I respect the TDZ

// Function declarations are fully hoisted (body included)
console.log(hoistedFn()); // Output: I am hoisted!  ← works before definition
function hoistedFn() { return "I am hoisted!"; }

// Function expressions are NOT fully hoisted (only the var binding is)
// console.log(notHoistedFn()); // ❌ TypeError: notHoistedFn is not a function
var notHoistedFn = function () { return "Not hoisted!"; };

// ─── 8. VARIABLE SHADOWING ─────────────────────────────────────

console.log("\nVariable Shadowing:");
let shadow = "outer";

{
    let shadow = "inner"; // New binding — shadows the outer one
    console.log(shadow);  // Output: inner
}

console.log(shadow); // Output: outer  ← outer binding untouched

// ─── 9. DATA TYPES ASSIGNED TO VARIABLES ───────────────────────

console.log("\nVariable Data Types:");
let str       = "Hello";     // String
let num       = 42;          // Number
let isActive  = true;        // Boolean
let nothing   = null;        // Null
let notDefined;              // Undefined (value not assigned)
let obj       = { a: 1 };   // Object
let arr       = [1, 2, 3];  // Array (technically an object)

console.log(typeof str);        // Output: string
console.log(typeof num);        // Output: number
console.log(typeof isActive);   // Output: boolean
console.log(typeof nothing);    // Output: object (historical quirk)
console.log(typeof notDefined); // Output: undefined
console.log(typeof obj);        // Output: object
console.log(typeof arr);        // Output: object

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Use const by default. Only switch to let when you know
 *     the value must change. Avoid var entirely in modern code.
 *  2. var is function-scoped and leaks out of blocks — this is
 *     a common source of hard-to-find bugs.
 *  3. let and const are block-scoped and do not leak out of {}.
 *  4. Hoisting means var declarations (not assignments) are moved
 *     to the top at compile time. Accessing them before the line
 *     reads as `undefined`, not an error.
 *  5. let and const are in the Temporal Dead Zone (TDZ) from the
 *     start of the block until the declaration line — accessing
 *     them in the TDZ throws a ReferenceError.
 *  6. const prevents reassignment of the binding, NOT mutation of
 *     the value. Objects/arrays declared with const can still have
 *     their properties/elements changed.
 *  7. Use Object.freeze() to make an object truly immutable.
 *  8. Variable shadowing (declaring the same name in an inner block)
 *     is legal but can be confusing — use descriptive names to avoid it.
 * ============================================================
 */
