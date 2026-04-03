/*
 * ============================================================
 *  CH 05 - Operators in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  An operator takes one or more values (operands) and produces
 *  a new value. JavaScript operators are grouped by what they do:
 *
 *    1. Arithmetic          — math operations (+, -, *, /, %, **)
 *    2. Assignment          — assign + optionally transform (=, +=, -=, …)
 *    3. Comparison          — compare two values, return boolean
 *    4. Logical             — combine booleans / short-circuit (&&, ||, !)
 *    5. Bitwise             — operate on 32-bit integers (&, |, ^, ~, <<, >>)
 *    6. String              — concatenate strings (+)
 *    7. Ternary             — compact if-else (condition ? a : b)
 *    8. Nullish Coalescing  — default for null/undefined (??)
 *    9. Optional Chaining   — safe property access (?.)
 *   10. typeof / instanceof — type-checking operators
 *   11. in                  — check if property exists in object
 *   12. Spread / Rest       — ... (covered in functions & arrays chapters)
 *
 *  KEY POINTS:
 *  -----------
 *  - `+` is overloaded: it's addition for numbers AND concatenation for strings.
 *    When one operand is a string, both are coerced to strings.
 *  - == performs type coercion before comparing (loose equality).
 *    === does NOT coerce — value AND type must match (strict equality).
 *    Always prefer === in application code.
 *  - && and || do NOT simply return true/false — they return one of
 *    their OPERANDS depending on truthiness (short-circuit evaluation).
 *  - ?? (nullish coalescing) only triggers for null/undefined, unlike
 *    || which also triggers for other falsy values (0, "", false, NaN).
 *  - Integer division (floor division) is not a native operator;
 *    use Math.floor(a / b) or parseInt(a / b).
 * ============================================================
 */

// ─── 1. ARITHMETIC OPERATORS ───────────────────────────────────

console.log("Arithmetic Operators:");
console.log(15 + 5);   // Output: 20  (addition)
console.log(15 - 5);   // Output: 10  (subtraction)
console.log(15 * 5);   // Output: 75  (multiplication)
console.log(15 / 4);   // Output: 3.75 (division — always returns float if not exact)
console.log(15 % 4);   // Output: 3   (modulus — remainder after division)
console.log(2 ** 10);  // Output: 1024 (exponentiation: 2^10)

// Integer / floor division (no native operator):
console.log(Math.floor(15 / 4)); // Output: 3
console.log(parseInt(15 / 4));   // Output: 3

// Special arithmetic results:
console.log(0 / 0);   // Output: NaN
console.log(1 / 0);   // Output: Infinity
console.log(-1 / 0);  // Output: -Infinity

// Shorthand Assignment Operators
let num = 10;
num += 5;   // num = num + 5
console.log(num); // Output: 15
num -= 3;   // num = num - 3
console.log(num); // Output: 12
num *= 2;   // num = num * 2
console.log(num); // Output: 24
num /= 4;   // num = num / 4
console.log(num); // Output: 6
num **= 2;  // num = num ** 2
console.log(num); // Output: 36
num %= 5;   // num = num % 5
console.log(num); // Output: 1

// ─── 2. COMPARISON OPERATORS ───────────────────────────────────

console.log("\nComparison Operators:");
console.log(10 > 5);        // Output: true   (greater than)
console.log(10 >= 10);      // Output: true   (greater than or equal)
console.log(5 < 10);        // Output: true   (less than)
console.log(5 <= 4);        // Output: false  (less than or equal)

// Strict equality (===) — no type coercion
console.log(10 === 10);     // Output: true
console.log(10 === "10");   // Output: false  ← different types
console.log(10 !== "10");   // Output: true

// Loose equality (==) — coerces types before comparing
console.log(10 == "10");    // Output: true   ← "10" coerced to 10
console.log(0 == false);    // Output: true   ← false coerced to 0
console.log(null == undefined); // Output: true  ← special JS rule
console.log(null === undefined); // Output: false ← strict: different types

// ─── 3. LOGICAL OPERATORS ──────────────────────────────────────

console.log("\nLogical Operators:");
console.log(true && true);   // Output: true
console.log(true && false);  // Output: false
console.log(false || true);  // Output: true
console.log(!true);          // Output: false
console.log(!false);         // Output: true
console.log(!!0);            // Output: false (double-not converts to boolean)
console.log(!!"hello");      // Output: true

// Short-circuit evaluation — && and || return an OPERAND, not just boolean
console.log(10 && 20);       // Output: 20    (returns last truthy value)
console.log(0 && 20);        // Output: 0     (returns first falsy value — short-circuits)
console.log(0 || 5);         // Output: 5     (returns first truthy value)
console.log("" || "default"); // Output: default
console.log("" && "never");  // Output: ""    (first operand is falsy, stops here)

// ─── 4. BITWISE OPERATORS ──────────────────────────────────────

console.log("\nBitwise Operators:");
//  5 = 0101  |  3 = 0011   (in 4-bit binary)
console.log(5 & 3);    // Output: 1   (AND:        0101 & 0011 = 0001)
console.log(5 | 3);    // Output: 7   (OR:         0101 | 0011 = 0111)
console.log(5 ^ 3);    // Output: 6   (XOR:        0101 ^ 0011 = 0110)
console.log(~5);       // Output: -6  (NOT:        bitwise NOT flips all bits → -(n+1))
console.log(5 << 1);   // Output: 10  (Left shift:  0101 → 1010)
console.log(5 >> 1);   // Output: 2   (Right shift: 0101 → 0010, sign bit preserved)
console.log(-5 >>> 1); // Output: 2147483645 (Unsigned right shift — fills with 0 not sign)

// Common trick: ~~ as a fast Math.floor for positive numbers
console.log(~~3.9);   // Output: 3   (not recommended in production — use Math.floor)

// ─── 5. STRING CONCATENATION WITH + ────────────────────────────

console.log("\nString Operators:");
console.log("Hello " + "World!");  // Output: Hello World!
console.log("Score: " + 42);      // Output: Score: 42   (number coerced to string)

// Coercion order matters with +
console.log(5 + 5 + "5");    // Output: 105   (5+5=10, then 10+"5"="105")
console.log("5" + 5 + 5);    // Output: 555   ("5"+5="55", then "55"+5="555")
console.log(5 + "5" + 5);    // Output: 555   (5+"5"="55", then "55"+5="555")

// Use template literals or Number() to avoid accidental concatenation:
let a = "10", b = "20";
console.log(Number(a) + Number(b)); // Output: 30  ← intentional addition

// ─── 6. TERNARY OPERATOR ───────────────────────────────────────

console.log("\nTernary Operator:");
let voterAge = 20;
let status = (voterAge >= 18) ? "Adult" : "Minor";
console.log(status);  // Output: Adult

// Chained ternary (readable only when chaining is simple)
let marks = 75;
let grade = (marks >= 90) ? "A" :
            (marks >= 80) ? "B" :
            (marks >= 70) ? "C" : "F";
console.log(grade); // Output: C

// ─── 7. NULLISH COALESCING (??) ────────────────────────────────

console.log("\nNullish Coalescing Operator:");
let username = null;
console.log(username ?? "Guest");  // Output: Guest  (null → use default)

let count = 0;
console.log(count ?? 42);          // Output: 0  (0 is NOT null/undefined → keep it)
console.log(count || 42);          // Output: 42 (|| treats 0 as falsy — ?? is safer!)

let score = undefined;
console.log(score ?? 100);         // Output: 100

// ─── 8. OPTIONAL CHAINING (?.) ─────────────────────────────────

console.log("\nOptional Chaining:");
let user = { address: { city: "New York" } };
console.log(user?.address?.city);    // Output: New York
console.log(user?.profile?.age);     // Output: undefined  (no error thrown)
// Without ?.: user.profile.age would throw TypeError: Cannot read properties of undefined

let arr2 = [1, 2, 3];
console.log(arr2?.[1]);              // Output: 2   (optional index access)
console.log(arr2?.[99]);             // Output: undefined (safe — no error)

let fn = null;
console.log(fn?.());                 // Output: undefined (safe call — fn is null)

// ─── 9. typeof AND instanceof ──────────────────────────────────

console.log("\ntypeof and instanceof:");
console.log(typeof "hello");         // Output: string
console.log(typeof 42);             // Output: number
console.log(typeof true);           // Output: boolean
console.log(typeof undefined);      // Output: undefined
console.log(typeof null);           // Output: object  ← bug

class Animal {}
const dog = new Animal();
console.log(dog instanceof Animal); // Output: true
console.log([] instanceof Array);   // Output: true
console.log({} instanceof Object);  // Output: true

// ─── 10. in OPERATOR ───────────────────────────────────────────

console.log("\nin Operator:");
const car = { make: "Toyota", model: "Camry", year: 2021 };
console.log("make" in car);   // Output: true
console.log("color" in car);  // Output: false
console.log(0 in [10, 20]);   // Output: true  (checks index 0 exists in array)

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Always use === (strict equality) over == (loose equality)
 *     to avoid unexpected type coercion bugs.
 *  2. The + operator is special — when either operand is a string,
 *     it concatenates. Left-to-right evaluation determines the result.
 *  3. && and || don't return true/false — they return one of their
 *     operands. Use this for defaulting values or conditional execution.
 *  4. ?? is better than || for default values when 0, "" or false are
 *     valid, expected values (it only checks for null/undefined).
 *  5. Optional chaining (?.) prevents TypeError when accessing
 *     deeply nested properties that might not exist.
 *  6. JavaScript has no floor-division operator (//).
 *     Use Math.floor(a / b) explicitly.
 *  7. Bitwise operators work on 32-bit signed integers; they implicitly
 *     convert their operands with ToInt32().
 *  8. The `in` operator and instanceof are useful for runtime checks
 *     that typeof cannot perform (checking properties or prototype chain).
 * ============================================================
 */
