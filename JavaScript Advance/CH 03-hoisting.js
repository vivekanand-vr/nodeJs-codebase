/*
 * Hoisting:
 *   Hoisting is a direct consequence of lexical parsing that happens in JS, due to which we are able to access 
 *   some funcions and variables before declaring them which gives us a notion that they are moved up in the file.
 */

// 1. Variable Hoisting with `var`
function varHoisting() {
    console.log(hoistedVar); // Output: undefined (hoisted, but not initialized)
    var hoistedVar = "I am hoisted!";
    console.log(hoistedVar); // Output: I am hoisted!
}

varHoisting();

// 2. Variable Hoisting with `let` and `const`
function letConstHoisting() {
    // console.log(hoistedLet); // Error: Cannot access 'hoistedLet' before initialization
    let hoistedLet = "I am NOT hoisted the same way as var!";
    console.log(hoistedLet); // Output: I am NOT hoisted the same way as var!

    // console.log(hoistedConst); // Error: Cannot access 'hoistedConst' before initialization
    const hoistedConst = "I am NOT hoisted the same way as var!";
    console.log(hoistedConst); // Output: I am NOT hoisted the same way as var!
}

letConstHoisting();

// 3. Function Declaration Hoisting
hoistedFunction(); // Output: I am a hoisted function!

function hoistedFunction() {
    console.log("I am a hoisted function!");
}

// 4. Function Expression Hoisting
// console.log(hoistedFuncExpression); // Output: undefined (hoisted, but not initialized)
// hoistedFuncExpression(); // Error: hoistedFuncExpression is not a function

var hoistedFuncExpression = function () {
    console.log("I am NOT hoisted like a function declaration!");
};

// Once initialized, it works:
hoistedFuncExpression(); // Output: I am NOT hoisted like a function declaration!

// 5. Class Declaration Hoisting
// console.log(HoistedClass); // Error: Cannot access 'HoistedClass' before initialization
class HoistedClass {
    constructor() {
        this.name = "Hoisted Class";
    }
}

// Once declared, the class works as expected:
const instance = new HoistedClass();
console.log(instance.name); // Output: Hoisted Class

// 6. Order Matters in Hoisting
function orderMatters() {
    console.log(declaredLater); // Output: undefined
    var declaredLater = "Now I am defined!";

    // Uncomment the line below to see the error:
    // console.log(declaredLaterWithLet); // Error: Cannot access 'declaredLaterWithLet' before initialization
    let declaredLaterWithLet = "I am defined with let!";
}

orderMatters();
