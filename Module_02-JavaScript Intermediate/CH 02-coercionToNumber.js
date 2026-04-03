/*
 * ============================================================
 *  CH 02 - Coercion → ToNumber
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  The ToNumber abstract operation converts a value to a number.
 *  It is triggered implicitly by arithmetic operators (except +
 *  when a string is involved), comparison operators, and the
 *  unary + operator. It can also be triggered explicitly with
 *  Number(), parseInt(), and parseFloat().
 *
 *  ToNumber CONVERSION TABLE:
 *  --------------------------
 *   Input              | Result
 *  --------------------|--------
 *   undefined          | NaN
 *   null               | 0
 *   true               | 1
 *   false              | 0
 *   "" (empty string)  | 0
 *   " " (whitespace)   | 0
 *   "0"                | 0
 *   "42"               | 42
 *   "3.14"             | 3.14
 *   "0xff"             | 255   (hex format)
 *   "0o11"             | 9     (octal format)
 *   "0b1010"           | 10    (binary format)
 *   "123abc"           | NaN   (not a clean number)
 *   []                 | 0     ([] → "" → 0)
 *   [42]               | 42    ([42] → "42" → 42)
 *   [1,2]              | NaN   ([1,2] → "1,2" → NaN)
 *   {}                 | NaN   ({} → "[object Object]")
 *
 *  KEY POINTS:
 *  -----------
 *  - Number() is strict: any invalid character anywhere → NaN.
 *  - parseInt() is "lazy": reads left to right, stops at first invalid char.
 *  - parseInt() ALWAYS returns an integer (truncates, does not round).
 *  - parseFloat() reads decimal points too, stops at first non-numeric char.
 *  - parseInt() accepts an optional radix (base) as second argument.
 *  - The + unary operator is a shorthand for Number().
 *  - NaN is the result when coercion cannot produce a meaningful number.
 *  - Whitespace-only strings coerce to 0 (they are trimmed first).
 * ============================================================
 */

// ─── 1. IMPLICIT ToNumber IN ARITHMETIC ────────────────────────

console.log("1. Implicit ToNumber in Arithmetic:");

// All of: -, *, /, %, ** trigger ToNumber on both operands
console.log("5" - 2);    // Output: 3      — "5" → 5, then 5-2
console.log("5" * 2);    // Output: 10
console.log("5" / 2);    // Output: 2.5
console.log("5" % 2);    // Output: 1
console.log("2" ** 8);   // Output: 256

// + behaves differently — string context wins with +
console.log("5" + 2);    // Output: "52"   — concatenation, NOT addition

// Non-numeric strings → NaN
console.log("hello" - 2);  // Output: NaN
console.log("hello" * 2);  // Output: NaN
console.log("12abc" - 0);  // Output: NaN  — Number() is strict, unlike parseInt

// ─── 2. IMPLICIT ToNumber IN COMPARISONS ───────────────────────

console.log("\n2. Implicit ToNumber in Comparisons:");

// Abstract equality (==) between number and string → coerces string
console.log(5 == "5");        // Output: true
console.log(0 == "");         // Output: true  — "" → 0
console.log(0 == " ");        // Output: true  — " " → 0 (whitespace trimmed)
console.log(null == 0);       // Output: false — null never coerces with ==
console.log(undefined == 0);  // Output: false

// Relational operators: both sides coerced to numbers (if not both strings)
console.log("10" > 5);        // Output: true  — "10" → 10
console.log("10" < "9");      // Output: true  — lexicographic! "1" < "9" (both strings)
console.log("10" < 9);        // Output: false — "10" → 10, then 10 < 9

// ─── 3. UNARY + (explicit shorthand for ToNumber) ──────────────

console.log("\n3. Unary + Operator:");

console.log(+"5");         // Output: 5
console.log(+"3.14");      // Output: 3.14
console.log(+"");          // Output: 0
console.log(+" ");         // Output: 0      — whitespace trimmed
console.log(+"hello");     // Output: NaN
console.log(+true);        // Output: 1
console.log(+false);       // Output: 0
console.log(+null);        // Output: 0
console.log(+undefined);   // Output: NaN
console.log(+[]);          // Output: 0      — [] → "" → 0
console.log(+[42]);        // Output: 42     — [42] → "42" → 42
console.log(+[1,2]);       // Output: NaN    — [1,2] → "1,2" → NaN
console.log(+{});          // Output: NaN    — {} → "[object Object]" → NaN

// ─── 4. Number() — EXPLICIT CONVERSION ─────────────────────────

console.log("\n4. Number() Explicit Conversion:");

console.log(Number(42));        // Output: 42
console.log(Number("42"));      // Output: 42
console.log(Number("  42  "));  // Output: 42     — whitespace trimmed
console.log(Number(""));        // Output: 0
console.log(Number(" "));       // Output: 0
console.log(Number("3.14"));    // Output: 3.14
console.log(Number("0xff"));    // Output: 255    — hex
console.log(Number("0o11"));    // Output: 9      — octal
console.log(Number("0b1010"));  // Output: 10     — binary
console.log(Number("12abc"));   // Output: NaN    — any invalid char → NaN
console.log(Number(true));      // Output: 1
console.log(Number(false));     // Output: 0
console.log(Number(null));      // Output: 0
console.log(Number(undefined)); // Output: NaN
console.log(Number(NaN));       // Output: NaN

// ─── 5. parseInt() — LAZY INTEGER PARSING ──────────────────────

console.log("\n5. parseInt():");

console.log(parseInt("42"));      // Output: 42
console.log(parseInt("42.9"));    // Output: 42    — truncates decimals
console.log(parseInt("42px"));    // Output: 42    — stops at first invalid char
console.log(parseInt("px42"));    // Output: NaN   — starts with non-digit
console.log(parseInt("  42  "));  // Output: 42    — whitespace trimmed
console.log(parseInt("0xff"));    // Output: 255   — auto-detects hex prefix
console.log(parseInt("ff", 16));  // Output: 255   — explicit radix 16
console.log(parseInt("11", 2));   // Output: 3     — binary: 11₂ = 3₁₀
console.log(parseInt("17", 8));   // Output: 15    — octal: 17₈ = 15₁₀
console.log(parseInt(""));        // Output: NaN   — nothing to parse

// ─── 6. parseFloat() — LAZY FLOAT PARSING ──────────────────────

console.log("\n6. parseFloat():");

console.log(parseFloat("3.14"));     // Output: 3.14
console.log(parseFloat("3.14abc"));  // Output: 3.14   — stops at "a"
console.log(parseFloat("abc"));      // Output: NaN
console.log(parseFloat("3.14.15"));  // Output: 3.14   — stops at second "."
console.log(parseFloat("  3.14")); // Output: 3.14

// ─── 7. EDGE CASES ─────────────────────────────────────────────

console.log("\n7. Edge Cases:");

// Hex/Octal string coercion in arithmetic:
console.log("0xaf" - 1);    // Output: 174   — "0xaf" is valid hex → 175, minus 1
console.log("0xabc" * 1);   // Output: 2748
console.log("0o11" * 1);    // Output: 9     — valid octal
console.log("0b101" * 1);   // Output: 5     — valid binary

// Arrays and objects (go through ToPrimitive first):
console.log([1] - 5);       // Output: -4    — [1] → "1" → 1, then 1-5
console.log([1] + 5);       // Output: "15"  — [1] → "1", then string context wins
console.log({} + 5);        // Output: "[object Object]5" OR 5 depending on context

// The curious case of logical operators and numbers:
console.log("5" && 2);      // Output: 2     — "5" is truthy, returns right operand
console.log(0 && 2);        // Output: 0     — 0 is falsy, short-circuits
console.log("5" || 2);      // Output: "5"   — "5" is truthy, returns it

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. The unary + and Number() both call ToNumber, but Number()
 *     is more readable and preferred for explicit conversions.
 *  2. parseInt() is "greedy from the left" — it takes what it can
 *     and ignores the rest. Always pass a radix (parseInt(x, 10))
 *     to avoid unintended octal/hex parsing in old engines.
 *  3. Number() is "all or nothing" — if anything is invalid, NaN.
 *  4. Whitespace-only strings coerce to 0, not NaN — a common surprise.
 *  5. null → 0 but undefined → NaN in numeric context.
 *  6. Arrays go through ToPrimitive (→ toString → join(",")) before
 *     ToNumber: [] → "" → 0, [42] → "42" → 42, [1,2] → "1,2" → NaN.
 *  7. Binary (0b), octal (0o), hex (0x) prefixed strings are valid
 *     inputs for Number() and parseInt() with the right radix.
 * ============================================================
 */
