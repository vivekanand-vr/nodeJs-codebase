/*
 * TypeScript Interfaces:
 * - Interfaces define the structure/contract that objects must follow
 * - Support for optional properties, readonly properties, and method signatures
 * - Interface inheritance and composition
 * - Can describe objects, functions, classes, and arrays
 * 
 * Key Features:
 * -> Duck typing and structural subtyping
 * -> Interface merging and declaration augmentation
 * -> Generic interfaces for reusability
 * -> Hybrid interfaces (callable + object properties)
 */

/*
 * 1. Basic Interface Definition
 */

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

/*
* 2. Optional and Readonly Properties
*/

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

/*
* 3. Method Signatures in Interfaces
*/

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

/*
* 4. Function Interfaces
*/

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

/*
* 5. Interface Inheritance
*/

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

/*
 * 6. Generic Interfaces
 *
 * - Generic interfaces allow you to define flexible structures that can work with various types.
 * - Common use cases include API responses, data repositories, services, etc.
 */

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
