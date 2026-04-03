/*
 * ============================================================
 *  INVERSION OF CONTROL (IoC)
 * ============================================================
 *
 * DEFINITION:
 *   Inversion of Control is a design principle where the control flow of
 *   a program is INVERTED compared to procedural code.  Instead of your
 *   code calling a library function at a time you choose, you hand your
 *   code (a callback / handler) to the library, and it calls your code
 *   when it decides the time is right.
 *
 * THE TRUST PROBLEM WITH CALLBACKS:
 *   When you pass a callback to a 3rd-party function you implicitly TRUST
 *   that the 3rd party will:
 *   • Call your callback exactly ONCE (not zero, not twice).
 *   • Not call it too early or too late.
 *   • Pass the right arguments in the right order.
 *   • Handle any exceptions your callback throws.
 *   If any of these break, the bug is hard to track because the call site
 *   is in code you do NOT control.
 *
 * WHERE IoC APPEARS:
 *   Mechanism                 Who holds control?
 *   ────────────────────────  ─────────────────────────────
 *   Callback argument         The function you call
 *   Event listener            The browser / Node.js event loop
 *   setTimeout / setInterval  The runtime timer system
 *   Promise .then / .catch    The Promise implementation
 *   Dependency Injection      The IoC container / framework
 *
 * PROMISES SOLVE THE TRUST PROBLEM:
 *   Promises give control back to the CALLER:
 *   • .then() fires exactly once.
 *   • .catch() fires exactly once on rejection.
 *   • Results are immutable — they cannot be called again.
 *   → See CH 09 for the full Promises chapter.
 *
 * IMPORTANT POINTS:
 *   1. IoC through callbacks is a PATTERN, not inherently bad — but raw
 *      callbacks with 3rd parties carry implicit trust that's hard to verify.
 *   2. Event listeners are a controlled IoC pattern — the event system
 *      itself is trustworthy (browser / Node), but you can add multiple
 *      listeners for the same event (intentionally or accidentally).
 *   3. Dependency Injection is a form of IoC where you inject the
 *      dependency (e.g., a logger) into a function rather than hard-coding
 *      it — this makes the function more testable and flexible.
 *   4. Promises restore caller control by returning an object you can
 *      attach handlers to, rather than passing your handler into an
 *      unknown function.
 *   5. Framework-level IoC (React, Angular, Express middleware) is
 *      intentional and well-defined; the framework's lifecycle is documented
 *      and trustworthy.
 *   6. Testing becomes easier when IoC is explicit — you inject mock
 *      functions, making side effects observable and controllable.
 *   7. The antidote to callback-based IoC trust issues is Promises +
 *      async/await (CH 09, CH 14).
 * ============================================================
 */

/*
 * Example 1: Callback Functions (Basic IoC Example)
 * In this example, we hand over the control of function execution to `doWork`.
 */
function doWork(task, callback) {
    console.log(`Starting task: ${task}`);
    callback(); // Control is handed to the callback function
}

function onTaskComplete() {
    console.log("Task completed successfully!");
}

doWork("Clean the room", onTaskComplete);
// Output:
// Starting task: Clean the room
// Task completed successfully!

/*
 * Example 2: Event Listeners (IoC with Browser Events)
 * Here, we hand over control to the browser's event system.
 */
function handleClick() {
    console.log("Button clicked!");
}

// Control is inverted: the browser decides when `handleClick` is executed
document.addEventListener("click", handleClick);

/*
 * Example 3: setTimeout (IoC with Asynchronous Code)
 * Control is handed to the JavaScript runtime to execute the callback after the specified time.
 */
function delayedMessage() {
    console.log("This message is delayed by 2 seconds.");
}

// Control is managed by setTimeout
setTimeout(delayedMessage, 2000);
// Output (after 2 seconds):
// This message is delayed by 2 seconds.

/*
 * Example 4: Promises (IoC with Asynchronous Code)
 * Promises invert control of success and error handling to `.then` and `.catch`.
 */
function fetchData() {
    return new Promise((resolve, reject) => {
        console.log("Fetching data...");
        setTimeout(() => {
            const success = true; // Simulate success/failure
            if (success) {
                resolve("Data fetched successfully!");
            } else {
                reject("Error fetching data.");
            }
        }, 1000);
    });
}

// Control is handed over to .then and .catch
fetchData()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });
// Output:
// Fetching data...
// Data fetched successfully! (after 1 second)

/*
 * Example 5: Dependency Injection (IoC for Flexibility)
 * Control over which dependency to use is passed into a function.
 */
function logger(message) {
    console.log(`Log: ${message}`);
}

function errorLogger(message) {
    console.error(`Error: ${message}`);
}

function processTask(task, logFunction) {
    console.log(`Processing: ${task}`);
    logFunction("Task has been processed.");
}

// Control over logging behavior is injected
processTask("Upload file", logger);
// Output:
// Processing: Upload file
// Log: Task has been processed.

processTask("Delete file", errorLogger);
// Output:
// Processing: Delete file
// Error: Task has been processed.

/*
 * ============================================================
 *  CONCLUSION — Key IoC Takeaways
 * ============================================================
 *
 *  1. IoC means transferring "when to execute my code" decisions from your
 *     code to another function, framework, or the runtime environment.
 *  2. Callbacks are the most primitive IoC mechanism — you pass your logic
 *     in and trust the receiver to call it correctly and once.
 *  3. Event listeners invert control to the browser/Node event system —
 *     this is intentional and well-defined IoC.
 *  4. setTimeout/setInterval invert control to the runtime timer — your
 *     callback runs when the runtime decides, not when you call it.
 *  5. Dependency Injection (passing loggers, services, handlers as args)
 *     is a controlled, explicit form of IoC that improves testability.
 *  6. The core problem with callback-based IoC is TRUST — you cannot
 *     guarantee a 3rd-party will call your callback the right amount of
 *     times, at the right time, with the right arguments.
 *  7. Promises (CH 09) restore caller control: they are objects you
 *     observe, not handlers you hand over — resolving the trust problem.
 * ============================================================
 */
