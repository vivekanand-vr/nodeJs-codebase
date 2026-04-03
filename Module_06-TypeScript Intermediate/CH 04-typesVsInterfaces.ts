/* ===================================================================
 * CH 04 — TypeScript: type vs interface
 * ===================================================================
 *
 * WHAT IS THE DIFFERENCE?
 *   Both `interface` and `type` describe the shape of an object.
 *   In most practical cases they are interchangeable for object shapes,
 *   but they differ in capabilities.
 *
 * COMPARISON TABLE
 * ┌──────────────────────────────┬───────────┬────────────┐
 * │ Feature                      │ interface │ type       │
 * ├──────────────────────────────┼───────────┼────────────┤
 * │ Object shapes                │ ✅        │ ✅        │
 * │ Primitive / union aliases    │ ❌        │ ✅        │
 * │ Extends (OOP inheritance)    │ ✅        │ ❌ (use &)│
 * │ Declaration merging          │ ✅        │ ❌        │
 * │ `implements` in classes      │ ✅        │ ✅        │
 * │ Mapped types                 │ ❌        │ ✅        │
 * │ Circular references          │ ✅ (self) │ ✅ (self) │
 * │ Error messages clarity       │ Better    │ Expanded   │
 * └──────────────────────────────┴───────────┴────────────┘
 *
 * WHEN TO USE WHICH
 * -> Use `interface` for public API shapes (libraries, class contracts)
 *    because declaration merging allows consumers to extend it.
 * -> Use `type` for unions, intersections, primitives, mapped types,
 *    and complex derived types that `interface` cannot express.
 *
 * IMPORTANT NOTES
 * 1. Declaration merging only works with `interface` — declaring the
 *    same `type` name twice is a compile error.
 * 2. Both can `implement` with classes, but types cannot be re-opened
 *    after definition.
 * 3. Mapped types (`{ [K in keyof T]: ... }`) require `type`, not `interface`.
 * 4. When in doubt follow the team convention; TypeScript itself uses
 *    `interface` for most public APIs.
 * =================================================================== */

// ─── 1. interface for Object Shapes ─────────────────────────────────────────

interface User {
  id: number;
  name: string;
  email?: string;
}

const user1: User = { id: 1, name: "Alice" };

// ─── 2. type for Object Shapes ───────────────────────────────────────────────

type Product = {
  id: string;
  title: string;
  price: number;
};

const item: Product = { id: "P01", title: "Book", price: 250 };

// ─── 3. Extending Interfaces (OOP Inheritance) ───────────────────────────────

interface Admin extends User {
  role: "admin" | "superadmin";
}

const adminUser: Admin = { id: 2, name: "Bob", role: "admin" };
console.log("Admin:", adminUser.name, "Role:", adminUser.role);
// Output: Admin: Bob Role: admin

// ─── 4. Combining with type (Intersection) ───────────────────────────────────

type Dimensions = { width: number; height: number };
type Box = Product & Dimensions;

const boxItem: Box = {
  id: "P02", title: "Storage Box", price: 300,
  width: 20, height: 15
};

console.log(`Box: ${boxItem.title} ${boxItem.width}×${boxItem.height}`);
// Output: Box: Storage Box 20×15

// ─── 5. Interface Declaration Merging ───────────────────────────────────────
//
// Declaring the same interface name twice merges both declarations.
// This is the key capability that makes interfaces preferable for libraries.

interface Car {
  brand: string;
}

interface Car {    // merged — not an error
  year: number;
}

const vehicle: Car = { brand: "Toyota", year: 2020 };
console.log("Car:", vehicle.brand, vehicle.year);
// Output: Car: Toyota 2020

// type cannot be merged:
// type Foo = { x: number };
// type Foo = { y: number }; // ❌ Error: Duplicate identifier 'Foo'

// ─── 6. `implements` — Class Satisfying an Interface ─────────────────────────
//
// Both `interface` and `type` can be used with `implements`.

interface Printable {
  print(): void;
}

type Serializable = {
  serialize(): string;
};

class Report implements Printable, Serializable {
  constructor(private title: string, private content: string) {}

  print(): void {
    console.log(`=== ${this.title} ===\n${this.content}`);
  }

  serialize(): string {
    return JSON.stringify({ title: this.title, content: this.content });
  }
}

const report = new Report("Q1 Sales", "Revenue up 15%");
report.print();
// Output: === Q1 Sales ===
//         Revenue up 15%
console.log(report.serialize());
// Output: {"title":"Q1 Sales","content":"Revenue up 15%"}

// ─── 7. Mapped Types — Only Available with `type` ────────────────────────────
//
// Mapped types transform each key of an existing type.

type ReadonlyUser = {
  readonly [K in keyof User]: User[K]; // makes every property readonly
};

type PartialProduct = {
  [K in keyof Product]?: Product[K]; // makes every property optional
};

const readUser: ReadonlyUser = { id: 1, name: "Alice" };
// readUser.id = 2; // ❌ Error: cannot assign to readonly property

const draft: PartialProduct = { title: "Draft" }; // price and id are optional
console.log("Draft:", draft);
// Output: Draft: { title: 'Draft' }

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. `interface` and `type` are nearly interchangeable for object shapes,
 *    but differ in specific capabilities.
 * 2. Use `interface` when you need declaration merging (library authoring,
 *    augmenting third-party types) or OOP-style `extends` hierarchies.
 * 3. Use `type` for union aliases, primitive aliases, conditional types,
 *    mapped types, and any complex derived type.
 * 4. Both `interface` and `type` work with `implements` — a class can
 *    satisfy both kinds of contracts.
 * 5. Mapped types (`{ [K in keyof T]: ... }`) are exclusive to `type` —
 *    they allow you to derive new types from existing ones.
 * 6. Declaration merging allows consumers to extend library interfaces
 *    without modifying source (e.g., extending `Window`, `Express.Request`).
 * 7. When the choice is unclear, pick `interface` for public APIs and
 *    `type` for internal derived or utility types.
 * =================================================================== */

export {};
