/*
 * ============================================================
 *  CH 08 - Loops in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  Loops repeat a block of code as long as a condition is true,
 *  or for each element in a collection.
 *
 *  JavaScript has six loop constructs:
 *    1. for          — when you know the number of iterations
 *    2. while        — when you don't know how many iterations
 *    3. do...while   — like while, but body always runs AT LEAST ONCE
 *    4. for...in     — iterates over an object's enumerable KEYS
 *    5. for...of     — iterates over ITERABLE values (arrays, strings, Maps…)
 *    6. forEach()    — array method; callback for each element (no break support)
 *
 *  CONTROL FLOW IN LOOPS:
 *  ----------------------
 *    break     — immediately exits the loop
 *    continue  — skips the rest of the current iteration, goes to next
 *    Labels    — named loops; used with break/continue to exit nested loops
 *
 *  KEY POINTS:
 *  -----------
 *  - for...in should NOT be used on arrays — it iterates property keys
 *    (including inherited ones). Use for...of or forEach for arrays.
 *  - for...of cannot iterate plain objects (they are not iterable).
 *    Use for...in or Object.entries() for objects.
 *  - forEach() cannot be broken out of with `break` — use for...of instead.
 *  - do...while guarantees the body executes at least once, even if
 *    the condition is initially false. This is its main use-case.
 *  - Infinite loops occur when the exit condition is never met —
 *    always ensure the loop variable is updated correctly.
 * ============================================================
 */

// ─── 1. for LOOP ───────────────────────────────────────────────

console.log("for Loop:");
// Anatomy: for (initialization; condition; update)
for (let i = 1; i <= 5; i++) {
    console.log(`Iteration ${i}`);
    // Output: Iteration 1 … Iteration 5
}

// Counting backwards
for (let i = 5; i >= 1; i--) {
    process.stdout.write(i + " ");
}
console.log(); // newline
// Output: 5 4 3 2 1

// Step by 2
for (let i = 0; i <= 10; i += 2) {
    process.stdout.write(i + " ");
}
console.log();
// Output: 0 2 4 6 8 10

// ─── 2. while LOOP ─────────────────────────────────────────────

console.log("\nwhile Loop:");
// Use when you don't know the iteration count upfront
let count = 1;
while (count <= 5) {
    console.log(`Count is: ${count}`);
    count++;
}
// Output: Count is: 1 … Count is: 5

// Condition starts false → body NEVER runs (0 times)
let n = 100;
while (n < 10) {
    console.log("This never prints"); // Not reached
}
console.log("while with false condition: body skipped");
// Output: while with false condition: body skipped

// ─── 3. do...while LOOP ────────────────────────────────────────

console.log("\ndo...while Loop:");
// Body ALWAYS executes at least once before the condition is checked
let num = 1;
do {
    console.log(`Number is: ${num}`);
    num++;
} while (num <= 5);
// Output: Number is: 1 … Number is: 5

// Key difference from while — body runs even when condition is false initially:
let startFalse = 100;
do {
    console.log("do...while ran once even though 100 < 10 is false");
    startFalse++;
} while (startFalse < 10);
// Output: do...while ran once even though 100 < 10 is false

// ─── 4. for...in LOOP (object keys) ───────────────────────────

console.log("\nfor...in Loop (objects):");
const person = { name: "John", age: 30, city: "New York" };

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
    // Output: name: John | age: 30 | city: New York
}

// ⚠️ for...in on arrays — AVOID: iterates string indices + inherited props
const arr = [10, 20, 30];
for (let index in arr) {
    process.stdout.write(index + " "); // Outputs: "0 1 2 " (string indices, not values)
}
console.log("<-- string keys, not values! Use for...of instead");

// ─── 5. for...of LOOP (iterable values) ────────────────────────

console.log("\nfor...of Loop (arrays & iterables):");

const fruits = ["Apple", "Banana", "Cherry"];
for (let fruit of fruits) {
    console.log(fruit);
    // Output: Apple | Banana | Cherry
}

// Iterating a string character by character
const word = "Hello";
for (let char of word) {
    process.stdout.write(char + "-");
}
console.log();
// Output: H-e-l-l-o-

// Iterating a Map (key-value pairs)
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (let [key, val] of map) {
    console.log(`${key} → ${val}`);
    // Output: a → 1 | b → 2 | c → 3
}

// Iterating a Set (unique values)
const set = new Set([1, 2, 2, 3, 3, 3]);
for (let val of set) {
    process.stdout.write(val + " ");
}
console.log();
// Output: 1 2 3  (duplicates removed by Set)

// ─── 6. forEach() ──────────────────────────────────────────────

console.log("\nforEach (array method):");
const numbers = [10, 20, 30, 40];
numbers.forEach((num2, index) => {
    console.log(`Index ${index}: ${num2}`);
    // Output: Index 0: 10 … Index 3: 40
});

// ⚠️ forEach cannot be stopped with break/return — use for...of for that
let found = false;
numbers.forEach(n2 => {
    if (n2 === 20) found = true;
    // you cannot `break` here — loop always runs to the end
});
console.log("Found 20:", found); // Output: Found 20: true

// ─── 7. break STATEMENT ────────────────────────────────────────

console.log("\nbreak:");
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log("Breaking at 5");
        break; // exits the loop entirely
    }
    process.stdout.write(i + " ");
}
console.log();
// Output: 1 2 3 4
//         Breaking at 5

// ─── 8. continue STATEMENT ─────────────────────────────────────

console.log("\ncontinue (skip even numbers):");
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) continue; // skip even numbers
    process.stdout.write(i + " ");
}
console.log();
// Output: 1 3 5 7 9

// ─── 9. LABELED LOOPS (break out of nested loops) ──────────────

console.log("\nLabeled break (exit outer loop from inner):");
outerLoop: for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            console.log(`Breaking outer at i=${i}, j=${j}`);
            break outerLoop; // exits BOTH loops
        }
        console.log(`i=${i}, j=${j}`);
    }
}
// Output:
//   i=1, j=1 | i=1, j=2 | i=1, j=3 | i=2, j=1
//   Breaking outer at i=2, j=2

// ─── 10. NESTED LOOPS ──────────────────────────────────────────

console.log("\nNested Loops (multiplication table 1–3):");
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        process.stdout.write(`${i * j}\t`);
    }
    console.log();
}
// Output:
//   1   2   3
//   2   4   6
//   3   6   9

// ─── 11. ITERATING OBJECT with Object.entries() ────────────────

console.log("\nObject Iteration with Object.entries() + for...of:");
const car = { make: "Toyota", model: "Camry", year: 2021 };

for (let [key, value] of Object.entries(car)) {
    console.log(`${key}: ${value}`);
    // Output: make: Toyota | model: Camry | year: 2021
}
// Object.entries() returns an array of [key, value] pairs,
// making for...of work on objects too.

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Choose the right loop for the job:
 *       - for       → when iteration count is known
 *       - while     → when iteration count is unknown, condition-driven
 *       - do...while → when the body must run at least once (e.g., menus)
 *       - for...of  → clean iteration over arrays, strings, Sets, Maps
 *       - for...in  → object KEYS only (avoid on arrays)
 *       - forEach   → array processing when you don't need break/continue
 *  2. for...in on arrays gives string indices and includes prototype
 *     properties — always use for...of or forEach for arrays.
 *  3. forEach() cannot be short-circuited with break. If you need to
 *     stop early, use for...of with break, or Array.some() / Array.find().
 *  4. do...while guarantees at least one execution — useful for
 *     retry logic, prompts, or menu-driven programs.
 *  5. continue skips the remaining body of the current iteration
 *     and moves to the next; break exits the entire loop.
 *  6. Labeled loops allow break/continue to exit OUTER loops from
 *     inside nested loops — use sparingly (restructuring is often cleaner).
 *  7. Always ensure the loop's exit condition will eventually be met —
 *     forgetting to update the loop variable causes infinite loops.
 * ============================================================
 */
