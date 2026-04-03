/*
 * ============================================================
 *  CH 07 - NaN and isNaN
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  NaN stands for "Not a Number". It is a special numeric value in
 *  JavaScript (type "number") that represents an invalid or unrepresentable
 *  result from a numeric operation.
 *
 *  NaN is produced when:
 *    - Parsing an invalid number: Number("hello") → NaN
 *    - Invalid arithmetic: 0 / 0, Infinity - Infinity, Math.sqrt(-1)
 *    - Operations with undefined: undefined + 1 → NaN
 *    - Math.log(-1), Math.asin(2), etc.
 *
 *  TWO WAYS TO CHECK FOR NaN:
 *  --------------------------
 *  1. isNaN(x)          — COERCES x to number first, then checks.
 *                         Can give misleading results: isNaN("hello") → true
 *                         (because Number("hello") → NaN, not because
 *                         "hello" itself is NaN)
 *
 *  2. Number.isNaN(x)   — NO coercion. Returns true ONLY for the actual
 *                         NaN value. Safe and precise.
 *                         Number.isNaN("hello") → false ("hello" is not NaN)
 *
 *  KEY POINTS:
 *  -----------
 *  - NaN is of type "number" — typeof NaN === "number". This is intentional.
 *  - NaN is the ONLY value in JavaScript not equal to itself: NaN !== NaN.
 *  - Use Number.isNaN() in modern code; isNaN() is a legacy function.
 *  - NaN is infectious: any arithmetic with NaN produces NaN.
 *  - Object.is(x, NaN) also correctly identifies NaN.
 * ============================================================
 */

// ─── 1. WHAT IS NaN ────────────────────────────────────────────

console.log("1. What is NaN?");

console.log(NaN);                // Output: NaN
console.log(typeof NaN);         // Output: number  ← type is "number"!
console.log(NaN === NaN);        // Output: false   ← NaN ≠ itself (unique in JS)
console.log(NaN == NaN);         // Output: false

// How NaN is produced:
console.log(Number("hello"));    // Output: NaN   — invalid string
console.log(0 / 0);              // Output: NaN   — indeterminate form
console.log(Infinity - Infinity); // Output: NaN   — indeterminate form
console.log(undefined + 1);      // Output: NaN   — undefined → NaN
console.log(Math.sqrt(-1));      // Output: NaN   — imaginary number
console.log(Math.log(-1));       // Output: NaN   — undefined domain
console.log(parseInt("abc"));    // Output: NaN   — can't parse

// NaN is "infectious" — any arithmetic with NaN gives NaN
console.log(NaN + 1);            // Output: NaN
console.log(NaN * 100);          // Output: NaN
console.log(NaN === NaN);        // Output: false (can't even compare to itself)

// ─── 2. isNaN() — GLOBAL FUNCTION (WITH COERCION) ──────────────

console.log("\n2. isNaN() — with type coercion:");

// Numbers
console.log(isNaN(123));         // Output: false  — valid number
console.log(isNaN(-123));        // Output: false
console.log(isNaN(NaN));         // Output: true

// Strings — isNaN coerces to number FIRST
console.log(isNaN("123"));       // Output: false  — "123" → 123 → not NaN
console.log(isNaN("123abc"));    // Output: true   — "123abc" → NaN
console.log(isNaN(""));          // Output: false  — "" → 0 → not NaN
console.log(isNaN(" "));         // Output: false  — " " → 0 → not NaN (trimmed)
console.log(isNaN("hello"));     // Output: true   — "hello" → NaN

// Booleans
console.log(isNaN(true));        // Output: false  — true → 1
console.log(isNaN(false));       // Output: false  — false → 0

// null and undefined
console.log(isNaN(null));        // Output: false  — null → 0
console.log(isNaN(undefined));   // Output: true   — undefined → NaN

// Objects
console.log(isNaN({}));          // Output: true   — {} → "[object Object]" → NaN
console.log(isNaN([]));          // Output: false  — [] → "" → 0
console.log(isNaN([123]));       // Output: false  — [123] → "123" → 123
console.log(isNaN([1, 2, 3]));   // Output: true   — [1,2,3] → "1,2,3" → NaN

// Special numeric values
console.log(isNaN(Infinity));    // Output: false  — Infinity IS a number
console.log(isNaN(-Infinity));   // Output: false

// Functions
console.log(isNaN(function() {})); // Output: true  — functions → NaN

// Symbols — TypeError (cannot coerce)
try {
    console.log(isNaN(Symbol("x")));
} catch (err) {
    console.error("Symbol:", err.message); // Output: Cannot convert a Symbol value to a number
}

// ─── 3. Number.isNaN() — STRICT CHECK (NO COERCION) ───────────

console.log("\n3. Number.isNaN() — no coercion, strictly NaN:");

// ONLY returns true for the actual NaN value
console.log(Number.isNaN(NaN));          // Output: true
console.log(Number.isNaN(0 / 0));        // Output: true   — 0/0 IS NaN
console.log(Number.isNaN("NaN"));        // Output: false  — string "NaN" is not the value NaN
console.log(Number.isNaN("hello"));      // Output: false  — no coercion
console.log(Number.isNaN(undefined));    // Output: false
console.log(Number.isNaN(null));         // Output: false
console.log(Number.isNaN({}));           // Output: false
console.log(Number.isNaN(Infinity));     // Output: false  — Infinity is not NaN
console.log(Number.isNaN(123));          // Output: false
console.log(Number.isNaN(true));         // Output: false

// ─── 4. isNaN vs Number.isNaN — COMPARISON ─────────────────────

console.log("\n4. isNaN() vs Number.isNaN() comparison:");

const tests = ["hello", undefined, {}, [], NaN, "NaN", 0, false];
console.log("Value          | isNaN | Number.isNaN");
console.log("---------------|-------|-------------");
tests.forEach(v => {
    const display = JSON.stringify(v) ?? String(v);
    console.log(`${String(display).padEnd(14)} | ${String(isNaN(v)).padEnd(5)} | ${Number.isNaN(v)}`);
});
// Notice: isNaN returns true for "hello", undefined, {} — because they coerce to NaN.
//         Number.isNaN only returns true for actual NaN.

// ─── 5. DETECTING NaN RELIABLY ─────────────────────────────────

console.log("\n5. Reliable NaN Detection Methods:");

function isActuallyNaN(value) {
    return Number.isNaN(value);          // best: no coercion
}
function isActuallyNaN2(value) {
    return value !== value;              // works: NaN is the only value not equal to itself
}
function isActuallyNaN3(value) {
    return Object.is(value, NaN);        // also works
}

console.log(isActuallyNaN(NaN));         // Output: true
console.log(isActuallyNaN("hello"));     // Output: false  ← correct, "hello" is not NaN
console.log(isActuallyNaN2(NaN));        // Output: true
console.log(isActuallyNaN3(NaN));        // Output: true

// ─── 6. NaN IN FORMULAS AND COLLECTIONS ────────────────────────

console.log("\n6. NaN in Formulas and Collections:");

// NaN in arrays
const data = [1, NaN, 3, NaN, 5];
console.log(data.includes(NaN));    // Output: true   — includes() uses SameValueZero (handles NaN)
console.log(data.indexOf(NaN));     // Output: -1    — indexOf uses ===, NaN!==NaN → not found
console.log(data.findIndex(Number.isNaN)); // Output: 1  — finds first NaN index

// Arithmetic chain
const result = 10 + NaN * 2 - 5;
console.log(result);               // Output: NaN  — NaN infects the whole expression

// Safe arithmetic guard
function safeDivide(a, b) {
    const result = a / b;
    return Number.isNaN(result) ? 0 : result;
}
console.log(safeDivide(10, 2));    // Output: 5
console.log(safeDivide(0, 0));     // Output: 0  (guarded)

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. NaN (Not a Number) has typeof === "number" — this is intentional.
 *     It represents an invalid numeric result, not "not a number type".
 *  2. NaN !== NaN — NaN is the ONLY value in JS not equal to itself.
 *     This is per the IEEE 754 floating-point standard.
 *  3. Use Number.isNaN() in modern code — it does NOT coerce:
 *     Number.isNaN("hello") → false ("hello" is not the NaN value).
 *  4. Avoid isNaN() in modern code — it coerces first:
 *     isNaN("hello") → true (misleadingly, because "hello"→NaN via coercion).
 *  5. NaN is "infectious" — any math involving NaN produces NaN.
 *     Guard your arithmetic inputs when division or parsing is involved.
 *  6. Array.includes() correctly finds NaN (uses SameValueZero).
 *     Array.indexOf() does NOT find NaN (uses ===, which fails for NaN).
 *  7. The self-inequality trick (val !== val) is a valid but cryptic
 *     way to check for NaN — prefer Number.isNaN() for readability.
 * ============================================================
 */
