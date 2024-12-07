/*
 * Boxing
 *
 * - Boxing is the process of converting a primitive value into its corresponding object wrapper.
 * - This allows primitives to access methods and properties, behaving like objects temporarily.
 * - The object wrappers include:
 *   - Number for numeric values
 *   - String for string values
 *   - Boolean for boolean values
 * - JavaScript automatically performs boxing when a method or property is accessed on a primitive.
 */

console.log("=== Examples of Boxing with Numbers ===");
const num = 42;
console.log(num.toFixed(2)); // Automatic boxing: primitive number is temporarily converted to a Number object
console.log(num.constructor.name); // Accessing the constructor shows 'Number'

console.log("\n=== Examples of Boxing with Strings ===");
const str = "Hello, World!";
console.log(str.toUpperCase()); // Automatic boxing: primitive string is temporarily converted to a String object
console.log(str.length); // Accessing a property on a string uses boxing
console.log(str.constructor.name); // Accessing the constructor shows 'String'

console.log("\n=== Examples of Boxing with Booleans ===");
const bool = true;
console.log(bool.toString()); // Automatic boxing: primitive boolean is temporarily converted to a Boolean object
console.log(bool.constructor.name); // Accessing the constructor shows 'Boolean'

console.log("\n=== Examples with Manual Boxing ===");
const boxedNumber = new Number(42); // Manually boxing a number
console.log(boxedNumber); // [Number: 42]
console.log(typeof boxedNumber); // "object"

const boxedString = new String("Boxed String"); // Manually boxing a string
console.log(boxedString); // [String: 'Boxed String']
console.log(typeof boxedString); // "object"

const boxedBoolean = new Boolean(true); // Manually boxing a boolean
console.log(boxedBoolean); // [Boolean: true]
console.log(typeof boxedBoolean); // "object"

console.log("\n=== Unboxing Examples ===");
console.log(boxedNumber.valueOf()); // Unbox: returns 42
console.log(boxedString.valueOf()); // Unbox: returns 'Boxed String'
console.log(boxedBoolean.valueOf()); // Unbox: returns true

console.log("\n=== Pitfalls of Boxing ===");
console.log(boxedNumber === 42); // false, boxed object is not strictly equal to primitive
console.log(boxedString === "Boxed String"); // false, boxed object is not strictly equal to primitive
console.log(boxedBoolean === true); // false, boxed object is not strictly equal to primitive
