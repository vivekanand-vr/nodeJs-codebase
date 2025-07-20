/*
 * setTimeout and setInterval Functions:
 * - `setTimeout`: Executes a function after a specified delay (in milliseconds).
 * - `setInterval`: Repeatedly executes a function at a specified interval (in milliseconds).
 * - Both functions return a unique identifier (ID) that can be used with `clearTimeout` or `clearInterval` to stop the execution.
 * - JS is single-threaded but uses browser/Web APIs to handle async tasks.
 * - setTimeout/Interval are handled outside the main thread.
 * - After delay, callbacks are queued and picked when call stack is empty.
 */

/*
 * Examples of setTimeout and setInterval
 */

// 1. setTimeout() - Delayed Execution of Code
console.log("Start");

setTimeout(() => {
    console.log("This is executed after 2 seconds");
}, 2000); // Waits for 2 seconds (2000 milliseconds)

console.log("End"); // This will print immediately

// 2. setInterval() - Repeated Execution of Code
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`Counter: ${counter}`);

    if (counter === 5) {
        clearInterval(intervalId); // Stop the interval after 5 iterations
        console.log("Interval stopped");
    }
}, 1000); // Executes every 1 second (1000 milliseconds)

// 3. Clearing a setTimeout with clearTimeout()
const timeoutId = setTimeout(() => {
    console.log("This will not run");
}, 3000);

clearTimeout(timeoutId); // This will prevent the above code from executing
console.log("Timeout cleared");

// 4. Clearing a setInterval with clearInterval()
let repeatCounter = 0;
const intervalId2 = setInterval(() => {
    repeatCounter++;
    console.log(`Repeat counter: ${repeatCounter}`);

    if (repeatCounter === 3) {
        clearInterval(intervalId2); // Stops the interval after 3 repetitions
        console.log("Interval cleared");
    }
}, 1500); // Executes every 1.5 seconds (1500 milliseconds)

// 5. setTimeout with Recursive Calls
function countdown(seconds) {
    if (seconds === 0) {
        console.log("Time's up!");
        return;
    }
    console.log(`Countdown: ${seconds}`);
    setTimeout(() => countdown(seconds - 1), 1000);
}

countdown(5); // Starts countdown from 5 seconds

// 6. Delayed Execution with setTimeout and Multiple Functions
setTimeout(() => {
    console.log("First delayed execution (1 second)");
}, 1000);

setTimeout(() => {
    console.log("Second delayed execution (2 seconds)");
}, 2000);

setTimeout(() => {
    console.log("Third delayed execution (3 seconds)");
}, 3000);

// 7. setInterval for Repeating an Action
let i = 1;
const repeatAction = setInterval(() => {
    console.log(`Action repeated ${i} times`);
    i++;

    if (i > 3) {
        clearInterval(repeatAction); // Stops after 3 repetitions
        console.log("Action repetitions stopped");
    }
}, 1000); // Repeats every second


/**
 * Example: Multiple Functions with setTimeout and Native Methods
 * Goal: Understand how timers execute asynchronously and how native synchronous methods work in parallel.
 */

console.log("Script Start");

// Function 1: Uses map (synchronous) + setTimeout (1000ms)
function processNumbers() {
  const nums = [1, 2, 3];
  const squared = nums.map((n) => n * n);
  console.log("Squared Numbers:", squared);

  setTimeout(() => {
    console.log("Processed Numbers after 1 second:", squared);
  }, 1000);
}

// Function 2: Uses filter (synchronous) + setTimeout (500ms)
function filterWords() {
  const words = ["apple", "banana", "kiwi", "avocado"];
  const filtered = words.filter((w) => w.startsWith("a"));
  console.log("Filtered Words:", filtered);

  setTimeout(() => {
    console.log("Filtered Words after 0.5 second:", filtered);
  }, 500);
}

// Function 3: Uses Object.values + setTimeout (200ms)
function showUserInfo() {
  const user = {
    name: "John",
    age: 30,
    country: "India",
  };

  const values = Object.values(user);
  console.log("User Info:", values);

  setTimeout(() => {
    console.log("User Info after 0.2 second:", values);
  }, 200);
}

// Call all functions
processNumbers();
filterWords();
showUserInfo();

console.log("Script End");


/**
 * 
 * Expected Output: 
 * ----------------
    Script Start
    Squared Numbers: [ 1, 4, 9 ]
    Filtered Words: [ 'apple', 'avocado' ]
    User Info: [ 'John', 30, 'India' ]
    Script End
    User Info after 0.2 second: [ 'John', 30, 'India' ]
    Filtered Words after 0.5 second: [ 'apple', 'avocado' ]
    Processed Numbers after 1 second: [ 1, 4, 9 ]

 * JS first runs all synchronous code top to bottom.
 * Each setTimeout schedules its callback with the Web API.
 * Once delay is over and the call stack is clear, the callback is queued.
 * The event loop pushes queued callbacks back into the call stack one-by-one.
 */