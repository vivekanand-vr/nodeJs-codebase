/*
 * ============================================================
 *  CH 02 - The `typeof` Operator
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  `typeof` is a unary operator that returns a string indicating
 *  the data type of its operand. It is evaluated at runtime.
 *
 *  Syntax:
 *    typeof operand
 *    typeof(operand)   ← parentheses are optional, not a function call
 *
 *  RETURN VALUE TABLE:
 *  -------------------
 *   Value / Expression        | typeof result
 *  ---------------------------|---------------
 *   "hello", 'hi', `text`     | "string"
 *   42, 3.14, NaN, Infinity   | "number"
 *   true, false               | "boolean"
 *   undefined                 | "undefined"
 *   null                      | "object"   ← BUG in JS (not a real object)
 *   { key: val }              | "object"
 *   [1, 2, 3]                 | "object"   ← arrays are objects
 *   function() {}             | "function"
 *   Symbol()                  | "symbol"
 *   9007199254740991n         | "bigint"
 *
 *  KEY POINTS:
 *  -----------
 *  - `typeof` is SAFE to call on undeclared variables (returns "undefined").
 *    No other operator guarantees this — accessing an undeclared variable
 *    normally throws a ReferenceError.
 *  - `typeof null === "object"` is a historical bug that cannot be fixed
 *    (would break existing code). Always check null with `=== null`.
 *  - `typeof []` and `typeof {}` both return "object".
 *    Use Array.isArray() to distinguish arrays from plain objects.
 *  - NaN (Not a Number) has typeof "number" — use Number.isNaN() to detect it.
 *  - Classes are syntactic sugar over constructor functions, so
 *    `typeof ClassName` returns "function".
 * ============================================================
 */

// ─── 1. PRIMITIVES ─────────────────────────────────────────────

let str = "Hello, World!";
console.log(typeof str);          // Output: string

let num = 42;
console.log(typeof num);          // Output: number

let isActive = true;
console.log(typeof isActive);     // Output: boolean

let notDefined;
console.log(typeof notDefined);   // Output: undefined

let sym = Symbol("unique");
console.log(typeof sym);          // Output: symbol

let bigIntNum = 12345678901234567890n;
console.log(typeof bigIntNum);    // Output: bigint

// ─── 2. NULL — THE INFAMOUS BUG ────────────────────────────────

let empty = null;
console.log(typeof empty);        // Output: object  ← NOT truly an object!

// Correct way to check for null:
console.log(empty === null);      // Output: true
console.log(empty == undefined);  // Output: true  (loose equality treats null ≈ undefined)
console.log(empty === undefined); // Output: false (strict equality — they are different)

// ─── 3. REFERENCE TYPES (all return "object") ──────────────────

let obj = { name: "Alice", age: 25 };
console.log(typeof obj);          // Output: object

let arr = [1, 2, 3];
console.log(typeof arr);          // Output: object  ← NOT "array"
console.log(Array.isArray(arr));  // Output: true    ← correct check for arrays

let date = new Date();
console.log(typeof date);         // Output: object

let regex = /abc/;
console.log(typeof regex);        // Output: object

// ─── 4. FUNCTIONS ──────────────────────────────────────────────

function greet() { return "Hello!"; }
console.log(typeof greet);        // Output: function

const arrowFn = () => {};
console.log(typeof arrowFn);      // Output: function

// ─── 5. SPECIAL NUMERIC VALUES ─────────────────────────────────

let invalidNumber = NaN;
console.log(typeof invalidNumber); // Output: number  ← NaN is still type "number"!
console.log(Number.isNaN(NaN));    // Output: true    ← proper NaN check

let infiniteValue = Infinity;
console.log(typeof infiniteValue); // Output: number

// ─── 6. UNDECLARED VARIABLE — SAFE USE OF typeof ───────────────

// Accessing an undeclared variable directly throws ReferenceError.
// But typeof handles it gracefully:
console.log(typeof undeclaredVariable); // Output: undefined  (no error thrown!)

// This is commonly used for feature detection:
if (typeof window !== "undefined") {
    console.log("Running in a browser");
} else {
    console.log("Running in Node.js");   // This line runs in Node.js
}

// ─── 7. PRIMITIVES vs OBJECT WRAPPERS ──────────────────────────

let primitiveNum = 10;          // primitive number
let wrappedNum   = new Number(10); // Number object (not the same!)

console.log(typeof primitiveNum); // Output: number
console.log(typeof wrappedNum);   // Output: object  ← avoid using `new` wrappers

// ─── 8. CLASSES — typeof returns "function" ────────────────────

class Person {
    constructor(name) { this.name = name; }
}
let personInstance = new Person("John");

console.log(typeof Person);         // Output: function (class is sugar over constructor fn)
console.log(typeof personInstance); // Output: object

// ─── 9. typeof IN CONDITIONALS (runtime type-guarding) ─────────

let dynamicValue = 100;
if (typeof dynamicValue === "number") {
    console.log("It's a number!");  // Output: It's a number!
}

dynamicValue = "Dynamic String";
if (typeof dynamicValue === "string") {
    console.log("Now it's a string!"); // Output: Now it's a string!
}

// ─── 10. WHAT typeof CANNOT DO ─────────────────────────────────

// - Cannot distinguish null from object  → use `=== null`
// - Cannot distinguish array from object → use Array.isArray()
// - Cannot distinguish Date / RegExp     → use instanceof
console.log(date instanceof Date);  // Output: true
console.log(arr instanceof Array);  // Output: true

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. `typeof` returns a lowercase string — always compare it
 *     against a string literal ("string", "number", etc.).
 *  2. It is the ONLY operator that can be safely used on a
 *     completely undeclared variable without throwing an error.
 *  3. Three results of typeof that trip people up:
 *       - typeof null       → "object"   (known JS bug)
 *       - typeof []         → "object"   (arrays are objects)
 *       - typeof NaN        → "number"   (NaN is a numeric value)
 *  4. Prefer stricter checks over typeof when possible:
 *       - null check   : value === null
 *       - array check  : Array.isArray(value)
 *       - NaN check    : Number.isNaN(value)
 *       - instance check: value instanceof ClassName
 *  5. Avoid `new String()`, `new Number()`, `new Boolean()` —
 *     they create objects, not primitives, and confuse typeof.
 * ============================================================
 */
