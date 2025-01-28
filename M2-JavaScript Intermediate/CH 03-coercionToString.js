/*
 * Implicit ToString Conversions:
 * JavaScript applies the ToString abstract operation when values
 * need to be coerced into strings, such as during string concatenation
 * using the "+" operator.
 */

// 1. String Concatenation with Numbers
console.log("\n1. String Concatenation with Numbers:");
console.log("The number is: " + 5); // Output: "The number is: 5"
console.log("5" + 5); // Output: "55" (5 is coerced to "5")

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
