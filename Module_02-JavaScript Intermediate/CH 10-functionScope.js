/*
 * ============================================================
 *  FUNCTION SCOPE
 * ============================================================
 *
 * DEFINITION:
 *   A new scope is created every time a function is invoked.
 *   Variables declared inside a function (with var, let, or const) are
 *   LOCAL to that function — they cannot be accessed from outside.
 *
 * HOW IT WORKS:
 *   - At call time, JS creates an Execution Context with a variable
 *     environment for that function's local bindings.
 *   - When the function returns, that environment is popped off the
 *     call stack and its local variables are garbage-collected (unless
 *     captured by a closure).
 *   - Nested functions can access variables from ALL enclosing scopes
 *     (the scope chain) — this is lexical scoping.
 *
 * `var` IN FUNCTION SCOPE:
 *   - `var` is function-scoped (or globally scoped if declared outside any function).
 *   - `var` declarations are HOISTED to the top of the function:
 *       the name is registered first; the value is assigned when the line runs.
 *   - `let` and `const` are block-scoped (covered in CH 11).
 *
 * IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSION:
 *   Used to create a private scope to avoid polluting the surrounding scope.
 *   Pattern: (function() { /* private code *\/ })();
 *
 * IMPORTANT POINTS:
 *   1. Every function call creates an independent scope — restarting fresh.
 *   2. Parameters are local variables — they live in the function's scope.
 *   3. Nested (inner) functions can read/write variables from outer functions
 *      via the scope chain (lexical scoping).
 *   4. Outer functions CANNOT access inner function's variables.
 *   5. `var` hoisting inside a function: name exists from the start of the
 *      function, but the value is `undefined` until the assignment line runs.
 *   6. IIFE creates a private scope; useful in pre-module codebases.
 *   7. `arguments` is an array-like object available inside regular functions
 *      that holds all arguments passed; NOT available in arrow functions.
 * ============================================================
 */

// ─── 1. BASIC FUNCTION SCOPE ────────────────────────────────────────────────
console.log("=== 1. Basic function scope ===");

function showFunctionScope() {
    var functionScopedVar = "I am scoped to this function";
    console.log(functionScopedVar); // Output: "I am scoped to this function"
}

showFunctionScope();
// console.log(functionScopedVar); // ReferenceError: functionScopedVar is not defined

// ─── 2. NESTED FUNCTIONS AND SCOPE CHAIN ───────────────────────────────────
console.log("\n=== 2. Nested functions — inner can access outer ===");

function outerFunction() {
    var outerVar = "I belong to the outer function";

    function innerFunction() {
        console.log(outerVar);  // Output: "I belong to the outer function" — scope chain lookup
        var innerVar = "I belong to the inner function";
        console.log(innerVar);  // Output: "I belong to the inner function"
    }

    innerFunction();
    // console.log(innerVar); // ReferenceError — outer cannot access inner's variables
}

outerFunction();

// ─── 3. PARAMETERS AS LOCAL VARIABLES ──────────────────────────────────────
console.log("\n=== 3. Parameters live in function scope ===");

function greet(name) {
    var greeting = "Hello, " + name + "!";
    console.log(greeting);
}

greet("Alice"); // Output: "Hello, Alice!"
greet("Bob");   // Output: "Hello, Bob!" — each call gets its OWN separate scope

// ─── 4. VAR HOISTING IN FUNCTION SCOPE ─────────────────────────────────────
console.log("\n=== 4. var hoisting inside a function ===");

function hoistingExample() {
    console.log(hoistedVar); // Output: undefined — name is hoisted, value is not yet
    var hoistedVar = "I am hoisted";
    console.log(hoistedVar); // Output: "I am hoisted"
}

// The engine processes the above function as if it were:
// function hoistingExample() {
//   var hoistedVar;           // ← hoisted declaration
//   console.log(hoistedVar);  // undefined
//   hoistedVar = "I am hoisted";
//   console.log(hoistedVar);  // "I am hoisted"
// }

hoistingExample();

// ─── 5. `arguments` OBJECT ─────────────────────────────────────────────────
console.log("\n=== 5. arguments object (regular functions only) ===");

function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

console.log(sum(1, 2, 3));       // Output: 6  — 3 args
console.log(sum(10, 20, 30, 40)); // Output: 100 — 4 args, no signature change needed

const arrowSum = (...args) => args.reduce((a, b) => a + b, 0); // Arrow functions prefer rest params
console.log(arrowSum(5, 10, 15)); // Output: 30

// ─── 6. IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSION ─────────────────────
console.log("\n=== 6. IIFE for private scope ===");

(function() {
    var privateData = "Not accessible outside";
    console.log("Inside IIFE:", privateData); // Output: "Inside IIFE: Not accessible outside"
})();

// console.log(privateData); // ReferenceError — privateData is locked inside the IIFE

// IIFE with return value:
const moduleAPI = (function() {
    var _count = 0;           // private state
    return {
        increment() { _count++; },
        getCount()  { return _count; }
    };
})();

moduleAPI.increment();
moduleAPI.increment();
console.log(moduleAPI.getCount()); // Output: 2 — private _count preserved via closure

// ─── 7. SCOPE ISOLATION — each call is independent ─────────────────────────
console.log("\n=== 7. Each function call creates an independent scope ===");

function makeCounter() {
    var count = 0;
    return function() { return ++count; };
}

const counter1 = makeCounter();
const counter2 = makeCounter(); // NEW scope, new `count`
console.log(counter1()); // Output: 1 — counter1's own count
console.log(counter1()); // Output: 2
console.log(counter2()); // Output: 1 — counter2's OWN independent count
console.log(counter1()); // Output: 3 — counter1 unaffected by counter2

/*
 * ============================================================
 *  CONCLUSION — Key Function Scope Takeaways
 * ============================================================
 *
 *  1. A function creates a new, isolated scope on every invocation —
 *     allowing safe use of local variables without naming conflicts.
 *  2. Parameters behave as local variable declarations within the function.
 *  3. Inner functions can access variables from all enclosing (outer)
 *     function scopes via the scope chain — outer cannot access inner.
 *  4. `var` declarations are hoisted to the top of the function body;
 *     they exist (as `undefined`) from the function's first line.
 *  5. Use `let`/`const` inside functions for block-level precision and to
 *     avoid hoisting surprises.
 *  6. IIFEs create a disposable private scope — useful for initialization
 *     code and the module pattern in pre-ES6 code.
 *  7. The `arguments` object gives access to all passed args in regular
 *     functions; use rest parameters (`...args`) in arrow functions.
 * ============================================================
 */
