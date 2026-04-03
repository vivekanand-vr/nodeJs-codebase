/*
 * ============================================================
 *  CH 09 - Functions in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  A function is a reusable block of code that performs a specific task.
 *  Functions are FIRST-CLASS CITIZENS in JavaScript — they can be:
 *    - Stored in variables
 *    - Passed as arguments to other functions
 *    - Returned from other functions
 *
 *  FUNCTION TYPES:
 *  ---------------
 *    1. Function Declaration        — hoisted, named, traditional
 *    2. Function Expression         — assigned to a variable, NOT hoisted
 *    3. Named Function Expression   — function with a name inside an expression
 *    4. Arrow Function              — concise syntax, no own `this` or `arguments`
 *    5. Anonymous Function          — no name, used as callback or IIFE
 *    6. IIFE                        — Immediately Invoked Function Expression
 *    7. Callback Function           — passed as argument, called later
 *    8. Higher-Order Function       — takes a function OR returns a function
 *    9. Closure                     — inner function that remembers outer scope
 *   10. Recursive Function          — calls itself
 *   11. Generator Function          — yields values one at a time (function*)
 *   12. Async Function              — returns a Promise (async/await)
 *
 *  KEY POINTS:
 *  -----------
 *  - Function declarations are FULLY HOISTED (can be called before definition).
 *    Function expressions are NOT hoisted (only the variable binding is).
 *  - Arrow functions do NOT have their own `this`, `arguments`, or `new.target`.
 *    They inherit `this` from the enclosing lexical scope.
 *  - A function without a `return` statement returns `undefined`.
 *  - `arguments` object is available in regular functions (not arrow functions)
 *    and holds all passed arguments as array-like object.
 *  - Rest parameters (...args) are the modern alternative to `arguments`.
 *  - Default parameters are evaluated at call time, not definition time.
 * ============================================================
 */

// ─── 1. FUNCTION DECLARATION ───────────────────────────────────

console.log("1. Function Declaration:");

// Can be called BEFORE its definition (hoisted)
console.log(greet("Alice")); // Output: Hello, Alice!  ← works before definition

function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Bob")); // Output: Hello, Bob!

// No return → returns undefined
function noReturn() {
    let x = 10; // does something but returns nothing
}
console.log(noReturn()); // Output: undefined

// ─── 2. FUNCTION EXPRESSION ────────────────────────────────────

console.log("\n2. Function Expression:");

// NOT hoisted — calling before this line throws TypeError
const add = function (a, b) {
    return a + b;
};
console.log(add(5, 3)); // Output: 8

// ─── 3. NAMED FUNCTION EXPRESSION ──────────────────────────────

console.log("\n3. Named Function Expression:");

// The name (factorial) is only accessible INSIDE the function body.
// Useful for recursion within an expression, and shows meaningful
// name in stack traces/debugger.
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // calls itself by its internal name
};
console.log(factorial(5)); // Output: 120
// console.log(fact(5));   // ❌ ReferenceError — 'fact' not in outer scope

// ─── 4. ARROW FUNCTIONS ────────────────────────────────────────

console.log("\n4. Arrow Functions:");

// Concise form — implicit return when body is a single expression
const multiply = (a, b) => a * b;
console.log(multiply(4, 2)); // Output: 8

// Single parameter — parentheses optional
const double = n => n * 2;
console.log(double(7)); // Output: 14

// Multiple statements — need curly braces + explicit return
const divide = (a, b) => {
    if (b === 0) return "Cannot divide by zero";
    return a / b;
};
console.log(divide(10, 2)); // Output: 5
console.log(divide(10, 0)); // Output: Cannot divide by zero

// Arrow functions do NOT have their own `this` — they inherit from outer scope
function Timer() {
    this.seconds = 0;
    setInterval(() => {
        this.seconds++;  // `this` refers to the Timer instance (not the interval)
    }, 1000);
}

// ─── 5. DEFAULT PARAMETERS ─────────────────────────────────────

console.log("\n5. Default Parameters:");

function greetWithDefault(name = "Guest", greeting = "Welcome") {
    return `${greeting}, ${name}!`;
}
console.log(greetWithDefault());              // Output: Welcome, Guest!
console.log(greetWithDefault("Alice"));       // Output: Welcome, Alice!
console.log(greetWithDefault("Bob", "Hi"));   // Output: Hi, Bob!
console.log(greetWithDefault(undefined, "Hey")); // Output: Hey, Guest! ← undefined triggers default

// ─── 6. REST PARAMETERS ────────────────────────────────────────

console.log("\n6. Rest Parameters:");

// Rest (...) collects remaining arguments into a real array
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // Output: 15
console.log(sum(10, 20));         // Output: 30

// Mix named params with rest — rest must come LAST
function log(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}
log("INFO", "Server started", "Port: 3000");
// Output: [INFO] Server started Port: 3000

// ─── 7. arguments OBJECT (regular functions only) ──────────────

console.log("\n7. arguments Object:");

function oldStyle() {
    console.log(arguments);      // Output: [Arguments] { '0': 1, '1': 2, '2': 3 }
    console.log(arguments[0]);   // Output: 1
    console.log(arguments.length); // Output: 3
}
oldStyle(1, 2, 3);

// Arrow functions do NOT have 'arguments':
const arrowFn = () => {
    // console.log(arguments); // ❌ ReferenceError in strict mode
};

// ─── 8. ANONYMOUS FUNCTIONS ────────────────────────────────────

console.log("\n8. Anonymous Functions:");

// Passed directly as arguments (no name needed)
setTimeout(function () {
    console.log("Runs after 100ms (anonymous function)");
}, 100);

// As array callbacks
const doubled = [1, 2, 3].map(function (x) { return x * 2; });
console.log(doubled); // Output: [2, 4, 6]

// ─── 9. IIFE — IMMEDIATELY INVOKED FUNCTION EXPRESSION ─────────

console.log("\n9. IIFE:");

// Runs immediately, creates its own scope, variables don't leak out
(function () {
    let secret = "I am private";
    console.log("IIFE executed immediately!"); // Output: IIFE executed immediately!
})();
// console.log(secret); // ❌ ReferenceError — secret is scoped to IIFE

// Arrow IIFE
const result = (() => 42)();
console.log("Arrow IIFE result:", result); // Output: Arrow IIFE result: 42

// ─── 10. CALLBACK FUNCTIONS ────────────────────────────────────

console.log("\n10. Callback Functions:");

function processNumber(num, callback) {
    return callback(num);
}
const square = n => n * n;
const cube   = n => n * n * n;

console.log(processNumber(5, square)); // Output: 25
console.log(processNumber(3, cube));   // Output: 27

// Built-in callbacks
[1, 2, 3, 4, 5].filter(n => n % 2 === 0).forEach(n => console.log(n));
// Output: 2, 4

// ─── 11. HIGHER-ORDER FUNCTIONS ────────────────────────────────

console.log("\n11. Higher-Order Functions:");

// A function that RETURNS another function
function multiplier(factor) {
    return function (number) {
        return number * factor;
    };
}
const triple = multiplier(3);
const tenX   = multiplier(10);

console.log(triple(5));  // Output: 15
console.log(tenX(7));    // Output: 70

// A function that TAKES a function as argument
function applyTwice(fn, value) {
    return fn(fn(value));
}
console.log(applyTwice(x => x + 1, 5)); // Output: 7  (5 → 6 → 7)
console.log(applyTwice(x => x * 2, 3)); // Output: 12 (3 → 6 → 12)

// ─── 12. CLOSURES ──────────────────────────────────────────────

console.log("\n12. Closures:");

// A closure is a function that "closes over" (remembers) its outer scope's variables,
// even after the outer function has returned.

function makeCounter(start = 0) {
    let count = start; // `count` is captured by the returned function
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        value()     { return count;   },
    };
}

const counter = makeCounter(10);
console.log(counter.increment()); // Output: 11
console.log(counter.increment()); // Output: 12
console.log(counter.decrement()); // Output: 11
console.log(counter.value());     // Output: 11

// Each call to makeCounter creates a NEW independent closure:
const counter2 = makeCounter(0);
console.log(counter2.value());  // Output: 0  (independent from counter)

// ─── 13. RECURSIVE FUNCTIONS ───────────────────────────────────

console.log("\n13. Recursive Functions:");

function factIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function factRecursive(n) {
    if (n === 0 || n === 1) return 1;   // base case — stops recursion
    return n * factRecursive(n - 1);    // recursive case
}

console.log(factIterative(5));  // Output: 120
console.log(factRecursive(5));  // Output: 120  ← same result, different approach

// Fibonacci — classic recursion example
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(7)); // Output: 13  (0,1,1,2,3,5,8,13)

// ─── 14. FUNCTION SCOPE — VARIABLES INSIDE FUNCTIONS ───────────

console.log("\n14. Function Scope:");

function scopeDemo() {
    let localVar = "Only accessible inside scopeDemo";
    console.log(localVar); // Output: Only accessible inside scopeDemo
}
scopeDemo();
// console.log(localVar); // ❌ ReferenceError — localVar is not in outer scope

// ─── 15. FUNCTIONS WITH OBJECTS AND ARRAYS ─────────────────────

console.log("\n15. Functions with Objects and Arrays:");

// Objects are passed by REFERENCE — mutations affect the original
function birthDayBump(person) {
    person.age += 1; // mutates the original object
}
const myPerson = { name: "Alice", age: 30 };
birthDayBump(myPerson);
console.log(myPerson); // Output: { name: 'Alice', age: 31 }

// Arrays are also passed by reference
function doubleAll(arr) {
    return arr.map(n => n * 2); // map returns a NEW array — original untouched
}
const nums = [1, 2, 3];
console.log(doubleAll(nums)); // Output: [2, 4, 6]
console.log(nums);            // Output: [1, 2, 3]  ← original unchanged

// ─── 16. ASYNC FUNCTIONS (preview) ─────────────────────────────

console.log("\n16. Async Functions:");

// async functions always return a Promise.
// `await` pauses execution inside the async function until the Promise resolves.
const fetchData = async () => {
    try {
        const data = await new Promise((resolve) =>
            setTimeout(() => resolve("Data fetched!"), 100)
        );
        console.log(data); // Output: Data fetched!
    } catch (error) {
        console.error("Error:", error);
    }
};
fetchData();

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Function declarations are hoisted — safe to call before definition.
 *     Function expressions and arrow functions are NOT — define them first.
 *  2. Arrow functions are concise but limited:
 *     - No own `this` (inherit from lexical scope)
 *     - No `arguments` object
 *     - Cannot be used as constructors (new ArrowFn() → TypeError)
 *  3. Default parameters make APIs more resilient; they fire when the
 *     argument is `undefined` (not when it's null, 0, or false).
 *  4. Rest parameters (...args) collect remaining args into a true array.
 *     They are the modern replacement for the `arguments` object.
 *  5. A closure is created whenever a function is defined inside another
 *     function. It retains access to the outer scope's variables for life.
 *  6. Higher-order functions power functional patterns like map, filter,
 *     reduce, and custom middleware/plugins.
 *  7. Every recursive function needs a BASE CASE — without it, it will
 *     recurse infinitely until a stack overflow error occurs.
 *  8. Objects and arrays are passed by REFERENCE. To avoid mutating the
 *     original, create a copy: [...arr] or { ...obj } (spread operator).
 *  9. Async/await is syntactic sugar over Promises, making asynchronous
 *     code look and behave like synchronous code. Always wrap in try/catch.
 * ============================================================
 */
