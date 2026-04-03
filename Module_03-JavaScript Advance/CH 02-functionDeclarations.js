/*
 * ============================================================
 *  FUNCTION DECLARATIONS
 * ============================================================
 *
 * DEFINITION:
 *   A function declaration (a.k.a. function statement) defines a named
 *   function using the `function` keyword as a standalone statement.
 *   It is FULLY HOISTED — both the name and the body are available at
 *   the top of the enclosing scope before any code runs.
 *
 * SYNTAX:
 *   function functionName(param1, param2 = defaultValue, ...rest) {
 *       // body
 *       return value;
 *   }
 *
 * HOISTING DETAIL:
 *   During the parse phase the engine registers:
 *   • The function name → bound to the full function object immediately.
 *   This means you can CALL a function declaration BEFORE it appears in
 *   the source code.  This is the primary difference from expressions.
 *
 * FUNCTION DECLARATIONS vs EXPRESSIONS (summary):
 *   Property               Declaration           Expression
 *   ──────────────         ──────────────────    ──────────────────────
 *   Fully hoisted          YES                   NO
 *   Call before define     YES                   NO (TypeError/RefError)
 *   Conditional define     Avoid in blocks*      Safe in any expression
 *   Has own `this`         YES                   YES (not arrow)
 *   Recursion by name      YES (function name)   Only in NFE
 *   * Block-scoped fn decls are allowed in strict mode but behavior
 *     differs across engines — prefer expressions for conditional defs.
 *
 * IMPORTANT POINTS:
 *   1. Function declarations are hoisted with their full body — ideal for
 *      mutual recursion and helper functions used throughout a file.
 *   2. Parameters with default values are evaluated on each call — avoid
 *      mutable defaults (use null/undefined sentinel instead).
 *   3. Rest parameters (`...args`) collect remaining args into a real
 *      Array, unlike the `arguments` object which is array-like only.
 *   4. Function declarations inside blocks (if, for, etc.) are allowed in
 *      strict mode but behave as block-scoped — avoid this pattern.
 *   5. A declaration can reference itself by name without any special trick
 *      (unlike anonymous expressions).
 *   6. Functions are first-class: a declared function can be passed,
 *      stored, or returned just like any expression.
 *   7. Declaring two functions with the same name in the same scope means
 *      the second silently overwrites the first (last definition wins).
 * ============================================================
 */

// ─── 1. BASIC FUNCTION DECLARATION ─────────────────────────────────────────
console.log("=== 1. Basic function declaration ===");

function greet() {
    console.log("Hello from a function declaration!");
}

greet(); // Output: "Hello from a function declaration!"

// ─── 2. FUNCTION WITH PARAMETERS ────────────────────────────────────────────
console.log("\n=== 2. Parameters ===");

function add(a, b) {
    return a + b;
}
console.log(add(3, 5)); // Output: 8

// ─── 3. DEFAULT PARAMETERS ──────────────────────────────────────────────────
console.log("\n=== 3. Default parameters ===");

function multiply(a, b = 1) {
    return a * b;
}
console.log(multiply(5));    // Output: 5  — b defaults to 1
console.log(multiply(5, 3)); // Output: 15

// Default is evaluated per call — safe for primitives, careful with objects:
function append(arr = []) {   // NEW empty array per call — correct pattern
    arr.push("item");
    return arr;
}
console.log(append()); // Output: ["item"]
console.log(append()); // Output: ["item"] — independent array each time

// ─── 4. FULL HOISTING — call before declaration ─────────────────────────────
console.log("\n=== 4. Hoisting — called before declaration ===");

console.log(square(4)); // Output: 16 — declaration hoisted, call works fine

function square(x) {
    return x * x;
}

console.log(square(5)); // Output: 25 — also works after declaration

// ─── 5. RECURSIVE FUNCTION ──────────────────────────────────────────────────
console.log("\n=== 5. Recursion ===");

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1); // calls itself by name directly
}
console.log(factorial(5));  // Output: 120
console.log(factorial(0));  // Output: 1  — base case

// ─── 6. MULTIPLE RETURN PATHS ───────────────────────────────────────────────
console.log("\n=== 6. Multiple return statements ===");

function checkEven(num) {
    if (num % 2 === 0) return "Even";
    return "Odd";
}
console.log(checkEven(4)); // Output: "Even"
console.log(checkEven(7)); // Output: "Odd"

// ─── 7. NESTED FUNCTIONS ────────────────────────────────────────────────────
console.log("\n=== 7. Nested function declarations ===");

function outerFunction() {
    console.log("outer");

    function innerFunction() {
        console.log("inner"); // innerFunction is scoped to outerFunction
    }

    innerFunction();
}

outerFunction();
// Output:
// outer
// inner

// console.log(typeof innerFunction); // "undefined" — not accessible outside outer

// ─── 8. RETURNING FUNCTIONS (FACTORY PATTERN) ───────────────────────────────
console.log("\n=== 8. Returning a function ===");

function createAdder(x) {
    return function(y) { // returns a function expression
        return x + y;
    };
}
const addFive = createAdder(5);
console.log(addFive(10)); // Output: 15
console.log(addFive(20)); // Output: 25

// ─── 9. FUNCTIONS AS OBJECT PROPERTIES ─────────────────────────────────────
console.log("\n=== 9. Functions as object properties ===");

const mathOperations = {
    subtract: function(a, b) { return a - b; },
};
console.log(mathOperations.subtract(10, 4)); // Output: 6

// ─── 10. REST PARAMETERS ────────────────────────────────────────────────────
console.log("\n=== 10. Rest parameters ===");

function printAll(...args) {
    console.log("Arguments:", args); // args is a real Array
    console.log("Sum:", args.reduce((a, b) => a + b, 0));
}
printAll(1, 2, 3, 4, 5);
// Output:
// Arguments: [1, 2, 3, 4, 5]
// Sum: 15

// Mixing fixed + rest:
function log(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}
log("INFO", "Server started", "on port 3000"); // Output: [INFO] Server started on port 3000

// ─── 11. MUTUAL RECURSION — only possible because of hoisting ───────────────
console.log("\n=== 11. Mutual recursion (requires hoisting) ===");

function isEven(n) {
    if (n === 0) return true;
    return isOdd(n - 1);  // isOdd is hoisted — available here
}

function isOdd(n) {
    if (n === 0) return false;
    return isEven(n - 1);
}

console.log(isEven(4)); // Output: true
console.log(isOdd(5));  // Output: true

// ─── 12. SAME-NAME DECLARATIONS — LAST ONE WINS ─────────────────────────────
console.log("\n=== 12. Duplicate declaration — last wins (silently) ===");

function sayHi() { return "Hi v1"; }
function sayHi() { return "Hi v2"; } // silently overwrites v1

console.log(sayHi()); // Output: "Hi v2"

/*
 * ============================================================
 *  CONCLUSION — Key Function Declaration Takeaways
 * ============================================================
 *
 *  1. Function declarations are fully hoisted — both name and body — so
 *     they can be called anywhere in their scope, including before the
 *     textual definition in the source file.
 *  2. Hoisting enables mutual recursion: two functions calling each other,
 *     neither needing to be defined first.
 *  3. Default parameter values are evaluated on each function call,
 *     making them safe for primitives but requiring care with objects/arrays.
 *  4. Rest parameters (`...args`) collect excess arguments into a true
 *     Array; prefer them over the legacy `arguments` object.
 *  5. Nested function declarations are scoped to their enclosing function
 *     and are not accessible from outside it.
 *  6. Declaring the same function name twice in the same scope causes a
 *     silent overwrite — the last declaration wins.
 *  7. Function declarations inside blocks (if, while, etc.) should be
 *     avoided in favor of function expressions for predictable behavior.
 * ============================================================
 */
