/*
 * ============================================================
 *  GENERATORS
 * ============================================================
 *
 * DEFINITION:
 *   A generator is a special function (function*) that can PAUSE its own
 *   execution mid-body using the `yield` keyword, and RESUME from where
 *   it left off on the next .next() call.
 *   Calling a generator function does NOT execute any body code — it
 *   returns a Generator object (which is both an iterator AND an iterable).
 *
 * SYNTAX:
 *   function* myGenerator() {
 *       yield value1;  // pauses; returns { value: value1, done: false }
 *       yield value2;  // pauses again
 *       return final;  // ends;  returns { value: final, done: true }
 *   }
 *   const gen = myGenerator(); // returns a Generator — NO body runs yet
 *   gen.next();                // runs until first yield
 *
 * BIDIRECTIONAL DATA FLOW:
 *   gen.next(passedValue) — the passed value becomes the RESULT of the
 *   `yield` expression inside the generator.  First .next() call's
 *   argument is always ignored (no yield to receive it yet).
 *
 * GENERATOR vs ITERATOR:
 *   Generators automatically implement BOTH iterable and iterator protocols.
 *   You can use them in for...of, spread, Array.from without extra code.
 *
 * USE CASES:
 *   • Lazy infinite sequences (ID generators, Fibonacci, random)
 *   • Custom iterators without boilerplate
 *   • Cooperative multitasking / state machines
 *   • Async flow control (pre-async/await — libraries like co used this)
 *   • Middleware pipelines (Redux-saga uses generators)
 *
 * IMPORTANT POINTS:
 *   1. Calling a generator function returns a generator OBJECT — no code
 *      in the body runs until the first .next() call.
 *   2. Each .next() resumes execution until the next yield or return.
 *   3. Values passed to .next(value) become the result of the PREVIOUS
 *      yield expression inside the generator body.
 *   4. A generator is exhausted (done: true) after it reaches `return`
 *      or falls off the end — further .next() calls return { value: undefined, done: true }.
 *   5. You can use for...of on a generator — it stops automatically when
 *      done: true, and the `return` value is NOT included.
 *   6. `yield*` delegates to another iterable, flattening it inline.
 *   7. Generators remember ALL local variables between yields — this is
 *      what makes them powerful state machines.
 * ============================================================
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

// ─── 6. yield* DELEGATION ────────────────────────────────────────────────
console.log("\n=== 6. yield* — delegate to another iterable ===");

function* inner() {
    yield "a";
    yield "b";
}

function* outer() {
    yield 1;
    yield* inner();  // flattens inner's values inline
    yield 2;
}

console.log([...outer()]); // Output: [1, "a", "b", 2]

// ─── 7. GENERATOR AS INFINITE ID SEQUENCE ───────────────────────────────
console.log("\n=== 7. Infinite unique ID generator ===");

function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();
console.log(ids.next().value); // Output: 1
console.log(ids.next().value); // Output: 2
console.log(ids.next().value); // Output: 3
// Never call in for...of without break — infinite!

/*
 * ============================================================
 *  CONCLUSION — Key Generator Takeaways
 * ============================================================
 *
 *  1. Calling a generator function returns a Generator object — NO body
 *     code executes until the first .next() call.
 *  2. `yield` pauses execution and returns the yielded value to the caller;
 *     the generator remembers ALL local state across pauses.
 *  3. Values passed into .next(value) become the result of the previous
 *     yield expression — enabling bidirectional communication.
 *  4. A generator implements both iterable and iterator protocols, so
 *     for...of, spread, and destructuring all work natively.
 *  5. for...of on a generator does NOT receive the `return` value (only
 *     yield values); manually calling .next() after done: true is safe
 *     (returns { value: undefined, done: true } on every call).
 *  6. yield* delegates to another iterable inline — useful for composing
 *     or flattening nested generators.
 *  7. Infinite generators (while(true) loop with yield) are powerful for
 *     IDs, Fibonacci, and event streams — just never iterate them without
 *     an exit condition.
 * ============================================================
 */
