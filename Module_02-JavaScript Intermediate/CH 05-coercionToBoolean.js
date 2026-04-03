/*
 * ============================================================
 *  CH 05 - Coercion → ToBoolean
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  The ToBoolean abstract operation converts any value to a boolean.
 *  It is triggered implicitly by:
 *    - if / else if conditions
 *    - while / do...while / for conditions
 *    - ternary operator condition (x ? a : b)
 *    - logical operators: && || !
 *    - Boolean() — explicit conversion
 *    - !! (double NOT) — idiomatic boolean cast
 *
 *  THE SIX FALSY VALUES (everything else is truthy):
 *  --------------------------------------------------
 *    false       | the boolean literal false
 *    0           | zero (also -0 and 0n BigInt)
 *    ""          | empty string ('' or ``)
 *    null        | null
 *    undefined   | undefined
 *    NaN         | Not a Number
 *
 *  KEY POINTS:
 *  -----------
 *  - These six are the ONLY falsy values in JS. Everything else is truthy.
 *  - TRUTHY surprises for beginners:
 *      "0"    → truthy  (non-empty string)
 *      "false"→ truthy  (non-empty string)
 *      []     → truthy  (even though [] == false is true with ==!)
 *      {}     → truthy  (empty object is still an object)
 *      -1     → truthy  (any non-zero number)
 *      Infinity → truthy
 *  - `!value` inverts truthiness (logical NOT, also a unary coercion tool).
 *  - `!!value` double-NOT: the idiomatic, readable way to get the boolean.
 *  - Boolean() does the same as !! but is more explicit/readable.
 *  - The curiously confusing case: `[] == false` is TRUE (loose equality
 *    coerces both sides to numbers: [] → 0, false → 0) but
 *    `Boolean([])` is also TRUE ([] is truthy). Both can be "correct".
 * ============================================================
 */

// ─── 1. THE SIX FALSY VALUES ───────────────────────────────────

console.log("1. The Six Falsy Values:");
console.log(Boolean(false));     // Output: false
console.log(Boolean(0));         // Output: false
console.log(Boolean(-0));        // Output: false  ← -0 is also falsy
console.log(Boolean(0n));        // Output: false  ← BigInt zero is falsy
console.log(Boolean(""));        // Output: false  ← empty string
console.log(Boolean(null));      // Output: false
console.log(Boolean(undefined)); // Output: false
console.log(Boolean(NaN));       // Output: false

// ─── 2. TRUTHY VALUES (including surprises) ─────────────────────

console.log("\n2. Truthy Values:");
console.log(Boolean(true));       // Output: true
console.log(Boolean(1));          // Output: true
console.log(Boolean(-1));         // Output: true   ← any non-zero number
console.log(Boolean(Infinity));   // Output: true
console.log(Boolean(-Infinity));  // Output: true
console.log(Boolean("0"));        // Output: true   ← non-empty string!
console.log(Boolean("false"));    // Output: true   ← non-empty string!
console.log(Boolean(" "));        // Output: true   ← whitespace is non-empty
console.log(Boolean([]));         // Output: true   ← EMPTY ARRAY is truthy!
console.log(Boolean({}));         // Output: true   ← EMPTY OBJECT is truthy!
console.log(Boolean(function() {})); // Output: true ← functions are truthy

// ─── 3. SINGLE NOT (!) — INVERTS TRUTHINESS ─────────────────────

console.log("\n3. Single NOT (!) for Falsiness Check:");
// !value  → converts to boolean THEN negates
console.log(!false);      // Output: true
console.log(!0);          // Output: true
console.log(!"");         // Output: true
console.log(!null);       // Output: true
console.log(!undefined);  // Output: true
console.log(!NaN);        // Output: true

// Truthy values → false when negated:
console.log(!1);          // Output: false
console.log(!"hello");    // Output: false
console.log(![]);         // Output: false  ← empty array is truthy → ![] = false
console.log(!{});         // Output: false

// ─── 4. DOUBLE NOT (!!) — BOOLEAN CAST ──────────────────────────

console.log("\n4. Double NOT (!!) for Explicit Boolean Cast:");
// !!value is equivalent to Boolean(value)
console.log(!!false);      // Output: false
console.log(!!0);          // Output: false
console.log(!!"");         // Output: false
console.log(!!null);       // Output: false
console.log(!!undefined);  // Output: false
console.log(!!NaN);        // Output: false

console.log(!!1);          // Output: true
console.log(!!"hello");    // Output: true
console.log(!![] );        // Output: true
console.log(!!{} );        // Output: true
console.log(!!Infinity);   // Output: true

// ─── 5. ToBoolean IN CONDITIONS ─────────────────────────────────

console.log("\n5. ToBoolean in Conditions:");

// if statement coerces condition to boolean
if (0)       console.log("never prints");      else console.log("0 is falsy");
if ("")      console.log("never prints");      else console.log('"" is falsy');
if (null)    console.log("never prints");      else console.log("null is falsy");
if ("hello") console.log('"hello" is truthy');  // runs
if ([])      console.log("[] is truthy");       // runs
if ({})      console.log("{} is truthy");       // runs

// ─── 6. COMBINING ! WITH LOGICAL OPERATORS ──────────────────────

console.log("\n6. Combining ! with Logical Operators:");
console.log(!false || true);       // Output: true  — (!false)=true, true || true = true
console.log(!(5 > 10));            // Output: true  — (5>10)=false, !false=true
console.log(!null && !!"valid");   // Output: true  — (!null)=true, (!!"valid")=true

// ─── 7. THE [] == false PARADOX ─────────────────────────────────

console.log("\n7. The [] == false Paradox:");
// [] is TRUTHY: Boolean([]) === true
console.log(Boolean([]));       // Output: true   — [] is truthy
// But [] == false is also TRUE via ==:
console.log([] == false);       // Output: true
// Why? == coercion: both get ToNumber: [] → "" → 0, false → 0 → 0 == 0 → true
// This is NOT a contradiction: == and Boolean() use DIFFERENT coercion paths.
// eslint-disable-next-line eqeqeq
const emptyArr = /** @type {unknown} */ ([]); // typed as unknown to avoid "always false" lint warning
console.log(emptyArr === false); // Output: false  — strict: different types (always false by design)

// ─── 8. ToBoolean IN LOOPS AND TERNARY ──────────────────────────

console.log("\n8. ToBoolean in Loops and Ternary:");

let count = 3;
while (count) {        // count is coerced: 3→true, 2→true, 1→true, 0→false (stop)
    process.stdout.write(count + " ");
    count--;
}
console.log(); // newline
// Output: 3 2 1

let input = "";
let label = input ? "Has value" : "Empty";
console.log(label);   // Output: Empty  — "" is falsy

// ─── 9. REAL-WORLD USE CASES ────────────────────────────────────

console.log("\n9. Real-World Use Cases:");

// Guard clause: only proceed if value exists
function process(value) {
    if (!value) {
        return "No value provided";
    }
    return `Processing: ${value}`;
}
console.log(process(""));    // Output: No value provided
console.log(process(null));  // Output: No value provided
console.log(process("hi"));  // Output: Processing: hi

// Store boolean flags
const userInput = "hello";
const hasInput = !!userInput;    // cleaner than: userInput !== ""
console.log("Has input:", hasInput); // Output: Has input: true

// Filter falsy items from an array using Boolean as callback
const mixed = [0, 1, "", "hi", null, undefined, false, true, NaN, []];
const truthy = mixed.filter(Boolean);
console.log(truthy); // Output: [1, "hi", true, []]  ← only truthy values remain

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Only 6 values are falsy — memorize them:
 *     false, 0 (and -0, 0n), "" (empty string), null, undefined, NaN.
 *     Everything else is truthy.
 *  2. !! is the idiomatic way to get the boolean of any value.
 *     It's equivalent to Boolean() but more concise.
 *  3. Non-empty strings "0" and "false" are TRUTHY — they're not
 *     empty! Only "" (empty string) is falsy.
 *  4. [] (empty array) and {} (empty object) are TRUTHY even though
 *     they contain nothing. They are objects, and objects are truthy.
 *  5. [] == false is true (ToNumber path via ==), but
 *     Boolean([]) is also true (ToBoolean path). They use different
 *     coercion algorithms — this is not a contradiction.
 *  6. Use Boolean as a filter callback (arr.filter(Boolean)) to
 *     remove all falsy values from an array cleanly.
 *  7. In while loops, a numeric counter works as a boolean condition:
 *     it stops when it hits 0 (falsy). A classic pattern.
 * ============================================================
 */

// 3. Implicit ToBoolean in Conditional Statements
console.log("\n3. Implicit ToBoolean in Conditional Statements:");

if (1) {
  console.log("1 is truthy!"); // This block executes
}

if ("") {
  console.log("This won't execute!"); // This block won't execute
} else {
  console.log("Empty strings are falsy!"); // This block executes
}

if ([]) {
  console.log("Empty arrays are truthy!"); // This block executes
}

if ({}) {
  console.log("Empty objects are truthy!"); // This block executes
}

// 4. Logical Operators and ToBoolean
console.log("\n4. Logical Operators and ToBoolean:");
console.log(0 || "Fallback value"); // Output: "Fallback value" (0 is falsy)
console.log(null && "Won't execute"); // Output: null (short-circuit on falsy)
console.log("Truthy" || "Won't execute"); // Output: "Truthy" (short-circuit on truthy)
console.log("Truthy" && "Next value"); // Output: "Next value" (both truthy)

// 5. Common Real-World Examples
console.log("\n5. Common Real-World Examples:");

// Checking if a variable is defined
let variable = null;
if (variable) {
  console.log("Variable is defined and truthy.");
} else {
  console.log("Variable is either undefined, null, or falsy."); // Executes
}

// Defaulting to a fallback value
let userInput2 = ""; // Simulate user input
let value = userInput2 || "Default Value"; // Fallback if input is empty
console.log("Value:", value); // Output: "Default Value"

// Using logical NOT (!) for inversion
let isAvailable = false;
console.log("Available:", !isAvailable); // Output: true

// Double NOT (!!) to explicitly convert to Boolean
console.log("Explicit Boolean:", !!"Non-empty string"); // true
console.log("Explicit Boolean:", !!0); // false

// Summary Note
console.log("\nSummary Note:");
console.log(
  "JavaScript uses ToBoolean in conditionals and logical operations. " +
  "Understanding truthy and falsy values helps avoid unexpected behavior."
);
