/*
 * Equality Comparisions
 *
 * Abstract Equality (==):
 * - Compares two values for equality after performing type coercion if needed.
 * - If the types differ, JavaScript attempts to convert one or both values to the same type.
 * - Can lead to unexpected results if not understood well.
 *
 * Strict Equality (===):
 * - Compares two values for equality without performing type coercion.
 * - Both the value and the type must match for the comparison to return true.
 */

// 1. Comparing Primitive Values
console.log("\n1. Comparing Primitive Values:");
console.log(5 == "5"); // true (abstract equality performs type coercion)
console.log(5 === "5"); // false (strict equality checks type and value)
console.log(0 == false); // true (0 coerces to false)
console.log(0 === false); // false (different types: number vs boolean)
console.log(null == undefined); // true (special case for ==)
console.log(null === undefined); // false (different types)

// 2. Objects and References
console.log("\n2. Objects and References:");
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 == obj2); // false (different references)
console.log(obj1 === obj2); // false (different references)
console.log(obj1 === obj3); // true (same reference)

// 3. Special Cases with Abstract Equality
console.log("\n3. Special Cases with Abstract Equality:");
console.log("0" == false); // true ("0" coerces to 0, and 0 == false)
console.log(" " == 0); // true (empty string coerces to 0)
console.log([1, 2] == "1,2"); // true (array coerces to string)
console.log([] == ""); // true (empty array coerces to empty string)

// 4. Edge Cases with Strict Equality
console.log("\n4. Edge Cases with Strict Equality:");
console.log(NaN === NaN); // false (NaN is not equal to itself)
console.log(+0 === -0); // true (considered equal in JavaScript)

// 5. Guidelines for Choosing == or ===
console.log("\n5. Guidelines for Choosing == or ===:");
console.log(5 == "5"); // true (abstract equality may be convenient but can be risky)
console.log(5 === "5"); // false (strict equality is safer for predictable behavior)

// 6. Practical Examples
console.log("\n6. Practical Examples:");

// Checking user input
let userInput = "0";
if (userInput == false) {
  console.log("Input is considered falsy."); // Executes due to type coercion
}

if (userInput === false) {
  console.log("Input is strictly false."); // Doesn't execute
} else {
  console.log("Input is not strictly false."); // Executes
}

// Validating values
let isActive = 1;
console.log(isActive == true); // true (1 coerces to true)
console.log(isActive === true); // false (1 is not strictly true)

// Comparing null and undefined
console.log(null == undefined); // true (abstract equality considers them equal)
console.log(null === undefined); // false (strict equality differentiates them)

// Summary Note
console.log("\nSummary Note:");
console.log(
  "Use `==` when you expect coercion and know the rules. " +
  "Use `===` for predictable comparisons without type conversion."
);
