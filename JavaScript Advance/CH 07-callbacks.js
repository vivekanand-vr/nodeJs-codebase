/*
 * Callbacks:
 * - A callback is a function passed into another function as an argument to be executed later.
 * - Callbacks are often used for handling asynchronous operations, such as handling events, or waiting for a process to complete.
 * - Common use cases include setTimeout, setInterval, array methods like map, filter, etc.
 */

/*
 * Examples of Callbacks
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