/*
 * TypeScript: Interfaces vs Types
 *
 * - Both `interface` and `type` can define object shapes.
 * - `interface` is extendable and preferred for OOP-style contracts.
 * - `type` is more flexible: supports primitives, unions, intersections.
 * - In general, prefer `interface` for objects, `type` for everything else.
 */

// 1. Using interface
interface User {
  id: number;
  name: string;
  email?: string;
}

const user1: User = {
  id: 1,
  name: "Alice"
};

// 2. Using type
type Product = {
  id: string;
  title: string;
  price: number;
};

const item: Product = {
  id: "P01",
  title: "Book",
  price: 250
};

// 3. Extending with interfaces
interface Admin extends User {
  role: "admin" | "superadmin";
}

const adminUser: Admin = {
  id: 2,
  name: "Bob",
  role: "admin"
};

// 4. Combining with type (intersection)
type Dimensions = {
  width: number;
  height: number;
};

type Box = Product & Dimensions;

const boxItem: Box = {
  id: "P02",
  title: "Storage Box",
  price: 300,
  width: 20,
  height: 15
};

// 5. Interface merging (only works with interface)
interface Car {
  brand: string;
}

interface Car {
  year: number;
}

const vehicle: Car = {
  brand: "Toyota",
  year: 2020
};

// 6. Type alias cannot be merged
// type A = { x: number };
// type A = { y: number }; // ❌ Error
