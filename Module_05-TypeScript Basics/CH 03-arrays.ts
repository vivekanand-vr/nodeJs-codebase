/* ===================================================================
 * CH 03 — TypeScript Arrays
 * ===================================================================
 *
 * ARRAY TYPE SYNTAXES
 *   number[]          — shorthand (preferred for simple types)
 *   Array<number>     — generic form (required for complex type args)
 *   readonly number[] — immutable array (no push/pop/splice)
 *   [string, number]  — tuple: fixed-length with per-position types
 *
 * TYPE SAFETY COMPARISON
 * ┌────────────────────┬────────────┬─────────────┬────────────────┐
 * │ Feature            │ JS Array   │ TS Array    │ TS Tuple       │
 * ├────────────────────┼────────────┼─────────────┼────────────────┤
 * │ Typed elements     │ No         │ Yes         │ Yes (per slot) │
 * │ Fixed length       │ No         │ No          │ Yes            │
 * │ Push/pop allowed   │ Yes        │ Yes         │ Yes*           │
 * │ Destructuring      │ Yes        │ Yes         │ Yes (typed)    │
 * │ Immutable variant  │ No         │ readonly T[]│ readonly [a,b] │
 * └────────────────────┴────────────┴─────────────┴────────────────┘
 *   * Tuples allow push unless `readonly`; TS does not restrict length
 *     at runtime via push, only at the type-level assignment.
 *
 * KEY CONCEPTS
 * -> Typed array        : Every element must match the declared type
 * -> Tuple             : Fixed positions with individual types
 * -> Named tuple       : Labels on tuple positions (TS 4.0+) for docs
 * -> Readonly array    : A contract — operations that mutate are banned
 * -> Generic functions : <T>(arr: T[]) → operate on any typed array
 *
 * IMPORTANT NOTES
 * 1. Prefer `T[]` over `Array<T>` for readability.
 * 2. `readonly T[]` and `ReadonlyArray<T>` are equivalent.
 * 3. Tuples elements beyond the fixed positions can use rest types:
 *    `[first: number, ...rest: string[]]`
 * 4. `as const` applied to an array literal infers a readonly tuple of
 *    exact literal types — useful for constant lookup tables.
 * 5. `Array.from<T>(iter)` is not generic automatically — specify `<T>`
 *    when the inferred type would be too broad.
 * =================================================================== */

// ─── 1. Basic Array Types ────────────────────────────────────────────────────

// Number array - two syntaxes
let numbers1: number[] = [1, 2, 3, 4, 5];
let numbers2: Array<number> = [6, 7, 8, 9, 10];

console.log("Numbers1:", numbers1);
console.log("Numbers2:", numbers2);

// String array
let fruits: string[] = ["apple", "banana", "orange"];
let colors: Array<string> = ["red", "green", "blue"];

console.log("Fruits:", fruits);

// Boolean array
let flags: boolean[] = [true, false, true, false];
console.log("Flags:", flags);

// ─── 2. Array Methods with Type Safety ───────────────────────────────────

let scores: number[] = [85, 92, 78, 96, 88];

// Map - returns new typed array
let doubledScores: number[] = scores.map(score => score * 2);
console.log("Doubled scores:", doubledScores);

// Filter - maintains type
let highScores: number[] = scores.filter(score => score > 90);
console.log("High scores:", highScores);

// Reduce - can return different type
let totalScore: number = scores.reduce((sum, score) => sum + score, 0);
let averageScore: number = totalScore / scores.length;
console.log("Average score:", averageScore);

// Find - returns type or undefined
let perfectScore: number | undefined = scores.find(score => score === 100);
console.log("Perfect score found:", perfectScore);

// Some and Every - return boolean
let hasHighScore: boolean = scores.some(score => score > 95);
let allPassed: boolean = scores.every(score => score >= 60);

console.log("Has high score:", hasHighScore);
console.log("All passed:", allPassed);

// ─── 3. Multi-dimensional Arrays ─────────────────────────────────────────────

// 2D array (matrix)
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log("Matrix:", matrix);
console.log("Element at [1][2]:", matrix[1][2]); // Output: 6

// 3D array
let cube: number[][][] = [
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
];

console.log("Cube element:", cube[1][0][1]); // Output: 6

// Array of different types
let mixed: (string | number)[][] = [
    ["name", "John", "age", 30],
    ["city", "NYC", "score", 95]
];

console.log("Mixed array:", mixed);

// ─── 4. Tuple Types (Fixed-length arrays) ─────────────────────────────────

// Basic tuple
let person: [string, number, boolean] = ["Alice", 25, true];
console.log("Person tuple:", person);
console.log("Name:", person[0], "Age:", person[1], "Active:", person[2]);

// Tuple with optional elements
let coordinates: [number, number, number?] = [10, 20]; // z is optional
coordinates = [10, 20, 30]; // Also valid

console.log("Coordinates:", coordinates);

// Named tuples (TypeScript 4.0+)
let student: [name: string, grade: number, graduated: boolean] = ["Bob", 85, false];
console.log("Student:", student);

// Rest elements in tuples
let scores2: [number, number, ...number[]] = [100, 95, 88, 92, 87];
console.log("Scores with rest:", scores2);

// ─── 5. Readonly Arrays ─────────────────────────────────────────────────────────

// Readonly array - cannot be modified
let readonlyNumbers: readonly number[] = [1, 2, 3, 4, 5];
// readonlyNumbers.push(6); // Error: Property 'push' does not exist
// readonlyNumbers[0] = 10; // Error: Index signature is readonly

console.log("Readonly numbers:", readonlyNumbers);

// ReadonlyArray utility type
let readonlyFruits: ReadonlyArray<string> = ["apple", "banana"];
// readonlyFruits.pop(); // Error: Property 'pop' does not exist

// Readonly tuple
let readonlyTuple: readonly [string, number] = ["test", 42];
// readonlyTuple[0] = "changed"; // Error: Cannot assign to readonly property

// ─── 6. Array Destructuring with Types ───────────────────────────────────

// Basic destructuring
let [first, second, ...rest]: number[] = [1, 2, 3, 4, 5];
console.log("First:", first, "Second:", second, "Rest:", rest);

// Tuple destructuring
let [userName, userAge, isActive]: [string, number, boolean] = ["Charlie", 28, true];
console.log(`User: ${userName}, Age: ${userAge}, Active: ${isActive}`);

// Destructuring with default values
let [x = 0, y = 0, z = 0]: number[] = [10, 20];
console.log("Coordinates with defaults:", { x, y, z });

// ─── 7. Generic Array Functions ───────────────────────────────────────────────

// Generic function that works with any array type
function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

let firstNumber = getFirstElement([1, 2, 3]); // Type: number | undefined
let firstString = getFirstElement(["a", "b", "c"]); // Type: string | undefined

console.log("First number:", firstNumber);
console.log("First string:", firstString);

// Generic function to chunk array
function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

let numberChunks = chunkArray([1, 2, 3, 4, 5, 6], 2);
let stringChunks = chunkArray(["a", "b", "c", "d", "e"], 3);

console.log("Number chunks:", numberChunks);
console.log("String chunks:", stringChunks);

// ─── 8. Array with Union Types ──────────────────────────────────────────────────

// Array containing multiple types
let mixedData: (string | number | boolean)[] = ["hello", 42, true, "world", 100];

// Type guards for processing mixed arrays
function processMixedArray(arr: (string | number | boolean)[]): void {
    arr.forEach((item, index) => {
        if (typeof item === "string") {
            console.log(`[${index}] String: ${item.toUpperCase()}`);
        } else if (typeof item === "number") {
            console.log(`[${index}] Number: ${item * 2}`);
        } else {
            console.log(`[${index}] Boolean: ${!item}`);
        }
    });
}

processMixedArray(mixedData);

// ─── 9. Array of Objects ────────────────────────────────────────────────────────

// Interface for objects in array
interface User {
    id: number;
    name: string;
    email: string;
    isActive?: boolean;
}

let users: User[] = [
    { id: 1, name: "John", email: "john@example.com", isActive: true },
    { id: 2, name: "Jane", email: "jane@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com", isActive: false }
];

// Type-safe array operations with objects
let activeUsers: User[] = users.filter(user => user.isActive !== false);
let userNames: string[] = users.map(user => user.name);
let userById: User | undefined = users.find(user => user.id === 2);

console.log("Active users:", activeUsers);
console.log("User names:", userNames);
console.log("User by ID:", userById);

// ─── 10. Advanced Array Patterns ───────────────────────────────────────────────

// Array builder pattern
class ArrayBuilder<T> {
    private items: T[] = [];

    add(item: T): ArrayBuilder<T> {
        this.items.push(item);
        return this;
    }

    addMany(items: T[]): ArrayBuilder<T> {
        this.items.push(...items);
        return this;
    }

    build(): T[] {
        return [...this.items]; // Return copy
    }

    clear(): ArrayBuilder<T> {
        this.items = [];
        return this;
    }
}

let numberBuilder = new ArrayBuilder<number>()
    .add(1)
    .add(2)
    .addMany([3, 4, 5])
    .build();

console.log("Built array:", numberBuilder);

// Array validation
function validateArray<T>(arr: T[], validator: (item: T) => boolean): boolean {
    return arr.every(validator);
}

let allPositive = validateArray([1, 2, 3, 4], num => num > 0);
let allStringsLong = validateArray(["hello", "world"], str => str.length > 3);

console.log("All positive:", allPositive);
console.log("All strings long:", allStringsLong);

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. TypeScript arrays are homogeneous by default — all elements must
 *    match the declared element type, preventing accidental mixing.
 * 2. Tuples model fixed-structure data (like CSV rows or coordinates);
 *    use named tuples for self-documenting code.
 * 3. `readonly T[]` communicates intent: the array should not be
 *    mutated after creation — especially useful for function parameters.
 * 4. `as const` on an array literal creates a `readonly` tuple of exact
 *    literal types, ideal for config arrays and lookup tables.
 * 5. Generic array utilities (`<T>(arr: T[]) => T`) allow you to write
 *    one function that safely handles arrays of ANY element type.
 * 6. Array destructuring with type annotations (`[a, b]: [T, U]`)
 *    provides typed access to tuple positions without indexing.
 * 7. All built-in array methods (`map`, `filter`, `find`, `reduce`)
 *    are fully type-safe — TypeScript infers the return types for you.
 * =================================================================== */
export {};
