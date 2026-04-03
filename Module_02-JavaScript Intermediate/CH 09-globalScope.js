/*
 * ============================================================
 *  GLOBAL SCOPE
 * ============================================================
 *
 * DEFINITION:
 *   The global scope is the outermost scope in a JavaScript program.
 *   Variables and functions declared at the top level (outside any function,
 *   class, or block) live in the global scope and are accessible everywhere.
 *
 * THE GLOBAL OBJECT — environment-specific names:
 *   Environment      Global Object       Universal accessor (ES2020)
 *   ─────────────    ─────────────────   ──────────────────────────
 *   Browser          window              globalThis
 *   Node.js          global              globalThis
 *   Web Worker       self                globalThis
 *   ➜ Always prefer `globalThis` for cross-environment code.
 *
 * HOW DECLARATIONS ATTACH TO THE GLOBAL OBJECT:
 *   Declaration       Attached to globalThis?   In global scope?
 *   ───────────       ──────────────────────     ────────────────
 *   var x = 1;        YES  (globalThis.x === 1)  YES
 *   let x = 1;        NO                          YES
 *   const x = 1;      NO                          YES
 *   function f() {}   YES  (globalThis.f)         YES
 *
 * IMPLICIT (AUTO) GLOBALS:
 *   Assigning to an undeclared name outside strict mode creates a property on
 *   the global object. This is a dangerous anti-pattern — avoid it always.
 *
 * STRICT MODE:
 *   Adding `"use strict"` at the top of a script or function prevents
 *   implicit global creation (throws ReferenceError instead).
 *
 * IMPORTANT POINTS:
 *   1. `var` at the top level attaches to `globalThis`; `let`/`const` do NOT.
 *   2. Implicit globals pollute ALL code in the runtime — a leak in one module
 *      can corrupt another module or library.
 *   3. In Node.js modules, the top-level `this` is `{}` (module.exports),
 *      not `globalThis` — a common source of confusion.
 *   4. Always use `"use strict"` or ES modules (implicit strict) to prevent
 *      accidental global creation.
 *   5. `globalThis` is the only way to reliably access the global object
 *      in all environments.
 * ============================================================
 */

// ─── 1. TOP-LEVEL DECLARATIONS AND THE GLOBAL OBJECT ───────────────────────
console.log("=== 1. var vs let/const attachment to globalThis ===");

var   varGlobal   = "I am var global";
let   letGlobal   = "I am let global";
const constGlobal = "I am const global";

// In Node.js, globalThis.varGlobal only works inside the REPL or non-module scripts.
// In a module file (Node default), var does NOT attach to globalThis.
console.log(typeof varGlobal);   // Output: "string" — accessible everywhere
console.log(typeof letGlobal);   // Output: "string" — accessible everywhere
console.log(typeof constGlobal); // Output: "string" — accessible everywhere
// console.log(globalThis.letGlobal);   // Output: undefined — let does not attach
// console.log(globalThis.constGlobal); // Output: undefined — const does not attach

// ─── 2. ACCESSING VARIABLES INSIDE FUNCTIONS ───────────────────────────────
console.log("\n=== 2. Accessing global variables from inside a function ===");

function displayGlobalVar() {
    console.log(varGlobal); // Output: "I am var global" — scope chain walks up to global
}

function updateGlobalVar() {
    varGlobal = "Global variable updated!"; // Writes to the existing global binding
}

displayGlobalVar(); // Output: "I am var global"
updateGlobalVar();
displayGlobalVar(); // Output: "Global variable updated!" — global was mutated

// ─── 3. IMPLICIT (AUTO) GLOBALS — anti-pattern ─────────────────────────────
console.log("\n=== 3. Implicit globals (dangerous anti-pattern) ===");

function createImplicitGlobal() {
    implicitGlobal = "I am an implicit global variable"; // No let/var/const!
    console.log(implicitGlobal); // Output: "I am an implicit global variable"
}

createImplicitGlobal();
console.log(implicitGlobal); // Output: "I am an implicit global variable"
// The variable survived outside the function — it became a property of globalThis

// ─── 4. STRICT MODE PREVENTS IMPLICIT GLOBALS ──────────────────────────────
console.log("\n=== 4. Strict mode prevents implicit global creation ===");

function strictExample() {
    "use strict";
    try {
        strictVar = "This will throw"; // ReferenceError in strict mode
    } catch (e) {
        console.log(e.constructor.name + ": " + e.message);
        // Output: ReferenceError: strictVar is not defined
    }
}

strictExample();

// ─── 5. globalThis — universal cross-environment access ────────────────────
console.log("\n=== 5. globalThis — works in Node.js, browsers, workers ===");

globalThis.myGlobalProp = "set via globalThis";
console.log(myGlobalProp); // Output: "set via globalThis" — accessible as a plain name
console.log(globalThis.myGlobalProp); // Output: "set via globalThis"

// ─── 6. function vs var on globalThis — in non-module scripts ──────────────
console.log("\n=== 6. Function declaration attaches to globalThis (non-module) ===");

function topLevelFn() { return "I am top-level"; }
// In a non-module script: globalThis.topLevelFn === topLevelFn → true
// In Node.js module: globals are module-scoped, so this won't attach
console.log(typeof topLevelFn); // Output: "function"

// ─── 7. Top-level `this` in Node.js modules ─────────────────────────────────
console.log("\n=== 7. Top-level 'this' in Node.js ===");

// In a Node.js CommonJS module, `this` at the top level is `module.exports` ({})
// NOT globalThis. This differs from browsers where top-level `this === window`.
console.log(this === globalThis); // Output: false (in Node.js CommonJS module)
console.log(this);                // Output: {} — module.exports object

/*
 * ============================================================
 *  CONCLUSION — Key Global Scope Takeaways
 * ============================================================
 *
 *  1. The global scope is the top-level scope accessible from all code in
 *     the runtime — mutations to it affect every other module and library.
 *  2. `var` and `function` declarations at the top level attach as properties
 *     on `globalThis`; `let` and `const` do NOT.
 *  3. Always declare variables with `let`, `const`, or `var` — omitting the
 *     keyword creates a silent implicit global that leaks across all code.
 *  4. Use `"use strict"` or ES modules to prevent accidental implicit global
 *     creation (they throw a ReferenceError instead of silently polluting).
 *  5. Use `globalThis` — not `window`, `global`, or `self` — to access the
 *     global object portably across all JS environments.
 *  6. In Node.js CommonJS modules, top-level `this` is `module.exports` ({}),
 *     NOT `globalThis` — a frequent source of confusion.
 *  7. Minimize globals: prefer module exports/imports, closures, and
 *     dependency injection over shared global state.
 * ============================================================
 */
