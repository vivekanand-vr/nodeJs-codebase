/*
 * TypeScript Basic Types:
 * - TypeScript provides static type checking to JavaScript
 * - Basic types include: number, string, boolean, null, undefined, symbol, bigint
 * - Type annotations help catch errors at compile time
 * - TypeScript can infer types automatically in many cases
 * 
 * Benefits:
 * -> Better IDE support with autocomplete and error detection
 * -> Early error detection during development
 * -> Self-documenting code through type annotations
 * -> Better refactoring capabilities
 */

/*
 * 1. Primitive Types
 */

// Number type
let age: number = 25;
let price: number = 99.99;
let hexValue: number = 0xFF;
let binaryValue: number = 0b1010;
let octalValue: number = 0o744;

console.log("Age:", age);
console.log("Price:", price);
console.log("Hex Value:", hexValue); // Output: 255

// String type
let firstName: string = "John";
let lastName: string = 'Doe';
let fullName: string = `${firstName} ${lastName}`; // Template literal
let multiLine: string = `This is a
multi-line string`;

console.log("Full Name:", fullName); // Output: John Doe

// Boolean type
let isActive: boolean = true;
let isCompleted: boolean = false;
let isValid: boolean = age > 18; // Type inference

console.log("Is Active:", isActive);
console.log("Is Valid:", isValid);

/*
 * 2. Special Types
 */

// Null and Undefined
let nullValue: null = null;
let undefinedValue: undefined = undefined;
let maybeString: string | null = null; // Union with null
let optionalValue: string | undefined = undefined;

// Void type (commonly used for functions that don't return anything)
function logMessage(message: string): void {
    console.log(message);
    // No return statement
}

logMessage("This function returns void");

// Never type (for functions that never return)
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {
        // This never ends
    }
}

/*
 * 3. Type Inference
 */

// TypeScript can infer types automatically
let inferredNumber = 42; // TypeScript infers this as number
let inferredString = "Hello"; // TypeScript infers this as string
let inferredBoolean = true; // TypeScript infers this as boolean

// inferredNumber = "string"; // Error: Type 'string' is not assignable to type 'number'

/*
 * 4. Any Type (Use sparingly)
 */

let dynamicValue: any = 42;
dynamicValue = "Now I'm a string";
dynamicValue = true;
dynamicValue = { name: "Object" };

console.log("Dynamic Value:", dynamicValue);

// Any with arrays
let dynamicArray: any[] = [1, "string", true, { key: "value" }];
console.log("Dynamic Array:", dynamicArray);

/*
 * 5. Unknown Type (Safer alternative to any)
 */

let unknownValue: unknown = 42;
unknownValue = "string";
unknownValue = true;

// Type checking required before use
if (typeof unknownValue === "string") {
    console.log("String length:", unknownValue.length); // Safe to use
}

if (typeof unknownValue === "number") {
    console.log("Number value:", unknownValue.toFixed(2)); // Safe to use
}

/*
 * 6. Literal Types
 */

// String literals
let direction: "up" | "down" | "left" | "right" = "up";
// direction = "diagonal"; // Error: not in the allowed values

// Number literals
let diceRoll: 1 | 2 | 3 | 4 | 5 | 6 = 3;

// Boolean literals
let isTrue: true = true;
// let isFalse: true = false; // Error: false is not assignable to true

/*
 * 7. Symbol and BigInt
 */

// Symbol type
let sym1: symbol = Symbol("key");
let sym2: symbol = Symbol("key");
console.log("Symbols are unique:", sym1 !== sym2); // true

// BigInt type
let bigNumber: bigint = 123456789012345678901234567890n;
let anotherBigInt: bigint = BigInt("123456789012345678901234567890");

console.log("Big Number:", bigNumber);

/*
 * 8. Type Assertions
 */

// Angle bracket syntax (not recommended in JSX)
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// As syntax (preferred)
let anotherValue: any = "another string";
let anotherStrLength: number = (anotherValue as string).length;

console.log("String Length:", strLength);
console.log("Another String Length:", anotherStrLength);

/*
 * 9. Const Assertions
 */

// Without const assertion
let mutableArray = [1, 2, 3]; // type: number[]
mutableArray.push(4); // Allowed

// With const assertion
let immutableArray = [1, 2, 3] as const; // type: readonly [1, 2, 3]
// immutableArray.push(4); // Error: Property 'push' does not exist

const person = {
    name: "Alice",
    age: 30
} as const; // All properties become readonly

console.log("Person:", person);