/*
 * Lexical Scoping and Auto-globals:
 * - JavaScript uses lexical scoping, meaning a variable's scope is determined at the time of declaration.
 * - Inner functions can access variables from their outer (parent) functions, forming a closure.
 */

// 1. Lexical Scoping Basics
function outerFunction() {
    const outerVar = "I am in the outer function";

    function innerFunction() {
        console.log(outerVar); // Inner function can access the outer function's variable
    }

    innerFunction(); // Output: I am in the outer function
}
outerFunction();

// 2. Lexical Scoping with Nested Functions
function nestedFunctions() {
    const globalVar = "Global Scope";

    function levelOne() {
        const levelOneVar = "Level One Scope";

        function levelTwo() {
            const levelTwoVar = "Level Two Scope";

            function levelThree() {
                console.log(globalVar); // Accessible (lexical scope)
                console.log(levelOneVar); // Accessible (lexical scope)
                console.log(levelTwoVar); // Accessible (lexical scope)
            }

            levelThree();
        }

        levelTwo();
    }

    levelOne();
}
nestedFunctions();

// 3. Auto-Globals (Avoided but Demonstrated for Educational Purposes)
function createAutoGlobal() {
    autoGlobalVar = "I am an auto-global variable"; // Declared without let, var, or const
    console.log(autoGlobalVar);
}

createAutoGlobal();
console.log(autoGlobalVar); // Accessible globally (auto-global)

// 4. Lexical `this` in Arrow Functions vs Regular Functions
const lexicalThisExample = {
    name: "Lexical Example",

    regularFunction: function () {
        console.log("In regularFunction, this refers to:", this.name); // `this` refers to the object
    },

    arrowFunction: () => {
        console.log("In arrowFunction, this refers to:", this.name); // `this` refers to the enclosing scope (global)
    }
};

lexicalThisExample.regularFunction(); // Output: In regularFunction, this refers to: Lexical Example
lexicalThisExample.arrowFunction(); // Output: In arrowFunction, this refers to: undefined (global scope)

// 5. Auto-global issue with `this`
function autoGlobalWithThis() {
    this.autoGlobalThis = "This auto-global is tied to the global object";
}

autoGlobalWithThis();
console.log(globalThis.autoGlobalThis); // Access through globalThis (Node.js/Browser)

// 6. Preventing Auto-globals using 'use strict'
function strictModeExample() {
    'use strict';
    // autoStrictVar = "I will cause an error in strict mode"; // Uncomment to see the error
}

strictModeExample();
