/*
 * ============================================================
 *  PROMISE INTERNALS — EVENT LOOP, MICROTASK QUEUE, EXECUTION ORDER
 * ============================================================
 *
 * DEFINITION:
 *   Understanding HOW promises execute requires understanding the JavaScript
 *   Event Loop and the two task queues it manages.
 *
 * JAVASCRIPT EXECUTION MODEL:
 *   JS is single-threaded — only one piece of code executes at a time.
 *   The engine uses an Event Loop to handle asynchronous work:
 *
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  CALL STACK (synchronous, always first)                 │
 *   │  → executes all sync code line by line                  │
 *   └─────────────────────────────────────────────────────────┘
 *            ↓  (when call stack empties)
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  MICROTASK QUEUE  (higher priority)                     │
 *   │  → Promise .then/.catch/.finally handlers               │
 *   │  → queueMicrotask()                                     │
 *   │  → MutationObserver                                     │
 *   │  Drained FULLY before moving on                        │
 *   └─────────────────────────────────────────────────────────┘
 *            ↓  (when microtask queue is empty)
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  MACROTASK / CALLBACK QUEUE  (lower priority)           │
 *   │  → setTimeout, setInterval callbacks                    │
 *   │  → setImmediate (Node.js)                               │
 *   │  → I/O callbacks                                        │
 *   │  ONE task picked per event loop iteration              │
 *   └─────────────────────────────────────────────────────────┘
 *
 * EXECUTION ORDER RULE (memorize):
 *   Sync code → ALL microtasks → ONE macrotask → ALL microtasks → ...
 *
 * PROMISE EXECUTOR:
 *   The executor function inside `new Promise((resolve, reject) => {...})`
 *   runs SYNCHRONOUSLY — it is part of the call stack, not a queue.
 *
 * PROMISE HANDLERS (.then / .catch):
 *   They are ALWAYS asynchronous — queued as microtasks after the current
 *   call stack finishes, even if the Promise is already resolved.
 *
 * IMPORTANT POINTS:
 *   1. The Promise executor runs synchronously — immediately inside the
 *      constructor call, part of the current call stack.
 *   2. .then() / .catch() handlers are ALWAYS microtasks — they never
 *      run inline with the current synchronous block.
 *   3. Microtasks are fully drained before the event loop processes ANY
 *      macrotask — a long microtask chain starves setTimeout callbacks.
 *   4. setTimeout(fn, 0) does NOT run fn next — it queues to the macrotask
 *      queue, which only fires after the microtask queue is emptied.
 *   5. A rejected promise without a .catch() causes an unhandledRejection
 *      event in Node.js (terminates in strict mode) or a console warning.
 *   6. Chained .then() calls each create a new microtask — they execute
 *      one-per-event-loop-microtask-phase in order.
 *   7. process.nextTick() in Node.js runs even BEFORE the microtask queue —
 *      it has the highest async priority in Node.
 * ============================================================
 */

// Example 1: Understanding internal execution of Promises with setTimeout and handlers

function getRandomInt(max) {
  return Math.floor(Math.random() * max); // Generates a random int between 0 and max - 1
}

function createPromiseWithTimeout() {
    return new Promise(function executor(resolve, reject) {
        console.log("2. Entering the executor callback in the promise constructor");

        setTimeout(function () {
            let num = getRandomInt(10);  // Generates a random number between 0–9
            if (num % 2 === 0) {
                resolve(num);            // If even → resolve the promise
            } else {
                reject(num);             // If odd → reject the promise
            }
        }, 10000); // 10 seconds delay

        console.log("3. Exiting the executor callback in the promise constructor");
    });
}

console.log("1. Starting....");

const p = createPromiseWithTimeout(); // Function returns a new Promise

console.log("4. We are now waiting for the promise to complete");
console.log("5. Currently my promise object is like →", p);


// Attach resolve and reject handlers
p.then(
  function fulfillHandler(value) {
      console.log("6. Inside fulfill handler with value:", value);
      console.log("7. Promise after fulfillment is", p);
  },
  function rejectionHandler(value) {
      console.log("6. Inside rejection handler with value:", value);
      console.log("7. Promise after rejection is", p);
  }
);

/**
    | Step | Console Output                                                                                       | Why It Happens                                            |
    | ---- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
    | 1    | `1. Starting....`                                                                                    | Sync code before promise is created                       |
    | 2    | `2. Entering the executor callback...`                                                               | When `new Promise()` runs, executor is called immediately |
    | 3    | `3. Exiting the executor callback...`                                                                | Last line of executor before it returns                   |
    | 4    | `4. We are now waiting for the promise to complete`                                                  | Sync log after `createPromiseWithTimeout()`               |
    | 5    | `5. Currently my promise object is like → [object Promise { <pending> }]`                            | Promise is still pending                                  |
    | 6    | (after 10s) `6. Inside fulfill handler with value: x` or `6. Inside rejection handler with value: x` | After timeout → promise is settled                        |
    | 7    | `7. Promise after fulfillment/rejection is [object Promise { <fulfilled/rejected> }]`                | At this point the promise is no longer pending            |
 */


// Simple Promise that resolves immediately
const simplePromise = new Promise((resolve, reject) => {
  console.log("1. Inside Promise constructor");
  resolve("✅ Promise resolved");
});

// Timer function outside the promise (added to callback queue)
setTimeout(() => {
  console.log("4. Inside setTimeout (callback queue)");
}, 0);

// Multiple promise handlers (microtask queue)
simplePromise
  .then((value) => {
    console.log("2. First .then():", value);
  })
  .then(() => {
    console.log("3. Second .then(): runs after first");
  });

console.log("5. Script ends");

/**
    1. Inside Promise constructor
    5. Script ends
    2. First .then(): ✅ Promise resolved
    3. Second .then(): runs after first
    4. Inside setTimeout (callback queue)

    Event Loop Notes:
    - The setTimeout callback goes into the Callback Queue (also called Task Queue).
    - .then() callbacks (from Promises) go into the Microtask Queue.
    - Microtask Queue has higher priority than the Callback Queue.
    - After the call stack is empty, the Event Loop first processes all microtasks before moving to the callback queue.
 */


// Example 3: Promise fetch simulation
function fetchData(url) {
  return new Promise(function (resolve, reject) {
    console.log("Started downloading from", url);

    setTimeout(function processDownloading() {
      let data = "Dummy data";
      console.log("Download completed");
      resolve(data); // fulfills the promise with dummy data
    }, 7000); // simulates 7 seconds of download time
  });
}

console.log("Start");

let promiseObj = fetchData("skfbjkdjbfv");

// attaching a fulfillment handler to the returned promise
promiseObj.then(function A(value) {
  console.log("value is", value);
});

console.log("end");

/*
Behind the scenes:
------------------

1. "Start" is logged immediately — this is synchronous.

2. fetchData("skfbjkdjbfv") is called:
    - It returns a new Promise.
    - Inside the executor, "Started downloading from ..." is logged.
    - A 7-second setTimeout is scheduled to simulate an async task (downloading).

3. The promise is now in a "pending" state.
    - Control returns immediately to the calling line.
    - The `then()` attaches a fulfillment handler (`function A`) to be executed once the promise resolves.
    - The `then()` doesn't execute immediately, it just registers the callback.

4. "end" is logged — still part of the synchronous phase.

5. After ~7 seconds, setTimeout callback runs:
    - "Download completed" is logged.
    - The promise is resolved with value `"Dummy data"`.

6. The `.then()` fulfillment handler is put into the **microtask queue**.

7. Event loop picks the microtask:
    - Executes the `then()` handler and logs: `value is Dummy data`.

So final output will be:
------------------------
  Start  
  Started downloading from skfbjkdjbfv  
  end  
  Download completed  
  value is Dummy data
*/

/*
 * ============================================================
 *  CONCLUSION — Key Promise Internals Takeaways
 * ============================================================
 *
 *  1. The call stack runs to completion first — no async code ever
 *     interrupts synchronous execution mid-flight.
 *  2. The executor of `new Promise(...)` is SYNCHRONOUS — it belongs to
 *     the current call stack, not any queue.
 *  3. Promise .then() / .catch() handlers are MICROTASKS — they run after
 *     all synchronous code, but BEFORE any setTimeout callback.
 *  4. Microtask queue is drained COMPLETELY before the event loop picks
 *     the next macrotask — even newly added microtasks run before that.
 *  5. setTimeout(fn, 0) orders fn to the macrotask queue — last in the
 *     async priority order; Promise handlers always run before it.
 *  6. Chained .then() handlers each become a new microtask, running in
 *     order after the Promise settles.
 *  7. Visualize execution order as:
 *     sync → microtasks (fully) → ONE macrotask → microtasks (fully) → ...
 * ============================================================
 */
