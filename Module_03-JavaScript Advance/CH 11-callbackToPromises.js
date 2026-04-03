/*
 * ============================================================
 *  REFACTORING: CALLBACKS → PROMISES
 * ============================================================
 *
 * MOTIVATION:
 *   The same async pipeline (download → save → upload) is implemented
 *   here in two styles to illustrate the problems callbacks create and
 *   how Promises solve them.
 *
 * CALLBACK VERSION PROBLEMS:
 *   1. Callback Hell / Pyramid of Doom — each step nests one level deeper.
 *      Error handling must be repeated at every level.
 *   2. Inversion of Control — you hand your callback to each function and
 *      trust it will be called correctly.
 *   3. Hard to add new steps — inserting a step in the middle requires
 *      restructuring all surrounding indentation.
 *
 * PROMISE VERSION BENEFITS:
 *   1. Flat .then() chain — each step is at the same indentation level.
 *   2. Single .catch() — one error handler covers ALL steps in the chain.
 *   3. Composable — add or reorder steps by inserting/moving .then() calls.
 *   4. Caller controls the chain — Promises restore IoC to the caller.
 *
 * CONVERSION PATTERN (callback → Promise):
 *   BEFORE:
 *     function doThing(arg, callback) {
 *       setTimeout(() => callback(null, result), 1000);
 *     }
 *   AFTER:
 *     function doThing(arg) {
 *       return new Promise((resolve, reject) => {
 *         setTimeout(() => resolve(result), 1000);
 *       });
 *     }
 *
 * NODE.js util.promisify:
 *   Node.js provides `util.promisify(fn)` to automatically wrap any
 *   Node-style (error-first) callback function into a Promise-returning
 *   function — no manual wrapping needed.
 *   Example: const readFile = util.promisify(fs.readFile);
 *
 * IMPORTANT POINTS:
 *   1. The Promise version of each function returns a Promise instead of
 *      accepting a callback — this is the only structural change needed.
 *   2. The sequential .then() chain waits for each Promise to settle
 *      before starting the next step — same sequential behavior as the
 *      nested callback version, but flat and readable.
 *   3. If any step rejects, the .catch() at the end handles the error —
 *      no need for error-first checks at each step.
 *   4. For parallel execution of independent steps, use Promise.all([])
 *      instead of chaining .then() calls sequentially.
 *   5. async/await (CH 14) is syntactic sugar over the Promise chain —
 *      the underlying mechanism is identical.
 * ============================================================
 */

// ─── VERSION 1: CALLBACKS ───────────────────────────────────────────────────
console.log("=== Version 1: Callbacks ===");

function downloadData(url, callback) {
  console.log(`⬇️ Downloading from ${url}...`);
  setTimeout(() => {
    const data = `Data from ${url}`;
    console.log(`✅ Downloaded from ${url}`);
    callback(null, data);
  }, 1000);
}

function saveToFile(data, callback) {
  console.log(`💾 Saving data to file...`);
  setTimeout(() => {
    const fileName = `file_${Date.now()}.txt`;
    console.log(`✅ Data saved to ${fileName}`);
    callback(null, fileName);
  }, 1000);
}

function uploadFile(fileName, targetUrl, callback) {
  console.log(`📤 Uploading ${fileName} to ${targetUrl}...`);
  setTimeout(() => {
    console.log(`✅ Uploaded ${fileName} to ${targetUrl}`);
    callback(null, "Upload successful");
  }, 1000);
}

// Using the callback-based flow
downloadData("https://example.com/api/data", function (err, data) {
  if (err) return console.error("Download failed");

  saveToFile(data, function (err, fileName) {
    if (err) return console.error("Saving failed");

    uploadFile(fileName, "https://upload.example.com", function (err, result) {
      if (err) return console.error("Upload failed");

      console.log("🎉 All operations done (Callback):", result);
    });
  });
});


// ─── VERSION 2: PROMISES ────────────────────────────────────────────────────
console.log("\n=== Version 2: Promises ===");

function downloadDataPromise(url) {
  console.log(`⬇️ Downloading from ${url}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = `Data from ${url}`;
      console.log(`✅ Downloaded from ${url}`);
      resolve(data);
    }, 1000);
  });
}

function saveToFilePromise(data) {
  console.log(`💾 Saving data to file...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const fileName = `file_${Date.now()}.txt`;
      console.log(`✅ Data saved to ${fileName}`);
      resolve(fileName);
    }, 1000);
  });
}

function uploadFilePromise(fileName, targetUrl) {
  console.log(`📤 Uploading ${fileName} to ${targetUrl}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Uploaded ${fileName} to ${targetUrl}`);
      resolve("Upload successful");
    }, 1000);
  });
}

// Using the Promise-based flow
downloadDataPromise("https://example.com/api/data")
  .then((data) => saveToFilePromise(data))
  .then((fileName) => uploadFilePromise(fileName, "https://upload.example.com"))
  .then((result) => {
    console.log("🎉 All operations done (Promise):", result);
  })
  .catch((err) => {
    console.error("❌ Error occurred:", err);
  });

/*
 * ============================================================
 *  CONCLUSION — Callback-to-Promise Refactoring Takeaways
 * ============================================================
 *
 *  1. The structural change from callback to Promise is minimal: remove the
 *     callback parameter and return `new Promise((resolve, reject) => {...})`.
 *  2. Promise chains collapse nested callback pyramids into a flat sequence
 *     of .then() calls, dramatically improving readability.
 *  3. A single .catch() at the end of the chain handles errors from ANY
 *     step — eliminating repetitive error-first checks at every level.
 *  4. Promises restore Inversion of Control to the caller: you chain .then()
 *     handlers on the returned Promise instead of handing callbacks inward.
 *  5. For truly sequential steps (each depends on the previous), chain
 *     .then() calls; for independent parallel steps, use Promise.all().
 *  6. Node.js `util.promisify` automates wrapping error-first callback APIs
 *     into Promise-returning functions without manual wrapper code.
 *  7. async/await (CH 14) is syntactic sugar on top of this exact pattern —
 *     mastering Promises first makes async/await trivially understandable.
 * ============================================================
 */
