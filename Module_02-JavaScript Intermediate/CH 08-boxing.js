/*
 * ============================================================
 *  BOXING (AUTO-BOXING / OBJECT WRAPPERS)
 * ============================================================
 *
 * DEFINITION:
 *   Boxing is the temporary conversion of a primitive value into its
 *   corresponding object wrapper so that methods/properties can be accessed.
 *   JS automatically boxes (and immediately discards) the wrapper — you never
 *   hold it unless you explicitly create one with `new`.
 *
 * PRIMITIVE → OBJECT WRAPPER MAP:
 *   Primitive    Wrapper        Example method
 *   ─────────    ──────────     ──────────────
 *   number       Number         (42).toFixed(2)
 *   string       String         "hi".toUpperCase()
 *   boolean      Boolean        true.toString()
 *   bigint       BigInt         42n.toString()
 *   symbol       Symbol         Symbol("x").description  ← read-only prop, no boxing constructor
 *   null/undefined  (none)      TypeError if accessed
 *
 * HOW AUTOBOXING WORKS (the 4-step engine dance):
 *   1. You write: "hello".toUpperCase()
 *   2. Engine creates a temporary String wrapper object
 *   3. Calls `.toUpperCase()` on the wrapper
 *   4. Discards the wrapper immediately — primitive is unchanged
 *   The primitive itself never becomes an object.
 *
 * MANUAL BOXING — `new Number(42)`, `new String("hi")`, `new Boolean(true)`:
 *   - Creates a real, persistent wrapper OBJECT (typeof === "object")
 *   - NEVER use manual boxing in real code — it causes confusing bugs:
 *       • new Boolean(false) is TRUTHY (it's an object)
 *       • new Number(42) !== 42   (object vs primitive)
 *   - Use `Object(42)` (no `new`) if you ever truly need a boxed value — it
 *     returns the same wrapper type but is officially safer.
 *
 * UNBOXING (extracting the primitive):
 *   Call `.valueOf()` on the wrapper object to get the underlying primitive.
 *
 * IMPORTANT POINTS:
 *   1. Autoboxing is done by the JS engine — the primitive is never mutated.
 *   2. Properties set on a primitive via autoboxed wrapper are silently discarded.
 *   3. `new Boolean(false)` evaluates as TRUTHY — a classic gotcha.
 *   4. Symbols cannot be created with `new Symbol()` — it throws a TypeError.
 *      They do support property access (e.g., `.description`) via autoboxing.
 *   5. null and undefined have no wrapper and throw TypeError on property access.
 *   6. Manual boxing changes typeof: `typeof new Number(1)` → "object".
 *   7. `Object(value)` is the spec-safe way to do explicit boxing.
 * ============================================================
 */

// ─── 1. AUTOBOXING — Primitives acting like objects ───────────────────────
console.log("=== 1. Autoboxing ===");

const num = 42;
console.log(num.toFixed(2));        // Output: "42.00"  — number temporarily boxed to Number
console.log(num.constructor.name);  // Output: "Number" — wrapper constructor is visible
console.log(typeof num);            // Output: "number" — underlying primitive is unchanged

const str = "Hello, World!";
console.log(str.toUpperCase());     // Output: "HELLO, WORLD!" — string temporarily boxed to String
console.log(str.length);            // Output: 13           — .length accessed via autoboxing
console.log(str.constructor.name);  // Output: "String"

const bool = true;
console.log(bool.toString());       // Output: "true" — boolean temporarily boxed to Boolean
console.log(bool.constructor.name); // Output: "Boolean"

// ─── 2. PROPERTY ASSIGNMENT ON PRIMITIVES — SILENTLY DISCARDED ─────────────
console.log("\n=== 2. Property assignment on primitives (silently fails) ===");

const prim = "hello";
prim.custom = 42;          // JS boxes, sets .custom on the *temporary* wrapper, then discards it
console.log(prim.custom);  // Output: undefined — the wrapper was discarded, primitive unchanged

// ─── 3. MANUAL BOXING — new Number / String / Boolean ──────────────────────
console.log("\n=== 3. Manual Boxing (avoid in real code) ===");

const boxedNumber  = new Number(42);
const boxedString  = new String("Boxed String");
const boxedBoolean = new Boolean(true);

console.log(boxedNumber);           // Output: [Number: 42]
console.log(typeof boxedNumber);    // Output: "object" — no longer a primitive!

console.log(boxedString);           // Output: [String: 'Boxed String']
console.log(typeof boxedString);    // Output: "object"

console.log(boxedBoolean);          // Output: [Boolean: true]
console.log(typeof boxedBoolean);   // Output: "object"

// ─── 4. THE BOOLEAN GOTCHA — new Boolean(false) is TRUTHY ──────────────────
console.log("\n=== 4. new Boolean(false) is truthy! ===");

const falseWrapper = new Boolean(false);
if (falseWrapper) {
    console.log("This runs!"); // Output: "This runs!" — wrapper object is truthy regardless of value
}
console.log(falseWrapper.valueOf()); // Output: false — underlying primitive is false

// ─── 5. UNBOXING — extracting the primitive ────────────────────────────────
console.log("\n=== 5. Unboxing with .valueOf() ===");

console.log(boxedNumber.valueOf());   // Output: 42          — extracts the primitive number
console.log(boxedString.valueOf());   // Output: "Boxed String"
console.log(boxedBoolean.valueOf());  // Output: true

// ─── 6. STRICT EQUALITY PITFALL ────────────────────────────────────────────
console.log("\n=== 6. Wrapper objects !== primitives (strict equality) ===");

console.log(boxedNumber  === 42);             // Output: false — object vs primitive
console.log(boxedString  === "Boxed String"); // Output: false — object vs primitive
console.log(boxedBoolean === true);           // Output: false — object vs primitive
// Loose equality performs unboxing automatically:
console.log(boxedNumber  ==  42);             // Output: true — ToPrimitive called via ==

// ─── 7. Object() — spec-safe explicit boxing ───────────────────────────────
console.log("\n=== 7. Object() as safe explicit boxing ===");

const safeBoxed = Object(42);
console.log(typeof safeBoxed);        // Output: "object"
console.log(safeBoxed.valueOf());     // Output: 42
console.log(Object(null));            // Output: {}   — null/undefined produce plain objects
console.log(Object(undefined));       // Output: {}

// ─── 8. BIGINT BOXING ──────────────────────────────────────────────────────
console.log("\n=== 8. BigInt boxing ===");

const big = 42n;
console.log(big.toString());          // Output: "42"    — BigInt autoboxed for .toString()
console.log(typeof big);              // Output: "bigint"
// new BigInt() throws TypeError — BigInt cannot be called as a constructor

// ─── 9. SYMBOL — property access but NO constructor ────────────────────────
console.log("\n=== 9. Symbol autoboxing (no 'new Symbol()') ===");

const sym = Symbol("myTag");
console.log(sym.description);  // Output: "myTag" — accessed via autoboxing
console.log(typeof sym);        // Output: "symbol"

try {
    const boxedSym = new Symbol("fails"); // TypeError: Symbol is not a constructor
} catch (e) {
    console.log(e.message);             // Output: "Symbol is not a constructor"
}

/*
 * ============================================================
 *  CONCLUSION — Key Boxing Takeaways
 * ============================================================
 *
 *  1. Autoboxing is automatic and temporary; primitives are never mutated.
 *  2. Properties set on a primitive via autoboxing are silently lost — the
 *     wrapper is discarded immediately after property access.
 *  3. NEVER use `new Boolean(false)` — the wrapper object is always truthy,
 *     which directly contradicts the false value it wraps.
 *  4. Manual boxing (`new Number/String/Boolean`) changes typeof to "object",
 *     breaking strict equality checks and causing subtle bugs.
 *  5. Use `.valueOf()` to extract the primitive from any wrapper object.
 *  6. `Object(value)` is the safe spec-compliant way to explicitly box when
 *     needed (e.g., polyfills); prefer it over `new Number(value)`.
 *  7. Symbol and BigInt support property access via autoboxing but Symbol
 *     cannot be called with `new` (TypeError).
 *  8. null and undefined have no wrappers — accessing a property on them
 *     throws a TypeError; they are never autoboxed.
 * ============================================================
 */
