// =============================================================================
// JavaScript Interview Practice - File 3: Async Programming & Promises
// =============================================================================

// 1. Promise Resolution Order
console.log('1');
Promise.resolve().then(() => console.log('2'));
console.log('3');
setTimeout(() => console.log('4'), 0);
Promise.resolve().then(() => console.log('5'));
console.log('6');
// Output: 1, 3, 6, 2, 5, 4
// Explanation: Synchronous code runs first, then microtasks (Promises),
// then macrotasks (setTimeout). Event loop prioritizes microtask queue.

// 2. Promise Constructor Gotcha
const promise = new Promise((resolve, reject) => {
  console.log('Promise executor runs immediately');
  resolve('Success');
});
console.log('After promise creation');
promise.then(value => console.log(value));
// Output: "Promise executor runs immediately", "After promise creation", "Success"
// Explanation: Promise executor function runs synchronously during construction.
// Only .then() callbacks are asynchronous.

// 3. Promise.all vs Promise.allSettled
const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2')
];

Promise.all(promises)
  .then(results => console.log('All:', results))
  .catch(error => console.log('All failed:', error)); // "All failed: Error 1"

Promise.allSettled(promises)
  .then(results => console.log('AllSettled:', results));
  // AllSettled: [
  //   { status: 'fulfilled', value: 'Success 1' },
  //   { status: 'rejected', reason: 'Error 1' },
  //   { status: 'fulfilled', value: 'Success 2' }
  // ]
// Explanation: Promise.all fails fast on first rejection.
// Promise.allSettled waits for all promises and returns status of each.

// 4. Async/Await Error Handling Trap
async function fetchData() {
  try {
    const result = await fetch('/api/data').catch(err => {
      console.log('Caught in catch:', err);
      return { error: true }; // This makes the promise resolve, not reject!
    });
    console.log('Result:', result); // This will run even if fetch failed
  } catch (error) {
    console.log('Caught in try-catch:', error); // This won't run
  }
}
// Explanation: .catch() converts rejected promise to resolved promise.
// Use try-catch OR .catch(), not both, to avoid confusion.

// 5. Promise Chain vs Nested Promises
// Nested (bad)
function badChaining() {
  return fetch('/api/user')
    .then(response => {
      return fetch('/api/posts')
        .then(postsResponse => {
          return { user: response, posts: postsResponse };
        });
    });
}

// Flat chain (good)
function goodChaining() {
  return fetch('/api/user')
    .then(userResponse => {
      return fetch('/api/posts')
        .then(postsResponse => ({ user: userResponse, posts: postsResponse }));
    });
}

// Even better with async/await
async function bestApproach() {
  const user = await fetch('/api/user');
  const posts = await fetch('/api/posts');
  return { user, posts };
}
// Explanation: Avoid nested promises (callback hell). Use flat chains or async/await.
// Async/await makes code more readable and easier to debug.

// 6. Race Condition with Multiple Async Operations
let counter = 0;
async function incrementCounter() {
  const current = counter;
  await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
  counter = current + 1;
}

Promise.all([incrementCounter(), incrementCounter(), incrementCounter()])
  .then(() => console.log('Final counter:', counter)); // Might be 1, not 3!
// Explanation: Race condition occurs when multiple async operations modify shared state.
// The order of completion affects the final result.

// 7. Promise Memory Leak with Unhandled Rejections
function createMemoryLeak() {
  const largeData = new Array(1000000).fill('data');
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve(largeData);
      } else {
        reject(new Error('Random failure'));
      }
    }, 1000);
  });
}

// This can cause memory leaks if rejection is not handled
createMemoryLeak(); // No .catch() - unhandled rejection keeps largeData in memory
// Explanation: Unhandled promise rejections can prevent garbage collection
// of variables in the promise scope.

// 8. Async Function Return Value Confusion
async function getValue() {
  return 42; // Actually returns Promise.resolve(42)
}

async function getPromise() {
  return Promise.resolve(42); // Returns Promise.resolve(Promise.resolve(42))
}

console.log(getValue()); // Promise { 42 }
console.log(await getValue()); // 42
console.log(await getPromise()); // 42 (automatically unwrapped)
// Explanation: Async functions always return promises. Returning a promise
// from async function wraps it in another promise (but await unwraps it).

// 9. setTimeout vs setImmediate vs process.nextTick (Node.js)
console.log('start');

setTimeout(() => console.log('setTimeout'), 0);
setImmediate(() => console.log('setImmediate'));
process.nextTick(() => console.log('nextTick'));

Promise.resolve().then(() => console.log('Promise'));

console.log('end');
// Output in Node.js: start, end, nextTick, Promise, setTimeout, setImmediate
// Explanation: Event loop phases: nextTick > Promises > setTimeout > setImmediate.
// process.nextTick has highest priority in microtask queue.

// 10. Throttling with Promises
function throttlePromise(fn, delay) {
  let lastCall = 0;
  let timeoutId;
  
  return function(...args) {
    return new Promise((resolve, reject) => {
      const now = Date.now();
      const remaining = delay - (now - lastCall);
      
      if (remaining <= 0) {
        lastCall = now;
        fn.apply(this, args).then(resolve).catch(reject);
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          fn.apply(this, args).then(resolve).catch(reject);
        }, remaining);
      }
    });
  };
}

const throttledFetch = throttlePromise(
  url => fetch(url).then(r => r.json()),
  1000
);

// Usage
throttledFetch('/api/data').then(data => console.log(data));
throttledFetch('/api/data').then(data => console.log(data)); // Will wait 1 second
// Explanation: Throttling ensures function isn't called more than once per time period.
// This pattern is useful for API calls to avoid rate limiting.