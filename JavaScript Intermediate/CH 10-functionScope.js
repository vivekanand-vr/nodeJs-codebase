/*
 *  Function Scope
 */

// Variables declared inside a function are scoped to that function
function showFunctionScope() {
    var functionScopedVar = "I am scoped to this function";
    console.log(functionScopedVar); // Accessible within the function
}

// This will throw an error because functionScopedVar is not accessible outside the function
// console.log(functionScopedVar);

// Nested functions and scope
function outerFunction() {
    var outerVar = "I belong to the outer function";

    function innerFunction() {
        console.log(outerVar); // Inner function can access outer function's variable
        var innerVar = "I belong to the inner function";
        console.log(innerVar);
    }

    innerFunction();

    // This will throw an error because innerVar is not accessible in the outer function
    // console.log(innerVar);
}

// Function scope with parameters
function greet(name) {
    var greeting = "Hello, " + name + "!";
    console.log(greeting);
}

// Testing function scope
showFunctionScope(); // Output: I am scoped to this function
outerFunction(); 
// Output:
// I belong to the outer function
// I belong to the inner function

greet("Alice"); // Output: Hello, Alice!

// Using `var` in function scope creates potential issues (var gets hoisted)
function hoistingExample() {
    console.log(hoistedVar); // Output: undefined (variable is hoisted but not assigned yet)
    var hoistedVar = "I am hoisted";
    console.log(hoistedVar); // Output: I am hoisted
}

hoistingExample();
