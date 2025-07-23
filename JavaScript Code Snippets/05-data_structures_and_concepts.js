// =============================================================================
// JavaScript Interview Practice - File 5: Data Structures & Advanced Concepts
// =============================================================================

// 1. Array Methods and Their Return Values
const arr = [1, 2, 3, 4, 5];

console.log(arr.forEach(() => {})); // undefined
console.log(arr.map(x => x * 2)); // [2, 4, 6, 8, 10]
console.log(arr.filter(x => x > 3)); // [4, 5]
console.log(arr.find(x => x > 3)); // 4
console.log(arr.some(x => x > 3)); // true
console.log(arr.every(x => x > 0)); // true
console.log(arr.reduce((acc, x) => acc + x, 0)); // 15
// Explanation: forEach returns undefined, map/filter return new arrays,
// find returns first match, some/every return booleans, reduce returns accumulated value.

// 2. Shallow vs Deep Copy Gotcha
const original = {
  name: 'John',
  address: { city: 'NYC', country: 'USA' },
  hobbies: ['reading', 'coding']
};

// Shallow copies
const spread = { ...original };
const assign = Object.assign({}, original);

// Modifying nested objects affects shallow copies
original.address.city = 'LA';
console.log(spread.address.city); // 'LA' - affected!
console.log(assign.address.city); // 'LA' - affected!

// Deep copy (JSON method - has limitations)
const deepCopy = JSON.parse(JSON.stringify(original));
original.address.country = 'Canada';
console.log(deepCopy.address.country); // 'USA' - not affected

// JSON method limitations: loses functions, undefined, Symbol, Date becomes string
// Explanation: Shallow copy only copies first level. Nested objects share references.
// Deep copy creates completely independent objects but JSON method has limitations.

// 3. Set vs Array Performance and Uniqueness
const largeArray = Array.from({length: 100000}, (_, i) => i);
const set = new Set(largeArray);

console.time('Array includes');
largeArray.includes(99999); // O(n) - linear search
console.timeEnd('Array includes');

console.time('Set has');
set.has(99999); // O(1) - hash lookup
console.timeEnd('Set has');

// Removing duplicates
const withDuplicates = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(withDuplicates)]; // [1, 2, 3, 4]
console.log(unique);
// Explanation: Set has O(1) lookup vs Array's O(n). Set automatically handles uniqueness.
// Converting Set back to Array: [...set] or Array.from(set).

// 4. Map vs Object as Hash Table
const obj = {};
const map = new Map();

// Object keys are always strings (or Symbols)
obj[1] = 'number key becomes string';
obj['1'] = 'string key';
console.log(obj[1] === obj['1']); // true - same key!

// Map preserves key types
map.set(1, 'number key');
map.set('1', 'string key');
console.log(map.get(1) === map.get('1')); // false - different keys

// Map can use objects as keys
const keyObj = {};
map.set(keyObj, 'object as key');
console.log(map.get(keyObj)); // 'object as key'

// Map has size property and is iterable
console.log(map.size); // 3
for (const [key, value] of map) {
  console.log(key, value);
}
// Explanation: Map preserves key types and insertion order. Objects coerce keys to strings.
// Map is better for frequent additions/deletions and when key types matter.

// 5. Generators and Iterators
function* fibonacciGenerator() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacciGenerator();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2

// Taking first 5 fibonacci numbers
const first5 = [];
const fibIter = fibonacciGenerator();
for (let i = 0; i < 5; i++) {
  first5.push(fibIter.next().value);
}
console.log(first5); // [0, 1, 1, 2, 3]
// Explanation: Generators produce values lazily on demand. Memory efficient for large sequences.
// yield pauses execution, next() resumes from last yield point.

// 6. Proxy for Property Interception
const target = { name: 'John', age: 30 };

const proxy = new Proxy(target, {
  get(obj, prop) {
    console.log(`Getting ${prop}`);
    return obj[prop];
  },
  set(obj, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    if (prop === 'age' && value < 0) {
      throw new Error('Age cannot be negative');
    }
    obj[prop] = value;
    return true;
  },
  has(obj, prop) {
    console.log(`Checking if ${prop} exists`);
    return prop in obj;
  }
});

proxy.name; // "Getting name"
proxy.age = 25; // "Setting age to 25"
'name' in proxy; // "Checking if name exists"
// Explanation: Proxy intercepts operations on objects (get, set, has, etc.).
// Useful for validation, logging, computed properties, and meta-programming.

// 7. Symbol for Private Properties and Well-known Symbols
const _private = Symbol('private');
const _id = Symbol('id');

class User {
  constructor(name, id) {
    this.name = name;
    this[_private] = 'secret data';
    this[_id] = id;
  }
  
  [Symbol.iterator]() {
    const values = [this.name, this[_id]];
    let index = 0;
    return {
      next() {
        return index < values.length 
          ? { value: values[index++], done: false }
          : { done: true };
      }
    };
  }
  
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this[_id];
    if (hint === 'string') return this.name;
    return this.name;
  }
}

const user = new User('Alice', 123);
console.log(Object.keys(user)); // ['name'] - symbols not enumerable
console.log([...user]); // ['Alice', 123] - using Symbol.iterator
console.log(+user); // 123 - using Symbol.toPrimitive with 'number' hint
// Explanation: Symbols create unique property keys. Well-known symbols define object behavior.
// Symbol properties are not enumerable and provide pseudo-privacy.

// 8. WeakSet and WeakMap Use Cases
let node1 = { id: 1 };
let node2 = { id: 2 };

// Tracking visited nodes without preventing GC
const visited = new WeakSet();
visited.add(node1);
visited.add(node2);

console.log(visited.has(node1)); // true

// When node1 is no longer referenced elsewhere, it can be garbage collected
node1 = null; // visited.has(node1) would be false if GC runs

// Private data with WeakMap
const privateData = new WeakMap();

class BankAccount {
  constructor(balance) {
    privateData.set(this, { balance });
  }
  
  getBalance() {
    return privateData.get(this).balance;
  }
  
  deposit(amount) {
    const data = privateData.get(this);
    data.balance += amount;
  }
}

const account = new BankAccount(1000);
console.log(account.getBalance()); // 1000
// Private balance is not accessible from outside
// Explanation: WeakSet/WeakMap don't prevent garbage collection of their keys.
// Useful for metadata, caching, and private data without memory leaks.

// 9. Event Loop and Microtask Queue
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => {
  console.log('3');
  return Promise.resolve();
}).then(() => console.log('4'));

queueMicrotask(() => console.log('5'));

Promise.resolve().then(() => console.log('6'));

console.log('7');

// Output: 1, 7, 3, 5, 6, 4, 2
// Explanation: 
// 1. Synchronous code runs first (1, 7)
// 2. Microtasks (Promises, queueMicrotask) run before macrotasks
// 3. Each Promise.then creates a new microtask
// 4. setTimeout (macrotask) runs last

// 10. Memory Management and Garbage Collection
function createMemoryLeak() {
  const largeArray = new Array(1000000).fill('data');
  const element = document.createElement('div');
  
  // Memory leak: circular reference
  element.onclick = function() {
    console.log(largeArray.length); // Closure keeps largeArray alive
  };
  
  // Even if element is removed from DOM, the click handler
  // and largeArray remain in memory due to circular reference
  return element;
}

// Better approach
function createNoLeak() {
  const largeArray = new Array(1000000).fill('data');
  const element = document.createElement('div');
  
  function handleClick() {
    console.log('Clicked');
    // No reference to largeArray
  }
  
  element.onclick = handleClick;
  
  // Cleanup function
  return {
    element,
    cleanup() {
      element.onclick = null; // Remove event listener
      // Now everything can be garbage collected
    }
  };
}

// Using WeakRef for cache that doesn't prevent GC
const cache = new Map();

function getCachedData(key) {
  const ref = cache.get(key);
  if (ref) {
    const data = ref.deref(); // Get the actual object
    if (data) {
      return data; // Object still exists
    } else {
      cache.delete(key); // Object was garbage collected
    }
  }
  
  const newData = expensiveOperation(key);
  cache.set(key, new WeakRef(newData));
  return newData;
}

function expensiveOperation(key) {
  return { key, data: `processed-${key}` };
}

// Explanation: Memory leaks occur from retained references (closures, circular refs).
// WeakRef allows caching without preventing garbage collection.
// Always cleanup event listeners and clear references when objects are no longer needed.