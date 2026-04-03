/* ===================================================================
 * CH 02 — TypeScript Union Types
 * ===================================================================
 *
 * WHAT IS A UNION TYPE?
 *   A union type (A | B) tells TypeScript that a value can be one of
 *   several types. TypeScript only allows operations that are valid
 *   for ALL members of the union UNLESS you narrow the type first.
 *
 * UNION TYPE MENTAL MODEL
 *   Think of A | B as the SET UNION of A and B:
 *   values of type A, values of type B, or values of both.
 *
 * NARROWING TECHNIQUES
 * ┌──────────────────────┬──────────────────────────────────────────┐
 * │ Technique            │ Code pattern                             │
 * ├──────────────────────┼──────────────────────────────────────────┤
 * │ typeof guard         │ if (typeof x === "string")               │
 * │ instanceof guard     │ if (x instanceof Date)                   │
 * │ in operator          │ if ("swim" in animal)                    │
 * │ Equality check       │ if (x === null)                          │
 * │ Discriminated union  │ switch (shape.kind)                      │
 * │ Custom type guard    │ function isX(v: any): v is X             │
 * └──────────────────────┴──────────────────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> Union type   : value is ONE of several types (A | B)
 * -> Narrowing    : reduce the union to one concrete type inside a branch
 * -> Discriminant : a shared literal-typed property (e.g. `kind: "circle"`)
 *                   that uniquely identifies each union member
 * -> Exhaustive   : `switch` covers ALL branches; leftover typed `never`
 *
 * IMPORTANT NOTES
 * 1. You can only access properties that exist on EVERY member of the
 *    union without narrowing (e.g. `string | number` → only `.toString()`).
 * 2. Discriminated unions are the safest pattern for modelling variants
 *    because TypeScript can prove exhaustiveness via `never`.
 * 3. An assignment to `never` in the default branch of a switch is a
 *    compile-time guard: if you add a new shape and forget a case, the
 *    compiler raises an error.
 * =================================================================== */

// ─── 1. Basic Union Types ────────────────────────────────────────────────────

// Simple union of primitives
let id: number | string;
id = 123; // Valid
id = "ABC123"; // Valid
// id = true; // Error: boolean is not assignable

console.log("ID as number:", typeof id === 'number' ? id : parseInt(id));

// Union with multiple types
let value: string | number | boolean = "hello";
value = 42;
value = true;

console.log("Current value:", value);

// ─── 2. Function Parameters with Union Types ────────────────────────────

function formatInput(input: string | number): string {
    // Type narrowing using typeof
    if (typeof input === "string") {
        return input.toUpperCase(); // TypeScript knows input is string here
    } else {
        return input.toString(); // TypeScript knows input is number here
    }
}

console.log(formatInput("hello")); // Output: HELLO
console.log(formatInput(123)); // Output: 123

// Function with union return type
function getRandomValue(): string | number {
    return Math.random() > 0.5 ? "random string" : 42;
}

let randomResult = getRandomValue();
console.log("Random result:", randomResult);

// ─── 3. Array Union Types ───────────────────────────────────────────────────────

// Array that can contain strings or numbers
let mixedArray: (string | number)[] = [1, "hello", 2, "world", 3];
console.log("Mixed array:", mixedArray);

// Array of arrays with different types
let multiDimensional: (string[] | number[])[] = [
    ["a", "b", "c"],
    [1, 2, 3],
    ["x", "y", "z"]
];

console.log("Multi-dimensional:", multiDimensional);

// ─── 4. Object Union Types & Discriminated Unions ──────────────────────

// Union of different object structures
type Circle = {
    kind: "circle";
    radius: number;
};

type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
};

type Shape = Circle | Rectangle;

function calculateArea(shape: Shape): number {
    // Discriminated union using kind property
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rectangle":
            return shape.width * shape.height;
        default:
            // TypeScript ensures all cases are handled
            const exhaustiveCheck: never = shape;
            return exhaustiveCheck;
    }
}

let circle: Circle = { kind: "circle", radius: 5 };
let rectangle: Rectangle = { kind: "rectangle", width: 4, height: 6 };

console.log("Circle area:", calculateArea(circle));
console.log("Rectangle area:", calculateArea(rectangle));

// ─── 5. Type Guards ────────────────────────────────────────────────────────────

// Using typeof type guard
function processValue(value: string | number | boolean): void {
    if (typeof value === "string") {
        console.log("String length:", value.length);
    } else if (typeof value === "number") {
        console.log("Number squared:", value ** 2);
    } else {
        console.log("Boolean negated:", !value);
    }
}

processValue("hello");
processValue(5);
processValue(true);

// Custom type guard function
function isString(value: any): value is string {
    return typeof value === "string";
}

function isNumber(value: any): value is number {
    return typeof value === "number";
}

function processWithCustomGuards(input: string | number): void {
    if (isString(input)) {
        console.log("Processing string:", input.toUpperCase());
    } else if (isNumber(input)) {
        console.log("Processing number:", input.toFixed(2));
    }
}

processWithCustomGuards("typescript");
processWithCustomGuards(3.14159);

// ─── 6. Union with null and undefined ────────────────────────────────────

// Optional properties using union with undefined
let optionalName: string | undefined = undefined;

function greetUser(name: string | undefined): string {
    if (name === undefined) {
        return "Hello, Guest!";
    }
    return `Hello, ${name}!`;
}

console.log(greetUser(optionalName)); // Output: Hello, Guest!
console.log(greetUser("Alice")); // Output: Hello, Alice!

// Nullable types
let nullableValue: string | null = null;

function processNullable(value: string | null): string {
    // Null check
    if (value === null) {
        return "No value provided";
    }
    return `Value: ${value}`;
}

console.log(processNullable(nullableValue));
console.log(processNullable("Not null"));

// ─── 7. Union with Literal Types ─────────────────────────────────────────────

// Theme configuration
type Theme = "light" | "dark" | "auto";
type Size = "small" | "medium" | "large";

function applyTheme(theme: Theme, size: Size): void {
    console.log(`Applying ${theme} theme with ${size} size`);
}

applyTheme("dark", "medium");
// applyTheme("blue", "medium"); // Error: "blue" is not assignable

// Status codes
type HttpStatus = 200 | 404 | 500;

function handleResponse(status: HttpStatus): string {
    switch (status) {
        case 200:
            return "Success";
        case 404:
            return "Not Found";
        case 500:
            return "Server Error";
    }
}

console.log(handleResponse(200));
console.log(handleResponse(404));

// ─── 8. Complex Union Scenarios ───────────────────────────────────────────────

// API response type
type ApiResponse<T> = 
    | { success: true; data: T }
    | { success: false; error: string };

function handleApiResponse<T>(response: ApiResponse<T>): void {
    if (response.success) {
        console.log("Data received:", response.data);
    } else {
        console.log("Error occurred:", response.error);
    }
}

// Usage examples
let successResponse: ApiResponse<string> = {
    success: true,
    data: "Hello from API"
};

let errorResponse: ApiResponse<string> = {
    success: false,
    error: "Network timeout"
};

handleApiResponse(successResponse);
handleApiResponse(errorResponse);

// ─── 9. Union with Arrays and Objects ───────────────────────────────────

// Config that can be string or object
type Config = string | {
    host: string;
    port: number;
    secure?: boolean;
};

function setupConnection(config: Config): void {
    if (typeof config === "string") {
        console.log(`Connecting to: ${config}`);
    } else {
        const protocol = config.secure ? "https" : "http";
        console.log(`Connecting to: ${protocol}://${config.host}:${config.port}`);
    }
}

setupConnection("localhost:3000");
setupConnection({ host: "api.example.com", port: 443, secure: true });

// ─── 10. Narrowing with `in` Operator ───────────────────────────────────

type Fish = { swim: () => void; name: string };
type Bird = { fly: () => void; name: string };

function move(animal: Fish | Bird): void {
    // Using 'in' operator for type narrowing
    if ("swim" in animal) {
        animal.swim(); // TypeScript knows this is Fish
        console.log(`${animal.name} is swimming`);
    } else {
        animal.fly(); // TypeScript knows this is Bird
        console.log(`${animal.name} is flying`);
    }
}

let fish: Fish = {
    name: "Goldfish",
    swim: () => console.log("Swimming in water")
};

let bird: Bird = {
    name: "Eagle",
    fly: () => console.log("Flying in sky")
};

move(fish);
move(bird);

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. Union types express that a value belongs to one of several types;
 *    TypeScript enforces that you only use the common API until you narrow.
 * 2. Discriminated unions (shared `kind`/`type` literal) are the go-to
 *    pattern for variant data — they scale well as new cases are added.
 * 3. The `switch` + `never` exhaustiveness trick turns missing cases into
 *    compile-time errors rather than silent runtime bugs.
 * 4. `typeof`, `instanceof`, `in`, and equality checks are all built-in
 *    narrowing mechanisms TypeScript understands natively.
 * 5. Custom type guard functions (`value is T`) let you encapsulate
 *    complex narrowing logic and reuse it across your codebase.
 * 6. String | null with strict null checks forces you to handle `null`
 *    explicitly — use optional chaining (`?.`) and nullish coalescing
 *    (`??`) to keep the code concise.
 * 7. Literal union types (`"up" | "down" | "left" | "right"`) create
 *    enum-like constraints without the extra syntax or runtime overhead.
 * =================================================================== */
export {};
