/* 
 * Undefined vs Undeclared:
 * - Undefined: A variable is declared but not initialized. Accessing it gives `undefined`. State when the scope
 *              already knows about it but in the execution phase we have not allocated a value
 * - Undeclared: A variable is used without being declared. A variable state where we never formally declared a variable and before
 *               assigning it a value so that it has chance to become autoglobal, we try to use it.
 */

// Case 1: Undefined
function exampleUndefined() {
    let x; // Declared but not initialized
    console.log(x); // Output: undefined, because x is declared but no value is assigned
    x = 10; // Assign a value
    console.log(x); // Output: 10
}

exampleUndefined();

// Case 2: Undeclared
function exampleUndeclared() {
    // Uncomment the following line to see the error in strict mode:
    // console.log(y); // Error: y is not defined (undeclared variable)

    y = 20; // Auto-global (no declaration with let, var, or const)
    console.log(y); // Output: 20
}

exampleUndeclared();

// Accessing y outside the function (auto-global case)
console.log(y); // Output: 20, because y was automatically added to the global object

// Strict mode behavior
function strictModeExample() {
    'use strict';
    // Uncomment the next line to see the error:
    // z = 30; // Error: z is not defined (strict mode prevents auto-global creation)
}

strictModeExample();

// Similarity Example: Block Scope vs Function Scope
function scopeDifferenceExample() {
    if (true) {
        var a = "I am function-scoped (var)";
        let b = "I am block-scoped (let)";
    }

    console.log(a); // Output: I am function-scoped (accessible outside the block)
    // console.log(b); // Error: b is not defined (block-scoped variable)
}

scopeDifferenceExample();


/*
 *  More Example of Undefined and Undeclared Variables
 */

var teacher = "Alice"; // Global variable

function example1() {
    var teacher = "Bob"; // Local variable (function-scoped)
    
    // Undeclared variable
    teachingAssistant = "Charlie"; // Becomes auto-global (not declared with var, let, or const)

    console.log(teacher); // Output: Bob (local variable)
    console.log(teachingAssistant); // Output: Charlie (auto-global)
}

function example2() {
    console.log(subject); // Output: undefined (declared later with var but not initialized)
    var subject = "JavaScript"; // Declaration is hoisted but value is not
    console.log(subject); // Output: JavaScript

    // Trying to access an undeclared variable
    // Uncomment the line below to see the error:
    // console.log(course); // Error: course is not defined
}

// Testing the functions
console.log(teacher); // Output: Alice (global variable)
example1();

example2();

// Accessing the auto-global variable outside its function
console.log(teachingAssistant); // Output: Charlie (auto-global variable)


// Class Example 1
function fun(){
    teacher = "Vivekanand";
    console.log(teacher);
    var teacher = "JS";
}
fun(); // Output: Vivekanand

// Class Example 2
var fun = 10;
function gun(){
    console.log("Hello World");
}
gun(); // Hello World (Executes)
fun(); // Error -> Type Error 