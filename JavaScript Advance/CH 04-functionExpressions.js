/*
 * Function Expressions:
 * - A function expression defines a function as part of an expression and can be either named or anonymous.
 * - Function expressions are not hoisted; they behave like variables declared with `var`, `let`, or `const`.
 */

// 1. Anonymous Function Expression
const greet = function () {
    console.log("Hello from an anonymous function expression!");
};
greet(); // Output: Hello from an anonymous function expression!


// 2. Named Function Expression
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1); // The function can reference itself using its name
};
console.log(factorial(5)); // Output: 120


// 3. Storing Function Expression in Variables
let sayHello = function () {
    console.log("Hello!");
};
sayHello(); // Output: Hello!


// Reassigning the variable
sayHello = function () {
    console.log("Hi, there!");
};
sayHello(); // Output: Hi, there!


// 4. Passing Function Expressions as Arguments
function executeCallback(callback) {
    callback(); // Executes the passed function
}
executeCallback(function () {
    console.log("Callback executed!");
}); // Output: Callback executed!


// 5. Returning Function Expressions
function createMultiplier(multiplier) {
    return function (value) {
        return value * multiplier;
    };
}
const double = createMultiplier(2);
console.log(double(5)); // Output: 10


// 6. Immediately Invoked Function Expression (IIFE)
(function () {
    console.log("IIFE executed immediately!");
})(); // Output: IIFE executed immediately!


// 7. Arrow Function Expression (Special Type)
const add = (a, b) => a + b;
console.log(add(3, 4)); // Output: 7


// 8. Conditional Function Expressions
const isEven = function (num) {
    return num % 2 === 0 ? "Even" : "Odd";
};
console.log(isEven(4)); // Output: Even
console.log(isEven(5)); // Output: Odd

// 9. Assigning Function Expressions to Object Properties
const calculator = {
    add: function (a, b) {
        return a + b;
    },
    subtract: function (a, b) {
        return a - b;
    },
};
console.log(calculator.add(10, 5)); // Output: 15
console.log(calculator.subtract(10, 5)); // Output: 5
