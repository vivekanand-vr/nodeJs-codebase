/* ===================================================================
 * CH 04 — TypeScript Interfaces
 * ===================================================================
 *
 * WHAT IS AN INTERFACE?
 *   An interface defines a structural contract: any object (or class)
 *   that has the required properties and method signatures satisfies the
 *   interface. TypeScript uses structural (duck) typing — the shape
 *   matters, not the name of the type.
 *
 * INTERFACE CAPABILITIES
 * ┌────────────────────────────┬────────────────────────────────────┐
 * │ Feature                    │ Syntax                             │
 * ├────────────────────────────┼────────────────────────────────────┤
 * │ Optional property          │ name?: string                      │
 * │ Readonly property          │ readonly id: number                │
 * │ Method signature           │ greet(): string                    │
 * │ Index signature            │ [key: string]: any                 │
 * │ Callable signature         │ (input: string): boolean           │
 * │ Single inheritance         │ interface B extends A              │
 * │ Multiple inheritance       │ interface C extends A, B           │
 * │ Declaration merging        │ declare same interface name twice  │
 * │ Generic interface          │ interface Repo<T>                  │
 * └────────────────────────────┴────────────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> Duck typing     : if an object has all required members → it satisfies
 * -> Implements      : a class declares it fulfils an interface contract
 * -> Merging         : two `interface Foo` declarations in same scope merge
 * -> Generic         : interface parameterised by a type variable
 *
 * IMPORTANT NOTES
 * 1. Interfaces are purely compile-time — they produce zero runtime code.
 * 2. Classes can implement multiple interfaces: `implements A, B`.
 * 3. Interface merging (declaration augmentation) is useful for extending
 *    third-party library types without modifying source.
 * 4. Unlike `type`, interfaces cannot use union (`|`) directly — use a
 *    `type` alias if you need `A | B`.
 * 5. Prefer `interface` over `type` for public API surface shapes since
 *    interfaces support merging (important for library authors).
 * =================================================================== */

// ─── 1. Basic Interface Definition ───────────────────────────────────────────

// Simple interface for object structure
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Object implementing the interface
let user1: User = {
  id: 1,
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 28
};

console.log("User:", user1);

// Function parameter using interface
function displayUser(user: User): void {
  console.log(`User: ${user.name} (${user.email}), Age: ${user.age}`);
}

displayUser(user1);

// ─── 2. Optional and Readonly Properties ──────────────────────────────────

interface Product {
  readonly id: number;        // Readonly - cannot be changed after creation
  name: string;
  price: number;
  description?: string;       // Optional property
  category?: string;          // Optional property
  inStock?: boolean;          // Optional property
}

let product1: Product = {
  id: 101,
  name: "Laptop",
  price: 999.99
  // Optional properties can be omitted
};

let product2: Product = {
  id: 102,
  name: "Mouse",
  price: 29.99,
  description: "Wireless optical mouse",
  category: "Electronics",
  inStock: true
};

// product1.id = 999; // Error: Cannot assign to 'id' because it is a read-only property
product1.name = "Gaming Laptop"; // This is allowed

console.log("Product 1:", product1);
console.log("Product 2:", product2);

// ─── 3. Method Signatures in Interfaces ─────────────────────────────────

interface Calculator {
  result: number;
  
  // Method signatures
  add(x: number, y: number): Calculator;
  subtract(x: number, y: number): Calculator;
  multiply(x: number, y: number): Calculator;
  divide(x: number, y: number): Calculator;
  clear(): Calculator;
  getResult(): number;
}

// Class implementing the interface
class BasicCalculator implements Calculator {
  result: number = 0;
  
  add(x: number, y: number): Calculator {
      this.result = x + y;
      return this;
  }
  
  subtract(x: number, y: number): Calculator {
      this.result = x - y;
      return this;
  }
  
  multiply(x: number, y: number): Calculator {
      this.result = x * y;
      return this;
  }
  
  divide(x: number, y: number): Calculator {
      if (y !== 0) {
          this.result = x / y;
      } else {
          throw new Error("Division by zero");
      }
      return this;
  }
  
  clear(): Calculator {
      this.result = 0;
      return this;
  }
  
  getResult(): number {
      return this.result;
  }
}

let calc = new BasicCalculator();
let result = calc.add(10, 5).multiply(2, 3).getResult();
console.log("Calculator result:", result);

// ─── 4. Function Interfaces (Callable Types) ────────────────────────────

// Interface for function signature
interface StringValidator {
  (input: string): boolean;
}

// Functions implementing the interface
let emailValidator: StringValidator = (input: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
};

let phoneValidator: StringValidator = (input: string): boolean => {
  return /^\d{10}$/.test(input.replace(/\D/g, ''));
};

// Usage
console.log("Email valid:", emailValidator("test@example.com"));
console.log("Phone valid:", phoneValidator("123-456-7890"));

// Interface for function with properties
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

// Creating a function that matches the interface
function createCounter(): Counter {
  let count = 0;
  
  function counter(start: number): string {
      count = start;
      return `Count: ${count}`;
  }
  
  counter.interval = 1;
  counter.reset = function() {
      count = 0;
  };
  
  return counter;
}

let myCounter = createCounter();
console.log(myCounter(10));
console.log("Interval:", myCounter.interval);
myCounter.reset();

// ─── 5. Interface Inheritance ─────────────────────────────────────────────────

// Base interface
interface Animal {
  name: string;
  age: number;
  makeSound(): string;
}

// Inherited interface
interface Dog extends Animal {
  breed: string;
  wagTail(): void;
}

interface Cat extends Animal {
  indoor: boolean;
  purr(): string;
}

// Multiple inheritance
interface Pet extends Animal {
  owner: string;
  isVaccinated: boolean;
}

interface ServiceDog extends Dog, Pet {
  serviceType: string;
  isWorking: boolean;
}

// Implementation
let myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Golden Retriever",
  makeSound(): string {
      return "Woof!";
  },
  wagTail(): void {
      console.log(`${this.name} is wagging tail happily!`);
  }
};

let serviceDog: ServiceDog = {
  name: "Rex",
  age: 5,
  breed: "German Shepherd",
  owner: "John Smith",
  isVaccinated: true,
  serviceType: "Guide Dog",
  isWorking: true,
  makeSound(): string {
      return "Woof! (professionally)";
  },
  wagTail(): void {
      console.log(`${this.name} wags tail while maintaining focus.`);
  }
};

console.log("My dog says:", myDog.makeSound());
myDog.wagTail();
console.log("Service dog:", serviceDog.name, "Type:", serviceDog.serviceType);

/*
* 6. Generic Interfaces
*/

// ─── 6. Generic Interfaces ────────────────────────────────────────────────────
//
// Generic interfaces allow flexible structures that work with various types.
// Common use cases include API responses, data repositories, services, etc.

// Generic interface for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
  metadata?: {
      page?: number;
      limit?: number;
      total?: number;
  };
}

// Example usage with User data
interface User {
  id: number;
  name: string;
  email: string;
}

const userApiResponse: ApiResponse<User> = {
  success: true,
  data: {
      id: 1,
      name: "Alice",
      age: 23,
      email: "alice@example.com"
  },
  timestamp: new Date(),
};

// Generic interface for repository pattern
interface Repository<T, K> {
  findById(id: K): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: Omit<T, 'id'>): Promise<T>;
  update(id: K, entity: Partial<T>): Promise<T | null>;
  delete(id: K): Promise<boolean>;
}

// Implementing repository for User entity
class UserRepository implements Repository<User, number> {
  private users: User[] = [];

  async findById(id: number): Promise<User | null> {
      return this.users.find(u => u.id === id) ?? null;
  }

  async findAll(): Promise<User[]> {
      return this.users;
  }

  async create(entity: Omit<User, 'id'>): Promise<User> {
      const newUser: User = {
          ...entity,
          id: Date.now(), // mock ID
      };
      this.users.push(newUser);
      return newUser;
  }

  async update(id: number, entity: Partial<User>): Promise<User | null> {
      const index = this.users.findIndex(u => u.id === id);
      if (index === -1) return null;
      this.users[index] = { ...this.users[index], ...entity };
      return this.users[index];
  }

  async delete(id: number): Promise<boolean> {
      const lengthBefore = this.users.length;
      this.users = this.users.filter(u => u.id !== id);
      return this.users.length < lengthBefore;
  }
}

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. Interfaces describe object SHAPES — any object that has the right
 *    properties and methods satisfies the interface (structural typing).
 * 2. Use `readonly` for properties that should never change after object
 *    creation; use `?` for properties that may be absent.
 * 3. Classes `implement` interfaces to formally commit to the contract;
 *    the compiler verifies every required member is present.
 * 4. Interface inheritance (`extends`) lets you build layered API
 *    contracts — start narrow and extend as needed.
 * 5. Declaration merging allows the same interface name to be declared
 *    twice; the compiler merges them — ideal for augmenting library types.
 * 6. Generic interfaces (`interface Repo<T>`) keep your data layer
 *    type-safe without duplicating code for every entity.
 * 7. Callable interfaces (`(x: T): R`) describe functions that also
 *    carry properties — rare but useful for factory and counter patterns.
 * =================================================================== */

export {};
