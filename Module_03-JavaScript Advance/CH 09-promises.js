/*
 * ============================================================
 *  PROMISES
 * ============================================================
 *
 * DEFINITION:
 *   A Promise is an object that represents the eventual completion
 *   (or failure) of an asynchronous operation and its resulting value.
 *   It is a placeholder — returned immediately while the actual value
 *   arrives later (from a network, timer, or I/O).
 *
 * PROMISE STATES (immutable once settled):
 *   State        Meaning                    Transitions to
 *   ──────────   ────────────────────────   ──────────────────
 *   pending      Initial; not yet done      fulfilled OR rejected
 *   fulfilled    Completed successfully     (terminal — no further change)
 *   rejected     Failed                     (terminal — no further change)
 *
 * CREATION:
 *   new Promise((resolve, reject) => { ... })
 *   • The executor function runs SYNCHRONOUSLY inside the constructor.
 *   • Call resolve(value) to fulfill; call reject(reason) to reject.
 *   • Calling both, or calling one twice, only the FIRST call counts.
 *
 * CONSUMPTION:
 *   promise
 *     .then(onFulfilled, onRejected?)    — handles settled state
 *     .catch(onRejected)                 — shorthand for .then(null, onRejected)
 *     .finally(onFinally)                — runs regardless of outcome
 *
 * CHAINING:
 *   .then() always returns a NEW promise — enabling a flat chain instead
 *   of nested callbacks.  Each handler can return a value (auto-wrapped)
 *   or another Promise (which the chain waits for).
 *
 * STATIC METHODS:
 *   Method                  Resolves when...
 *   ──────────────────────  ──────────────────────────────────────────
 *   Promise.resolve(v)      Immediately fulfilled with v
 *   Promise.reject(r)       Immediately rejected with r
 *   Promise.all([...])      ALL settle fulfilled; rejects if any rejects
 *   Promise.allSettled([])  ALL settle (fulfilled or rejected)
 *   Promise.race([...])     FIRST to settle (fulfilled OR rejected)
 *   Promise.any([...])      FIRST to fulfill; AggregateError if all reject
 *
 * SOLVES CALLBACK PROBLEMS:
 *   • IoC trust — you own the .then() chain, not the library.
 *   • Callback hell — flat .then() chains instead of nested callbacks.
 *   • Error propagation — .catch() at the end catches ANY rejection.
 *
 * IMPORTANT POINTS:
 *   1. The executor runs SYNCHRONOUSLY; .then() handlers are always async
 *      (microtask queue) even if the Promise is already fulfilled.
 *   2. Promises are IMMUTABLE once settled — you cannot re-resolve them.
 *   3. A Promise with no .catch() will produce an unhandled rejection
 *      warning in Node.js — always attach error handling.
 *   4. Returning a thenable from .then() causes the chain to adopt its state.
 *   5. Promise.all() short-circuits on the FIRST rejection — use
 *      Promise.allSettled() when you need ALL results regardless.
 *   6. Promise.any() is the dual of Promise.all() — it resolves on FIRST
 *      fulfillment and only rejects if ALL reject (AggregateError).
 *   7. Native Promises are faster and more spec-compliant than most
 *      third-party promise libraries — prefer them in modern code.
 * ============================================================
 */

/*
 * Example 1: Basic Promise
 * A simple example of creating and resolving a promise.
 */
const basicPromise = new Promise((resolve, reject) => {
    const success = true; // Simulating success or failure
    if (success) {
        resolve("Promise resolved successfully!");
    } else {
        reject("Promise rejected.");
    }
});

basicPromise
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
// Output: Promise resolved successfully!

/*
 * Example 2: Chaining Promises
 * Demonstrates how promises can be chained for sequential tasks.
 */
const fetchUserData = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ userId, name: "John Doe" }), 1000);
    });
};

fetchUserData(1)
    .then((user) => {
        console.log("User fetched:", user);
        return user.name;
    })
    .then((name) => console.log(`Hello, ${name}!`));
// Output:
// User fetched: { userId: 1, name: "John Doe" }
// Hello, John Doe!

/*
 * Example 3: Promise.all
 * Runs multiple promises in parallel and resolves when all are completed.
 */
const promise1 = Promise.resolve("Data from API 1");
const promise2 = Promise.resolve("Data from API 2");
const promise3 = Promise.resolve("Data from API 3");

Promise.all([promise1, promise2, promise3])
    .then((results) => console.log("All results:", results))
    .catch((error) => console.error("Error in one of the promises:", error));
// Output: All results: ["Data from API 1", "Data from API 2", "Data from API 3"]

/*
 * Example 4: Promise with Error Handling
 * Demonstrates using .catch to handle errors.
 */
const simulateApiCall = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5; // Random success or failure
            if (success) {
                resolve("API call succeeded!");
            } else {
                reject("API call failed.");
            }
        }, 1000);
    });
};

simulateApiCall()
    .then((message) => console.log(message))
    .catch((error) => console.error(error));
// Output (varies):
// API call succeeded!
// OR
// API call failed.

/*
 * Promise Methods:
 * These methods are built-in utilities for working with multiple promises.
 */

/*
 * Promise.resolve():
 * Returns a promise that is resolved with a given value.
 */
Promise.resolve("Resolved immediately!")
    .then((value) => console.log(value));
// Output: Resolved immediately!

/*
 * Promise.reject():
 * Returns a promise that is rejected with a given reason.
 */
Promise.reject("Immediate rejection!")
    .catch((reason) => console.error(reason));
// Output: Immediate rejection!

/*
 * Promise.allSettled():
 * Waits for all promises to settle (either fulfilled or rejected) and returns their results.
 */
Promise.allSettled([promise1, Promise.reject("Error in promise"), promise2])
    .then((results) => console.log("Settled results:", results));
// Output: Settled results: [{status: "fulfilled", value: "Data from API 1"}, ...]

/*
 * Promise.race():
 * Resolves or rejects as soon as one of the promises settles.
 */
Promise.race([
    new Promise((resolve) => setTimeout(() => resolve("First resolved!"), 500)),
    new Promise((resolve) => setTimeout(() => resolve("Second resolved!"), 1000))
])
    .then((result) => console.log(result));
// Output: First resolved!

/*
 * Promise.any():
 * Resolves as soon as any promise fulfills (ignores rejections).
 */
Promise.any([Promise.reject("Error 1"), promise2, Promise.reject("Error 2")])
    .then((value) => console.log("First fulfilled value:", value))
    .catch((error) => console.error("No promises fulfilled:", error));
// Output: First fulfilled value: Data from API 2


/**
 * Consuming Promises using then(resolveHandler, rejectionHandler)
 * 
 * In JavaScript, Promises are used to handle asynchronous operations.
 * The `.then()` method takes two optional arguments:
 *    - resolveHandler → called when the promise is fulfilled
 *    - rejectionHandler → called when the promise is rejected
 *
 * Syntax:
 *    promise.then(onFulfilled, onRejected)
 *
 * Note:
 * - You can use one or both arguments.
 * - It’s better practice to use `.catch()` for error handling, 
 *   but this example shows direct use of both handlers inside `.then()`.
 */

// Simulated asynchronous operation using a Promise
const fetchData = (shouldSucceed) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve("Data fetched successfully!");
            } else {
                reject("Failed to fetch data.");
            }
        }, 1000); // Simulates delay
    });
};

// Define the resolve handler
function handleSuccess(data) {
    console.log("Resolved:", data);
}

// Define the rejection handler
function handleError(error) {
    console.log("Rejected:", error);
}

// Use the Promise with .then(resolveHandler, rejectionHandler)
console.log("Calling fetchData...");

fetchData(true).then(handleSuccess, handleError); // Change to false to test rejection

console.log("This line runs before the Promise resolves.");

/**
 * 🔍 Behind the scenes:
 * - fetchData(true) returns a pending Promise
 * - setTimeout schedules resolution after 1 second
 * - handleSuccess is called after 1 second
 * - JavaScript continues executing the next lines immediately
 *
 * 🧾 Expected Output (when shouldSucceed = true):
 * Calling fetchData...
 * This line runs before the Promise resolves.
 * Resolved: Data fetched successfully!
 *
 * 🧾 If shouldSucceed = false:
 * Calling fetchData...
 * This line runs before the Promise resolves.
 * Rejected: Failed to fetch data.
 */

/*
 * ============================================================
 *  CONCLUSION — Key Promise Takeaways
 * ============================================================
 *
 *  1. Promises represent a FUTURE value — created (pending) now, settled
 *     later (fulfilled or rejected).  Once settled, state never changes.
 *  2. The executor function runs SYNCHRONOUSLY inside the constructor,
 *     but .then() / .catch() handlers always run asynchronously
 *     (microtask queue), even if the Promise is already resolved.
 *  3. .then() returns a NEW Promise — enabling flat, readable chains
 *     instead of the "pyramid of doom" from nested callbacks.
 *  4. A rejection without a .catch() is an unhandled rejection — always
 *     attach a .catch() at the end of every chain.
 *  5. Promise.all() fails-fast on the first rejection; Promise.allSettled()
 *     waits for all and gives you each result regardless of outcome.
 *  6. Promise.any() resolves on the first success; Promise.race() resolves
 *     (or rejects) on the first ANY settlement — choose based on intent.
 *  7. Promises restore Inversion of Control to the caller — you decide
 *     when and how to react to the settled value, not the library that
 *     returned the Promise.
 * ============================================================
 */
