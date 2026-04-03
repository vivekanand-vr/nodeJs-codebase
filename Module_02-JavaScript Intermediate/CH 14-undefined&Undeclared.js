/*
 * ============================================================
 *  UNDEFINED vs UNDECLARED
 * ============================================================
 *
 * DEFINITION:
 *   undefined  — A variable that HAS been declared but not yet assigned a
 *                value.  JS automatically gives it the value `undefined`.
 *                The scope already registered the name in its parsing phase.
 *
 *   undeclared — A variable name that has NEVER been declared with
 *                var/let/const in ANY accessible scope.  Trying to READ it
 *                throws a ReferenceError.  Trying to WRITE it (in sloppy
 *                mode) silently creates an auto-global.
 *
 * KEY DIFFERENCES:
 *   Aspect                     undefined              undeclared
 *   ─────────────────────────  ─────────────────────  ───────────────────
 *   Declared?                  YES                    NO
 *   typeof                     "undefined"            "undefined" ← safe!
 *   Reading value              undefined              ReferenceError
 *   Writing (sloppy mode)      OK (update binding)    creates auto-global
 *   Writing (strict mode)      OK                     ReferenceError
 *
 * safe `typeof` CHECK:
 *   `typeof someVar` never throws — even for undeclared names.
 *   It returns "undefined" in both cases.
 *   This is useful for feature detection:
 *     if (typeof localStorage !== "undefined") { ... }
 *
 * TEMPORAL DEAD ZONE (TDZ) — let/const:
 *   let and const are hoisted but not initialized.  Accessing them before
 *   their declaration line throws a ReferenceError (NOT "undefined").
 *   This is a THIRD state: declared but in the TDZ.
 *
 * THE `void` OPERATOR:
 *   `void 0` (or any expression) always evaluates to `undefined`.
 *   Used to safely produce `undefined` when the global `undefined` might
 *   have been overwritten (only possible in old non-strict environments).
 *
 * IMPORTANT POINTS:
 *   1. undefined is a VALUE; undeclared is a STATE (missing declaration).
 *   2. typeof is the only operator that is safe to use on undeclared names.
 *   3. Assigning to an undeclared name in sloppy mode silently creates a
 *      global property — a classic hidden bug.
 *   4. `"use strict"` or ES modules prevent auto-global creation (ReferenceError).
 *   5. var-declared variables start as `undefined` and stay that way until
 *      the assignment line executes (hoisting).
 *   6. let/const also hoist but land in the TDZ — reading them is a
 *      ReferenceError, NOT `undefined`.
 *   7. `void 0` is a reliable way to get `undefined` regardless of environment.
 * ============================================================
 */

// ─── 1. UNDEFINED — declared but not initialized ────────────────────────────
console.log("=== 1. undefined — declared, not initialized ===");

function exampleUndefined() {
    let x;                    // declared
    console.log(x);           // Output: undefined — JS supplies the default value
    console.log(typeof x);    // Output: "undefined"
    x = 10;
    console.log(x);           // Output: 10 — now initialized
}

exampleUndefined();

// ─── 2. UNDECLARED — auto-global in sloppy mode ─────────────────────────────
console.log("\n=== 2. undeclared — auto-global (sloppy mode) ===");

function exampleUndeclared() {
    // Reading an undeclared var → ReferenceError:
    // console.log(y); // ReferenceError: y is not defined

    y = 20;               // no let/var/const — becomes auto-global in sloppy mode
    console.log(y);       // Output: 20
}

exampleUndeclared();
console.log(y);           // Output: 20 — y leaked to the global scope!

// ─── 3. SAFE typeof CHECK ───────────────────────────────────────────────────
console.log("\n=== 3. typeof is safe for undeclared names ===");

// `typeof` never throws, even for names that don't exist anywhere:
console.log(typeof y);        // Output: "number"   — y exists (auto-global from above)
console.log(typeof nevEver);  // Output: "undefined" — does not throw ReferenceError!

// Practical use: feature detection
if (typeof localStorage !== "undefined") {
    console.log("localStorage is available");
} else {
    console.log("localStorage not available (Node.js env)"); // Output in Node.js
}

// ─── 4. STRICT MODE PREVENTS AUTO-GLOBALS ──────────────────────────────────
console.log("\n=== 4. Strict mode — undeclared write throws ReferenceError ===");

function strictModeExample() {
    "use strict";
    try {
        z = 30; // ReferenceError in strict mode — no auto-global created
    } catch (e) {
        console.log(e.constructor.name + ": " + e.message);
        // Output: "ReferenceError: z is not defined"
    }
}

strictModeExample();

// ─── 5. HOISTING — var starts as undefined ─────────────────────────────────
console.log("\n=== 5. var hoisting — seen as undefined before assignment ===");

var globalTeacher = "Alice";

function example1() {
    var globalTeacher = "Bob";      // function-local

    teachingAssistant = "Charlie";  // auto-global (sloppy!)

    console.log(globalTeacher);     // Output: "Bob"
    console.log(teachingAssistant); // Output: "Charlie"
}

function example2() {
    console.log(subject);           // Output: undefined — `var subject` is hoisted
    var subject = "JavaScript";
    console.log(subject);           // Output: "JavaScript"
    // console.log(course);         // ReferenceError — `course` is never declared
}

console.log(globalTeacher); // Output: "Alice" (global, unchanged)
example1();
example2();
console.log(teachingAssistant); // Output: "Charlie" — auto-global from example1

// ─── 6. TDZ — let/const hoisted but inaccessible ──────────────────────────
console.log("\n=== 6. TDZ — let/const throw in the dead zone ===");

function tdzExample() {
    // console.log(tdzLet); // ReferenceError: Cannot access 'tdzLet' before initialization
    let tdzLet = "safe now";
    console.log(tdzLet); // Output: "safe now"
}

tdzExample();

// ─── 7. void OPERATOR — reliable undefined ─────────────────────────────────
console.log("\n=== 7. void operator produces undefined ===");

console.log(void 0);          // Output: undefined
console.log(void "anything"); // Output: undefined
console.log(void 0 === undefined); // Output: true

// Useful in arrow function that must return undefined (not the expression value):
const noop = () => void someExpressionWeDoNotWantReturned(); // safely returns undefined
function someExpressionWeDoNotWantReturned() { return 42; }
console.log(noop()); // Output: undefined

// ─── 8. HOISTING EDGE CASE — function-scoped var and assignment order ──────
console.log("\n=== 8. var hoisting edge case — TDZ-like confusion ===");

function fun() {
    // Due to hoisting: `var teacher` is declared at top of fun() → initially undefined
    // But then `teacher = "Vivekanand"` assigns BEFORE `var teacher = "JS"` reassigns
    teacher = "Vivekanand";
    console.log(teacher); // Output: "Vivekanand" — local var set early
    var teacher = "JS";   // re-assigns the same local var
    console.log(teacher); // Output: "JS"
}

fun();

// ─── 9. VARIABLE vs FUNCTION HOISTING CONFLICT ─────────────────────────────
console.log("\n=== 9. var name vs function name — order matters ===");

var gunVar = 10;

function gun() {
    console.log("Hello World");
}

gun();    // Output: "Hello World" — function works fine
try {
    gunVar(); // TypeError: gunVar is not a function — it's the number 10
} catch (e) {
    console.log(e.constructor.name + ": " + e.message);
    // Output: "TypeError: gunVar is not a function"
}

/*
 * ============================================================
 *  CONCLUSION — Key undefined vs undeclared Takeaways
 * ============================================================
 *
 *  1. undefined is a value JS assigns to declared-but-uninitialized
 *     bindings; undeclared is an absence of any binding in any scope.
 *  2. Reading an undeclared variable always throws a ReferenceError —
 *     except when used with `typeof`, which safely returns "undefined".
 *  3. Writing to an undeclared variable in sloppy mode silently creates
 *     an auto-global property on globalThis — a dangerous anti-pattern.
 *  4. Always use `"use strict"` or ES modules to turn auto-global writes
 *     into catchable ReferenceErrors at the point of the mistake.
 *  5. `var` hoisting makes variables exist (as undefined) from the top of
 *     their function before the assignment line runs.
 *  6. `let`/`const` hoist too, but land in the TDZ — accessing them is
 *     a ReferenceError, not a silent undefined.
 *  7. Use `typeof varName !== "undefined"` for safe feature detection;
 *     use `void 0` as a reliable, tamper-proof undefined value.
 * ============================================================
 */