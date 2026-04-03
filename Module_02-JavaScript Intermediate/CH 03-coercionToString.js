/*
 * ============================================================
 *  CH 03 - Coercion → ToString
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  The ToString abstract operation converts a value to its string
 *  representation. It is triggered implicitly whenever a string
 *  context is needed — most notably when the `+` operator has at
 *  least one string operand, or when concatenating a value into
 *  a template literal.
 *
 *  ToString CONVERSION TABLE:
 *  --------------------------
 *   Input              | Result
 *  --------------------|---------------------------
 *   undefined          | "undefined"
 *   null               | "null"
 *   true               | "true"
 *   false              | "false"
 *   0                  | "0"
 *   -0                 | "0"        ← -0 becomes "0", not "-0"!
 *   NaN                | "NaN"
 *   Infinity           | "Infinity"
 *   -Infinity          | "-Infinity"
 *   42                 | "42"
 *   3.14               | "3.14"
 *   []                 | ""         (empty array → empty string)
 *   [1,2,3]            | "1,2,3"    (elements joined with comma)
 *   {}                 | "[object Object]"
 *   Symbol("x")        | TypeError  — cannot be implicitly converted!
 *
 *  KEY POINTS:
 *  -----------
 *  - Template literals `${x}` call ToString on every interpolated value.
 *  - String() is the safest explicit conversion — it handles all types.
 *  - .toString() works on most values, but throws on null/undefined.
 *  - Symbols CANNOT be implicitly converted to strings — TypeError.
 *    Use String(sym) or sym.toString() explicitly.
 *  - -0 converts to "0", NOT "-0". Use String(-0) and it still gives "0".
 *    To get "-0" as a string, use JSON.stringify(-0) → "0" (also "0")
 *    or: Object.is(val, -0) to detect -0.
 *  - Arrays join their elements with comma by default; nested arrays are
 *    flattened one level during this join.
 * ============================================================
 */

// ─── 1. + OPERATOR: STRING CONCATENATION ───────────────────────

console.log("1. String Concatenation with +:");

console.log("The number is: " + 5);          // Output: "The number is: 5"
console.log("5" + 5);                        // Output: "55"  — 5 → "5"
console.log(5 + " apples");                  // Output: "5 apples"
console.log(5 + 5 + " apples");              // Output: "10 apples"  — left to right: 5+5=10, then 10+" apples"
console.log("Total: " + 5 + 5);             // Output: "Total: 55"  — "Total:"+5="Total: 5", then +"5"

// ─── 2. PRIMITIVES → STRING ────────────────────────────────────

console.log("\n2. Primitives to String:");

console.log("Value: " + true);       // Output: "Value: true"
console.log("Value: " + false);      // Output: "Value: false"
console.log("Value: " + null);       // Output: "Value: null"
console.log("Value: " + undefined);  // Output: "Value: undefined"
console.log("Value: " + NaN);        // Output: "Value: NaN"
console.log("Value: " + Infinity);   // Output: "Value: Infinity"
console.log("Value: " + -Infinity);  // Output: "Value: -Infinity"
console.log("Value: " + 0);          // Output: "Value: 0"
console.log("Value: " + -0);         // Output: "Value: 0"  ← -0 becomes "0" !

// ─── 3. ARRAYS → STRING ────────────────────────────────────────

console.log("\n3. Arrays to String:");

console.log("Array: " + [1, 2, 3]);           // Output: "Array: 1,2,3"
console.log("Empty: " + []);                  // Output: "Empty: "   — empty string
console.log("Nested: " + [[1, 2], [3, 4]]);   // Output: "Nested: 1,2,3,4" — flattened one level
console.log("Mixed: " + [1, null, undefined]); // Output: "Mixed: 1,,"  — null/undefined → ""

// ─── 4. OBJECTS → STRING ───────────────────────────────────────

console.log("\n4. Objects to String:");

console.log("Object: " + { key: "value" });   // Output: "Object: [object Object]"
console.log("Empty: " + {});                  // Output: "Empty: [object Object]"
// To get meaningful output, implement toString():
const withToString = {
    name: "MyObj",
    toString() { return `[MyObj name=${this.name}]`; }
};
console.log("Custom: " + withToString);        // Output: "Custom: [MyObj name=MyObj]"

// ─── 5. SYMBOLS → STRING ───────────────────────────────────────

console.log("\n5. Symbols to String:");

const sym = Symbol("test");
try {
    console.log("Value: " + sym); // Throws TypeError — implicit not allowed
} catch (err) {
    console.error("Error:", err.message); // Output: Cannot convert a Symbol value to a string
}

// Explicit conversion of Symbol — these DO work:
console.log(String(sym));      // Output: "Symbol(test)"
console.log(sym.toString());   // Output: "Symbol(test)"
console.log(sym.description);  // Output: "test"  — just the description, not the symbol wrapper

// ─── 6. EXPLICIT CONVERSION: String() vs .toString() ──────────

console.log("\n6. Explicit: String() vs .toString():");

console.log(String(42));        // Output: "42"
console.log(String(true));      // Output: "true"
console.log(String(null));      // Output: "null"    — works fine
console.log(String(undefined)); // Output: "undefined"  — works fine

console.log((42).toString());   // Output: "42"
console.log((42).toString(2));  // Output: "101010"  — binary representation!
console.log((42).toString(16)); // Output: "2a"      — hex representation
// null.toString() — THROWS TypeError (null has no methods)
// undefined.toString() — THROWS TypeError

// ─── 7. TEMPLATE LITERALS ──────────────────────────────────────

console.log("\n7. Template Literals:");

// Template literals call ToString on every ${} interpolation
console.log(`Number: ${5}`);              // Output: "Number: 5"
console.log(`Boolean: ${true}`);          // Output: "Boolean: true"
console.log(`Null: ${null}`);             // Output: "Null: null"
console.log(`Undefined: ${undefined}`);   // Output: "Undefined: undefined"
console.log(`Array: ${[1, 2, 3]}`);      // Output: "Array: 1,2,3"
console.log(`Object: ${{ key: "val" }}`); // Output: "Object: [object Object]"

// ─── 8. MIXED TYPES IN CONCATENATION ───────────────────────────

console.log("\n8. Mixed Types:");

console.log("Mixed: " + 5 + true + null);       // Output: "Mixed: 5truenull"
console.log("Complex: " + [1, 2] + { k: "v" }); // Output: "Complex: 1,2[object Object]"

// -0 quirk — String(-0) gives "0", not "-0"
console.log(String(-0));              // Output: "0"
console.log(JSON.stringify(-0));      // Output: "0"   (also becomes "0")
console.log(Object.is(-0, -0));       // Output: true  — use Object.is to detect -0

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. String concatenation (+) is the most common trigger for implicit
 *     ToString. As soon as one operand is a string, the other is ToString'd.
 *  2. String() is the safest explicit converter — it handles null and
 *     undefined without throwing, unlike .toString().
 *  3. Arrays are joined with commas by default: [1,2,3] → "1,2,3".
 *     Nested arrays are flattened one level.
 *  4. Plain objects always stringify to "[object Object]" unless you
 *     override .toString() on the prototype or instance.
 *  5. Symbols CANNOT be implicitly converted to strings — always use
 *     String(sym) or sym.toString() for explicit conversion.
 *  6. -0 converts to "0", not "-0". Use Object.is(val, -0) to detect
 *     negative zero — no other comparison can distinguish it.
 *  7. Template literals are the modern, readable way to convert values
 *     to strings in interpolation contexts.
 * ============================================================
 */

// Mixing multiple types
console.log(5 + " apples"); // Output: "5 apples"
console.log(5 + 5 + " apples"); // Output: "10 apples" (first addition, then concatenation)
console.log("Total: " + 5 + 5); // Output: "Total: 55" (first coerces, then concatenates)

// 2. Boolean to String
console.log("\n2. Boolean to String:");
console.log("Value is: " + true); // Output: "Value is: true"
console.log("Value is: " + false); // Output: "Value is: false"

// 3. Null and Undefined
console.log("\n3. Null and Undefined:");
console.log("Value is: " + null); // Output: "Value is: null"
console.log("Value is: " + undefined); // Output: "Value is: undefined"

// 4. Arrays to String
console.log("\n4. Arrays to String:");
console.log("Array: " + [1, 2, 3]); // Output: "Array: 1,2,3" (array coerced to "1,2,3")
console.log("Empty Array: " + []); // Output: "Empty Array: " (empty array coerced to "")
console.log("Nested Array: " + [[1, 2], [3, 4]]); // Output: "Nested Array: 1,2,3,4"

// 5. Objects to String
console.log("\n5. Objects to String:");
console.log("Object: " + { key: "value" }); // Output: "Object: [object Object]"
console.log("Empty Object: " + {}); // Output: "Empty Object: [object Object]"

// 6. Symbol to String
console.log("\n6. Symbol to String:");
try {
  console.log("Value is: " + Symbol("test")); // Throws TypeError: Cannot convert a Symbol value to a string
} catch (error) {
  console.error("Error:", error.message);
}

// 7. Mixed Types
console.log("\n7. Mixed Types:");
console.log("Mixed: " + 5 + true + null); // Output: "Mixed: 5truenull"
console.log("Complex: " + [1, 2] + { key: "value" }); // Output: "Complex: 1,2[object Object]"

// 8. Implicit Conversion in Template Literals
console.log("\n8. Template Literals:");
console.log(`The number is: ${5}`); // Output: "The number is: 5"
console.log(`Boolean value: ${true}`); // Output: "Boolean value: true"
console.log(`Array: ${[1, 2, 3]}`); // Output: "Array: 1,2,3"
console.log(`Object: ${ { key: "value" } }`); // Output: "Object: [object Object]"

// Summary Note
console.log("\nSummary Note:");
console.log(
  "Implicit ToString conversions occur frequently with the '+' operator during string concatenation. " +
  "Non-string values like numbers, booleans, arrays, and objects are coerced into strings " +
  "to fit the context of the operation. Be cautious when mixing types to avoid unintended results."
);
