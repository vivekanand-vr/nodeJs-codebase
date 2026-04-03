/*
 * ============================================================
 *  TIMING FUNCTIONS — setTimeout, setInterval, clearTimeout, clearInterval
 * ============================================================
 *
 * DEFINITION:
 *   Timing functions schedule callbacks to run at a later time.
 *   They are provided by the runtime environment (browser Web API /
 *   Node.js timer API) — NOT by the JS language itself.
 *   The main thread stays free while the timer counts down outside it.
 *
 * FUNCTIONS:
 *   Function              Description
 *   ─────────────────     ─────────────────────────────────────────────
 *   setTimeout(fn, ms)    Run fn ONCE after ≥ ms milliseconds.
 *   setInterval(fn, ms)   Run fn REPEATEDLY every ≥ ms milliseconds.
 *   clearTimeout(id)      Cancel a pending setTimeout.
 *   clearInterval(id)     Stop an active setInterval.
 *   queueMicrotask(fn)    Queue fn as a microtask (runs before callbacks).
 *
 * KEY CONCEPTS:
 *   • The delay is a MINIMUM — if the call stack is busy, the callback
 *     waits longer (JS is single-threaded).
 *   • setTimeout with delay 0 is still async — it queues to the callback
 *     queue and runs after all synchronous code AND all microtasks.
 *   • Both functions return a numeric ID that can be stored and passed to
 *     the clear* functions to cancel the scheduled callback.
 *   • Recursive setTimeout can replace setInterval with more flexibility
 *     (next call starts AFTER the previous one completes).
 *
 * EVENT LOOP ORDER (priority, high → low):
 *   1. Call stack (synchronous execution)
 *   2. Microtask queue (Promise.then, queueMicrotask)
 *   3. Macrotask / Callback queue (setTimeout, setInterval, I/O)
 *
 * IMPORTANT POINTS:
 *   1. setTimeout(fn, 0) does NOT run fn immediately — it defers until the
 *      current stack and all pending microtasks have completed.
 *   2. Always store the return ID when you may need to cancel the timer.
 *   3. setInterval schedules the NEXT call at the fixed interval regardless
 *      of how long the callback takes — use recursive setTimeout to avoid
 *      overlap when callbacks can be slower than the interval.
 *   4. Nested setTimeouts (recursive countdown) are cleaner for sequential
 *      async steps than setInterval because each step controls the next.
 *   5. Clearing a timer after it has already fired is safe — it is a no-op.
 *   6. Timers in Node.js also have setImmediate() (runs after I/O events,
 *      before timers) and process.nextTick() (microtask-like, highest priority).
 *   7. Never rely on exact timing — use timers for "at least N ms" semantics.
 * ============================================================
 */

// ─── 1. setTimeout — deferred once ──────────────────────────────────────────
console.log("=== 1. Basic setTimeout ===");
console.log("Start");

setTimeout(() => {
    console.log("This is executed after 2 seconds");
}, 2000); // Waits for 2 seconds (2000 milliseconds)

console.log("End"); // This will print immediately

// ─── 2. setInterval — repeated execution ────────────────────────────────────
console.log("\n=== 2. setInterval ===");
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`Counter: ${counter}`);

    if (counter === 5) {
        clearInterval(intervalId); // Stop the interval after 5 iterations
        console.log("Interval stopped");
    }
}, 1000); // Executes every 1 second (1000 milliseconds)

// ─── 3. clearTimeout — cancel before it fires ────────────────────────────────
console.log("\n=== 3. clearTimeout ===");
const timeoutId = setTimeout(() => {
    console.log("This will not run");
}, 3000);

clearTimeout(timeoutId); // This will prevent the above code from executing
console.log("Timeout cleared");

// ─── 4. clearInterval — stop repeating ──────────────────────────────────────
console.log("\n=== 4. clearInterval ===");
let repeatCounter = 0;
const intervalId2 = setInterval(() => {
    repeatCounter++;
    console.log(`Repeat counter: ${repeatCounter}`);

    if (repeatCounter === 3) {
        clearInterval(intervalId2); // Stops the interval after 3 repetitions
        console.log("Interval cleared");
    }
}, 1500); // Executes every 1.5 seconds (1500 milliseconds)

// ─── 5. Recursive setTimeout — countdown ─────────────────────────────────────
console.log("\n=== 5. Recursive setTimeout (countdown) ===");
function countdown(seconds) {
    if (seconds === 0) {
        console.log("Time's up!");
        return;
    }
    console.log(`Countdown: ${seconds}`);
    setTimeout(() => countdown(seconds - 1), 1000);
}

countdown(5); // Starts countdown from 5 seconds

// ─── 6. setTimeout with 0 delay — deferred to end of current stack ───────────
console.log("\n=== 6. setTimeout(fn, 0) — runs AFTER sync code and microtasks ===");

console.log("A — sync");
setTimeout(() => console.log("C — setTimeout(0) callback"), 0);
Promise.resolve().then(() => console.log("B — microtask (.then)"));
console.log("D — sync");
// Output order: A → D → B → C
// Reason: sync runs first, then microtask queue, then callback queue (setTimeout)

// ─── 7. Staggered setTimeouts ───────────────────────────────────────────────
console.log("\n=== 7. Multiple staggered setTimeouts ===");
setTimeout(() => {
    console.log("First delayed execution (1 second)");
}, 1000);

setTimeout(() => {
    console.log("Second delayed execution (2 seconds)");
}, 2000);

setTimeout(() => {
    console.log("Third delayed execution (3 seconds)");
}, 3000);

/*
 * ============================================================
 *  CONCLUSION — Key Timing Function Takeaways
 * ============================================================
 *
 *  1. Timing functions are environment APIs (Web API / Node.js), not part
 *     of the JS language itself — the engine's call stack stays free while
 *     the timer counts down in parallel.
 *  2. The delay is a MINIMUM guarantee, not exact — a busy call stack will
 *     delay execution beyond the specified ms.
 *  3. setTimeout(fn, 0) still runs AFTER all synchronous code and all
 *     microtasks (Promise.then) because it enters the macrotask queue.
 *  4. Always store the return ID when you may need to cancel;
 *     clearTimeout/clearInterval are no-ops if the timer has already fired.
 *  5. Recursive setTimeout is preferred over setInterval for sequential
 *     step-by-step async work — each step explicitly schedules the next,
 *     preventing overlap when a callback takes longer than the interval.
 *  6. setInterval does NOT adjust for callback execution time — use
 *     recursive setTimeout when interval accuracy matters.
 *  7. Execution order: sync → microtask queue → macrotask (setTimeout/cb).
 *     Understanding this order is essential for debugging async behavior.
 * ============================================================
 */

// 7. setInterval for Repeating an Action
let i = 1;
const repeatAction = setInterval(() => {
    console.log(`Action repeated ${i} times`);
    i++;

    if (i > 3) {
        clearInterval(repeatAction); // Stops after 3 repetitions
        console.log("Action repetitions stopped");
    }
}, 1000); // Repeats every second


/**
 * Example: Multiple Functions with setTimeout and Native Methods
 * Goal: Understand how timers execute asynchronously and how native synchronous methods work in parallel.
 */

console.log("Script Start");

// Function 1: Uses map (synchronous) + setTimeout (1000ms)
function processNumbers() {
  const nums = [1, 2, 3];
  const squared = nums.map((n) => n * n);
  console.log("Squared Numbers:", squared);

  setTimeout(() => {
    console.log("Processed Numbers after 1 second:", squared);
  }, 1000);
}

// Function 2: Uses filter (synchronous) + setTimeout (500ms)
function filterWords() {
  const words = ["apple", "banana", "kiwi", "avocado"];
  const filtered = words.filter((w) => w.startsWith("a"));
  console.log("Filtered Words:", filtered);

  setTimeout(() => {
    console.log("Filtered Words after 0.5 second:", filtered);
  }, 500);
}

// Function 3: Uses Object.values + setTimeout (200ms)
function showUserInfo() {
  const user = {
    name: "John",
    age: 30,
    country: "India",
  };

  const values = Object.values(user);
  console.log("User Info:", values);

  setTimeout(() => {
    console.log("User Info after 0.2 second:", values);
  }, 200);
}

// Call all functions
processNumbers();
filterWords();
showUserInfo();

console.log("Script End");


/**
 * 
 * Expected Output: 
 * ----------------
    Script Start
    Squared Numbers: [ 1, 4, 9 ]
    Filtered Words: [ 'apple', 'avocado' ]
    User Info: [ 'John', 30, 'India' ]
    Script End
    User Info after 0.2 second: [ 'John', 30, 'India' ]
    Filtered Words after 0.5 second: [ 'apple', 'avocado' ]
    Processed Numbers after 1 second: [ 1, 4, 9 ]

 * JS first runs all synchronous code top to bottom.
 * Each setTimeout schedules its callback with the Web API.
 * Once delay is over and the call stack is clear, the callback is queued.
 * The event loop pushes queued callbacks back into the call stack one-by-one.
 */