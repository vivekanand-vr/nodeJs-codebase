/*
 * ToPrimitive Conversion:
 * JavaScript applies ToPrimitive conversions when a value of a complex type (object) 
 * needs to be converted to a primitive value for operations like concatenation, arithmetic, etc.
 *
 * The ToPrimitive abstract operation tries the following steps:
 * 1. Calls the object's `valueOf()` method. If it returns a primitive, use it.
 * 2. If `valueOf()` doesn't return a primitive, call `toString()`.
 * 3. If neither returns a primitive, throw a TypeError.
 */

// 1. Objects and Arrays with Default Behavior
console.log("\n1. Objects and Arrays with Default Behavior:");
console.log("Object + String: " + {}); // Output: "[object Object]"
console.log("Array + String: " + [1, 2, 3]); // Output: "1,2,3"

// 2. Custom Objects with Overridden Methods
console.log("\n2. Custom Objects with Overridden Methods:");

const objWithValueOf = {
  valueOf() {
    return 42; // Returns a primitive
  },
};

const objWithToString = {
  toString() {
    return "Custom String"; // Returns a primitive
  },
};

const objWithBoth = {
  valueOf() {
    return 100; // Checked first
  },
  toString() {
    return "This is toString";
  },
};

console.log("Using valueOf:", objWithValueOf + 5); // Output: 47 (valueOf is used)
console.log("Using toString:", objWithToString + " appended"); // Output: "Custom String appended"
console.log("Using Both:", objWithBoth + 50); // Output: 150 (valueOf is used)

// 3. No Primitive from valueOf or toString
console.log("\n3. No Primitive from valueOf or toString:");

const objWithNoPrimitive = {
  valueOf() {
    return {}; // Not a primitive
  },
  toString() {
    return {}; // Not a primitive
  },
};

try {
  console.log(objWithNoPrimitive + 5); // Throws TypeError
} catch (error) {
  console.error("Error:", error.message); // Output: Cannot convert object to primitive value
}

// 4. Arrays with Custom Behavior
console.log("\n4. Arrays with Custom Behavior:");

const customArray = [1, 2, 3];
customArray.toString = function () {
  return "Custom Array String";
};
console.log("Custom Array:", customArray + "!"); // Output: "Custom Array String!"

// 5. Symbol.toPrimitive Customization
console.log("\n5. Symbol.toPrimitive Customization:");

const objWithSymbolToPrimitive = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return 42; // Use when number context
    } else if (hint === "string") {
      return "String Context"; // Use when string context
    } else {
      return null; // Default
    }
  },
};

console.log("Number Context:", objWithSymbolToPrimitive * 2); // Output: 84
console.log("String Context:", String(objWithSymbolToPrimitive)); // Output: "String Context"
console.log("Default Context:", objWithSymbolToPrimitive + "!!"); // Output: "null!!"

// 6. Date Objects with Default Behavior
console.log("\n6. Date Objects with Default Behavior:");

const date = new Date();
console.log("Date in Default Context:", date + ""); // Calls toString (e.g., "Wed Dec 04 2024 12:00:00 GMT+0000")

// Summary Note
console.log("\nSummary Note:");
console.log(
  "The ToPrimitive operation tries `valueOf()` first for objects and `toString()` for dates, unless a custom `Symbol.toPrimitive` exists. " +
  "Always ensure overridden methods return primitives to avoid errors."
);
