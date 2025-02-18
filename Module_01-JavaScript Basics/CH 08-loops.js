/* 
 *  Loops
 */

// For Loop
console.log("For Loop Example:");
for (let i = 1; i <= 5; i++) {
    console.log(`Iteration ${i}`); // Iterates from 1 to 5
}

// While Loop
console.log("\nWhile Loop Example:");
let count = 1;
while (count <= 5) {
    console.log(`Count is: ${count}`); // Outputs 1 to 5
    count++;
}

// Do-While Loop
console.log("\nDo-While Loop Example:");
let num = 1;
do {
    console.log(`Number is: ${num}`); // Executes at least once, outputs 1 to 5
    num++;
} while (num <= 5);

// For-In Loop (Iterates over object keys)
console.log("\nFor-In Loop Example:");
const person = { name: "John", age: 30, city: "New York" };
for (let key in person) {
    console.log(`${key}: ${person[key]}`); // Outputs "name: John", "age: 30", "city: New York"
}

// For-Of Loop (Iterates over iterable objects like arrays, strings, etc.)
console.log("\nFor-Of Loop Example:");
const fruits = ["Apple", "Banana", "Cherry"];
for (let fruit of fruits) {
    console.log(fruit); // Outputs each fruit in the array
}

// Break Statement
console.log("\nBreak Example:");
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        console.log("Breaking the loop at 5");
        break; // Exits the loop
    }
    console.log(i);
}

// Continue Statement
console.log("\nContinue Example:");
for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {
        continue; // Skips even numbers
    }
    console.log(i); // Outputs only odd numbers
}

// Nested Loops
console.log("\nNested Loops Example:");
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(`i: ${i}, j: ${j}`); // Outputs all combinations of i and j
    }
}

// Iterating Over Arrays with ForEach
console.log("\nArray Iteration with ForEach:");
const numbers = [10, 20, 30, 40];
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// Looping Over Strings
console.log("\nLooping Over a String:");
const text = "Hello";
for (let char of text) {
    console.log(char); // Outputs each character in the string
}
