/*
 * Async/Await in JavaScript:
 * - Async functions return a promise and make asynchronous code easier to read and write.
 * - `await` pauses the execution until the promise resolves or rejects.
 * - Always use `try...catch` for error handling.
 */

/*
 * Example 1: Basic Async/Await Function
 */
async function basicExample() {
    return "Hello, Async/Await!";
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
  