/* ===================================================================
 * CH 01 — TypeScript Basic Types
 * ===================================================================
 *
 * WHAT IS TYPESCRIPT?
 *   TypeScript is a statically-typed superset of JavaScript that
 *   compiles to plain JS. Every valid JS file is also valid TypeScript.
 *
 * TYPE SYSTEM OVERVIEW
 * ┌──────────────┬────────────────────────────────────────────────────┐
 * │ Category     │ Types                                              │
 * ├──────────────┼────────────────────────────────────────────────────┤
 * │ Primitive    │ number, string, boolean, symbol, bigint            │
 * │ Special      │ null, undefined, void, never, any, unknown         │
 * │ Object       │ object, array, tuple, enum, interface, class       │
 * │ Derived      │ union (|), intersection (&), literal, conditional  │
 * └──────────────┴────────────────────────────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> Type annotation  : explicitly declare a variable's type
 * -> Type inference   : TS deduces the type from the assigned value
 * -> Type assertion   : tell TS to treat a value as a specific type
 * -> Const assertion  : make object/array properties literal & readonly
 * -> `any`            : opt out of type checking (avoid!)
 * -> `unknown`        : safe alternative to `any` — must narrow first
 *
 * IMPORTANT NOTES
 * 1. Use `unknown` instead of `any` whenever possible — it forces you
 *    to check the type before using the value.
 * 2. `void` ≠ `undefined`: void means "no meaningful return value";
 *    undefined is an actual assignable value.
 * 3. `never` is the bottom type — assignable to everything but nothing
 *    is assignable to it (used for unreachable code).
 * 4. Type annotations are erased at compile time — zero runtime cost.
 * 5. `symbol` and `bigint` require appropriate `lib` in tsconfig.
 * =================================================================== */

// ─── 1. Primitive Types ───────────────────────────────────────────────────────

// Number type
let age: number = 25;
let price: number = 99.99;
let hexValue: number = 0xFF;
let binaryValue: number = 0b1010;
let octalValue: number = 0o744;

console.log("Age:", age);
console.log("Price:", price);
console.log("Hex Value:", hexValue); // Output: 255

// String type
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`; // Template literal
let multiLine: string = `This is a
multi-line string`;

console.log("Full Name:", fullName); // Output: John Doe

// Boolean type
let isActive: boolean = true;
let isCompleted: boolean = false;
let isValid: boolean = age > 18; // Type inference

console.log("Is Active:", isActive);
console.log("Is Valid:", isValid);

// ─── 2. Special Types ───────────────────────────────────────────────────────

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
let maybeString: string | null = null; // Union with null
let optionalValue: string | undefined = undefined;

// Void type (commonly used for functions that don't return anything)
function logMessage(message: string): void {
    console.log(message);
    // No return statement
}

logMessage("This function returns void");

// Never type (for functions that never return)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // This never ends
    }
}

// ─── 3. Type Inference ───────────────────────────────────────────────────────

// TypeScript can infer types automatically
let inferredNumber = 42; // TypeScript infers this as number
let inferredString = "Hello"; // TypeScript infers this as string
let inferredBoolean = true; // TypeScript infers this as boolean

// inferredNumber = "string"; // Error: Type 'string' is not assignable to type 'number'

// ─── 4. any Type — Use Sparingly ────────────────────────────────────────────

let dynamicValue: any = 42;
dynamicValue = "Now I'm a string";
dynamicValue = true;
dynamicValue = { name: "Object" };

console.log("Dynamic Value:", dynamicValue);

// Any with arrays
let dynamicArray: any[] = [1, "string", true, { key: "value" }];
console.log("Dynamic Array:", dynamicArray);

// ─── 5. unknown Type — Safer Alternative to any ────────────────────────────

let unknownValue: unknown = 42;
unknownValue = "string";
unknownValue = true;

// Type checking required before use
if (typeof unknownValue === "string") {
    console.log("String length:", unknownValue.length); // Safe to use
}

if (typeof unknownValue === "number") {
    console.log("Number value:", unknownValue.toFixed(2)); // Safe to use
}

// ─── 6. Literal Types ───────────────────────────────────────────────────────

// String literals
let direction: "up" | "down" | "left" | "right" = "up";
// direction = "diagonal"; // Error: not in the allowed values

// Number literals
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 3;

// Boolean literals
let isTrue: true = true;
// let isFalse: true = false; // Error: false is not assignable to true

// ─── 7. symbol and bigint ───────────────────────────────────────────────────

// Symbol type
let sym1: symbol = Symbol("key");
let sym2: symbol = Symbol("key");
console.log("Symbols are unique:", sym1 !== sym2); // true

// BigInt type
let bigNumber: bigint = 123456789012345678901234567890n;
let anotherBigInt: bigint = BigInt("123456789012345678901234567890");

console.log("Big Number:", bigNumber);

// ─── 8. Type Assertions ─────────────────────────────────────────────────────

// Angle bracket syntax (not recommended in JSX)
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// As syntax (preferred)
let anotherValue: any = "another string";
let anotherStrLength: number = (anotherValue as string).length;

console.log("String Length:", strLength);
console.log("Another String Length:", anotherStrLength);

// ─── 9. Const Assertions (as const) ─────────────────────────────────────────

// Without const assertion
let mutableArray = [1, 2, 3]; // type: number[]
mutableArray.push(4); // Allowed

// With const assertion
let immutableArray = [1, 2, 3] as const; // type: readonly [1, 2, 3]
// immutableArray.push(4); // Error: Property 'push' does not exist

const person = {
    name: "Alice",
    age: 30
} as const; // All properties become readonly

console.log("Person:", person);

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. TypeScript's type system operates entirely at compile time — all
 *    annotations are stripped before the JS runtime executes.
 * 2. Prefer explicit annotations for function signatures and module
 *    boundaries; let TypeScript infer types inside function bodies.
 * 3. Never use `any` in production code — it disables type checking
 *    entirely. Use `unknown` and narrow the type before use.
 * 4. `null` and `undefined` are distinct types; enable
 *    `strictNullChecks` in tsconfig to enforce their proper handling.
 * 5. Literal types pin a variable to specific values, making illegal
 *    states unrepresentable at the type level.
 * 6. `as const` freezes object/array shapes into narrow literal types,
 *    useful for config objects and lookup tables.
 * 7. Type assertions (`as T`) do NOT perform runtime checks — use type
 *    guards for runtime safety when dealing with external data.
 * 8. `symbol` guarantees unique identities (useful for Map keys);
 *    `bigint` handles integers beyond Number.MAX_SAFE_INTEGER.
 * =================================================================== */
export {};
