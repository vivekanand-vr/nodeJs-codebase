/*
 * TypeScript: Type Narrowing
 *
 * - Type narrowing is the process of refining a variable's type within a conditional block.
 * - Helps safely access members/methods based on actual type.
 * - Common techniques: typeof, instanceof, equality checks, and custom type guards.
 */

// 1. Using typeof for primitive types
function printValue(val: number | string) {
  if (typeof val === "string") {
    console.log("String value:", val.toUpperCase());
  } else {
    console.log("Number value:", val.toFixed(2));
  }
}

// 2. Using instanceof for class types
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

// 3. Discriminated unions with literal types
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

// 4. Custom type guard
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
