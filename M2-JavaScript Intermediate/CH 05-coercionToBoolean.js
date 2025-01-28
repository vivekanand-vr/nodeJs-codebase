/*
 * ToBoolean Conversion:
 * JavaScript converts values to their Boolean equivalents when needed
 * (e.g., in conditionals, logical operations).
 *
 * Falsy Values: These are treated as `false` in Boolean contexts:
 *  - false
 *  - 0 (or -0)
 *  - NaN
 *  - null
 *  - undefined
 *  - ""
 *
 * All other values are truthy, including objects, arrays, and even empty objects/arrays.
 */

/*
 * The `!` operator inverts the truthiness of a value:
 *   - `!value` converts the value to its Boolean equivalent and then negates it.
 *   - `!!value` explicitly converts any value to its Boolean equivalent.
 *
 * This behavior can be used to mimic implicit ToBoolean conversions.
 */

// 1. Using Single NOT (`!`) to Check Falsiness
console.log("\n1. Single NOT (`!`) for Falsiness:");
console.log(!false); // true (false is falsy, negated to true)
console.log(!0); // true (0 is falsy, negated to true)
console.log(!""); // true (empty string is falsy, negated to true)
console.log(!null); // true (null is falsy, negated to true)
console.log(!undefined); // true (undefined is falsy, negated to true)
console.log(!NaN); // true (NaN is falsy, negated to true)

// Truthy values become false when negated
console.log(!1); // false (1 is truthy, negated to false)
console.log(!"Hello"); // false (non-empty string is truthy, negated to false)
console.log(![]); // false (array is truthy, negated to false)
console.log(!{}); // false (object is truthy, negated to false)

// 2. Using Double NOT (`!!`) for Explicit Conversion
console.log("\n2. Double NOT (`!!`) for Explicit Boolean Conversion:");
console.log(!!false); // false
console.log(!!0); // false
console.log(!!""); // false
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!NaN); // false

console.log(!!1); // true
console.log(!!"Hello"); // true
console.log(!![]); // true
console.log(!!{}); // true
console.log(!!Infinity); // true

// 3. Mimicking Implicit ToBoolean with NOT
console.log("\n3. Mimicking Implicit ToBoolean with NOT:");

// Using NOT to simulate conditional behavior
if (!0) {
  console.log("0 is falsy!"); // Executes
}

if (!!"Non-empty string") {
  console.log("Non-empty strings are truthy!"); // Executes
}

// Logical operations with NOT
console.log(!("")); // true (mimics implicit ToBoolean of empty string)
console.log(!("hello")); // false (non-empty string is truthy)

// 4. Combining NOT with Logical Operators
console.log("\n4. Combining NOT with Logical Operators:");
console.log(!false || true); // true (negate false, short-circuits on truthy true)
console.log(!(5 > 10)); // true (false negated to true)
console.log(!null && !!"valid"); // true (null negated to true, non-empty string explicitly true)

// 5. Real-World Use Cases
console.log("\n5. Real-World Use Cases:");

// Defaulting values
let userInput = "";
console.log(!!userInput ? "Input provided" : "No input provided"); // Output: "No input provided"

// Validating an object is non-null or non-empty
let data = {};
console.log(!!data ? "Valid data" : "Invalid data"); // Output: "Valid data"

// Explicit boolean conversion
let count = 0;
let isActive = !!count; // Explicitly convert to false
console.log("Is Active:", isActive); // Output: false

// Summary Note
console.log("\nSummary Note:");
console.log(
  "Using the NOT (`!`) operator mimics implicit ToBoolean behavior. " +
  "Double NOT (`!!`) explicitly converts values to their Boolean equivalents."
);

// 1. Falsy Values
console.log("\n1. Falsy Values:");
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean(-0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("")); // false (empty string)

// 2. Truthy Values
console.log("\n2. Truthy Values:");
console.log(Boolean(true)); // true
console.log(Boolean(1)); // true
console.log(Boolean(-1)); // true
console.log(Boolean(Infinity)); // true
console.log(Boolean(-Infinity)); // true
console.log(Boolean("Non-empty string")); // true
console.log(Boolean([])); // true (empty array)
console.log(Boolean({})); // true (empty object)
console.log(Boolean(function () {})); // true (any function)

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
