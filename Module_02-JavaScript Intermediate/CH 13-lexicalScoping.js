/*
 * ============================================================
 *  LEXICAL SCOPING (STATIC SCOPING)
 * ============================================================
 *
 * DEFINITION:
 *   Lexical scoping means a variable's scope is determined by WHERE it is
 *   WRITTEN in the source code, NOT by where/when the function is CALLED.
 *   The engine can resolve scopes at parse time (statically) — hence also
 *   called "static scoping."
 *
 * THE SCOPE CHAIN:
 *   Every function carries a reference to the scope it was defined in
 *   (its "lexical environment").  When a variable is looked up:
 *     1. Check the current function's local scope.
 *     2. If not found → check the scope where the function was DEFINED.
 *     3. … repeat up the chain until global scope.
 *     4. If still not found → ReferenceError (or auto-global in sloppy mode).
 *
 * CLOSURE — LEXICAL SCOPE PRESERVED:
 *   When a function is returned or stored, it keeps a live reference to its
 *   lexical environment — including all variables in outer scopes.
 *   This is a closure.  It is the direct consequence of lexical scoping.
 *
 * LEXICAL `this` IN ARROW FUNCTIONS:
 *   Regular functions create their own `this` context bound at call time.
 *   Arrow functions do NOT have their own `this` — they inherit `this`
 *   from the lexical (enclosing) scope where they were WRITTEN.
 *
 * AUTO-GLOBALS (sloppy mode anti-pattern):
 *   Assigning to an undeclared name in sloppy mode creates a property on
 *   the global object.  This violates scope boundaries and should be avoided.
 *
 * IMPORTANT POINTS:
 *   1. Scope is settled at WRITE time, not call time — you can reason about
 *      it by looking at the source code.
 *   2. Inner functions always see outer variables — but NOT vice versa.
 *   3. Closures remember (not copy) their lexical environment — if an outer
 *      variable changes, the closure sees the updated value.
 *   4. Arrow functions inherit `this` lexically; regular functions bind `this`
 *      dynamically based on the call site.
 *   5. Auto-globals (undeclared assignments) bypass scope — they go straight
 *      to globalThis.  Always declare variables explicitly.
 *   6. `"use strict"` turns auto-global creation into a ReferenceError.
 *   7. The lexical environment chain is created at function DEFINITION,
 *      preserved in the closure, and lives as long as the closure lives.
 * ============================================================
 */

// ─── 1. LEXICAL SCOPING BASICS ──────────────────────────────────────────────
console.log("=== 1. Lexical scoping basics ===");

function outerFunction() {
    const outerVar = "I am in the outer function";

    function innerFunction() {
        // innerFunction's lexical scope includes outerFunction — it can read outerVar
        console.log(outerVar); // Output: "I am in the outer function"
    }

    innerFunction();
}

outerFunction();

// ─── 2. SCOPE CHAIN — deep nesting ─────────────────────────────────────────
console.log("\n=== 2. Scope chain across multiple nesting levels ===");

function nestedFunctions() {
    const level1 = "Level 1";

    function levelTwo() {
        const level2 = "Level 2";

        function levelThree() {
            const level3 = "Level 3";

            // Can access all outer scopes via the chain:
            console.log(level1); // Output: "Level 1"  — from levelOne's scope
            console.log(level2); // Output: "Level 2"  — from levelTwo's scope
            console.log(level3); // Output: "Level 3"  — from own scope
        }

        levelThree();
        // console.log(level3); // ReferenceError — levelTwo cannot see inside levelThree
    }

    levelTwo();
    // console.log(level2); // ReferenceError — levelOne cannot see inside levelTwo
}

nestedFunctions();

// ─── 3. CLOSURES — lexical environment preserved after return ───────────────
console.log("\n=== 3. Closure — lexical scope survives function return ===");

function makeAdder(x) {
    // x lives in makeAdder's lexical scope
    return function(y) {
        return x + y; // inner function closes over x
    };
}

const add5  = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(3));   // Output: 8  — 5 + 3, x=5 is remembered
console.log(add10(3));  // Output: 13 — 10 + 3, x=10 is remembered, independent of add5

// Closures see the LIVE variable, not a snapshot:
function counter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        value:     () => count
    };
}

const c = counter();
c.increment();
c.increment();
c.increment();
c.decrement();
console.log(c.value()); // Output: 2 — all three methods share the SAME live `count`

// ─── 4. CALL SITE DOES NOT MATTER — only definition site ────────────────────
console.log("\n=== 4. Call site irrelevant — only definition site matters ===");

function getVar() {
    return definedHere; // resolved in getVar's WRITE-time scope (global)
}

var definedHere = "global value";

function otherScope() {
    var definedHere = "local value"; // shadows global, but NOT visible to getVar
    console.log(getVar());           // Output: "global value" — getVar was defined in global scope
}

otherScope();

// ─── 5. LEXICAL `this` IN ARROW FUNCTIONS ──────────────────────────────────
console.log("\n=== 5. Arrow functions inherit this lexically ===");

const lexicalThisExample = {
    name: "Lexical Example",

    regularMethod: function() {
        // `this` is bound dynamically — refers to the object that called it
        console.log("regular:", this.name); // Output: "Lexical Example"
    },

    arrowMethod: () => {
        // Arrow has no own `this` — inherits from enclosing scope (global/module)
        console.log("arrow:", typeof this === "undefined" ? "undefined (strict module)" : this.name);
        // Output: "arrow: undefined (strict module)"  — or "" in a browser global
    }
};

lexicalThisExample.regularMethod();
lexicalThisExample.arrowMethod();

// Practical use: callback inside a method
const timer = {
    delay: 100,
    start: function() {
        // Arrow captures `this` from `start`'s scope (the timer object)
        setTimeout(() => {
            console.log("timer.delay:", this.delay); // Output: "timer.delay: 100"
        }, 0);
    }
};

timer.start();

// ─── 6. AUTO-GLOBALS — anti-pattern (sloppy mode) ──────────────────────────
console.log("\n=== 6. Auto-globals bypass scope (avoid!) ===");

function createAutoGlobal() {
    autoGlobalVar = "I am an auto-global variable"; // no declaration keyword!
    console.log(autoGlobalVar); // Output: "I am an auto-global variable"
}

createAutoGlobal();
console.log(autoGlobalVar); // Output: "I am an auto-global variable" — leaked globally!

// ─── 7. STRICT MODE PREVENTS AUTO-GLOBALS ──────────────────────────────────
console.log("\n=== 7. Strict mode prevents auto-global creation ===");

function strictExample() {
    "use strict";
    try {
        strictAutoVar = "will throw"; // ReferenceError in strict mode
    } catch (e) {
        console.log(e.constructor.name + ": " + e.message);
        // Output: "ReferenceError: strictAutoVar is not defined"
    }
}

strictExample();

/*
 * ============================================================
 *  CONCLUSION — Key Lexical Scoping Takeaways
 * ============================================================
 *
 *  1. Scope is determined at WRITE time (parse phase) — not at call time.
 *     You can always reason about variable availability by reading the
 *     source code structure, without knowing the call stack.
 *  2. The scope chain flows strictly OUTWARD — inner functions can read
 *     outer variables, but outer functions cannot access inner ones.
 *  3. Closures are the direct result of lexical scoping: a returned function
 *     carries its lexical environment with it, keeping outer variables alive.
 *  4. Closures close over live variable bindings, not snapshots.  If the
 *     outer variable changes, all closures sharing that variable see the change.
 *  5. Arrow functions capture `this` from their lexical scope (definition
 *     site), making them ideal for callbacks inside methods.
 *  6. The call site of a function NEVER affects which outer variables it can
 *     see — only the definition site matters.
 *  7. Auto-globals (undeclared assignments in sloppy mode) are a scope
 *     bypass and a maintenance hazard — always use `"use strict"` or
 *     ES modules (which are always strict) to prevent them.
 * ============================================================
 */
