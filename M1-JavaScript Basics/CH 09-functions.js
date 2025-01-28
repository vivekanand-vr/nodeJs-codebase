/* 
 *  Functions
 */

// 1. Function Declaration
console.log("Function Declaration:");
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Alice")); // Output: Hello, Alice!

// 2. Function Expression
console.log("\nFunction Expression:");
const add = function (a, b) {
    return a + b;
};
console.log(add(5, 3)); // Output: 8

// 3. Arrow Functions
console.log("\nArrow Functions:");
const multiply = (a, b) => a * b; // Short syntax for one-liner functions
console.log(multiply(4, 2)); // Output: 8

// 4. Default Parameters
console.log("\nDefault Parameters:");
function greetWithDefault(name = "Guest") {
    return `Welcome, ${name}!`;
}
console.log(greetWithDefault());       // Output: Welcome, Guest!
console.log(greetWithDefault("Alice")); // Output: Welcome, Alice!

// 5. Rest Parameters
console.log("\nRest Parameters:");
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // Output: 15

// 6. Anonymous Functions
console.log("\nAnonymous Functions:");
setTimeout(function () {
    console.log("This is an anonymous function executed after 1 second.");
}, 1000);

// 7. Immediately Invoked Function Expression (IIFE)
console.log("\nIIFE:");
(function () {
    console.log("This function runs immediately upon definition!");
})();

// 8. Callback Functions
console.log("\nCallback Functions:");
function processNumber(num, callback) {
    return callback(num);
}
const square = (n) => n * n;
console.log(processNumber(5, square)); // Output: 25

// 9. Higher-Order Functions
console.log("\nHigher-Order Functions:");
function higherOrderFunction(operation) {
    return function (a, b) {
        return operation(a, b);
    };
}
const subtract = higherOrderFunction((x, y) => x - y);
console.log(subtract(10, 3)); // Output: 7

// 10. Closures
console.log("\nClosures:");
function outerFunction(outerValue) {
    return function innerFunction(innerValue) {
        return `Outer: ${outerValue}, Inner: ${innerValue}`;
    };
}
const closureExample = outerFunction("Hello");
console.log(closureExample("World")); // Output: Outer: Hello, Inner: World

// 11. Function with Objects and Arrays
console.log("\nFunctions with Objects and Arrays:");
function updatePerson(person) {
    person.age += 1;
}
const personObj = { name: "Alice", age: 30 };
updatePerson(personObj);
console.log(personObj); // Output: { name: 'Alice', age: 31 }

function doubleArray(arr) {
    return arr.map((num) => num * 2);
}
console.log(doubleArray([1, 2, 3])); // Output: [2, 4, 6]

// 12. Recursive Functions
console.log("\nRecursive Functions:");
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}
console.log(factorial(5)); // Output: 120

// 13. Function Scope
console.log("\nFunction Scope:");
function scopeExample() {
    let localVariable = "I'm local!";
    console.log(localVariable); // Output: I'm local!
}
// console.log(localVariable); // Error: localVariable is not defined

// 14. Asynchronous Functions (Async/Await)
console.log("\nAsync/Await:");
const fetchData = async () => {
    try {
        const data = await new Promise((resolve) => setTimeout(() => resolve("Data fetched"), 1000));
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
fetchData();

// Summary of Functions
console.log("\nSummary:");
console.log("Functions are versatile and can be declared, invoked, or passed as arguments in various ways!");
