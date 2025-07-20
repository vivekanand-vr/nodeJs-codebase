/**
 * JavaScript Iterators
 * - An iterator is an object that defines a sequence and potentially a return value upon its completion.
 * - It implements a `.next()` method that returns an object with `{ value, done }`.
 *
 * Key Points:
 * - Built-in iterables: Arrays, Strings, Maps, Sets, etc.
 * - You can loop through iterables using `for...of` because they implement the iterable protocol.
 * - An **iterator** is any object with a `.next()` method returning `{ value, done }`.
 * - You can define custom iterators using `[Symbol.iterator]()`.
 * - Useful for handling large or lazy data sequences (like data streams, generators).
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
// And so on...
