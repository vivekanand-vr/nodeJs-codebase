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