/*
 * ============================================================
 *  ARRAY HIGHER-ORDER METHODS (Functional Array Programming)
 * ============================================================
 *
 * DEFINITION:
 *   JavaScript arrays ship with a rich set of built-in HOF methods.
 *   They all accept a callback function which is applied per element.
 *   Most return a NEW array (pure) — the original is not mutated.
 *
 * METHOD QUICK REFERENCE:
 *   Method         Returns          Mutates original?  Purpose
 *   ─────────────  ───────────────  ─────────────────  ───────────────────────────
 *   map()          new array        NO                 Transform each element
 *   filter()       new array        NO                 Keep elements matching pred
 *   reduce()       single value     NO                 Fold to one result
 *   forEach()      undefined        NO                 Side-effect per element
 *   find()         element|undef    NO                 First match
 *   findIndex()    index|-1         NO                 Index of first match
 *   some()         boolean          NO                 At least one passes
 *   every()        boolean          NO                 All pass
 *   flatMap()      new flat array   NO                 Map then flatten 1 level
 *   sort()         same array       YES (in-place!)    Sort elements
 *   flat()         new array        NO                 Flatten nested arrays
 *   includes()     boolean          NO                 Membership check
 *   concat()       new array        NO                 Join arrays
 *   Array.from()   new array        NO                 Create from iterable/length
 *   Array.isArray() boolean         NO                 Type guard
 *
 * CALLBACK SIGNATURE (for map, filter, reduce, etc.):
 *   callback(currentValue, index, array)  — all three params available
 *
 * IMPORTANT POINTS:
 *   1. map(), filter(), reduce() are the "big three" — compose them to
 *      express most data transformation pipelines declaratively.
 *   2. forEach() has no return value — use map() if you need a new array.
 *   3. sort() mutates in-place and uses unicode order by default;
 *      always pass a comparator for numeric or locale-aware sorting.
 *   4. reduce() initial value matters: omitting it uses the first element,
 *      which can cause bugs on empty arrays.
 *   5. flatMap() is == .map().flat(1) but more efficient.
 *   6. find() returns `undefined` (not -1) if not found; use findIndex()
 *      when you need the position rather than the value.
 *   7. The custom map/filter implementations below reveal what the engine
 *      does internally — studying them deepens understanding of callbacks.
 * ============================================================
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


// ─── 14. includes() — membership check ─────────────────────────────────────
console.log(numbers.includes(3));  // Output: true
console.log(numbers.includes(10)); // Output: false

// ─── 15. sort() — in-place, uses comparator for numbers ─────────────────────
console.log("\n=== 15. sort() — WARNING: mutates original! ===");

const unsorted = [10, 2, 8, 1, 5];
// Default sort: lexicographic — WRONG for numbers:
console.log([...unsorted].sort());               // Output: [1, 10, 2, 5, 8] — wrong!
// Correct numeric sort:
console.log([...unsorted].sort((a, b) => a - b)); // Output: [1, 2, 5, 8, 10] — ascending
console.log([...unsorted].sort((a, b) => b - a)); // Output: [10, 8, 5, 2, 1] — descending

// ─── 16. reduce() — pipeline accumulation ───────────────────────────────────
console.log("\n=== 16. Advanced reduce() — group by category ===");

const products = [
    { name: "apple",  category: "fruit" },
    { name: "banana", category: "fruit" },
    { name: "carrot", category: "vegetable" },
];

const grouped = products.reduce((acc, p) => {
    (acc[p.category] = acc[p.category] || []).push(p.name);
    return acc;
}, {});

console.log(grouped);
// Output: { fruit: [ 'apple', 'banana' ], vegetable: [ 'carrot' ] }

// ─── 17. findIndex() — position of first match ──────────────────────────────
console.log("\n=== 17. findIndex() ===");

const idx = numbers.findIndex(n => n > 3);
console.log(idx); // Output: 3 — index of first element > 3 (value=4 at index 3)

/*
 * ============================================================
 *  CONCLUSION — Key Array Method Takeaways
 * ============================================================
 *
 *  1. map(), filter(), and reduce() form the functional core — chaining
 *     them replaces most imperative for-loop patterns cleanly.
 *  2. These methods do NOT mutate the original array (except sort() and
 *     reverse()) — they return new arrays, supporting safe data flow.
 *  3. Always pass a comparator to sort() for numeric, date, or locale-
 *     aware comparisons; default lexicographic order will produce wrong
 *     results for arrays of numbers.
 *  4. reduce() is the most general — it can implement map(), filter(),
 *     groupBy(), flatten, and more, using only a callback and accumulator.
 *  5. Use find() when you need the element, findIndex() when you need the
 *     position; both return undefined/-1 (not an exception) if not found.
 *  6. forEach() is ONLY for side-effects (logging, DOM updates); it
 *     returns undefined — never chain it expecting a new array.
 *  7. Building custom map/filter/asyncMap implementations, as shown above,
 *     reveals the callback protocol and deepens mastery of HOFs.
 * ============================================================
 */
