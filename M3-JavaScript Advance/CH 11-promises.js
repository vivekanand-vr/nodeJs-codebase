/*
 * Promises in JavaScript:
 * - Promises are objects that represent the eventual completion (or failure) of an asynchronous operation.
 * - They simplify writing asynchronous code, avoiding "callback hell."
 * - Promises have three states: pending, fulfilled, and rejected.
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
