// =============================================================================
// JavaScript Interview Practice - File 1: Closures & Scope
// =============================================================================

// 1. Classic Closure Loop Problem
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3
// Explanation: All setTimeout callbacks share the same 'i' variable from the outer scope.
// By the time callbacks execute, the loop has finished and i = 3.
// Fix: Use let instead of var, or create a closure with IIFE.

// 2. Function Hoisting vs Variable Hoisting
console.log(foo); // undefined
console.log(bar); // [Function: bar]
var foo = 'hello';
function bar() { return 'world'; }
// Explanation: Function declarations are fully hoisted, but variable declarations
// are only hoisted without their values (initialized as undefined).

// 3. Closure with Private Variables
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
}
const counter = createCounter();
console.log(counter.value()); // 0
console.log(counter.increment()); // 1
// Explanation: 'count' is private and can only be accessed through the returned methods.
// This demonstrates encapsulation using closures.

// 4. Temporal Dead Zone with let/const
console.log(x); // ReferenceError
let x = 5;
// Explanation: Unlike var, let/const variables are not accessible before declaration
// due to Temporal Dead Zone. They exist but are uninitialized.

// 5. Closure Memory Leak Scenario
function attachListeners() {
  const data = new Array(1000000).fill('data');
  document.getElementById('button').addEventListener('click', function() {
    console.log('clicked');
  });
  // The 'data' array remains in memory due to closure, even though unused
}
// Explanation: The event handler creates a closure that retains reference to
// the entire scope, including the large 'data' array, causing memory leak.

// 6. Block Scope Confusion
function test() {
  if (true) {
    var a = 1;
    let b = 2;
    const c = 3;
  }
  console.log(a); // 1
  console.log(b); // ReferenceError
  console.log(c); // ReferenceError
}
// Explanation: var is function-scoped, while let/const are block-scoped.
// a is accessible outside the if block, but b and c are not.

// 7. Closure with setTimeout and Index
function createFunctions() {
  const functions = [];
  for (let i = 0; i < 3; i++) {
    functions.push(() => console.log(i));
  }
  return functions;
}
const funcs = createFunctions();
funcs[0](); // 0
funcs[1](); // 1
funcs[2](); // 2
// Explanation: Each iteration of the loop creates a new binding for 'i' when using let.
// Each closure captures its own copy of 'i'.

// 8. Lexical Scope vs Dynamic Scope
const value = 'global';
function outer() {
  const value = 'outer';
  function inner() {
    console.log(value);
  }
  return inner;
}
const fn = outer();
fn(); // 'outer'
// Explanation: JavaScript uses lexical scoping. 'inner' function remembers
// the scope where it was defined, not where it's called from.

// 9. Closure with Module Pattern
const Module = (function() {
  let privateVar = 0;
  
  function privateMethod() {
    return privateVar * 2;
  }
  
  return {
    publicMethod: function() {
      privateVar++;
      return privateMethod();
    },
    getPrivateVar: function() {
      return privateVar;
    }
  };
})();

console.log(Module.publicMethod()); // 2
console.log(Module.getPrivateVar()); // 1
// Explanation: IIFE creates a module with private variables and methods.
// Only the returned object's methods are publicly accessible.

// 10. Arrow Functions and Lexical This
const obj = {
  name: 'Object',
  regularFunction: function() {
    console.log(this.name); // 'Object'
    
    const arrowFunction = () => {
      console.log(this.name); // 'Object'
    };
    
    function nestedFunction() {
      console.log(this.name); // undefined (in strict mode) or global object
    }
    
    arrowFunction();
    nestedFunction();
  }
};
obj.regularFunction();
// Explanation: Arrow functions inherit 'this' from enclosing scope (lexical this).
// Regular functions have their own 'this' context based on how they're called.