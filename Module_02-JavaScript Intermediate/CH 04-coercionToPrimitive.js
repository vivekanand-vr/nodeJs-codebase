/*
 * ============================================================
 *  CH 04 - Coercion → ToPrimitive
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  ToPrimitive is the abstract operation that converts an OBJECT
 *  to a primitive value. It is the first step taken when an object
 *  is used in a context that expects a primitive (e.g. arithmetic,
 *  concatenation, comparison).
 *
 *  ToPrimitive ALGORITHM:
 *  ----------------------
 *  Given an object `obj` and an optional hint ("number", "string", or "default"):
 *
 *  1. If `obj[Symbol.toPrimitive]` exists, call it with the hint.
 *  2. If hint is "string":
 *       a. Try obj.toString() — if it returns a primitive, use it.
 *       b. Try obj.valueOf()  — if it returns a primitive, use it.
 *  3. Otherwise (hint is "number" or "default"):
 *       a. Try obj.valueOf()  — if it returns a primitive, use it.
 *       b. Try obj.toString() — if it returns a primitive, use it.
 *  4. If nothing returns a primitive → throw TypeError.
 *
 *  HINT VALUES:
 *  -----------
 *   "number"  — arithmetic operators (- * / %), unary +, relational
 *   "string"  — template literals, String(), explicit string context
 *   "default" — binary +, == with non-null/undefined operand
 *
 *  KEY POINTS:
 *  -----------
 *  - Plain objects {}  → valueOf() returns the object (non-primitive),
 *    so toString() is used → "[object Object]"
 *  - Arrays []         → valueOf() returns the array (non-primitive),
 *    so toString() is used → elements joined by comma
 *  - Date objects use "string" hint by default (toString first)
 *  - Custom Symbol.toPrimitive is the modern, preferred way to control
 *    conversion behavior cleanly.
 *  - Both valueOf() and toString() must return primitives; returning
 *    an object from both → TypeError.
 * ============================================================
 */

// ─── 1. DEFAULT BEHAVIOR — PLAIN OBJECTS AND ARRAYS ──────────

console.log("1. Objects and Arrays (default behavior):");

// Object: valueOf() returns the object itself (non-primitive),
// so JS falls back to toString() → "[object Object]"
console.log("Object + String: " + {});           // Output: "[object Object]"
console.log({} - 0);                              // Output: NaN   — "[object Object]" → NaN

// Array: valueOf() returns the array itself, toString() joins elements
console.log("Array + String: " + [1, 2, 3]);     // Output: "1,2,3"
console.log([10] - 5);                            // Output: 5     — [10] → "10" → 10, then 10-5
console.log([1, 2] - 5);                          // Output: NaN   — [1,2] → "1,2" → NaN

// ─── 2. OVERRIDING valueOf() ───────────────────────────────────

console.log("\n2. Custom valueOf():");

const objWithValueOf = {
    value: 42,
    valueOf() {
        return this.value; // Returns a primitive → used for ToPrimitive
    },
};

console.log(objWithValueOf + 5);     // Output: 47  — valueOf() returns 42, 42+5=47
console.log(objWithValueOf * 2);     // Output: 84
console.log(objWithValueOf > 40);    // Output: true
console.log(`${objWithValueOf}`);    // Output: "42"  — template literal calls toString first,
                                     // but valueOf is used when toString isn't overridden in
                                     // string hint... actually template literal uses toString if available
                                     // Here: no custom toString → falls to valueOf → "42"

// ─── 3. OVERRIDING toString() ──────────────────────────────────

console.log("\n3. Custom toString():");

const objWithToString = {
    label: "MyValue",
    toString() {
        return this.label; // Returns a string primitive
    },
};

// In string context (hint "string"), toString is tried first → "MyValue"
console.log("Result: " + objWithToString);   // Output: "Result: MyValue"
console.log(`${objWithToString}`);           // Output: "MyValue"

// In numeric context: valueOf tried first → {} (non-primitive), then toString → "MyValue" → NaN
console.log(objWithToString - 0);            // Output: NaN  — "MyValue" is not a number

// ─── 4. valueOf() TAKES PRECEDENCE OVER toString() IN NUMERIC CONTEXT

console.log("\n4. Both valueOf() and toString() overridden:");

const objWithBoth = {
    valueOf()  { return 100; },          // Returns a primitive (number)
    toString() { return "hundred"; },    // Would be used in string hint
};

console.log(objWithBoth + 50);     // Output: 150    — "default" hint: valueOf() first → 100
console.log(`${objWithBoth}`);     // Output: "hundred" — "string" hint: toString() first
console.log(objWithBoth * 2);      // Output: 200    — "number" hint: valueOf() first → 100
console.log(String(objWithBoth));  // Output: "hundred" — explicit string: toString() first

// ─── 5. RETURNING NON-PRIMITIVE FROM BOTH → TypeError ──────────

console.log("\n5. Neither returns a primitive → TypeError:");

const objWithNoPrimitive = {
    valueOf()  { return {}; },  // Non-primitive
    toString() { return {}; },  // Non-primitive
};

try {
    console.log(objWithNoPrimitive + 5);
} catch (err) {
    console.error("Error:", err.message); // Output: Cannot convert object to primitive value
}

// ─── 6. CUSTOM ARRAY toString ──────────────────────────────────

console.log("\n6. Arrays with Custom toString:");

const customArray = [1, 2, 3];
customArray.toString = function () {
    return "CustomArrayString";
};
console.log("Array: " + customArray + "!");  // Output: "Array: CustomArrayString!"
// Reason: + triggers ToPrimitive → valueOf() returns array (non-primitive) → toString() called

// ─── 7. Symbol.toPrimitive — MODERN APPROACH ───────────────────

console.log("\n7. Symbol.toPrimitive:");

const smart = {
    [Symbol.toPrimitive](hint) {
        if (hint === "number")  return 42;
        if (hint === "string")  return "StringContext";
        return null;            // "default" hint
    },
};

console.log(smart * 2);       // Output: 84             — "number" hint
console.log(`${smart}`);      // Output: "StringContext" — "string" hint
console.log(smart + "!!");    // Output: "null!!"        — "default" hint
console.log(smart == null);   // Output: false           — returns null, not the JS null value

// ─── 8. DATE OBJECTS — SPECIAL ToPrimitive BEHAVIOR ──────────

console.log("\n8. Date Objects:");

const now = new Date("2024-01-01");

// Date uses "string" hint for + (overrides the normal "default" hint behavior)
console.log("Date: " + now);   // Output: "Date: Mon Jan 01 2024 ..."  — toString() called
console.log(+now);             // Output: 1704067200000 — "number" hint: valueOf() → timestamp

// ─── 9. Object.prototype.toString — TAG INSPECTION ────────────

console.log("\n9. Object.prototype.toString for type inspection:");

// Object.prototype.toString.call(x) returns "[object Tag]" for any value
console.log(Object.prototype.toString.call([]));          // Output: [object Array]
console.log(Object.prototype.toString.call({}));          // Output: [object Object]
console.log(Object.prototype.toString.call(null));        // Output: [object Null]
console.log(Object.prototype.toString.call(undefined));   // Output: [object Undefined]
console.log(Object.prototype.toString.call(new Date())); // Output: [object Date]
console.log(Object.prototype.toString.call(/abc/));      // Output: [object RegExp]

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. ToPrimitive is the bridge between objects and primitive contexts.
 *     It is triggered by arithmetic, comparison, and concatenation.
 *  2. For "number" / "default" hint: valueOf() is tried first.
 *     For "string" hint: toString() is tried first.
 *  3. If the first method returns a non-primitive, the other is tried.
 *     If both return non-primitives → TypeError.
 *  4. Plain objects {} rely on toString() → "[object Object]" (valueOf
 *     returns the object itself, which is not a primitive).
 *  5. Arrays rely on toString() → elements joined by comma.
 *  6. Use Symbol.toPrimitive for full, clean control over how your
 *     object converts in all three hint contexts.
 *  7. Date objects prefer "string" conversion for + because they
 *     override ToPrimitive to use "string" as the default hint.
 *  8. Object.prototype.toString.call(x) is reliable for type detection
 *     and is more precise than typeof for built-in object types.
 * ============================================================
 */

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
