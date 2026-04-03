/* ===================================================================
 * CH 03 — TypeScript: Union vs Intersection Types
 * ===================================================================
 *
 * SET THEORY ANALOGY
 *   Union (A | B):        members of A OR members of B
 *   Intersection (A & B): members of BOTH A AND B
 *
 * COMPARISON TABLE
 * ┌─────────────────────┬────────────────────────┬────────────────────────────┐
 * │ Feature             │ Union (A | B)           │ Intersection (A & B)       │
 * ├─────────────────────┼────────────────────────┼────────────────────────────┤
 * │ What is valid?      │ Either A or B           │ Must satisfy both A and B  │
 * │ Usable API surface  │ Only shared members     │ All members of A + B       │
 * │ Narrowing needed?   │ Yes                     │ No (all props available)   │
 * │ Common use case     │ Variant data / options  │ Mixing / extending shapes  │
 * │ Primitives          │ string | number         │ Rarely useful (never)      │
 * │ Objects             │ Shape | Error            │ Person & Employee          │
 * └─────────────────────┴────────────────────────┴────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> Union          : "either-or" — narrows needed before calling members
 * -> Intersection   : "both" — spreads all properties onto one type
 * -> Discriminant   : shared literal property that distinguishes union members
 * -> `in` narrowing : check if a property exists to distinguish union members
 *
 * IMPORTANT NOTES
 * 1. `string & number` → `never` (impossible to be both a string and a number).
 * 2. Object intersections are additive: A & B has all props of A plus all of B.
 * 3. Conflicting property types in an intersection produce `never` for that
 *    property: `{ a: string } & { a: number }` → `{ a: never }`.
 * 4. Union types are distributive in conditional types: applying a conditional
 *    to `A | B` applies it to each member independently.
 * =================================================================== */

// ─── 1. Union Type ───────────────────────────────────────────────────────────

type StringOrNumber = string | number;

function logValue(value: StringOrNumber): void {
  if (typeof value === "string") {
    console.log("String:", value.toUpperCase()); // value: string
  } else {
    console.log("Number:", value.toFixed(2));    // value: number
  }
}

logValue("hello"); // Output: String: HELLO
logValue(42.123);  // Output: Number: 42.12

// ─── 2. Intersection Type ────────────────────────────────────────────────────

type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

// EmployeeProfile has ALL properties of Person AND Employee
type EmployeeProfile = Person & Employee;

const emp: EmployeeProfile = {
  name: "Alice",
  age: 30,
  employeeId: "EMP123",
  department: "Engineering",
};

console.log(`${emp.name} (${emp.employeeId}) — ${emp.department}`);
// Output: Alice (EMP123) — Engineering

// ─── 3. Union with `in` — Narrowing Props that Don't Overlap ─────────────────

type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog): void {
  // Cannot call animal.bark() without narrowing — not shared
  if ("bark" in animal) {
    animal.bark(); // animal: Dog
  } else {
    animal.meow(); // animal: Cat
  }
}

const myCat: Cat = { meow: () => console.log("Meow") };
const myDog: Dog = { bark: () => console.log("Woof") };

makeSound(myCat); // Output: Meow
makeSound(myDog); // Output: Woof

// ─── 4. Intersection — Combining Two Object Shapes ───────────────────────────

type CatDog = Cat & Dog;

const pet: CatDog = {
  meow: () => console.log("Meow"), // required from Cat
  bark: () => console.log("Bark")  // required from Dog
};

pet.meow(); // Output: Meow
pet.bark(); // Output: Bark

// ─── 5. Practical Intersection — Mixin Pattern ────────────────────────────────

type Timestamped = { createdAt: Date; updatedAt: Date };
type Identifiable = { id: number };

type BaseEntity = Identifiable & Timestamped;

interface Post extends BaseEntity {
  title: string;
  body: string;
}

const post: Post = {
  id: 1,
  title: "TypeScript Intersections",
  body: "Intersections combine multiple types into one.",
  createdAt: new Date(),
  updatedAt: new Date()
};

console.log("Post:", post.title, "| id:", post.id);
// Output: Post: TypeScript Intersections | id: 1

// ─── 6. Conflicting Properties — Intersection Produces `never` ───────────────

type A = { value: string };
type B = { value: number };

type Conflict = A & B;
// Conflict.value has type: string & number → never
// This means no valid value can be assigned to Conflict.value

// ─── 7. Distributive Union in Conditional Types ───────────────────────────────

// Extracts only non-nullable members from a union
type NonNullable2<T> = T extends null | undefined ? never : T;

type Result = NonNullable2<string | null | undefined | number>;
// Distributes: (string → string) | (null → never) | (undefined → never) | (number → number)
// Final:  string | number
const example: Result = "hello"; // ✅

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. Union (A | B) means "one of these types" — you can only use the
 *    common API until you narrow to a specific member.
 * 2. Intersection (A & B) means "all of these types at once" — the
 *    resulting type has EVERY property from both shapes.
 * 3. Discriminated unions (shared `kind` literal) are the safest way to
 *    model variants — no `in` narrowing needed, switch works.
 * 4. Object intersections are additive and power the mixin pattern:
 *    add Timestamped, Identifiable, Auditable cross-cutting concerns.
 * 5. Conflicting property types in an intersection resolve to `never`,
 *    making it impossible to construct the object — a compile error.
 * 6. Unions are distributive in conditional types: `T extends U` is
 *    evaluated for each member of T independently.
 * 7. Use union for variants you'll switch on; use intersection for
 *    composing shapes that always appear together.
 * =================================================================== */

export {};
