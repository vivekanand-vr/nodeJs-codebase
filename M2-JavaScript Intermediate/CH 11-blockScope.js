/*
 *  Block Scope
 */

// Variables declared with 'let' and 'const' have block scope
function showBlockScope() {
    if (true) {
        let blockScopedVar = "I am scoped to this block";
        const anotherBlockScopedVar = "I am also scoped to this block";
        console.log(blockScopedVar); // Accessible here
        console.log(anotherBlockScopedVar); // Accessible here
    }

    // These will throw errors because blockScopedVar and anotherBlockScopedVar 
    // are not accessible outside the block
    // console.log(blockScopedVar);
    // console.log(anotherBlockScopedVar);
}

// Block scope in loops
function loopExample() {
    for (let i = 0; i < 3; i++) {
        console.log("Inside loop: i =", i); // Accessible inside the loop block
    }
    // This will throw an error because 'i' is not accessible outside the loop block
    // console.log("Outside loop: i =", i);
}

// Comparing 'var' with block-scoped variables
function varVsLet() {
    if (true) {
        var varVariable = "I am not block-scoped (function scoped)";
        let letVariable = "I am block-scoped";
    }

    console.log(varVariable); // Accessible because 'var' is function-scoped
    // console.log(letVariable); // Error: letVariable is block-scoped
}

// Testing block scope
showBlockScope();
// Output:
// I am scoped to this block
// I am also scoped to this block

loopExample();
// Output:
// Inside loop: i = 0
// Inside loop: i = 1
// Inside loop: i = 2

varVsLet();
// Output:
// I am not block-scoped (function scoped)
