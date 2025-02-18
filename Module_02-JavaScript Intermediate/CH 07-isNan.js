/*
 * isNaN() Function
 *
 * The isNaN() function determines whether a value is NaN (Not-a-Number).
 *
 * Behavior:
 * - It tries to convert the given value to a number and checks if it results in NaN.
 * - Returns true for values that are not valid numbers after coercion.
 * - Returns false for numbers or values that can be coerced into valid numbers.
 *
 * Important Notes:
 * - NaN is the only value in JavaScript that is not equal to itself. This is why `isNaN()` is useful to detect it.
 * - Avoid confusion with the Number.isNaN() method, which checks specifically for NaN without coercion.
 * - Type coercion can lead to unexpected results, so understanding the input type is key.
 */


console.log("=== Examples with Numbers ===");
console.log(isNaN(123)); // false, 123 is a number
console.log(isNaN(-123)); // false, -123 is a number
console.log(isNaN(NaN)); // true, NaN is "Not a Number"

console.log("\n=== Examples with Strings ===");
console.log(isNaN("123")); // false, "123" can be coerced to a number
console.log(isNaN("123abc")); // true, "123abc" cannot be coerced to a number
console.log(isNaN("")); // false, empty string is coerced to 0
console.log(isNaN(" ")); // false, a string with spaces is coerced to 0

console.log("\n=== Examples with Booleans ===");
console.log(isNaN(true)); // false, true is coerced to 1
console.log(isNaN(false)); // false, false is coerced to 0

console.log("\n=== Examples with Null and Undefined ===");
console.log(isNaN(null)); // false, null is coerced to 0
console.log(isNaN(undefined)); // true, undefined cannot be coerced to a number

console.log("\n=== Examples with Objects ===");
console.log(isNaN({})); // true, objects cannot be coerced to a number
console.log(isNaN({ key: "value" })); // true, objects cannot be coerced to a number
console.log(isNaN([])); // false, empty array is coerced to 0
console.log(isNaN([123])); // false, single-element array with a number is coerced to that number
console.log(isNaN([123, 456])); // true, array with multiple elements cannot be coerced to a number

console.log("\n=== Examples with Special Values ===");
console.log(isNaN(Infinity)); // false, Infinity is a number
console.log(isNaN(-Infinity)); // false, -Infinity is a number

console.log("\n=== Examples with Functions ===");
console.log(isNaN(function() {})); // true, functions cannot be coerced to a number

console.log("\n=== Examples with Symbols ===");
try {
    console.log(isNaN(Symbol("123"))); // TypeError, Symbols cannot be coerced to a number
} catch (error) {
    console.error("Error: Symbols cannot be checked using isNaN()");
}

// Additional Examples with typeof checks
console.log("\n=== Additional Checks ===");
const inputs = [123, "abc", NaN, true, undefined, null, {}, [], Infinity];
inputs.forEach(input => {
    console.log(`isNaN(${JSON.stringify(input)}) = ${isNaN(input)}, typeof: ${typeof input}`);
});

let a = "10";
let b = 10 - a;
console.log(isNaN(b));