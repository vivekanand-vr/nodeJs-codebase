/*
 * Closures in JavaScript:
 * - A closure is a function that "remembers" the variables from its lexical scope even after the outer function has finished execution.
 * - Closures are created every time a function is defined inside another function and references variables from the outer function.
 */

/*
 * Example 1: Basic Closure
 */
function outerFunction(outerVariable) {
    return function innerFunction(innerVariable) {
        console.log(`Outer Variable: ${outerVariable}`);
        console.log(`Inner Variable: ${innerVariable}`);
    };
}

const closureExample = outerFunction("outside");
closureExample("inside");
// Output:
// Outer Variable: outside
// Inner Variable: inside

/*
 * Example 2: Closure for Private Variables
 */
function counter() {
    let count = 0; // Private variable
    return {
        increment: function () {
            count++;
            console.log(`Count: ${count}`);
        },
        decrement: function () {
            count--;
            console.log(`Count: ${count}`);
        },
    };
}

const myCounter = counter();
myCounter.increment(); // Count: 1
myCounter.increment(); // Count: 2
myCounter.decrement(); // Count: 1

/*
 * Example 3: Closure with Loops (Using let)
 */
function createFunctions() {
    const functions = [];
    for (let i = 0; i < 3; i++) {
        functions.push(function () {
            console.log(`Value of i: ${i}`);
        });
    }
    return functions;
}

const funcs = createFunctions();
funcs[0](); // Value of i: 0
funcs[1](); // Value of i: 1
funcs[2](); // Value of i: 2

/*
 * Example 4: Closure with Loops (Using var - Fixed with IIFE)
 */
function createFunctionsVar() {
    const functions = [];
    for (var i = 0; i < 3; i++) {
        (function (index) {
            functions.push(function () {
                console.log(`Value of i: ${index}`);
            });
        })(i); // Immediately Invoked Function Expression (IIFE)
    }
    return functions;
}

const funcsVar = createFunctionsVar();
funcsVar[0](); // Value of i: 0
funcsVar[1](); // Value of i: 1
funcsVar[2](); // Value of i: 2

/**
 * Example 5: Real-World Use Case of Closures (Debounce)
 *
 * 🔍 What is Debounce?
 * ---------------------
 * Debouncing is a programming pattern used to control how often a function is executed.
 * It ensures that the function is **only called once after a certain amount of time has passed**
 * since the **last time** it was invoked.
 *
 * Commonly used for:
 * - Handling input events (search bars, typeahead)
 * - Window resize or scroll events
 * - Preventing frequent API calls or updates
 *
 * 👨‍🏫 How it works:
 * ------------------
 * - When the debounced function is called, it sets a timer (setTimeout).
 * - If it's called again **before the delay ends**, the previous timer is cleared using clearTimeout.
 * - Only when there's a pause of `delay` milliseconds without new calls, the original callback executes.
 *
 * 🧠 Why does it work?
 * ---------------------
 * - JavaScript closures allow the inner function to **remember** and **access** `timeoutId` even after `debounce()` has returned.
 * - This `timeoutId` is retained across calls to cancel the previous timer and schedule a new one.
 *
 * ✅ Benefits:
 * - Reduces unnecessary executions
 * - Optimizes performance (especially in DOM-heavy or network-heavy applications)
 *
 * 📦 Real-world analogy:
 * - Think of pressing a button multiple times, but the action only occurs if you stop pressing it for a moment.
 */

function debounce(callback, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId); // Cancel previous timer if still waiting
        timeoutId = setTimeout(() => callback(...args), delay); // Set new delay
    };
}


const debouncedLog = debounce((message) => console.log(message), 2000);
debouncedLog("First call"); // Only this call will be logged after 2 seconds if no further calls occur
debouncedLog("Second call");

/*
 * Example 6: Closures in Asynchronous Code
 */
function asyncClosureExample() {
    for (var i = 1; i <= 3; i++) {
        setTimeout(function () {
            console.log(`Value with var: ${i}`); // Unexpected output: 4 (repeated 3 times)
        }, i * 1000);
    }

    for (let j = 1; j <= 3; j++) {
        setTimeout(function () {
            console.log(`Value with let: ${j}`); // Expected output: 1, 2, 3
        }, j * 1000);
    }
}

asyncClosureExample();

/*
 * Example 7: Closure with Function Factories
 */
function multiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log(double(5)); // Output: 10
console.log(triple(5)); // Output: 15
