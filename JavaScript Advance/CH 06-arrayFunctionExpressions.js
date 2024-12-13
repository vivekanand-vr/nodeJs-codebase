/*
 * Array Functions:
 * - JavaScript provides various array methods for functional programming, like `map`, `filter`, `reduce`, etc.
 * - These methods help process and manipulate arrays efficiently.
 * - Common array functions include:
 *     - map()    : Transforms each element and returns a new array.
 *     - filter() : Filters elements based on a condition.
 *     - forEach(): Executes a function for each element (no return).
 *     - reduce() : Reduces the array to a single value.
 *     - find()   : Returns the first matching element.
 *     - some()   : Checks if at least one element satisfies a condition.
 *     - every()  : Checks if all elements satisfy a condition.
 */

const numbers = [1, 2, 3, 4, 5];

// 1. map() - Transform each element in an array
/*
 * Example 1: Basic Custom Map Function
 */
function customMap(array, callback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i], i, array)); // Apply the callback
    }
    return result;
}

// Using the customMap function
const doubled = customMap(numbers, (num) => num * 2);
console.log(doubled); // Output: [2, 4, 6, 8, 10]

/*
 * Example 2: Custom Map Function with Context (thisArg)
 */
function customMapWithContext(array, callback, thisArg) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback.call(thisArg, array[i], i, array)); // Use `thisArg` as context
    }
    return result;
}

// Using the customMapWithContext function
const multiplier = {
    factor: 3,
};
const tripled = customMapWithContext(numbers, function (num) {
    return num * this.factor;
}, multiplier);
console.log(tripled); // Output: [3, 6, 9, 12, 15]

/*
 * Example 3: Custom Async Map Function (Handles Promises)
 */
async function customAsyncMap(array, asyncCallback) {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(await asyncCallback(array[i], i, array)); // Await each callback result
    }
    return result;
}

// Using the customAsyncMap function
const asyncDoubled = async () => {
    const asyncNumbers = await customAsyncMap(numbers, async (num) => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(num * 2), 100); // Simulate async processing
        });
    });
    console.log(asyncNumbers); // Output: [2, 4, 6, 8, 10]
};
asyncDoubled();



// 2. filter() - Filter elements based on a condition
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // Output: [2, 4]


// 3. forEach() - Execute a function for each element
numbers.forEach((num) => {
    console.log(num * 2); // Doubles each number
});
// Output: 2, 4, 6, 8, 10 (printed individually)


// 4. reduce() - Reduce the array to a single value
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum); // Output: 15


// 5. find() - Find the first element that matches a condition
const firstEven = numbers.find((num) => num % 2 === 0);
console.log(firstEven); // Output: 2


// 6. some() - Check if at least one element satisfies a condition
const hasNegative = numbers.some((num) => num < 0);
console.log(hasNegative); // Output: false


// 7. every() - Check if all elements satisfy a condition
const allPositive = numbers.every((num) => num > 0);
console.log(allPositive); // Output: true


// 8. Array.from() - Create an array from an iterable or transform elements
const string = "hello";
const characters = Array.from(string);
console.log(characters); // Output: ['h', 'e', 'l', 'l', 'o']


// 9. Array.prototype.callee (Removed in Strict Mode)
// Function `callee` is no longer available in strict mode and is discouraged in modern JavaScript.


// 10. Array.isArray() - Check if a value is an array
const isArray = Array.isArray(numbers);
console.log(isArray); // Output: true


// 11. concat() - Combine arrays
const moreNumbers = [6, 7, 8];
const combined = numbers.concat(moreNumbers);
console.log(combined); // Output: [1, 2, 3, 4, 5, 6, 7, 8]


// 12. flat() - Flatten a nested array
const nestedArray = [1, [2, [3, [4]]]];
const flatArray = nestedArray.flat(2);
console.log(flatArray); // Output: [1, 2, 3, [4]]


// 13. flatMap() - Map and flatten in one operation
const words = ["hello world", "foo bar"];
const splitWords = words.flatMap((str) => str.split(" "));
console.log(splitWords); // Output: ['hello', 'world', 'foo', 'bar']


// 14. includes() - Check if an array contains a value
console.log(numbers.includes(3)); // Output: true
console.log(numbers.includes(10)); // Output: false
