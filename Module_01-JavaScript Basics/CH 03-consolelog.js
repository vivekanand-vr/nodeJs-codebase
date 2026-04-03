/*
 * ============================================================
 *  CH 03 - Console Output in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  The `console` object provides access to the browser's (or
 *  Node.js's) debugging console. It is not part of the ECMAScript
 *  standard but is available in every modern JS runtime.
 *
 *  Most commonly used console methods:
 *    console.log()    — general output
 *    console.info()   — informational message (same as log in Node.js)
 *    console.warn()   — warning (yellow in browsers)
 *    console.error()  — error message (red, includes stack trace)
 *    console.table()  — display data as a formatted table
 *    console.group()  — start an indented group of messages
 *    console.groupEnd() — end the group
 *    console.time()   — start a performance timer
 *    console.timeEnd() — stop timer and print elapsed time
 *    console.count()  — count how many times a label has been called
 *    console.clear()  — clear the console
 *    console.dir()    — display an object's properties
 *    console.assert() — print an error only when a condition is false
 *
 *  KEY POINTS:
 *  -----------
 *  - console.log() always returns `undefined` — calling
 *    console.log(console.log(x)) will print x, then print "undefined".
 *  - You can pass multiple arguments to console.log() separated by commas
 *    and they will be printed space-separated on the same line.
 *  - process.stdout.write() (Node.js only) writes without a newline.
 *  - console.error() writes to stderr; console.log() writes to stdout.
 *  - String substitution: %s (string), %d/%i (integer), %f (float),
 *    %o/%O (object), %c (CSS styling in browser).
 * ============================================================
 */

// ─── 1. console.log — BASIC USAGE ──────────────────────────────

// Each call prints on a new line
console.log(12);             // Output: 12
console.log("vivekanand");   // Output: vivekanand
console.log(true);           // Output: true
console.log(null);           // Output: null
console.log(undefined);      // Output: undefined
console.log({ name: "vk" }); // Output: { name: 'vk' }
console.log([1, 2, 3]);      // Output: [ 1, 2, 3 ]

// Multiple arguments → printed space-separated on one line
console.log(true, 12, "vivek"); // Output: true 12 vivek
console.log("a", "b", "c");    // Output: a b c

// ─── 2. console.log RETURNS undefined ──────────────────────────

// console.log is defined internally and always returns 'undefined'
// So wrapping it inside another console.log prints the value first,
// then prints the return value of the inner call (undefined).
console.log(console.log(10));
// Output (two lines):
//   10
//   undefined

// ─── 3. STRING SUBSTITUTION / INTERPOLATION ────────────────────

// Old-style substitution placeholders (browser & Node.js):
console.log("Hello, %s! You are %d years old.", "Alice", 25);
// Output: Hello, Alice! You are 25 years old.

// Modern approach — template literals (preferred):
let name = "Vivekanand";
let score = 98;
console.log(`Hello, ${name}! Your score is ${score}.`);
// Output: Hello, Vivekanand! Your score is 98.

// ─── 4. console.info, console.warn, console.error ──────────────

console.info("This is an informational message.");   // Output: (info icon in browser)
console.warn("This is a warning!");                  // Output: (yellow warning in browser)
console.error("This is an error!");                  // Output: (red error in browser/Node)
// Note: console.error() writes to stderr; it won't appear in
//       redirected stdout but WILL appear in the terminal.

// ─── 5. console.table ──────────────────────────────────────────

// Displays arrays or objects in a structured table format
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob",   age: 30 },
    { name: "Carol", age: 28 },
];
console.table(users);
// Output (in Node.js / browser devtools):
// ┌─────────┬─────────┬─────┐
// │ (index) │  name   │ age │
// ├─────────┼─────────┼─────┤
// │    0    │ 'Alice' │ 25  │
// │    1    │  'Bob'  │ 30  │
// │    2    │ 'Carol' │ 28  │
// └─────────┴─────────┴─────┘

// ─── 6. console.group / console.groupEnd ───────────────────────

console.group("User Details");
    console.log("Name: Alice");
    console.log("Age:  25");
    console.group("Address");
        console.log("City: New York");
    console.groupEnd();
console.groupEnd();
// Output (indented in browser devtools or formatted in Node):
//   User Details
//     Name: Alice
//     Age:  25
//     Address
//       City: New York

// ─── 7. console.time / console.timeEnd ─────────────────────────

// Used to measure how long a block of code takes to run
console.time("loop-timer");
for (let i = 0; i < 1_000_000; i++) {} // empty loop
console.timeEnd("loop-timer");
// Output: loop-timer: 2.345ms  ← actual time will vary

// ─── 8. console.count ──────────────────────────────────────────

// Counts how many times it has been called with the same label
console.count("myLabel"); // Output: myLabel: 1
console.count("myLabel"); // Output: myLabel: 2
console.count("myLabel"); // Output: myLabel: 3
console.countReset("myLabel");
console.count("myLabel"); // Output: myLabel: 1  ← reset back to 1

// ─── 9. console.assert ─────────────────────────────────────────

// Prints an error ONLY when the condition is FALSE (silent when true)
console.assert(1 === 1, "This will NOT print"); // (no output — condition is true)
console.assert(1 === 2, "1 is not equal to 2"); // Output: Assertion failed: 1 is not equal to 2

// ─── 10. console.dir ───────────────────────────────────────────

// Displays an interactive list of an object's properties
const obj = { a: 1, b: { c: 2 } };
console.dir(obj);       // Output: { a: 1, b: { c: 2 } }
console.dir([1, 2, 3]); // Output: [ 1, 2, 3 ]

// ─── 11. process.stdout.write (Node.js only) ───────────────────

// Unlike console.log, this does NOT append a newline at the end.
// Useful for printing on the same line (e.g. progress indicators).
process.stdout.write("Hello ");
process.stdout.write("Vicky");
process.stdout.write("\n"); // manually add newline when needed
// Output: Hello Vicky  (all on one line)

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. console.log() is not just for strings — it accepts any value;
 *     objects and arrays are displayed in an inspectable format.
 *  2. console.log() always returns `undefined`, so wrapping it
 *     in another console.log() will print "undefined" on the next line.
 *  3. Multiple arguments to console.log() are printed space-separated
 *     on the same line — no need to concatenate manually.
 *  4. Use the right method for the right purpose:
 *       - log   → general debugging
 *       - warn  → something unexpected but non-fatal
 *       - error → something went wrong (writes to stderr)
 *       - table → human-readable display of arrays/objects
 *       - time  → performance measurement
 *  5. Template literals (backticks) are the preferred way to
 *     format strings for output, replacing %s substitution.
 *  6. process.stdout.write() is Node.js-specific and gives you
 *     fine-grained control over stdout without an automatic newline.
 *  7. Remove or guard console calls in production code — excessive
 *     logging can impact performance and leak sensitive data.
 * ============================================================
 */