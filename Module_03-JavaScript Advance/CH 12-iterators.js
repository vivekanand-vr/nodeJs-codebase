/*
 * ============================================================
 *  ITERATORS AND THE ITERATION PROTOCOL
 * ============================================================
 *
 * DEFINITION:
 *   An iterator is any object with a `.next()` method that returns
 *   successive values in the shape: { value: any, done: boolean }.
 *   An iterable is any object that has a [Symbol.iterator]() method
 *   which returns an iterator.
 *
 * TWO PROTOCOLS:
 *   1. Iterable protocol — object implements [Symbol.iterator]() → iterator
 *   2. Iterator protocol  — object implements .next() → { value, done }
 *   An object can satisfy BOTH (making it a re-iterable iterator).
 *
 * BUILT-IN ITERABLES:
 *   Array, String, Map, Set, TypedArray, arguments, NodeList, generators
 *   All support for...of and spread ([...iterable]).
 *
 * for...of LOOP:
 *   Calls [Symbol.iterator]() once, then .next() until done: true.
 *   Unlike for...in (which iterates KEYS), for...of iterates VALUES.
 *
 * LAZY EVALUATION:
 *   Iterators produce values ON DEMAND — they do not compute all values
 *   upfront.  This is ideal for large datasets, streams, or infinite
 *   sequences.
 *
 * IMPORTANT POINTS:
 *   1. Built-in iterables (Array, String, Map, Set) implement
 *      [Symbol.iterator]() — you can get an iterator from any of them.
 *   2. for...of, spread (...), Array.from(), and destructuring all rely
 *      on the iterable protocol internally.
 *   3. A custom iterator keeps its OWN state — each independent iterator
 *      from the same iterable starts fresh.
 *   4. Infinite iterators (no done: true) are valid — just never use them
 *      in for...of without a break condition.
 *   5. Returning `{ value: undefined, done: true }` signals the consumer
 *      that iteration is complete.
 *   6. Generators (CH 13) automatically implement BOTH protocols — they are
 *      the easiest way to write custom iterators.
 *   7. The `return()` and `throw()` optional iterator methods allow early
 *      termination and error injection (used by generators and for...of).
 * ============================================================
 */

// -----------------------------
// Example 1: Using Array Iterator
// -----------------------------
const arr = [10, 20, 30];
const arrIterator = arr[Symbol.iterator]();

console.log("Array Iterator:");
console.log(arrIterator.next()); // { value: 10, done: false }
console.log(arrIterator.next()); // { value: 20, done: false }
console.log(arrIterator.next()); // { value: 30, done: false }
console.log(arrIterator.next()); // { value: undefined, done: true }

// -----------------------------
// Example 2: Custom Iterator Object
// -----------------------------
const customRange = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

console.log("\nCustom Range Iterator:");
for (const num of customRange) {
  console.log(num); // 1, 2, 3, 4, 5
}

// -----------------------------
// Example 3: Manual Iteration with next()
// -----------------------------
const string = "Hi";
const stringIterator = string[Symbol.iterator]();

console.log("\nManual String Iteration:");
let result = stringIterator.next();
while (!result.done) {
  console.log(result.value);
  result = stringIterator.next();
}

// -----------------------------
// Example 4: Infinite Iterator (concept)
// -----------------------------
function createInfiniteCounter() {
  let i = 0;
  return {
    next() {
      return { value: i++, done: false };
    }
  };
}

const counter = createInfiniteCounter();

console.log("\nFirst 3 of infinite counter:");
console.log(counter.next()); // { value: 0, done: false }
console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
// Can call counter.next() as many times as needed — never done: true

// ─── 5. MAP AND SET ITERATORS ─────────────────────────────────────────────
console.log("\n=== 5. Map and Set iterators ===");

const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (const [key, val] of map) {
    console.log(key, "→", val); // Output: a → 1, b → 2, c → 3
}

const set = new Set([10, 20, 30]);
const setIter = set[Symbol.iterator]();
console.log(setIter.next()); // { value: 10, done: false }
console.log(setIter.next()); // { value: 20, done: false }

// ─── 6. SPREAD AND DESTRUCTURING USE ITERABLES ──────────────────────────
console.log("\n=== 6. Spread and destructuring rely on [Symbol.iterator] ===");

const range = { start: 1, end: 4, [Symbol.iterator]() {
    let c = this.start;
    return { next: () => c <= this.end ? { value: c++, done: false } : { value: undefined, done: true } };
}};

console.log([...range]);      // Output: [1, 2, 3, 4] — spread uses iterator
const [first, second] = range;
console.log(first, second);   // Output: 1 2 — destructuring uses iterator

/*
 * ============================================================
 *  CONCLUSION — Key Iterator Takeaways
 * ============================================================
 *
 *  1. Iterator protocol: any object with `.next()` returning { value, done }.
 *     Iterable protocol: any object with `[Symbol.iterator]()` returning
 *     an iterator. These two are the foundation of all iteration in JS.
 *  2. for...of, spread (...), Array.from(), and destructuring all rely on
 *     the iterable protocol — implement [Symbol.iterator] and they all work.
 *  3. Custom iterators encapsulate their state internally — each .next()
 *     call advances independently; sharing the same iterator advances it.
 *  4. Infinite iterators are valid — they simply never return done: true.
 *     Always use break or manual advancement to stop them.
 *  5. Built-in collections (Array, String, Map, Set) are all iterables —
 *     their iterators are independent of each other.
 *  6. Generators (CH 13) implement BOTH protocols automatically and are
 *     the idiomatic way to write custom iterators in modern JavaScript.
 *  7. Lazy evaluation via iterators means memory efficiency — values are
 *     produced one at a time, not all upfront.
 * ============================================================
 */
