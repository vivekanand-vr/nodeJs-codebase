/* ===================================================================
 * CH 01 — TypeScript Type Narrowing
 * ===================================================================
 *
 * WHAT IS TYPE NARROWING?
 *   Narrowing is the process of refining a broad union type to a more
 *   specific type inside a conditional branch. TypeScript's control-
 *   flow analysis tracks the possible types at each point in the code.
 *
 * NARROWING TECHNIQUES
 * ┌──────────────────────────┬───────────────────────────────────────┐
 * │ Technique                │ When to use                           │
 * ├──────────────────────────┼───────────────────────────────────────┤
 * │ typeof guard             │ Primitives (string, number, boolean)  │
 * │ instanceof guard         │ Class instances                       │
 * │ Equality / strict ===    │ Literal values, null, undefined       │
 * │ Discriminated property   │ Union members with shared `kind` field│
 * │ `in` operator            │ Check if property exists on object    │
 * │ Truthiness               │ Filter out null / undefined / 0 / ""  │
 * │ Assignment narrowing     │ After `x = someValue`, TS narrows     │
 * │ Custom type guard (is)   │ Reusable, domain-specific check       │
 * │ Assertion function       │ `asserts val is T` (throws if fails)  │
 * └──────────────────────────┴───────────────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> Control-flow analysis : TS re-evaluates the type of a variable
 *    after each branch — it is aware of `if`, `switch`, `&&`, `||`, `??`
 * -> Type predicate        : `value is T` — tells TS the type in the
 *    `true` branch of the caller's `if` statement
 * -> Discriminant property : a literal-typed field that uniquely
 *    identifies each member of a discriminated union
 *
 * IMPORTANT NOTES
 * 1. Narrowed types are SCOPE-LOCAL — exiting the `if` block reverts
 *    to the wider union type.
 * 2. `typeof null === "object"` — always check for `null` separately
 *    before checking `typeof` for objects.
 * 3. Custom type guards bypass TS's static analysis — make sure the
 *    runtime check truly validates the type you claim.
 * 4. Assertion functions (`asserts val is T`) narrow for the rest of
 *    the outer scope when they return without throwing.
 * =================================================================== */

// ─── 1. typeof Guard — Primitive Types ───────────────────────────────────────

function printValue(val: number | string): void {
  if (typeof val === "string") {
    console.log("String value:", val.toUpperCase()); // val: string
  } else {
    console.log("Number value:", val.toFixed(2));   // val: number
  }
}

printValue("hello");   // Output: String value: HELLO
printValue(3.14159);   // Output: Number value: 3.14

// ─── 2. instanceof Guard — Class Types ───────────────────────────────────────
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function speak(pet: Dog | Cat) {
  if (pet instanceof Dog) {
    pet.bark();
  } else {
    pet.meow();
  }
}

// ─── 3. Discriminated Union — Literal Property ───────────────────────────────
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  } else {
    return shape.side * shape.side;
  }
}

// ─── 4. Custom Type Guard (`val is T`) ──────────────────────────────────────
function isString(val: unknown): val is string {
  return typeof val === "string";
}

function logIfString(input: unknown) {
  if (isString(input)) {
    console.log("It's a string of length", input.length);
  } else {
    console.log("Not a string.");
  }
}

// ─── 5. `in` Operator Narrowing ──────────────────────────────────────────────
//
// Checks whether an object has a property — narrows the union based on that.

type Fish = { name: string; swim: () => void };
type Bird = { name: string; fly: () => void };

function move(animal: Fish | Bird): void {
  if ("swim" in animal) {
    console.log(`${animal.name} is swimming`); // animal: Fish
    animal.swim();
  } else {
    console.log(`${animal.name} is flying`);   // animal: Bird
    animal.fly();
  }
}

const goldfish: Fish = { name: "Goldie", swim: () => console.log("splish splash") };
const eagle: Bird    = { name: "Eagle",  fly:  () => console.log("soaring high") };

move(goldfish); // Output: Goldie is swimming / splish splash
move(eagle);    // Output: Eagle is flying / soaring high

// ─── 6. Truthiness Narrowing ─────────────────────────────────────────────────
//
// Falsy values: false, 0, "", null, undefined, NaN
// TS narrows away null/undefined in the truthy branch.

function processInput(text: string | null | undefined): string {
  if (!text) {
    return "(empty)";         // text: string | null | undefined (falsy branch)
  }
  return text.trim();         // text: string (truthy branch)
}

console.log(processInput(null));       // Output: (empty)
console.log(processInput("  hi  "));  // Output: hi

// ─── 7. Assignment Narrowing ─────────────────────────────────────────────────
//
// After assigning a specific type to a union variable, TS narrows the type.

let value: string | number;

value = "TypeScript";
console.log(value.toUpperCase()); // value: string — Output: TYPESCRIPT

value = 42;
console.log(value.toFixed(2));    // value: number — Output: 42.00

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. TypeScript's control-flow analysis performs narrowing automatically
 *    inside `if`, `switch`, `&&`, `||`, and `??` branches — no extra
 *    code needed for standard checks.
 * 2. `typeof` works for primitives; `instanceof` works for class instances;
 *    `in` works for checking property existence on objects.
 * 3. Discriminated unions with a `kind` (or `type`) literal property are
 *    the most robust pattern — TS narrows them exhaustively in a `switch`.
 * 4. Custom type guards (`val is T`) encapsulate complex runtime checks
 *    and teach TS what type the value is in the truthy branch.
 * 5. Truthiness narrowing filters out `null`, `undefined`, `""`, `0`, and
 *    `NaN` in one step — useful for optional parameters.
 * 6. Assignment narrowing is automatic: after `x = "hello"`, TS knows
 *    `x` is `string` for the rest of that scope.
 * 7. Never use type assertions (`as T`) as a substitute for narrowing —
 *    assertions bypass safety checks; narrowing is verified by the compiler.
 * =================================================================== */

export {};
