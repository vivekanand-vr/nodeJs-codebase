/*
 * setTimeout and setInterval Functions:
 * - `setTimeout`: Executes a function after a specified delay (in milliseconds).
 * - `setInterval`: Repeatedly executes a function at a specified interval (in milliseconds).
 * - Both functions return a unique identifier (ID) that can be used with `clearTimeout` or `clearInterval` to stop the execution.
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
