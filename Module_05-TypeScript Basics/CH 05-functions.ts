/*
 * TypeScript: Functions
 *
 * - Function parameters and return types can be explicitly typed.
 * - You can define optional and default parameters.
 * - Arrow functions support the same typing syntax.
 * - Functions can also use type aliases or interfaces for signature declarations.
 */

// 1. Basic typed function
function add(a: number, b: number): number {
  return a + b;
}

// 2. Optional parameter
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : `Hello ${name}`;
}

// 3. Default parameter
function logMessage(message: string, level: string = 'info') {
  console.log(`[${level.toUpperCase()}]: ${message}`);
}

// 4. Function expression with arrow function
const multiply = (x: number, y: number): number => x * y;

// 5. Type alias for function signature
type Operation = (a: number, b: number) => number;

const divide: Operation = (a, b) => a / b;

// 6. Function with void return type
function notifyUser(message: string): void {
  alert(message);
}

// 7. Function with never (for example, throwing errors)
function throwError(message: string): never {
  throw new Error(message);
}
