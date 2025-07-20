/*
 * TypeScript Objects:
 * - Objects can be typed using interfaces, type aliases, or inline types
 * - Support for optional properties, readonly properties, and index signatures
 * - Object destructuring with type annotations
 * - Nested objects and complex object structures
 * 
 * Advanced Features:
 * -> Interface inheritance and composition
 * -> Mapped types and utility types
 * -> Generic objects and conditional types
 * -> Object validation and transformation
 */

/*
 * 1. Basic Object Types
 */

// Inline object type annotation
let person1: { name: string; age: number; isActive: boolean } = {
  name: "John",
  age: 30,
  isActive: true
};

console.log("Person1:", person1);

// Type alias for object
type Person = {
  name: string;
  age: number;
  isActive: boolean;
};

let person2: Person = {
  name: "Jane",
  age: 25,
  isActive: false
};

console.log("Person2:", person2);

/*
* 2. Optional Properties
*/

interface User {
  id: number;
  username: string;
  email: string;
  phone?: string; // Optional property
  address?: {
      street: string;
      city: string;
      zipCode?: string;
  };
}

let user1: User = {
  id: 1,
  username: "johndoe",
  email: "john@example.com"
  // phone and address are optional
};

let user2: User = {
  id: 2,
  username: "janedoe",
  email: "jane@example.com",
  phone: "123-456-7890",
  address: {
      street: "123 Main St",
      city: "New York"
      // zipCode is optional
  }
};

console.log("User1:", user1);
console.log("User2:", user2);

/*
* 3. Readonly Properties
*/

interface ReadonlyUser {
  readonly id: number;
  readonly createdAt: Date;
  name: string;
  email: string;
}

let readonlyUser: ReadonlyUser = {
  id: 1,
  createdAt: new Date(),
  name: "Alice",
  email: "alice@example.com"
};

// readonlyUser.id = 2; // Error: Cannot assign to 'id' because it is a read-only property
readonlyUser.name = "Alice Smith"; // This is allowed

console.log("Readonly user:", readonlyUser);

// Readonly utility type
let frozenUser: Readonly<User> = {
  id: 3,
  username: "bobsmith",
  email: "bob@example.com"
};

// frozenUser.username = "newusername"; // Error: all properties are readonly

/*
* 4. Index Signatures
*/

// Object with dynamic property names
interface StringDictionary {
  [key: string]: string;
}

let translations: StringDictionary = {
  hello: "hola",
  goodbye: "adiós",
  thank_you: "gracias"
};

translations.welcome = "bienvenido"; // Dynamic property assignment
console.log("Translations:", translations);

// Mixed index signature
interface MixedObject {
  name: string; // Known property
  [key: string]: string | number; // Dynamic properties
}

let mixedObj: MixedObject = {
  name: "Example",
  age: 30,
  score: "95"
};

console.log("Mixed object:", mixedObj);

/*
* 5. Nested Objects
*/

interface Company {
  name: string;
  founded: number;
  headquarters: {
      country: string;
      city: string;
      coordinates?: {
          lat: number;
          lng: number;
      };
  };
  employees: {
      total: number;
      departments: {
          [deptName: string]: number;
      };
  };
}

let company: Company = {
  name: "Tech Corp",
  founded: 2010,
  headquarters: {
      country: "USA",
      city: "San Francisco",
      coordinates: {
          lat: 37.7749,
          lng: -122.4194
      }
  },
  employees: {
      total: 500,
      departments: {
          engineering: 200,
          sales: 100,
          marketing: 50,
          hr: 25
      }
  }
};

console.log("Company:", company);
console.log("Engineering employees:", company.employees.departments.engineering);

/*
* 6. Object Methods
*/

interface Calculator {
  value: number;
  add(x: number): Calculator;
  subtract(x: number): Calculator;
  multiply(x: number): Calculator;
  divide(x: number): Calculator;
  getResult(): number;
  reset(): Calculator;
}

let calculator: Calculator = {
  value: 0,
  
  add(x: number): Calculator {
      this.value += x;
      return this;
  },
  
  subtract(x: number): Calculator {
      this.value -= x;
      return this;
  },
  
  multiply(x: number): Calculator {
      this.value *= x;
      return this;
  },
  
  divide(x: number): Calculator {
      if (x !== 0) {
          this.value /= x;
      }
      return this;
  },
  
  getResult(): number {
      return this.value;
  },
  
  reset(): Calculator {
      this.value = 0;
      return this;
  }
};

/*
* 7. Object Destructuring with Types
*/

// Basic destructuring
// let { name, age }: { name: string; age: number } = { name: "Tom", age: 35 };
// console.log("Destructured:", name, age);

// Destructuring with renaming
// let { name: fullName, age: years }: Person = person2;
// console.log("Renamed:", fullName, years);

// Destructuring nested objects
let { 
  headquarters: { city, country }, 
  employees: { total } 
}: Company = company;

console.log(`${company.name} is located in ${city}, ${country} with ${total} employees`);

// Destructuring with default values
let { 
  username, 
  phone = "Not provided" 
}: { username: string; phone?: string } = user1;

console.log("Username:", username, "Phone:", phone);

/*
* 8. Generic Objects
*/

// Generic interface
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Usage with different data types
let userResponse: ApiResponse<User> = {
  success: true,
  data: user1,
  timestamp: new Date()
};

let numbersResponse: ApiResponse<number[]> = {
  success: true,
  data: [1, 2, 3, 4, 5],
  timestamp: new Date()
};

let errorResponse: ApiResponse<null> = {
  success: false,
  error: "User not found",
  timestamp: new Date()
};

console.log("User response:", userResponse);
console.log("Numbers response:", numbersResponse);

// Generic object factory
function createResponse<T>(success: boolean, data?: T, error?: string): ApiResponse<T> {
  return {
      success,
      data,
      error,
      timestamp: new Date()
  };
}

let stringResponse = createResponse(true, "Hello World");
let numberResponse = createResponse(false, undefined, "Invalid number");

/*
* 9. Utility Types with Objects
*/

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  description: string;
}

// Partial - makes all properties optional
let partialProduct: Partial<Product> = {
  name: "Updated Name",
  price: 99.99
};

// Required - makes all properties required (opposite of Partial)
interface OptionalProduct {
  id?: number;
  name?: string;
  price?: number;
}

let requiredProduct: Required<OptionalProduct> = {
  id: 1,
  name: "Required Product",
  price: 29.99
};

// Pick - selects specific properties
let productSummary: Pick<Product, "id" | "name" | "price"> = {
  id: 1,
  name: "Laptop",
  price: 999.99
};

// Omit - excludes specific properties
let productWithoutId: Omit<Product, "id"> = {
  name: "Mouse",
  price: 25.99,
  category: "Electronics",
  inStock: true,
  description: "Wireless mouse"
};

console.log("Product summary:", productSummary);
console.log("Product without ID:", productWithoutId);

/*
* 10. Object Validation and Type Guards
*/

// Type guard function
function isUser(obj: any): obj is User {
  return obj && 
         typeof obj.id === 'number' && 
         typeof obj.username === 'string' && 
         typeof obj.email === 'string';
}

// Object validation function
function validateProduct(obj: any): obj is Product {
  return obj &&
         typeof obj.id === 'number' &&
         typeof obj.name === 'string' &&
         typeof obj.price === 'number' &&
         typeof obj.category === 'string' &&
         typeof obj.inStock === 'boolean' &&
         typeof obj.description === 'string';
}

// Usage
let unknownObject: any = {
  id: 1,
  username: "testuser",
  email: "test@example.com"
};

if (isUser(unknownObject)) {
  console.log("Valid user:", unknownObject.username); // TypeScript knows it's a User
}

/*
* 11. Object Composition and Mixins
*/

// Base interfaces
interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface Identifiable {
  id: string | number;
}

// Composition using intersection types
type TimestampedUser = User & Timestamped;
type IdentifiableProduct = Product & Identifiable & Timestamped;

let timestampedUser: TimestampedUser = {
  id: 1,
  username: "user123",
  email: "user@example.com",
  createdAt: new Date(),
  updatedAt: new Date()
};

// Mixin function
function addTimestamps<T extends object>(obj: T): T & Timestamped {
  const now = new Date();
  return {
      ...obj,
      createdAt: now,
      updatedAt: now
  };
}

let productWithTimestamps = addTimestamps({
  id: 1,
  name: "Smartphone",
  price: 699.99,
  category: "Electronics",
  inStock: true,
  description: "Latest smartphone"
});

console.log("Product with timestamps:", productWithTimestamps);

/*
* 12. Advanced Object Patterns
*/

// Builder pattern for objects
class UserBuilder {
  private user: Partial<User> = {};

  setId(id: number): UserBuilder {
      this.user.id = id;
      return this;
  }

  setUsername(username: string): UserBuilder {
      this.user.username = username;
      return this;
  }

  setEmail(email: string): UserBuilder {
      this.user.email = email;
      return this;
  }

  setPhone(phone: string): UserBuilder {
      this.user.phone = phone;
      return this;
  }

  build(): User {
      if (!this.user.id || !this.user.username || !this.user.email) {
          throw new Error("Missing required user properties");
      }
      return this.user as User;
  }
}

let builtUser = new UserBuilder()
  .setId(100)
  .setUsername("builder_user")
  .setEmail("builder@example.com")
  .setPhone("555-0123")
  .build();

console.log("Built user:", builtUser);
