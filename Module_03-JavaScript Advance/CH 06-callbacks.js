/*
 * ============================================================
 *  CALLBACKS
 * ============================================================
 *
 * DEFINITION:
 *   A callback is any function passed as an argument to another function,
 *   to be invoked at a later point — either synchronously (immediately,
 *   inside the outer function) or asynchronously (after an I/O event,
 *   timer, or network response).
 *
 * SYNCHRONOUS vs ASYNCHRONOUS CALLBACKS:
 *   Synchronous callback  → called immediately within the same call stack.
 *     Examples: Array.map(), Array.forEach(), Array.sort() comparator.
 *   Asynchronous callback → queued; called when the event loop picks it up.
 *     Examples: setTimeout, setInterval, fs.readFile, XMLHttpRequest.
 *
 * NODE.js ERROR-FIRST CALLBACK CONVENTION:
 *   The de-facto standard for async callbacks in Node.js:
 *     callback(error, result)
 *   • First argument is always `error` (null if none).
 *   • Second (or more) arguments carry the result on success.
 *   Always check the error argument before using the result.
 *
 * CALLBACK PROBLEMS:
 *   1. Inversion of Control (IoC) — you hand your callback to a third-
 *      party function.  You no longer control WHEN or HOW MANY TIMES it
 *      is called, or WHETHER errors are handled before it runs. (→ CH 08)
 *   2. Callback Hell / Pyramid of Doom — deeply nested callbacks for
 *      sequential async work become unreadable and hard to maintain.
 *      Promises and async/await solve both problems. (→ CH 09-14)
 *
 * IMPORTANT POINTS:
 *   1. Synchronous callbacks run BEFORE the calling function returns;
 *      async callbacks run AFTER the current call stack unwinds.
 *   2. Always handle the error argument first in Node-style callbacks.
 *   3. Callback hell is not just an aesthetic problem — deeply nested
 *      error paths are easy to miss, causing silent failures.
 *   4. A callback is just a function — it can be arrow, named, or declared.
 *   5. Passing too many responsibilities to one callback violates SRP;
 *      split callbacks to keep each focused on one task.
 *   6. Array methods (map, filter, reduce) accept synchronous callbacks —
 *      they are NOT async, even though they look similar to event APIs.
 *   7. Promises wrap the callback pattern and restore control to the caller,
 *      while async/await makes the code look synchronous again.
 * ============================================================
 */

// 1. Basic Callback Example
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback(); // Execute the callback after greeting
}

function afterGreeting() {
    console.log("This is the callback function being executed.");
}

greet("Alice", afterGreeting);
// Output:
// Hello, Alice!
// This is the callback function being executed.

// 2. Callbacks with Asynchronous Operations (Simulating setTimeout)
function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        const data = { id: 1, name: "John Doe" };
        callback(data); // Passing data to the callback
    }, 2000); // Simulating a delay (2 seconds)
}

function processData(data) {
    console.log("Data received:", data);
}

fetchData(processData);
// Output:
// Fetching data...
// (After 2 seconds)
// Data received: { id: 1, name: 'John Doe' }

// 3. Using Callbacks with Array Methods
const numbers = [1, 2, 3, 4, 5];

// Using map with a callback function
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

// Using filter with a callback function
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]

// 4. Callback Example with Error Handling (Common in Node.js)
function divide(a, b, callback) {
    if (b === 0) {
        callback("Error: Division by zero");
    } else {
        callback(null, a / b);
    }
}

divide(10, 2, (error, result) => {
    if (error) {
        console.log(error); // Output: null
    } else {
        console.log(`Result: ${result}`); // Output: Result: 5
    }
});

divide(10, 0, (error, result) => {
    if (error) {
        console.log(error); // Output: Error: Division by zero
    } else {
        console.log(`Result: ${result}`);
    }
});

// 5. Callback Hell (Nested Callbacks)
function firstTask(callback) {
    setTimeout(() => {
        console.log("First task completed");
        callback();
    }, 1000);
}

function secondTask(callback) {
    setTimeout(() => {
        console.log("Second task completed");
        callback();
    }, 1000);
}

function thirdTask() {
    setTimeout(() => {
        console.log("Third task completed");
    }, 1000);
}

// Callback Hell: Nested callbacks
firstTask(() => {
    secondTask(() => {
        thirdTask();
    });
});
// Output:
// First task completed
// Second task completed
// Third task completed

// 6. Using Callbacks with setTimeout for Delayed Execution
function delayMessage(message, delay, callback) {
    setTimeout(() => {
        console.log(message);
        callback(); // Execute the callback after the delay
    }, delay);
}

function afterMessage() {
    console.log("This is the callback after the message.");
}

delayMessage("This message is delayed by 2 seconds", 2000, afterMessage);
// Output:
// (After 2 seconds)
// This message is delayed by 2 seconds
// This is the callback after the message.

/*
 * ============================================================
 *  CONCLUSION — Key Callback Takeaways
 * ============================================================
 *
 *  1. Callbacks are the OLDEST async pattern in JavaScript — every
 *     modern async tool (Promises, async/await) is built on top of them.
 *  2. Synchronous callbacks (array methods) run inline; asynchronous
 *     callbacks (setTimeout, etc.) run after the current stack clears.
 *  3. Always follow the Node error-first convention — check `err` before
 *     using the result, or else silent failures will haunt you.
 *  4. Callback hell is a structural problem: indent level directly
 *     represents coupling. Flatten it with named functions, Promises, or
 *     async/await (see CH 09 and CH 14).
 *  5. Inversion of Control is the deeper problem: you trust a 3rd-party
 *     function to call your callback correctly, at the right time, once.
 *     Promises restore that control to you.
 *  6. Array HOF callbacks (map, filter) are synchronous — you cannot
 *     use await inside them without wrapping the entire chain in an async
 *     function and using Promise.all.
 *  7. Refactoring callback-based code to Promises is mechanical: wrap the
 *     function body in `new Promise((resolve, reject) => { ... })` and
 *     call resolve/reject where the callback was called.
 * ============================================================
 */