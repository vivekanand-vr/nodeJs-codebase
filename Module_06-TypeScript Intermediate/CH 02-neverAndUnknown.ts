/*
 * TypeScript: never and unknown
 *
 * - `never`: type for values that never occur (e.g., function throws or loops forever).
 * - `unknown`: type-safe counterpart of `any`, requires type checks before use.
 */

// 1. never: used when a function never returns
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    console.log("Looping forever...");
  }
}

// 2. unknown: requires explicit type checking
function processInput(input: unknown) {
  if (typeof input === "string") {
    console.log("String input:", input.toUpperCase());
  } else if (typeof input === "number") {
    console.log("Number input:", input.toFixed(2));
  } else {
    console.log("Unknown type");
  }
}

// 3. Cannot use unknown directly without narrowing
function unsafeOperation(value: unknown) {
  // console.log(value.toUpperCase()); ❌ Error
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // ✅ Safe
  }
}

// 4. Assignability
let anyVal: any = "hello";
let unknownVal: unknown = "world";

let str1: string = anyVal;      // ✅ Allowed
// let str2: string = unknownVal; // ❌ Error

if (typeof unknownVal === "string") {
  let str2: string = unknownVal; // ✅ After narrowing
}
