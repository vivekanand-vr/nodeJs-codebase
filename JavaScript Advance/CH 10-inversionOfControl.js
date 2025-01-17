/*
 * Inversion of Control (IoC):
 * - Inversion of Control is a design principle where the control flow of a program is inverted.
 * - Instead of calling a function directly, you hand over the control of when and how it is executed to another function.
 * - IoC is commonly seen in callbacks, event listeners, promises, and dependency injection.
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
