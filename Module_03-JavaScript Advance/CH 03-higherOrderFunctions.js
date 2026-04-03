/*
 * ============================================================
 *  HIGHER-ORDER FUNCTIONS (HOF)
 * ============================================================
 *
 * DEFINITION:
 *   A higher-order function is a function that does at least one of:
 *   1. Accepts one or more functions as arguments (callback pattern).
 *   2. Returns a function as its result (factory / decorator pattern).
 *   Both can be true at the same time.
 *
 * WHY THEY MATTER:
 *   HOFs are the foundation of functional programming in JavaScript.
 *   They enable:
 *   • Abstraction — write logic once, apply to many data shapes.
 *   • Composition — build complex behavior from small, pure functions.
 *   • Reuse — parameterize behavior without duplicating code.
 *
 * COMMON BUILT-IN HOFs:
 *   Array method     What it does
 *   ─────────────    ─────────────────────────────────────────
 *   .map()           Transform each element → new array
 *   .filter()        Keep elements matching predicate → new array
 *   .reduce()        Fold array to single value
 *   .forEach()       Side-effect per element (no return)
 *   .find()          First element matching predicate
 *   .some()          At least one matches → boolean
 *   .every()         All match → boolean
 *   .sort()          Sort in-place using comparator callback
 *   .flatMap()       Map then flatten one level
 *
 * IMPORTANT POINTS:
 *   1. A function that ONLY accepts functions (like event listeners or
 *      Array#forEach) is also a HOF — it fits criterion #1.
 *   2. HOFs enable currying: breaking a multi-argument function into a
 *      chain of single-argument functions.
 *   3. HOFs that return functions create closures — the returned function
 *      has access to the outer function's variables.
 *   4. Built-in array HOFs (.map, .filter, .reduce) never mutate the
 *      original array — they return new arrays.
 *   5. Function composition with HOFs keeps code declarative and testable.
 *   6. HOFs work with any function value: named, anonymous, or arrow.
 *   7. Memorization (caching) is a classic use case for HOFs that return
 *      functions — the cache lives in the returned function's closure.
 * ============================================================
 */

// ─── 1. HOF THAT ACCEPTS A FUNCTION (callback pattern) ─────────────────────
console.log("=== 1. HOF accepting a function — Array.map ===");

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled); // Output: [2, 4, 6, 8, 10]

// Arrow function callback (common shorthand):
const squared = numbers.map(n => n * n);
console.log(squared); // Output: [1, 4, 9, 16, 25]

// ─── 2. HOF THAT RETURNS A FUNCTION (factory pattern) ──────────────────────
console.log("\n=== 2. HOF returning a function — multiplier factory ===");

function createMultiplier(factor) {
    return function(number) {        // closes over `factor`
        return number * factor;
    };
}

const multiplyBy5 = createMultiplier(5);
const multiplyBy10 = createMultiplier(10);

console.log(multiplyBy5(10));  // Output: 50
console.log(multiplyBy10(10)); // Output: 100
console.log(multiplyBy5(multiplyBy10(2))); // Output: 100 — composing factories

// ─── 3. CUSTOM HOF — withLogging DECORATOR ─────────────────────────────────
console.log("\n=== 3. Decorator HOF — wrap any function with logging ===");

function withLogging(fn) {
    return function(...args) {
        console.log(`Calling ${fn.name || "fn"} with`, args);
        const result = fn(...args);
        console.log(`Result:`, result);
        return result;
    };
}

function add(a, b) { return a + b; }

const loggedAdd = withLogging(add);
loggedAdd(3, 4);
// Output:
// Calling add with [3, 4]
// Result: 7

// ─── 4. CURRYING — HOF returning a chain of single-arg functions ────────────
console.log("\n=== 4. Currying via HOFs ===");

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn(...args);          // enough args — call original
        }
        return function(...more) {
            return curried(...args, ...more); // wait for more args
        };
    };
}

function volume(l, w, h) { return l * w * h; }

const curriedVolume = curry(volume);
console.log(curriedVolume(2)(3)(4)); // Output: 24 — applied one arg at a time
console.log(curriedVolume(2, 3)(4)); // Output: 24 — mixed
console.log(curriedVolume(2, 3, 4)); // Output: 24 — all at once

// ─── 5. FUNCTION COMPOSITION ────────────────────────────────────────────────
console.log("\n=== 5. Function composition (compose) ===");

// compose(f, g)(x) === f(g(x)) — right to left application
function compose(...fns) {
    return function(value) {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}

const double = x => x * 2;
const addOne = x => x + 1;
const negate = x => -x;

const transform = compose(negate, addOne, double); // negate(addOne(double(x)))
console.log(transform(5)); // Output: -11 — double(5)=10, addOne(10)=11, negate(11)=-11

// ─── 6. MEMOIZATION — HOF caching results ──────────────────────────────────
console.log("\n=== 6. Memoization HOF ===");

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            console.log("(cache hit)");
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

function slowFib(n) {
    if (n <= 1) return n;
    return slowFib(n - 1) + slowFib(n - 2);
}

const fastFib = memoize(slowFib);
console.log(fastFib(10)); // Output: 55
console.log(fastFib(10)); // Output: 55 (cache hit)

// ─── 7. ONCE — HOF that runs fn exactly once ───────────────────────────────
console.log("\n=== 7. once() — ensures a function runs only once ===");

function once(fn) {
    let called = false;
    let result;
    return function(...args) {
        if (!called) {
            called = true;
            result = fn(...args);
        }
        return result;
    };
}

const initialize = once(() => {
    console.log("Initialized!");
    return 42;
});

console.log(initialize()); // Output: "Initialized!"  42
console.log(initialize()); // Output: 42 — does NOT log again
console.log(initialize()); // Output: 42

// ─── 8. HOFs WITH BUILT-IN ARRAY METHODS ────────────────────────────────────
console.log("\n=== 8. Chaining built-in HOFs ===");

const people = [
    { name: "Alice", age: 25 },
    { name: "Bob",   age: 17 },
    { name: "Carol", age: 30 },
    { name: "Dave",  age: 15 },
];

const adultNames = people
    .filter(p => p.age >= 18)         // keep adults
    .map(p => p.name)                 // extract names
    .sort();                          // sort alphabetically

console.log(adultNames); // Output: ["Alice", "Carol"]

const totalAge = people.reduce((sum, p) => sum + p.age, 0);
console.log("Total age:", totalAge); // Output: Total age: 87

/*
 * ============================================================
 *  CONCLUSION — Key Higher-Order Function Takeaways
 * ============================================================
 *
 *  1. A HOF either accepts a function as an argument OR returns a function
 *     (or both) — this makes them the backbone of functional patterns.
 *  2. HOFs that return functions create closures, giving the returned
 *     function access to the outer HOF's private variables.
 *  3. Decorators (e.g., withLogging, memoize, once) wrap any function to
 *     add cross-cutting behavior without modifying the original.
 *  4. Currying transforms an n-ary function into a chain of unary functions,
 *     enabling partial application and point-free programming.
 *  5. Function composition builds pipelines of small, single-purpose
 *     functions — each step receives the previous step's output.
 *  6. Built-in array HOFs (.map, .filter, .reduce) return new arrays without
 *     mutating the original, supporting safe, predictable transformations.
 *  7. Memoization HOFs trade memory for speed by caching results of
 *     expensive pure functions keyed on their arguments.
 * ============================================================
 */