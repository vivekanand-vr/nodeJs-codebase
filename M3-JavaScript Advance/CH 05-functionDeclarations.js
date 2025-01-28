/*
 * Function Declarations:
 * - Function declarations are hoisted, meaning they can be invoked before their definition.
 * - These are globally or function-scoped, depending on where they are declared.
 * - Syntax:
 *       function functionName(parameters) {
 *           // Function body
 *       }
 * - Function declarations are ideal for reusable, named functions.
 */

// 1. Basic Function Declaration
function greet() {
    console.log("Hello from a function declaration!");
}
greet(); // Output: Hello from a function declaration!


// 2. Function with Parameters
function add(a, b) {
    return a + b;
}
console.log(add(3, 5)); // Output: 8


// 3. Function with Default Parameters
function multiply(a, b = 1) {
    return a * b;
}
console.log(multiply(5)); // Output: 5 (b defaults to 1)
console.log(multiply(5, 3)); // Output: 15


// 4. Function Hoisting
console.log(square(4)); // Output: 16 (function declaration is hoisted)
function square(x) {
    return x * x;
}


// 5. Recursive Function
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1); // Recursive call
}
console.log(factorial(5)); // Output: 120


// 6. Functions with Return Statements
function checkEven(num) {
    if (num % 2 === 0) {
        return "Even";
    }
    return "Odd";
}
console.log(checkEven(4)); // Output: Even
console.log(checkEven(7)); // Output: Odd


// 7. Nested Functions (Function within Function)
function outerFunction() {
    console.log("This is the outer function.");

    function innerFunction() {
        console.log("This is the inner function.");
    }

    innerFunction(); // Calling the inner function
}
outerFunction(); 
// Output:
// This is the outer function.
// This is the inner function.


// 8. Returning Functions
function createAdder(x) {
    return function (y) {
        return x + y;
    };
}
const addFive = createAdder(5);
console.log(addFive(10)); // Output: 15


// 9. Functions as Object Properties
const mathOperations = {
    subtract: function (a, b) {
        return a - b;
    },
};
console.log(mathOperations.subtract(10, 4)); // Output: 6


// 10. Functions with Rest Parameters
function printAll(...args) {
    console.log("Arguments:", args);
}
printAll(1, 2, 3, 4, 5); // Output: Arguments: [1, 2, 3, 4, 5]
