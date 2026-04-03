/*
 * ============================================================
 *  FUNCTION EXPRESSIONS
 * ============================================================
 *
 * DEFINITION:
 *   A function expression defines a function as part of a larger expression.
 *   It is assigned to a variable, passed as an argument, or returned from
 *   another function.  Unlike function declarations, function expressions
 *   are NOT hoisted — the variable holding them is (as `undefined` for var,
 *   or TDZ for let/const), but the function body is not available until
 *   the assignment line runs.
 *
 * FORMS:
 *   1. Anonymous function expression:   const fn = function() { ... }
 *   2. Named function expression (NFE): const fn = function myFn() { ... }
 *   3. Arrow function expression:       const fn = (a, b) => a + b
 *   4. IIFE:                            (function() { ... })()
 *   5. Async function expression:       const fn = async function() { ... }
 *
 * NAMED FUNCTION EXPRESSION (NFE) ADVANTAGES:
 *   - The name is available ONLY inside the function body (for recursion).
 *   - The name appears in stack traces, making debugging easier.
 *   - The outer variable name can change; the internal name stays stable.
 *
 * FUNCTION EXPRESSIONS vs DECLARATIONS:
 *   Property               Expression            Declaration
 *   ──────────────         ───────────────────   ──────────────────
 *   Hoisted?               NO (name only)        YES (fully)
 *   Call before define?    NO                    YES
 *   usable as arg/return?  YES (natural fit)     Yes (indirect)
 *   `this` behavior        own `this`            own `this`
 *   Arrow variant          YES (no own `this`)   NO
 *
 * IMPORTANT POINTS:
 *   1. Function expressions create closures just like declarations do.
 *   2. Arrow function expressions have NO own `this`, `arguments`, or
 *      `prototype` — they are not constructors.
 *   3. Assigning a function expression to a const prevents accidental
 *      reassignment of the function reference.
 *   4. NFE name is scope-limited to the function body — you cannot call it
 *      from outside by that name.
 *   5. IIFEs run immediately at parse time — they are a classic pattern for
 *      creating private scope.
 *   6. Function expressions are first-class values: stored in arrays,
 *      objects, maps, and passed to any higher-order function.
 *   7. The `typeof` check on an un-initialized function expression variable
 *      gives "undefined" (var) or throws ReferenceError (let/const).
 * ============================================================
 */

// ─── 1. ANONYMOUS FUNCTION EXPRESSION ──────────────────────────────────────
console.log("=== 1. Anonymous function expression ===");

const greet = function() {
    console.log("Hello from an anonymous function expression!");
};

greet(); // Output: "Hello from an anonymous function expression!"

// Before assignment, calling it would give TypeError (var) or ReferenceError (let/const):
// const too early = greet(); // if placed above const greet = ...

// ─── 2. NAMED FUNCTION EXPRESSION (NFE) ────────────────────────────────────
console.log("\n=== 2. Named function expression (NFE) — name for recursion & debugging ===");

const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // `fact` is visible INSIDE the body only
};

console.log(factorial(5)); // Output: 120
// console.log(fact(5));   // ReferenceError — `fact` is not in the outer scope

// NFE in stack traces — the name 'fact' appears in the call stack
const safeDivide = function safeDivide(a, b) {
    if (b === 0) throw new Error("divide by zero");
    return a / b;
};
try { safeDivide(1, 0); } catch(e) { console.log(e.message); } // Output: "divide by zero"

// ─── 3. REASSIGNING THE VARIABLE ───────────────────────────────────────────
console.log("\n=== 3. Storing and reassigning function expressions ===");

let sayHello = function() { console.log("Hello!"); };
sayHello(); // Output: "Hello!"

sayHello = function() { console.log("Hi, there!"); }; // variable can be reassigned
sayHello(); // Output: "Hi, there!"

// Using const prevents this:
const alwaysHi = function() { console.log("Hi!"); };
// alwaysHi = function() {}; // TypeError: Assignment to constant variable

// ─── 4. PASSING FUNCTION EXPRESSIONS AS ARGUMENTS ──────────────────────────
console.log("\n=== 4. Function expression as a callback argument ===");

function executeCallback(callback) {
    callback();
}

executeCallback(function() {
    console.log("Callback executed!"); // Output: "Callback executed!"
});

// Arrow function expression as callback:
executeCallback(() => console.log("Arrow callback executed!")); // Output: "Arrow callback executed!"

// ─── 5. RETURNING FUNCTION EXPRESSIONS (FACTORY PATTERN) ───────────────────
console.log("\n=== 5. Returning a function expression (factory / closure) ===");

function createMultiplier(multiplier) {
    return function(value) {               // returns an anonymous fn expression
        return value * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));  // Output: 10
console.log(triple(5));  // Output: 15
console.log(double(triple(4))); // Output: 24 — composing closures

// ─── 6. IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSION ─────────────────────
console.log("\n=== 6. IIFE — runs immediately, creates private scope ===");

const moduleResult = (function(seed) {
    const private = seed * 2; // not visible outside
    console.log("IIFE executed immediately! private =", private); // Output: IIFE executed immediately! private = 84
    return { doubled: private };
})(42);

console.log(moduleResult.doubled); // Output: 84
// console.log(private);           // ReferenceError — private is locked in IIFE

// ─── 7. ARROW FUNCTION EXPRESSION — no own `this` ──────────────────────────
console.log("\n=== 7. Arrow function expression ===");

const add = (a, b) => a + b;
const square = n => n * n;
const always42 = () => 42;

console.log(add(3, 4));    // Output: 7
console.log(square(5));    // Output: 25
console.log(always42());   // Output: 42

// Arrow functions have NO own `this`:
const obj = {
    name: "MyObject",
    regular: function()  { return this.name; },
    arrow:   ()          => typeof this === "undefined" ? "no this" : this.name
};
console.log(obj.regular()); // Output: "MyObject"
console.log(obj.arrow());   // Output: "no this" (or "" in browser, undefined in strict)

// Arrow functions have NO `arguments` object:
const showArgs = (...args) => console.log("args:", args); // use rest params instead
showArgs(1, 2, 3); // Output: args: [1, 2, 3]

// ─── 8. CONDITIONAL FUNCTION EXPRESSIONS ────────────────────────────────────
console.log("\n=== 8. Conditional function expressions ===");

const isEven = function(num) {
    return num % 2 === 0 ? "Even" : "Odd";
};
console.log(isEven(4)); // Output: "Even"
console.log(isEven(5)); // Output: "Odd"

// Pick implementation based on condition:
const process = true
    ? function() { console.log("Production path"); }
    : function() { console.log("Dev path"); };
process(); // Output: "Production path"

// ─── 9. FUNCTION EXPRESSIONS AS OBJECT METHODS ────────────────────────────
console.log("\n=== 9. Function expressions in object properties ===");

const calculator = {
    add:      function(a, b) { return a + b; },
    subtract: function(a, b) { return a - b; },
    multiply: (a, b) => a * b,         // arrow — note: no own `this`
};

console.log(calculator.add(10, 5));      // Output: 15
console.log(calculator.subtract(10, 5)); // Output: 5
console.log(calculator.multiply(4, 3));  // Output: 12

// ─── 10. ASYNC FUNCTION EXPRESSION ─────────────────────────────────────────
console.log("\n=== 10. Async function expression ===");

const fetchUser = async function(id) {
    // Simulates an async API call
    return new Promise(resolve => setTimeout(() => resolve({ id, name: "Alice" }), 0));
};

fetchUser(1).then(user => console.log("User:", user.name)); // Output: User: Alice

// async arrow equivalent:
const fetchData = async (url) => `Data from ${url}`;
fetchData("api/v1").then(d => console.log(d)); // Output: Data from api/v1

/*
 * ============================================================
 *  CONCLUSION — Key Function Expression Takeaways
 * ============================================================
 *
 *  1. Function expressions are NOT hoisted — calling them before the
 *     assignment line throws a TypeError or ReferenceError.
 *  2. Named function expressions give the function an internal name only
 *     visible inside its body — ideal for self-referencing (recursion)
 *     and better stack traces.
 *  3. Arrow function expressions are ideal for callbacks and short
 *     transformations; they must NOT be used when a function needs its
 *     own `this`, `arguments`, or `prototype`.
 *  4. Using const for function expressions prevents accidental reassignment
 *     of the function reference.
 *  5. IIFEs create an immediately run, disposable private scope — the
 *     module pattern before ES modules existed.
 *  6. Function expressions are first-class values: they can be passed,
 *     stored, returned, and composed freely.
 *  7. Async function expressions return a Promise automatically, letting
 *     them integrate seamlessly with await and .then() chains.
 * ============================================================
 */
