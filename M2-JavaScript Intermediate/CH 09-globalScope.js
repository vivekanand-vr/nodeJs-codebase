/*
 *  Global Scope
 */

// A global variable is declared outside of any function, block, or object
var globalVar = "I am a global variable";

function displayGlobalVar() {
    console.log(globalVar); // Accessing the global variable inside a function
}

// Updating a global variable
function updateGlobalVar() {
    globalVar = "Global variable updated!";
}

// Declaring a global variable without 'var', 'let', or 'const' (not recommended)
function createImplicitGlobal() {
    implicitGlobal = "I am an implicit global variable"; // Automatically becomes global
}

// Testing the global variables
displayGlobalVar(); // Output: I am a global variable
updateGlobalVar();
displayGlobalVar(); // Output: Global variable updated!

createImplicitGlobal();
console.log(implicitGlobal); // Output: I am an implicit global variable
