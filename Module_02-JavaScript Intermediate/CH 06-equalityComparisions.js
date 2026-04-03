/*
 * ============================================================
 *  CH 06 - Equality Comparisons
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  JavaScript has four equality algorithms (per the spec):
 *
 *  1. Abstract Equality  (==)  — coerces types, then compares
 *  2. Strict Equality    (===) — no coercion; value AND type must match
 *  3. SameValue          (Object.is) — like === but handles NaN and -0
 *  4. SameValueZero      — used by Map, Set, includes() — like Object.is
 *                           but treats +0 and -0 as equal
 *
 *  == COERCION RULES (simplified from the spec):
 *  ----------------------------------------------
 *   x        | y         | Result
 *  ----------|-----------|----------------------------------
 *   null     | undefined | true  (the ONLY case they are ==)
 *   null     | anything  | false (null never coerces)
 *   undefined| anything  | false (undefined never coerces)
 *   number   | string    | ToNumber(string) then compare
 *   boolean  | anything  | ToNumber(boolean) then compare again
 *   string/
 *   number   | object    | ToPrimitive(object) then compare again
 *
 *  KEY POINTS:
 *  -----------
 *  - NaN !== NaN — it's the only value not equal to itself.
 *    Use Number.isNaN() or Object.is(x, NaN) to detect NaN.
 *  - +0 === -0 is true (both == and ===). Use Object.is(+0,-0) → false.
 *  - Objects are compared by REFERENCE — two different object literals
 *    {a:1} and {a:1} are NOT equal even with ==.
 *  - Always prefer === in application code. Use == ONLY when you
 *    intentionally want null/undefined equivalence checking.
 *  - The == algorithm is NOT symmetric in terms of what gets coerced:
 *    `false == ""` → both → 0 → true, but the path is: boolean→0, then 0=="", then ""→0.
 * ============================================================
 */

// ─── 1. PRIMITIVES: == vs === ──────────────────────────────────

console.log("1. Primitive Comparisons:");

// Numbers and strings
console.log(5 == "5");       // Output: true   — "5" is ToNumber'd to 5
console.log(5 === "5");      // Output: false  — different types (number vs string)

// Boolean coercion: boolean → number FIRST
console.log(0 == false);     // Output: true   — false → 0, then 0 == 0
console.log(0 === false);    // Output: false  — different types (number vs boolean)
console.log(1 == true);      // Output: true   — true → 1
console.log(1 === true);     // Output: false

// Empty strings
console.log("" == false);    // Output: true   — false→0, then ""→0, 0==0
console.log("" === false);   // Output: false

// ─── 2. null AND undefined ─────────────────────────────────────

console.log("\n2. null and undefined:");

console.log(null == undefined);    // Output: true   — ONLY pair that == each other
console.log(null === undefined);   // Output: false  — different types
console.log(null == 0);            // Output: false  — null NEVER coerces with ==
console.log(null == false);        // Output: false
console.log(null == "");           // Output: false
console.log(undefined == 0);      // Output: false  — undefined NEVER coerces with ==
console.log(undefined == false);   // Output: false

// Practical use: check for null OR undefined in one shot:
function isNullOrUndefined(val) {
    return val == null; // works for both null and undefined
}
console.log(isNullOrUndefined(null));      // Output: true
console.log(isNullOrUndefined(undefined)); // Output: true
console.log(isNullOrUndefined(0));         // Output: false

// ─── 3. OBJECTS: REFERENCE EQUALITY ───────────────────────────

console.log("\n3. Object Reference Equality:");

const obj1 = { a: 1 };
const obj2 = { a: 1 };   // same content, different reference in memory
const obj3 = obj1;        // same reference

console.log(obj1 == obj2);   // Output: false  — different objects in memory
console.log(obj1 === obj2);  // Output: false
console.log(obj1 === obj3);  // Output: true   — same reference

// Arrays (also objects)
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = arr1;
console.log(arr1 == arr2);   // Output: false
console.log(arr1 === arr3);  // Output: true

// ─── 4. SPECIAL CASES WITH == AND TYPE COERCION ────────────────

console.log("\n4. Special == Cases:");

// Object vs primitive: ToPrimitive(object) applied
console.log("0" == false);    // Output: true  — false→0, then "0"→0
console.log(" " == 0);        // Output: true  — " " (whitespace) → 0
console.log([1, 2] == "1,2"); // Output: true  — [1,2] → "1,2", then "1,2"=="1,2"
console.log([] == "");        // Output: true  — [] → "" → ""==""
console.log([] == 0);         // Output: true  — [] → "" → 0 == 0
console.log([] == false);     // Output: true  — false→0, [] → "" → 0
console.log({} == "[object Object]"); // Output: true — {} → "[object Object]"

// ─── 5. NaN — THE ONLY VALUE NOT EQUAL TO ITSELF ──────────────

console.log("\n5. NaN Quirks:");

console.log(NaN === NaN);               // Output: false  ← NaN ≠ NaN by definition
console.log(NaN == NaN);                // Output: false  ← same with ==
console.log(isNaN(NaN));                // Output: true   ← but coerces first
console.log(Number.isNaN(NaN));         // Output: true   ← strict, no coercion
console.log(Number.isNaN("hello"));     // Output: false  ← "hello" is not NaN, it's a string
console.log(Object.is(NaN, NaN));       // Output: true   ← Object.is handles NaN correctly

// ─── 6. +0 vs -0 ──────────────────────────────────────────────

console.log("\n6. Positive Zero vs Negative Zero:");

console.log(+0 === -0);                // Output: true   — === treats them equal
console.log(+0 == -0);                 // Output: true
console.log(Object.is(+0, -0));        // Output: false  ← only way to distinguish
console.log(Object.is(+0, +0));        // Output: true
console.log(String(-0));               // Output: "0"    — -0 → "0" (another quirk)

// ─── 7. Object.is() — SameValue ALGORITHM ─────────────────────

console.log("\n7. Object.is():");

// Object.is(a, b): like === but correctly handles NaN and -0
console.log(Object.is(1, 1));          // Output: true
console.log(Object.is(1, "1"));        // Output: false  (no coercion)
console.log(Object.is(NaN, NaN));      // Output: true   (NaN handled correctly)
console.log(Object.is(+0, -0));        // Output: false  (-0 distinguished from +0)
console.log(Object.is(null, null));    // Output: true
console.log(Object.is(undefined, undefined)); // Output: true

// ─── 8. PRACTICAL EXAMPLES ─────────────────────────────────────

console.log("\n8. Practical Examples:");

// Input validation — prefer ===
let userInput = "0";
if (userInput === false) {
    console.log("Strictly false");   // NOT reached — string !== boolean
} else {
    console.log("Not strictly false"); // Output: Not strictly false
}

if (userInput == false) {
    console.log("Loosely false");     // Output: Loosely false — "0" → 0 → false → 0==0
}

// Safe null/undefined guard with ==
function render(value) {
    if (value == null) { // catches both null and undefined
        return "nothing to render";
    }
    return String(value);
}
console.log(render(null));        // Output: nothing to render
console.log(render(undefined));   // Output: nothing to render
console.log(render(0));           // Output: "0"  (0 is NOT null/undefined)

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. === (strict equality) is the recommended default — it never coerces
 *     types, making behavior predictable and explicit.
 *  2. == (loose equality) follows a complex set of coercion rules where
 *     both sides may be transformed multiple times before comparison.
 *  3. The ONE legitimate use of == is the null-check: `x == null`
 *     catches both null and undefined in one check.
 *  4. NaN is the only value in JavaScript not equal to itself.
 *     Use Number.isNaN() (no coercion) rather than isNaN() (coerces first).
 *  5. +0 === -0 is true with both == and ===. Use Object.is(+0, -0)
 *     → false to distinguish them when negative zero matters.
 *  6. Objects (including arrays) are compared by REFERENCE.
 *     Two separate objects with identical content are NOT equal.
 *  7. Object.is() is the most precise equality — handles NaN and -0
 *     correctly where both == and === fall short.
 *  8. The tricky [] == false → true is explained by the coercion chain:
 *     false→0, []→""→0, so 0==0 → true. But Boolean([]) → true.
 *     They use different algorithms.
 * ============================================================
 */
