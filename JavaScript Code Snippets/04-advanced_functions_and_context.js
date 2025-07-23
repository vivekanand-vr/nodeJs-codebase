// =============================================================================
// JavaScript Interview Practice - File 4: Advanced Functions & Context
// =============================================================================

// 1. Call, Apply, Bind Differences
function greet(greeting, punctuation) {
  return `${greeting} ${this.name}${punctuation}`;
}

const person = { name: 'John' };

console.log(greet.call(person, 'Hello', '!')); // "Hello John!"
console.log(greet.apply(person, ['Hi', '.'])); // "Hi John."
const boundGreet = greet.bind(person, 'Hey');
console.log(boundGreet('?')); // "Hey John?"
// Explanation: call takes individual arguments, apply takes array,
// bind returns new function with bound context and optional pre-filled arguments.

// 2. Function Currying Implementation
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
// Explanation: Currying transforms function to be callable with partial arguments.
// Returns new function until all arguments are provided.

// 3. Function Memoization
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit');
      return cache.get(key);
    }
    
    console.log('Computing...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

const expensiveFunction = memoize(function(n) {
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
});

console.log(expensiveFunction(1000)); // "Computing..." then result
console.log(expensiveFunction(1000)); // "Cache hit" then result
// Explanation: Memoization caches function results to avoid recalculation.
// Trades memory for performance in functions with expensive computations.

// 4. Function Context Loss and Solutions
const obj = {
  name: 'Object',
  method: function() {
    console.log(this.name);
  },
  asyncMethod: function() {
    setTimeout(function() {
      console.log(this.name); // undefined - context lost
    }, 100);
    
    setTimeout(() => {
      console.log(this.name); // 'Object' - arrow function preserves context
    }, 200);
    
    setTimeout(this.method.bind(this), 300); // 'Object' - explicit binding
  }
};

obj.asyncMethod();
// Explanation: Regular functions lose 'this' context in callbacks.
// Solutions: arrow functions, explicit binding, or storing context in variable.

// 5. Higher-Order Function with Multiple Returns
function createValidator(rules) {
  return function validate(value) {
    const errors = [];
    
    for (const rule of rules) {
      if (!rule.test(value)) {
        errors.push(rule.message);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      value: errors.length === 0 ? value : null
    };
  };
}

const emailValidator = createValidator([
  { test: v => v.includes('@'), message: 'Must contain @' },
  { test: v => v.length > 5, message: 'Must be longer than 5 chars' }
]);

console.log(emailValidator('test')); // { isValid: false, errors: [...], value: null }
console.log(emailValidator('test@example.com')); // { isValid: true, errors: [], value: 'test@example.com' }
// Explanation: Higher-order functions return functions with encapsulated logic.
// Useful for creating configurable, reusable functionality.

// 6. Function Composition and Pipe
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

const add1 = x => x + 1;
const multiply2 = x => x * 2;
const subtract3 = x => x - 3;

const composed = compose(subtract3, multiply2, add1);
const piped = pipe(add1, multiply2, subtract3);

console.log(composed(5)); // subtract3(multiply2(add1(5))) = subtract3(multiply2(6)) = subtract3(12) = 9
console.log(piped(5)); // same operations, different order
// Explanation: Compose applies functions right-to-left, pipe left-to-right.
// Both create function pipelines for data transformation.

// 7. Debounce Implementation
function debounce(func, delay) {
  let timeoutId;
  
  return function debounced(...args) {
    const context = this;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const expensiveSearch = debounce(function(query) {
  console.log(`Searching for: ${query}`);
}, 300);

expensiveSearch('a'); // Cancelled
expensiveSearch('ap'); // Cancelled  
expensiveSearch('app'); // Will execute after 300ms
// Explanation: Debouncing delays function execution until after delay period
// of inactivity. Useful for search inputs, resize handlers, etc.

// 8. Partial Application vs Currying
// Partial Application
function partial(fn, ...presetArgs) {
  return function(...remainingArgs) {
    return fn(...presetArgs, ...remainingArgs);
  };
}

function greetFull(greeting, name, punctuation) {
  return `${greeting} ${name}${punctuation}`;
}

const sayHello = partial(greetFull, 'Hello');
console.log(sayHello('World', '!')); // "Hello World!"

// Currying (from earlier)
const curriedGreet = curry(greetFull);
console.log(curriedGreet('Hi')('Alice')('.')); // "Hi Alice."
// Explanation: Partial application fixes some arguments upfront.
// Currying transforms to chain of single-argument functions.

// 9. Function Overloading Simulation
function createOverloadedFunction() {
  const functions = new Map();
  
  function overloaded(...args) {
    const key = args.map(arg => typeof arg).join(',');
    const fn = functions.get(key);
    
    if (fn) {
      return fn.apply(this, args);
    } else {
      throw new Error(`No overload found for signature: ${key}`);
    }
  }
  
  overloaded.add = function(signature, fn) {
    functions.set(signature, fn);
    return this;
  };
  
  return overloaded;
}

const math = createOverloadedFunction()
  .add('number,number', (a, b) => a + b)
  .add('string,string', (a, b) => a + ' ' + b)
  .add('number', (a) => a * 2);

console.log(math(5, 3)); // 8
console.log(math('Hello', 'World')); // "Hello World"
console.log(math(7)); // 14
// Explanation: JavaScript doesn't have native function overloading.
// This pattern simulates it by checking argument types.

// 10. Recursive Fibonacci with Trampolines
function trampoline(fn) {
  return function(...args) {
    let result = fn.apply(this, args);
    
    while (typeof result === 'function') {
      result = result();
    }
    
    return result;
  };
}

function fibonacci(n, a = 0, b = 1) {
  if (n === 0) return a;
  if (n === 1) return b;
  
  return () => fibonacci(n - 1, b, a + b); // Return function instead of calling
}

const trampolinedFib = trampoline(fibonacci);
console.log(trampolinedFib(1000)); // Won't cause stack overflow
// Explanation: Trampolines prevent stack overflow in recursive functions
// by converting recursion to iteration using returned functions.