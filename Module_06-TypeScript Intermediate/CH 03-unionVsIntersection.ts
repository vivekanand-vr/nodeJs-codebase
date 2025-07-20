/*
 * TypeScript: Union vs Intersection Types
 *
 * - Union (A | B): value can be of type A or B.
 * - Intersection (A & B): value must satisfy both type A and type B.
 * - Use unions for flexibility, intersections for combining structures.
 */

// 1. Union type
type StringOrNumber = string | number;

function logValue(value: StringOrNumber) {
  if (typeof value === "string") {
    console.log("String:", value.toUpperCase());
  } else {
    console.log("Number:", value.toFixed(2));
  }
}

logValue("hello");
logValue(42.123);

// 2. Intersection type
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type EmployeeProfile = Person & Employee;

const emp: EmployeeProfile = {
  name: "Alice",
  age: 30,
  employeeId: "EMP123",
  department: "Engineering",
};

// 3. Union allows either type, not necessarily both
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function makeSound(animal: Cat | Dog) {
  // animal.bark(); ❌ Error
  if ("bark" in animal) {
    animal.bark(); // ✅ Narrowed to Dog
  } else {
    animal.meow(); // ✅ Narrowed to Cat
  }
}

// 4. Intersection requires all properties from both
type CatDog = Cat & Dog;

const pet: CatDog = {
  meow: () => console.log("Meow"),
  bark: () => console.log("Bark")
};
