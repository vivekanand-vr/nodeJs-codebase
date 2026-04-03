/* ===================================================================
 * CH 05 — TypeScript Functions
 * ===================================================================
 *
 * WHAT MAKES TYPESCRIPT FUNCTIONS DIFFERENT?
 *   TypeScript adds static types to function parameters and return
 *   values. This lets the compiler catch incorrect calls at build
 *   time before any code runs.
 *
 * FUNCTION TYPING CHECKLIST
 * ┌────────────────────────┬───────────────────────────────────────────┐
 * │ Feature                │ Syntax / Pattern                          │
 * ├────────────────────────┼───────────────────────────────────────────┤
 * │ Param types            │ (a: number, b: string): boolean           │
 * │ Optional param         │ (name: string, title?: string)            │
 * │ Default param          │ (level: string = "info")                  │
 * │ Rest param             │ (...nums: number[])                       │
 * │ Overload signatures    │ function add(a: number, b: number): number│
 * │ Generic function       │ function first<T>(arr: T[]): T | undefined│
 * │ this parameter         │ function fn(this: MyClass, ...)           │
 * │ Type alias for fn sig  │ type Op = (a: number, b: number) => number│
 * │ void return            │ function log(): void                      │
 * │ never return           │ function fail(): never (throws / loops)   │
 * └────────────────────────┴───────────────────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> Overloads     : define multiple call signatures; one implementation
 *                    handles all variants (use `any` in the impl body)
 * -> Generics      : <T> allows the function to work with ANY type while
 *                    still preserving type information for the caller
 * -> this param    : a fake first parameter that types `this` inside a
 *                    function; erased at compile time
 * -> Contravariance: a function type with a wider param type is assignable
 *                    to one with a narrower param type (params are
 *                    contravariant; return types are covariant)
 *
 * IMPORTANT NOTES
 * 1. Arrow functions and regular functions differ in how `this` is bound —
 *    arrow functions capture `this` lexically (no own `this`).
 * 2. Use overloads when the return type depends on the input type,
 *    not just validation of arguments.
 * 3. Specifying `void` tells callers they should not use the return value,
 *    even though the function may technically return `undefined`.
 * 4. `never` is assignable to every type but nothing is assignable to it —
 *    useful for exhaustive checks and throw helpers.
 * =================================================================== */

// ─── 1. Basic Typed Function ─────────────────────────────────────────────────

function add(a: number, b: number): number {
  return a + b;
}

console.log("add(3, 5):", add(3, 5)); // Output: 8

// ─── 2. Optional and Default Parameters ──────────────────────────────────────

// Optional parameter (must come after required)
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : `Hello, ${name}`;
}

console.log(greet("Alice"));           // Output: Hello, Alice
console.log(greet("Alice", "Dr."));   // Output: Dr. Alice

// Default parameter
function logMessage(message: string, level: string = "info"): void {
  console.log(`[${level.toUpperCase()}]: ${message}`);
}

logMessage("Server started");          // Output: [INFO]: Server started
logMessage("Disk full", "warn");       // Output: [WARN]: Disk full

// ─── 3. Rest Parameters ───────────────────────────────────────────────────────

function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log("sum(1,2,3):", sum(1, 2, 3));     // Output: 6
console.log("sum(10,20):", sum(10, 20));       // Output: 30

function joinStrings(separator: string, ...parts: string[]): string {
  return parts.join(separator);
}

console.log(joinStrings("-", "a", "b", "c")); // Output: a-b-c

// ─── 4. Arrow Functions ───────────────────────────────────────────────────────

const multiply = (x: number, y: number): number => x * y;
console.log("multiply(4, 5):", multiply(4, 5)); // Output: 20

// Type alias for a function signature
type Operation = (a: number, b: number) => number;

const divide: Operation = (a, b) => a / b;
const subtract: Operation = (a, b) => a - b;

console.log("divide(10, 2):", divide(10, 2));   // Output: 5
console.log("subtract(9, 4):", subtract(9, 4)); // Output: 5

// ─── 5. void and never Return Types ──────────────────────────────────────────

function notifyUser(message: string): void {
  console.log("Notification:", message);
  // Implicitly returns undefined — callers should not use the return value
}

function throwError(message: string): never {
  throw new Error(message); // never returns normally
}

function infiniteLoop(): never {
  while (true) {
    // useful for dedicated event loops, rarely used directly
  }
}

// ─── 6. Function Overloads ────────────────────────────────────────────────────
//
// Overload signatures: visible to callers (the "public" API).
// Implementation signature: must handle ALL overloads (not visible to callers).

function format(value: number): string;
function format(value: string): string;
function format(value: number[]): string;
function format(value: number | string | number[]): string {
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }
  return value.trim();
}

console.log(format(3.14159));         // Output: 3.14 — number overload
console.log(format("  hello  "));    // Output: hello — string overload
console.log(format([1, 2, 3]));      // Output: 1, 2, 3 — array overload

// ─── 7. Generic Functions ────────────────────────────────────────────────────
//
// <T> lets the caller pass in a type, and the function preserves it.

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([10, 20, 30]));         // Output: 10 — TypeScript knows: number
console.log(first(["a", "b", "c"]));      // Output: a  — TypeScript knows: string
console.log(first([]));                   // Output: undefined

// Generic with constraint: T must have a `length` property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

console.log(longest("hi", "hello"));       // Output: hello
console.log(longest([1, 2], [3, 4, 5]));   // Output: [3, 4, 5]

// Generic identity function with default type
function identity<T = string>(value: T): T {
  return value;
}

const numId = identity<number>(42);        // TypeScript knows: number
const strId = identity("default");         // TypeScript infers: string

// ─── 8. this Parameter ───────────────────────────────────────────────────────
//
// A fake first parameter that documents the expected `this` context.
// Erased at compile time — does not affect the runtime argument count.

interface Counter {
  count: number;
  increment(this: Counter): void;
  reset(this: Counter): void;
}

const counter: Counter = {
  count: 0,
  increment(this: Counter) {
    this.count++;
    console.log("Count:", this.count);
  },
  reset(this: Counter) {
    this.count = 0;
  }
};

counter.increment(); // Output: Count: 1
counter.increment(); // Output: Count: 2
counter.reset();

// ─── 9. Callback Function Types ───────────────────────────────────────────────

type Predicate<T> = (value: T, index: number) => boolean;
type Mapper<T, U> = (value: T) => U;

function myFilter<T>(arr: T[], pred: Predicate<T>): T[] {
  return arr.filter(pred);
}

function myMap<T, U>(arr: T[], mapper: Mapper<T, U>): U[] {
  return arr.map(mapper);
}

const evens = myFilter([1, 2, 3, 4, 5], (v) => v % 2 === 0);
console.log("Evens:", evens); // Output: [2, 4]

const doubled = myMap([1, 2, 3], (v) => v * 2);
console.log("Doubled:", doubled); // Output: [2, 4, 6]

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. Always type function parameters and return values at module
 *    boundaries; let TypeScript infer types inside function bodies.
 * 2. Optional (`?`) and default parameters must come AFTER required
 *    ones; rest parameters must be last.
 * 3. Overloads give callers a clean type-safe API without resorting
 *    to `any` — the implementation body is hidden from callers.
 * 4. Generic functions preserve the concrete type through the call:
 *    the caller gets back exactly the type they passed in.
 * 5. Constraints (`T extends SomeType`) allow you to access specific
 *    properties on the generic type safely.
 * 6. The `this` parameter is TypeScript-only and erased at compile
 *    time — use it to prevent accidental `this` mismatches.
 * 7. `void` means "ignore the return value"; `never` means "this code
 *    path cannot complete normally".
 * =================================================================== */

export {};
