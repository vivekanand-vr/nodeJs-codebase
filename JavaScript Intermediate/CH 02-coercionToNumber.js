/*
 * Implicit ToNumber Conversions:
 * JavaScript applies the ToNumber operation in specific scenarios where
 * a value must be coerced into a number, such as arithmetic operations,
 * comparisons, and boolean contexts.
 */

// 1. Implicit Conversion in Arithmetic Operations
console.log("\n1. Arithmetic Operations:");

// Addition
console.log("5" - 2); // Output: 3 ("5" is coerced to 5)
console.log("5" * 2); // Output: 10 ("5" is coerced to 5)
console.log("5" / 2); // Output: 2.5 ("5" is coerced to 5)
console.log("5" % 2); // Output: 1 ("5" is coerced to 5)

// Addition with "+" behaves differently (string concatenation)
console.log("5" + 2); // Output: "52" (string concatenation, not coercion)

// Non-numeric Strings
console.log("hello" - 2); // Output: NaN (invalid numeric string)
console.log("hello" * 2); // Output: NaN

// 2. Implicit Conversion in Comparisons
console.log("\n2. Comparisons:");

// Abstract Equality (==) triggers coercion
console.log(5 == "5"); // Output: true ("5" is coerced to 5)
console.log(0 == ""); // Output: true ("" is coerced to 0)
console.log(null == 0); // Output: false (null is not coerced to 0)
console.log(undefined == 0); // Output: false (undefined is not coerced to 0)

// Relational Operators
console.log("10" > 5); // Output: true ("10" is coerced to 10)
console.log("10" < "2"); // Output: false (lexicographical comparison)

// 3. Implicit Conversion with Logical Operators
console.log("\n3. Logical Operators:");

// Logical AND (&&) and OR (||) can invoke ToNumber indirectly
console.log("5" && 2); // Output: 2 (truthy values pass through)
console.log(0 && 2); // Output: 0 (falsy value stops evaluation)
console.log("5" || 2); // Output: "5" (first truthy value is returned)

// 4. Implicit Conversion in Unary Operators
console.log("\n4. Unary Operators:");

// Unary Plus (+) forces ToNumber conversion
console.log(+"5"); // Output: 5 (string coerced to number)
console.log(+"hello"); // Output: NaN (invalid numeric string)

// Unary Negation (-)
console.log(-"5"); // Output: -5 (string coerced to number)

// 5. Edge Cases in Implicit ToNumber Conversion
console.log("\n5. Edge Cases:");

// Boolean to Number
console.log(true + 1); // Output: 2 (true is coerced to 1)
console.log(false + 1); // Output: 1 (false is coerced to 0)

// Null and Undefined
console.log(null + 5); // Output: 5 (null is coerced to 0)
console.log(undefined + 5); // Output: NaN (undefined cannot be coerced to a number)

// Arrays and Objects
console.log([1] + 5); // Output: "15" ([1] is coerced to "1" and concatenated)
console.log([1] - 5); // Output: -4 ([1] is coerced to 1)
console.log({} + 5); // Output: "[object Object]5" (object coerced to string)

// Hexadecimal Number String (Starting with 0x)
console.log("0xaf" - 1); // Output: 174 (Because 0xaf is a valid hexadecimal number)
console.log("0xabc" * 1); // Output: 2748 ( 0xabc is a valid Hexadecimal fomat)

// Octal Numbers as Strings (Starting with 0o)
console.log("0o11" * 1); // Outupt: 9 (Because 0o11 is a valid octal number)

// Summary Note
console.log("\nSummary Note:");
console.log(
  "Implicit ToNumber conversions are triggered in arithmetic operations, " +
  "comparisons, and boolean evaluations. Be cautious as these conversions " +
  "may produce unexpected results, especially with mixed types."
);
