/*
 *  Understanding Type Coercion and Abstract Operations in JavaScript
 */

/*
 * Abstract Operations:
 * Abstract operations are internal methods defined in the ECMAScript specification
 * that describe how certain operations work behind the scenes.
 *
 * Examples:
 * - ToString: Converts a value to a string.
 * - ToNumber: Converts a value to a number.
 * - ToBoolean: Converts a va lue to a boolean.
 *
 * Type coercion happens when JavaScript implicitly invokes these abstract operations
 * to convert values during an operation or comparison.
 */

// 1. Implicit Coercion (Automatic by JavaScript)
    console.log("\n1. Implicit Coercion Examples:");

    // String + Number -> String Concatenation
    console.log("5" + 2); // Output: "52" (2 is converted to a string)
    console.log(5 + "2"); // Output: "52"

    // String - Number -> Numeric Subtraction
    console.log("5" - 2); // Output: 3 ("5" is converted to a number)

    // String * Number -> Numeric Multiplication
    console.log("5" * 2); // Output: 10

    // Boolean + Number -> Numeric Addition
    console.log(true + 1); // Output: 2 (true is converted to 1)
    console.log(true + "1"); // Output: true1 (both converted to string)

    // Null and Undefined
    console.log(null + 2); // Output: 2 (null is converted to 0)
    console.log(null + "2"); // Output: null2 (toString())
    console.log(undefined + 2); // Output: NaN (undefined cannot be converted to a number)
    console.log(undefined + "2"); // Output: undefined2 (if one of them is string, convert both to string)

console.log(10 - {"a": 10, valueOf(){ return 5; }}); // Output: 5 

// 2. Explicit Coercion (Using JavaScript Methods)
    console.log("\n2. Explicit Coercion Examples:");

    // String to Number
    console.log(Number("42")); // Output: 42
    console.log(parseInt("42")); // Output: 42

    // Number to String
    console.log(String(42)); // Output: "42"

    // Boolean to String
    console.log(String(true)); // Output: "true"

    // ToBoolean Examples
    console.log(Boolean(0)); // Output: false (falsy value)
    console.log(Boolean("")); // Output: false (falsy value)
    console.log(Boolean("hello")); // Output: true (truthy value)

    // 3. Comparison Coercion
    console.log("\n3. Comparison Coercion Examples:");

    // Abstract Equality (==) - Performs Type Coercion
    console.log(5 == "5"); // Output: true (string is converted to a number)

    // Strict Equality (===) - No Type Coercion
    console.log(5 === "5"); // Output: false (types are different)

    // Abstract Relational Comparison
    console.log("10" > 5); // Output: true ("10" is converted to a number)

    // 4. Special Cases
    console.log("\n4. Special Coercion Cases:");

    // NaN - Not a Number
    console.log(Number("hello")); // Output: NaN
    console.log(isNaN(Number("hello"))); // Output: true

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
