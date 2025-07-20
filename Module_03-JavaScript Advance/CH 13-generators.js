/**
 * JavaScript Generators
 *
 * Definition:
 * A generator is a special function that can pause execution and resume later.
 * It uses the `function*` syntax and `yield` keyword to produce a sequence of values on demand.
 *
 * Key Points:
 * - Defined using `function*` syntax.
 * - Use `yield` to pause and return a value.
 * - Calling a generator returns an iterator.
 * - Use `.next()` to get each value, or use in `for...of` loop.
 * - Useful for lazy evaluation, asynchronous workflows, and infinite sequences.
 */

// -----------------------------
// Example 1: Simple Generator
// -----------------------------
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen1 = simpleGenerator();

console.log("Simple Generator:");
console.log(gen1.next()); // { value: 1, done: false }
console.log(gen1.next()); // { value: 2, done: false }
console.log(gen1.next()); // { value: 3, done: false }
console.log(gen1.next()); // { value: undefined, done: true }

// -----------------------------
// Example 2: Using Generator in a Loop
// -----------------------------
function* loopGenerator() {
  for (let i = 0; i < 3; i++) {
    yield i;
  }
}

console.log("\nUsing Generator in for...of:");
for (const val of loopGenerator()) {
  console.log(val); // 0, 1, 2
}

// -----------------------------
// Example 3: Passing Values into Generator
// -----------------------------
function* bidirectionalGenerator() {
  const x = yield "First yield";
  const y = yield "Second yield";
  return x + y;
}

const gen2 = bidirectionalGenerator();

console.log("\nBidirectional Generator:");
console.log(gen2.next());         // { value: 'First yield', done: false }
console.log(gen2.next(10));       // { value: 'Second yield', done: false }
console.log(gen2.next(20));       // { value: 30, done: true }

// -----------------------------
// Example 4: Infinite Generator
// -----------------------------
function* infiniteCounter() {
  let count = 0;
  while (true) {
    yield count++;
  }
}

const gen3 = infiniteCounter();

console.log("\nFirst 3 from infinite generator:");
console.log(gen3.next()); // { value: 0, done: false }
console.log(gen3.next()); // { value: 1, done: false }
console.log(gen3.next()); // { value: 2, done: false }
// Can continue infinitely...


// -----------------------------
// Example 5: Generator with Console logs
// -----------------------------

function* testGen() {
  console.log("Before first yield");
  yield 1;

  console.log("Between yields");
  yield 2;

  console.log("After second yield");
  return 3;
}

const gen = testGen();

console.log(gen.next()); // Runs "Before first yield", then yields 1
console.log(gen.next()); // Runs "Between yields", then yields 2
console.log(gen.next()); // Runs "After second yield", then returns 3
