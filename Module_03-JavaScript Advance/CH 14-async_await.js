/*
 * ============================================================
 *  ASYNC / AWAIT
 * ============================================================
 *
 * DEFINITION:
 *   async/await is syntactic sugar over Promises, introduced in ES2017.
 *   It lets you write asynchronous code that LOOKS and READS like
 *   synchronous code — without changing the underlying Promise semantics.
 *
 * async FUNCTION:
 *   • Declaring a function with `async` makes it ALWAYS return a Promise.
 *   • If the function returns a non-Promise value v, it's wrapped:
 *     Promise.resolve(v).
 *   • If it throws, the returned Promise rejects with that error.
 *
 * await EXPRESSION:
 *   • Can only be used INSIDE an async function (or at module top-level).
 *   • Pauses execution of the CURRENT async function until the Promise
 *     settles — other code (event loop) continues running while waiting.
 *   • If the Promise rejects, await throws the rejection reason — catch
 *     with try...catch.
 *
 * EXECUTION MODEL:
 *   async function is called → runs SYNCHRONOUSLY until first await →
 *   yields control (the caller continues) → resumes when Promise settles
 *   (as a microtask) → continues to next await, and so on.
 *
 * SEQUENTIAL vs PARALLEL:
 *   Sequential (one waits for the other):
 *     const a = await fetchA();  // finishes before fetchB starts
 *     const b = await fetchB();
 *
 *   Parallel (both run concurrently):
 *     const [a, b] = await Promise.all([fetchA(), fetchB()]);
 *
 * ERROR HANDLING:
 *   Use try...catch around await expressions to catch rejections.
 *   Without try...catch, an uncaught rejection results in an unhandled
 *   rejection warning (or crash in Node.js strict mode).
 *
 * IMPORTANT POINTS:
 *   1. An async function ALWAYS returns a Promise — callers must use
 *      .then() or await to get the resolved value.
 *   2. await only pauses the CURRENT async function — the outer event
 *      loop and other async operations continue running.
 *   3. If no await is used inside an async function, it runs fully
 *      synchronous-like but still returns a resolved Promise.
 *   4. Sequential awaits make each step wait for the previous —
 *      avoid this pattern when steps are independent (use Promise.all).
 *   5. await in a regular for...of loop is sequential (one at a time);
 *      use Promise.all with .map() for parallel iteration.
 *   6. Top-level await is supported in ES modules — useful for module
 *      initialization that depends on async resources.
 *   7. async/await preserves the same event loop ordering as raw Promises:
 *      the code after an await resumes as a microtask.
 * ============================================================
 */

/*
 * Example 1: async function always returns a Promise
 */
async function basicExample() {
    return "Hello, Async/Await!"; // auto-wrapped in Promise.resolve(...)
}

basicExample().then((result) => console.log(result));
// Output: Hello, Async/Await!

/*
 * Example 2: Using await with Promises
 */
async function fetchData() {
    const promise = new Promise((resolve) => setTimeout(() => resolve("Data fetched!"), 1000));
    const result = await promise;
    console.log(result);
}

fetchData();
// Output (after 1 second): Data fetched!

/*
 * Example 3: Error Handling with try...catch
 */
async function fetchWithError() {
    try {
        const promise = new Promise((_, reject) => setTimeout(() => reject("Fetching failed!"), 1000));
        const result = await promise;
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}

fetchWithError();
// Output (after 1 second): Error: Fetching failed!

/*
 * Example 4: Sequential Execution with Multiple Awaits
 */
async function sequentialExecution() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve("First data"), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second data"), 500));

    const result1 = await promise1;
    console.log(result1);

    const result2 = await promise2;
    console.log(result2);
}

sequentialExecution();
// Output:
// First data (after 1 second)
// Second data (after 1.5 seconds)

/*
 * Example 5: Parallel Execution using Promise.all with await
 */
async function parallelExecution() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve("First data"), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second data"), 500));

    const [result1, result2] = await Promise.all([promise1, promise2]);
    console.log(result1, result2);
}

parallelExecution();
// Output (after 1 second): First data Second data

/*
 * Example 6: Using await inside loops
 */
async function loopWithAwait() {
    const delays = [1000, 500, 200];
    for (const delay of delays) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        console.log(`Waited ${delay}ms`);
    }
}

loopWithAwait();
// Output:
// Waited 1000ms
// Waited 500ms
// Waited 200ms

/*
 *  Example 7:
 */
function fetchData(url) {
    return new Promise(function (resolve, reject) {
      console.log("Started downloading from", url);
      setTimeout(function processDownloading() {
        let data = "Dummy data";
        console.log("Download completed");
        resolve(data);
      }, 7000);
    });
  }
  
  async function processing() {
    console.log("Entering processing");
    let value1 = await fetchData("www.youtube.com");
    console.log("youtube downloading done");
    let value2 = await fetchData("www.google.com");
    console.log("google downloading done");
    console.log("Exiting processing");
    return value1 + value2;
  }
  
  console.log("Start");
  setTimeout(function timer1() {
    console.log("timer 1");
  }, 0);

  console.log("after setting timer 1");
  
  let x = processing();
  x.then(function (value) {
    console.log("finally processing promise resolves with", value);
  });
  setTimeout(function timer2() { console.log("timer 2");}, 1000);
  setTimeout(function timer3() { console.log("timer 3");}, 0);
  
  console.log("End");

/*
 * Expected output order for the execution trace above:
 *   Start
 *   after setting timer 1
 *   Entering processing
 *   after setting timer 1                     ← sync continues after processing()
 *   End
 *   timer 1                                   ← setTimeout(0) macrotask
 *   timer 3                                   ← setTimeout(0) macrotask
 *   Started downloading from www.youtube.com  ← executor runs sync
 *   (7 seconds elapse...)
 *   Download completed
 *   youtube downloading done
 *   Started downloading from www.google.com
 *   (7 seconds elapse...)
 *   Download completed
 *   google downloading done
 *   Exiting processing
 *   finally processing promise resolves with Dummy dataDummy data
 *   timer 2                                   ← setTimeout(1000) macrotask
 */

/*
 * ============================================================
 *  CONCLUSION — Key async/await Takeaways
 * ============================================================
 *
 *  1. async functions always return a Promise — callers use .then() or
 *     await to get the value; the return keyword wraps the value automatically.
 *  2. await pauses only the current async function — the rest of the program
 *     (event loop, timers, other async functions) continues running.
 *  3. Sequential awaits are simple but potentially slow — if steps are
 *     independent, use Promise.all([]) with destructuring to run in parallel.
 *  4. Error handling: wrap await calls in try...catch to handle rejections
 *     the same way you'd handle synchronous throw.
 *  5. An async function with no await behaves synchronously inside but still
 *     returns a Promise — the caller cannot get the value synchronously.
 *  6. Top-level await (ES2022) is available in ES modules — no need to
 *     wrap everything in an IIFE async function for module initialization.
 *  7. async/await is syntactic sugar over Promises and the microtask queue —
 *     everything about Promises (states, chaining, error propagation) still
 *     applies; async/await just makes the code read sequentially.
 * ============================================================
 */