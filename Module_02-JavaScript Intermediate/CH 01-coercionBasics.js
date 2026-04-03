/*
 * ============================================================
 *  CH 01 - Type Coercion — The Basics
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  Type coercion is the automatic (or explicit) conversion of a value
 *  from one type to another. It is one of the most misunderstood parts
 *  of JavaScript and the source of many subtle bugs.
 *
 *  ABSTRACT OPERATIONS (internal JS spec operations):
 *  --------------------------------------------------
 *  The ECMAScript spec defines "abstract operations" that describe how
 *  conversions happen under the hood. The main ones are:
 *    - ToString(x)   → converts x to a string
 *    - ToNumber(x)   → converts x to a number
 *    - ToBoolean(x)  → converts x to a boolean
 *    - ToPrimitive(x)→ converts an object to a primitive value
 *
 *  TWO KINDS OF COERCION:
 *  ----------------------
 *    Implicit Coercion  — happens automatically by JS during operations
 *    Explicit Coercion  — triggered intentionally: Number(), String(), Boolean()
 *
 *  KEY POINTS:
 *  -----------
 *  - The `+` operator is unique: if EITHER operand is a string,
 *    it concatenates (ToString). All other arithmetic ops (-,*,/,%)
 *    always apply ToNumber to both sides.
 *  - `null` coerces to 0 (ToNumber), but to "null" (ToString).
 *  - `undefined` coerces to NaN (ToNumber), but to "undefined" (ToString).
 *  - Objects are first converted via ToPrimitive before ToString/ToNumber.
 *  - `==` triggers implicit coercion; `===` never does.
 *  - Knowing the coercion rules lets you USE implicit coercion intentionally
 *    rather than being surprised by it.
 * ============================================================
 */

// ─── 1. IMPLICIT COERCION ──────────────────────────────────────

console.log("1. Implicit Coercion:");

// ---------- String context (+ with a string operand) ----------
console.log("5" + 2);          // Output: "52"   — 2 is ToString'd to "2", then concatenated
console.log(5 + "2");          // Output: "52"
console.log(1 + 2 + "3");      // Output: "33"   — 1+2=3 first (both numbers), then 3+"3"="33"
console.log("1" + 2 + 3);      // Output: "123"  — "1"+2="12", then "12"+3="123"

// ---------- Numeric context (-, *, /, %) ----------
console.log("5" - 2);          // Output: 3       — "5" is ToNumber'd to 5
console.log("5" * 2);          // Output: 10
console.log("5" / 2);          // Output: 2.5
console.log("5" % 2);          // Output: 1
console.log("10" - "4");       // Output: 6       — BOTH strings coerced to numbers

// ---------- Boolean coercion in arithmetic ----------
console.log(true + 1);         // Output: 2       — true → 1
console.log(false + 1);        // Output: 1       — false → 0
console.log(true + "1");       // Output: "true1" — string context wins: true → "true"

// ---------- null and undefined ----------
console.log(null + 2);         // Output: 2       — null → 0
console.log(null + "2");       // Output: "null2" — null → "null" (string context)
console.log(undefined + 2);    // Output: NaN     — undefined → NaN
console.log(undefined + "2");  // Output: "undefined2" — string context

// ---------- Objects in arithmetic (ToPrimitive → valueOf) ----------
const withValueOf = { a: 10, valueOf() { return 5; } };
console.log(10 - withValueOf); // Output: 5  — valueOf() returns 5, then 10-5=5

// ─── 2. EXPLICIT COERCION ──────────────────────────────────────

console.log("\n2. Explicit Coercion:");

// To Number
console.log(Number("42"));       // Output: 42
console.log(Number(""));         // Output: 0    — empty string → 0
console.log(Number(true));       // Output: 1
console.log(Number(false));      // Output: 0
console.log(Number(null));       // Output: 0
console.log(Number(undefined));  // Output: NaN
console.log(Number("hello"));    // Output: NaN

console.log(parseInt("42px"));   // Output: 42   — stops at first non-digit
console.log(parseFloat("3.14m")); // Output: 3.14

// To String
console.log(String(42));         // Output: "42"
console.log(String(true));       // Output: "true"
console.log(String(null));       // Output: "null"
console.log(String(undefined));  // Output: "undefined"
console.log(String(NaN));        // Output: "NaN"
console.log((255).toString(16)); // Output: "ff"  — base-16 (hex) conversion
console.log((255).toString(2));  // Output: "11111111" — base-2 (binary)

// To Boolean
console.log(Boolean(0));         // Output: false  — falsy
console.log(Boolean(""));        // Output: false  — falsy
console.log(Boolean(null));      // Output: false  — falsy
console.log(Boolean(undefined)); // Output: false  — falsy
console.log(Boolean(NaN));       // Output: false  — falsy
console.log(Boolean("hello"));   // Output: true   — truthy
console.log(Boolean([]));        // Output: true   — empty array is truthy!
console.log(Boolean({}));        // Output: true   — empty object is truthy!

// ─── 3. COMPARISON COERCION ────────────────────────────────────

console.log("\n3. Comparison Coercion:");

// Abstract Equality (==) performs type coercion
console.log(5 == "5");            // Output: true   — "5" → 5
console.log(0 == false);          // Output: true   — false → 0
console.log(null == undefined);   // Output: true   — special rule
console.log(null == 0);           // Output: false  — null NEVER coerces in ==
console.log(undefined == false);  // Output: false  — undefined NEVER coerces to boolean

// Strict Equality (===) — NO coercion
console.log(5 === "5");           // Output: false  — different types
console.log(0 === false);         // Output: false  — different types

// Relational operators always coerce to numbers
console.log("10" > 5);            // Output: true   — "10" → 10
console.log("10" > "9");          // Output: false  — lexicographical: "1" < "9"

// ─── 4. SPECIAL CASES / GOTCHAS ────────────────────────────────

console.log("\n4. Special Coercion Cases:");

console.log(Number("hello"));     // Output: NaN
console.log(isNaN("hello"));      // Output: true   — isNaN coerces first
console.log(Number.isNaN("hello")); // Output: false — Number.isNaN does NOT coerce

console.log([] + []);             // Output: ""     — both arrays → "" + ""
console.log({} + []);             // Output: "[object Object]"
console.log([] + {});             // Output: "[object Object]"
console.log(+[]);                 // Output: 0      — [] → "" → 0
console.log(+{});                 // Output: NaN    — {} → "[object Object]" → NaN

// The famous "wat" cases explained:
console.log(+"");                 // Output: 0      — empty string → 0
console.log(+null);               // Output: 0
console.log(+undefined);          // Output: NaN
console.log(+true);               // Output: 1
console.log(+false);              // Output: 0

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Implicit coercion follows predictable rules. The key question is:
 *     "What abstract operation does JS apply here?"
 *       - + with a string → ToString on the other side
 *       - -, *, /, %, ** → ToNumber on both sides
 *       - if/while/ternary → ToBoolean
 *  2. Explicit coercion (Number(), String(), Boolean()) is always
 *     clearer than relying on implicit behavior — prefer it in production code.
 *  3. null always coerces to 0 (number context) but "null" (string context).
 *     undefined always coerces to NaN (number context).
 *  4. == has specific rules for null/undefined: null == undefined is true,
 *     but null/undefined never coerce to anything else with ==.
 *  5. Use === everywhere unless you have a specific, documented reason to use ==.
 *  6. Knowing coercion rules helps you understand: [] + [] = "", +[] = 0,
 *     and other apparently weird JS behaviors.
 *  7. parseInt() and parseFloat() are "lazy" — they stop at the first
 *     invalid character. Number() is strict — any invalid char → NaN.
 * ============================================================
 */

    // Addition with Strings
    console.log("5" + 5 + 5); // Output: "555" (left-to-right concatenation)

    // Weird Coercions
    console.log([] + []); // Output: "" (empty string)
    console.log([] + {}); // Output: "[object Object]"
    console.log({} + []); // Output: 0 (due to ambiguous interpretation)

// Summary Note:
console.log("\nSummary Note:");
console.log("Type coercion in JavaScript can lead to unexpected results. " +
    "Use explicit coercion methods when possible to avoid ambiguity.");
