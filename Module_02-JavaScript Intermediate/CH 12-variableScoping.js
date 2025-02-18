/*
 * Scoping with let, var, and const
*/

// 1. Global scope
var globalVar = "I am a global variable (var)";
let globalLet = "I am a global variable (let)";
const globalConst = "I am a global constant";

console.log(globalVar); // Accessible globally
console.log(globalLet); // Accessible globally
console.log(globalConst); // Accessible globally

// 2. Function scope (var is function-scoped or globally scoped variable)
// Outside a function, no matter where it is "var" will have global scope
function functionScopeExample() {
    if (true) {
        var functionScopedVar = "I am function-scoped (var)";
        let blockScopedLet = "I am block-scoped (let)";
        const blockScopedConst = "I am block-scoped (const)";

        console.log(functionScopedVar); // Accessible within the function
        console.log(blockScopedLet); // Accessible within the block
        console.log(blockScopedConst); // Accessible within the block
    }

    console.log(functionScopedVar); // Still accessible (function scope)
    // console.log(blockScopedLet); // Error: Not accessible outside the block
    // console.log(blockScopedConst); // Error: Not accessible outside the block
}

functionScopeExample();

// 3. Block scope (let and const)
function blockScopeExample() {
    for (let i = 0; i < 3; i++) {
        console.log("Inside block (let): i =", i); // i is block-scoped
    }
    // console.log(i); // Error: i is not accessible outside the block

    for (var j = 0; j < 3; j++) {
        console.log("Inside block (var): j =", j); // j is function-scoped
    }
    console.log("Outside block (var): j =", j); // Accessible (function scope)
}

blockScopeExample();

// 4. Temporal Dead Zone (TDZ)
function temporalDeadZoneExample() {
    // Accessing let or const before declaration will throw an error
    // console.log(temporaryLet); // Error: Cannot access 'temporaryLet' before initialization
    // console.log(temporaryConst); // Error: Cannot access 'temporaryConst' before initialization

    let temporaryLet = "I am declared with let";
    const temporaryConst = "I am declared with const";

    console.log(temporaryLet); // Output: I am declared with let
    console.log(temporaryConst); // Output: I am declared with const
}

temporalDeadZoneExample();

// 5. Redeclaration differences
function redeclarationExample() {
    var x = "I am declared with var";
    var x = "I am redeclared with var"; // No error (var allows redeclaration)

    let y = "I am declared with let";
    // let y = "I cannot be redeclared with let"; // Error: Cannot redeclare 'y'

    const z = "I am declared with const";
    // const z = "I cannot be redeclared with const"; // Error: Cannot redeclare 'z'

    console.log(x); // Output: I am redeclared with var
    console.log(y); // Output: I am declared with let
    console.log(z); // Output: I am declared with const
}

redeclarationExample();
