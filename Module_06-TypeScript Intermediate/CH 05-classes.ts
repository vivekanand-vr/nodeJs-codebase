/*
 * TypeScript Classes:
 * - Enhanced JavaScript classes with type annotations
 * - Access modifiers: public, private, protected
 * - Abstract classes and methods
 * - Static members and methods
 * 
 * Advanced Features:
 * -> Parameter properties for constructor shorthand
 * -> Getters and setters with type safety
 * -> Method overloading and generic methods
 * -> Decorators and metadata (experimental)
 */

/*
 * 1. Basic Class Definition
 */

class Person {
  // Property declarations with types
  name: string;
  age: number;
  private _id: number;
  
  constructor(name: string, age: number, id: number) {
      this.name = name;
      this.age = age;
      this._id = id;
  }
  
  // Method with return type
  greet(): string {
      return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
  
  // Method with parameters
  haveBirthday(): void {
      this.age++;
      console.log(`Happy birthday! ${this.name} is now ${this.age} years old.`);
  }
  
  // Getter for private property
  get id(): number {
      return this._id;
  }
}

let person = new Person("Alice", 25, 1001);
console.log(person.greet());
person.haveBirthday();
console.log("Person ID:", person.id);

/*
* 2. Access Modifiers
*/

class BankAccount {
  public accountNumber: string;      // Public (default)
  protected balance: number;         // Protected - accessible in subclasses
  private pin: string;              // Private - only accessible within this class
  readonly createdDate: Date;       // Readonly - can't be modified after initialization
  
  constructor(accountNumber: string, initialBalance: number, pin: string) {
      this.accountNumber = accountNumber;
      this.balance = initialBalance;
      this.pin = pin;
      this.createdDate = new Date();
  }
  
  public deposit(amount: number): void {
      if (amount > 0) {
          this.balance += amount;
          console.log(`Deposited $${amount}. New balance: $${this.balance}`);
      }
  }
  
  public withdraw(amount: number, inputPin: string): boolean {
      if (this.validatePin(inputPin) && amount <= this.balance) {
          this.balance -= amount;
          console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
          return true;
      }
      console.log("Invalid PIN or insufficient funds");
      return false;
  }
  
  protected validatePin(inputPin: string): boolean {
      return this.pin === inputPin;
  }
  
  public getBalance(inputPin: string): number | null {
      return this.validatePin(inputPin) ? this.balance : null;
  }
}

let account = new BankAccount("123456789", 1000, "1234");
account.deposit(500);
account.withdraw(200, "1234");
console.log("Balance:", account.getBalance("1234"));

/*
* 3. Parameter Properties (Constructor Shorthand)
*/

class Employee {
  // Parameter properties - automatically creates and assigns properties
  constructor(
      public readonly employeeId: number,
      public name: string,
      private salary: number,
      protected department: string
  ) {
      // Constructor body can be empty or contain additional logic
      console.log(`Employee ${name} created in ${department} department`);
  }
  
  getEmployeeInfo(): string {
      return `ID: ${this.employeeId}, Name: ${this.name}, Department: ${this.department}`;
  }
  
  // Private method
  private calculateTax(): number {
      return this.salary * 0.2;
  }
  
  getNetSalary(): number {
      return this.salary - this.calculateTax();
  }
  
  // Setter with validation
  setSalary(newSalary: number): void {
      if (newSalary > 0) {
          this.salary = newSalary;
      } else {
          throw new Error("Salary must be positive");
      }
  }
}

let employee = new Employee(101, "John Doe", 50000, "Engineering");
console.log(employee.getEmployeeInfo());
console.log("Net salary:", employee.getNetSalary());

/*
* 4. Inheritance
*/

class Manager extends Employee {
  private directReports: Employee[] = [];
  
  constructor(
      employeeId: number,
      name: string,
      salary: number,
      department: string,
      private teamSize: number
  ) {
      super(employeeId, name, salary, department); // Call parent constructor
  }
  
  // Override method
  getEmployeeInfo(): string {
      return `${super.getEmployeeInfo()}, Team Size: ${this.teamSize}`;
  }
  
  addDirectReport(employee: Employee): void {
      this.directReports.push(employee);
      console.log(`Added ${employee.name} to ${this.name}'s team`);
  }
  
  getTeamInfo(): string {
      return `Manager: ${this.name}, Team members: ${this.directReports.length}`;
  }
  
  // Method that uses protected property from parent
  getDepartment(): string {
      return this.department; // Can access protected property
  }
}

let manager = new Manager(201, "Jane Smith", 80000, "Engineering", 5);
console.log(manager.getEmployeeInfo());

let teamMember = new Employee(102, "Bob Johnson", 60000, "Engineering");
manager.addDirectReport(teamMember);
console.log(manager.getTeamInfo());

/*
* 5. Static Members
*/

class MathUtils {
  static readonly PI = 3.14159;
  private static instanceCount = 0;
  
  constructor() {
      MathUtils.instanceCount++;
  }
  
  static calculateCircleArea(radius: number): number {
      return MathUtils.PI * radius * radius;
  }
  
  static calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
      return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  
  static getInstanceCount(): number {
      return MathUtils.instanceCount;
  }
  
  // Instance method
  round(value: number, decimals: number): number {
      const factor = 10 ** decimals;
      return Math.round(value * factor) / factor;
  }
}

// Static methods can be called without instantiation
console.log("Circle area:", MathUtils.calculateCircleArea(5));
console.log("Distance:", MathUtils.calculateDistance(0, 0, 3, 4));

let mathUtil1 = new MathUtils();
let mathUtil2 = new MathUtils();
console.log("Instance count:", MathUtils.getInstanceCount());
console.log("Rounded value:", mathUtil1.round(3.14159, 2));

/*
* 6. Abstract Classes
*/

abstract class Vehicle {
  protected brand: string;
  protected model: string;
  
  constructor(brand: string, model: string) {
      this.brand = brand;
      this.model = model;
  }
  
  // Abstract method - must be implemented by subclasses
  abstract start(): void;
  abstract stop(): void;
  
  // Concrete method - can be used by subclasses
  getInfo(): string {
      return `${this.brand} ${this.model}`;
  }
  
  // Protected method for subclasses
  protected displayMessage(message: string): void {
      console.log(`[${this.getInfo()}] ${message}`);
  }
}

class Car extends Vehicle {
  private isEngineRunning = false;
  
  constructor(brand: string, model: string, private fuelType: string) {
      super(brand, model);
  }
  
  start(): void {
      if (!this.isEngineRunning) {
          this.isEngineRunning = true;
          this.displayMessage(`Engine started. Running on ${this.fuelType}.`);
      } else {
          this.displayMessage("Engine is already running.");
      }
  }
  
  stop(): void {
      if (this.isEngineRunning) {
          this.isEngineRunning = false;
          this.displayMessage("Engine stopped.");
      } else {
          this.displayMessage("Engine is already stopped.");
      }
  }
  
  refuel(): void {
      this.displayMessage(`Refueling with ${this.fuelType}...`);
  }
}

class ElectricCar extends Vehicle {
  private batteryLevel = 100;
  
  constructor(brand: string, model: string, private range: number) {
      super(brand, model);
  }
  
  start(): void {
      if (this.batteryLevel > 0) {
          this.displayMessage(`Started silently. Range: ${this.range} miles.`);
      } else {
          this.displayMessage("Cannot start - battery empty!");
      }
  }
  
  stop(): void {
      this.displayMessage("Stopped silently.");
  }
  
  charge(): void {
      this.batteryLevel = 100;
      this.displayMessage("Battery fully charged!");
  }
  
  getBatteryLevel(): number {
      return this.batteryLevel;
  }
}

let car = new Car("Toyota", "Camry", "gasoline");
let electricCar = new ElectricCar("Tesla", "Model 3", 300);

car.start();
car.refuel();
car.stop();

electricCar.start();
electricCar.charge();
console.log("Battery level:", electricCar.getBatteryLevel() + "%");

/*
* 7. Generic Classes
*/

class DataStore<T> {
  private items: T[] = [];
  
  add(item: T): void {
      this.items.push(item);
  }
  
  get(index: number): T | undefined {
      return this.items[index];
  }
  
  getAll(): T[] {
      return [...this.items]; // Return copy
  }
  
  find(predicate: (item: T) => boolean): T | undefined {
      return this.items.find(predicate);
  }
  
  filter(predicate: (item: T) => boolean): T[] {
      return this.items.filter(predicate);
  }
  
  remove(index: number): T | undefined {
      return this.items.splice(index, 1)[0];
  }
  
  clear(): void {
      this.items = [];
  }
  
  get length(): number {
      return this.items.length;
  }
}

// Usage with different types
let stringStore = new DataStore<string>();
stringStore.add("Hello");
stringStore.add("World");
stringStore.add("TypeScript");

console.log("String store:", stringStore.getAll());
console.log("Found item:", stringStore.find(item => item.includes("Type")));

let numberStore = new DataStore<number>();
numberStore.add(1);
numberStore.add(2);
numberStore.add(3);

console.log("Number store:", numberStore.getAll());
console.log("Even numbers:", numberStore.filter(num => num % 2 === 0));

/*
* 8. Method Overloading
*/

class Calculator {
  // Method overload signatures
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number[], b: number[]): number[];
  
  // Implementation signature (must handle all overloads)
  add(a: any, b: any): any {
      if (typeof a === 'number' && typeof b === 'number') {
          return a + b;
      }
      if (typeof a === 'string' && typeof b === 'string') {
          return a + b;
      }
      if (Array.isArray(a) && Array.isArray(b)) {
          return a.concat(b);
      }
      throw new Error('Invalid arguments');
  }
  
  // Another overloaded method
  multiply(a: number, b: number): number;
  multiply(a: number, b: number, c: number): number;
  multiply(a: number, b: number, c?: number): number {
      if (c !== undefined) {
          return a * b * c;
      }
      return a * b;
  }
}

let calc = new Calculator();
console.log("Add numbers:", calc.add(5, 3));
console.log("Add strings:", calc.add("Hello, ", "World!"));
console.log("Add arrays:", calc.add([1, 2], [3, 4]));
console.log("Multiply 2 numbers:", calc.multiply(4, 5));
console.log("Multiply 3 numbers:", calc.multiply(2, 3, 4));

/*
* 9. Getters and Setters
*/

class Temperature {
  private _celsius: number = 0;
  
  // Getter for Celsius
  get celsius(): number {
      return this._celsius;
  }
  
  // Setter for Celsius
  set celsius(value: number) {
      this._celsius = value;
  }
  
  // Getter for Fahrenheit (computed property)
  get fahrenheit(): number {
      return (this._celsius * 9/5) + 32;
  }
  
  // Setter for Fahrenheit
  set fahrenheit(value: number) {
      this._celsius = (value - 32) * 5/9;
  }
  
  // Getter for Kelvin
  get kelvin(): number {
      return this._celsius + 273.15;
  }
  
  // Setter for Kelvin
  set kelvin(value: number) {
      this._celsius = value - 273.15;
  }
}

let temp = new Temperature();
temp.celsius = 25;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);

temp.fahrenheit = 100;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);

/*
* 10. Class Composition and Mixins
*/

// Mixin types
type Constructor<T = {}> = new (...args: any[]) => T;

// Mixin function
function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
      timestamp = new Date();
      
      getTimestamp(): string {
          return this.timestamp.toISOString();
      }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
      isActive = false;
      
      activate(): void {
          this.isActive = true;
      }
      
      deactivate(): void {
          this.isActive = false;
      }
      
      toggle(): void {
          this.isActive = !this.isActive;
      }
  };
}

// Base class
class User {
  constructor(public name: string) {}
}

// Apply mixins
const TimestampedUser = Timestamped(User);
const ActivatableUser = Activatable(User);
const EnhancedUser = Activatable(Timestamped(User));

let user1 = new TimestampedUser("Alice");
console.log("User created at:", user1.getTimestamp());

let user2 = new ActivatableUser("Bob");
user2.activate();
console.log("User is active:", user2.isActive);

let user3 = new EnhancedUser("Charlie");
user3.activate();
console.log("Enhanced user:", user3.name, "Active:", user3.isActive, "Created:", user3.getTimestamp());