/*
 * ============================================================
 *  VARIABLE SCOPING — var, let, and const
 * ============================================================
 *
 * DEFINITION:
 *   Scope defines where a variable can be read or written. JS has three
 *   scope levels relevant to variable declarations:
 *   • Global scope  — outside all functions and blocks
 *   • Function scope — inside a function (var, let, const all work here)
 *   • Block scope   — inside {} (only let and const are block-scoped)
 *
 * DECLARATION COMPARISON TABLE:
 *   Property          var           let           const
 *   ──────────────    ──────────    ──────────    ──────────
 *   Scope             Function      Block         Block
 *   Hoisted           YES (undef)   YES (TDZ)     YES (TDZ)
 *   TDZ               NO            YES           YES
 *   Re-declare        YES           NO            NO
 *   Re-assign         YES           YES           NO
 *   Attaches to       YES           NO            NO
 *   globalThis
 *
 * SCOPE CHAIN RESOLUTION:
 *   When a variable is referenced, JS looks for it in:
 *   1. Current scope
 *   2. Enclosing (outer) scope
 *   3. … (keeps going up)
 *   4. Global scope
 *   5. If not found → ReferenceError (strict mode) or auto-global (sloppy)
 *
 * SHADOWING:
 *   A variable in an inner scope with the same name as one in an outer scope
 *   "shadows" the outer one — the outer is temporarily inaccessible by that name.
 *
 * TEMPORAL DEAD ZONE (TDZ):
 *   For `let` and `const`, the variable is registered at the top of its
 *   block but cannot be read until the declaration line executes.
 *   Reading in the TDZ → ReferenceError.
 *
 * IMPORTANT POINTS:
 *   1. var is function-scoped: it ignores if/else and loop blocks entirely.
 *   2. let and const are block-scoped: they honor every pair of {}.
 *   3. Shadowing is valid but can cause hard-to-find bugs — avoid same
 *      names in nested scopes when possible.
 *   4. var allows re-declaration in the same scope (silently); let/const do not.
 *   5. TDZ applies from the start of the block to the declaration line.
 *   6. const requires an initializer and cannot be reassigned, but its
 *      object/array contents are mutable.
 *   7. In the global scope, var creates a property on globalThis; let/const do not.
 * ============================================================
 */

// ─── 1. GLOBAL SCOPE ────────────────────────────────────────────────────────
console.log("=== 1. Global scope ===");

var   globalVar   = "I am a global variable (var)";
let   globalLet   = "I am a global variable (let)";
const globalConst = "I am a global constant";

console.log(globalVar);   // Output: "I am a global variable (var)"
console.log(globalLet);   // Output: "I am a global variable (let)"
console.log(globalConst); // Output: "I am a global constant"

// ─── 2. FUNCTION SCOPE (var) ────────────────────────────────────────────────
console.log("\n=== 2. var is function-scoped — ignores inner blocks ===");

function functionScopeExample() {
    if (true) {
        var   functionScopedVar = "I am function-scoped (var)";
        let   blockScopedLet    = "I am block-scoped (let)";
        const blockScopedConst  = "I am block-scoped (const)";

        console.log(functionScopedVar); // Output: "I am function-scoped (var)"
        console.log(blockScopedLet);    // Output: "I am block-scoped (let)"
        console.log(blockScopedConst);  // Output: "I am block-scoped (const)"
    }

    console.log(functionScopedVar); // Output: "I am function-scoped (var)" — leaked out of if-block!
    // console.log(blockScopedLet);   // ReferenceError — block-scoped, gone after }
    // console.log(blockScopedConst); // ReferenceError — block-scoped, gone after }
}

functionScopeExample();

// ─── 3. BLOCK SCOPE IN LOOPS — var vs let comparison ──────────────────────
console.log("\n=== 3. var vs let in loops ===");

function blockScopeExample() {
    for (let i = 0; i < 3; i++) {
        console.log("let loop: i =", i); // Output: 0, 1, 2 — i is block-scoped per iteration
    }
    // console.log(i); // ReferenceError — i died with the loop

    for (var j = 0; j < 3; j++) {
        console.log("var loop: j =", j); // Output: 0, 1, 2 — j is function-scoped
    }
    console.log("After var loop: j =", j); // Output: 3 — j leaked out of the loop!
}

blockScopeExample();

// ─── 4. TEMPORAL DEAD ZONE ──────────────────────────────────────────────────
console.log("\n=== 4. Temporal Dead Zone (TDZ) for let and const ===");

function temporalDeadZoneExample() {
    // Accessing let or const before declaration throws ReferenceError:
    // console.log(temporaryLet);   // ReferenceError: Cannot access before initialization
    // console.log(temporaryConst); // ReferenceError: Cannot access before initialization

    let   temporaryLet   = "I am declared with let";
    const temporaryConst = "I am declared with const";

    console.log(temporaryLet);   // Output: "I am declared with let"
    console.log(temporaryConst); // Output: "I am declared with const"
}

temporalDeadZoneExample();

// ─── 5. RE-DECLARATION RULES ────────────────────────────────────────────────
console.log("\n=== 5. Re-declaration — var allows it, let/const do not ===");

function redeclarationExample() {
    var x = "first";
    var x = "second"; // No error — var allows re-declaration (dangerous!)
    console.log(x);   // Output: "second"

    let y = "first let";
    // let y = "second let"; // SyntaxError: Identifier 'y' has already been declared

    const z = "first const";
    // const z = "second const"; // SyntaxError: Identifier 'z' has already been declared

    console.log(y); // Output: "first let"
    console.log(z); // Output: "first const"
}

redeclarationExample();

// ─── 6. SCOPE CHAIN — variable lookup order ─────────────────────────────────
console.log("\n=== 6. Scope chain resolution ===");

const outerValue = "outer";

function levelOne() {
    const levelOneValue = "level-one";

    function levelTwo() {
        const levelTwoValue = "level-two";

        function levelThree() {
            // JS walks the chain: levelThree → levelTwo → levelOne → global
            console.log(levelTwoValue);  // Output: "level-two"  — found in levelTwo
            console.log(levelOneValue);  // Output: "level-one"  — found in levelOne
            console.log(outerValue);     // Output: "outer"       — found in global
        }

        levelThree();
    }

    levelTwo();
}

levelOne();

// ─── 7. SHADOWING ───────────────────────────────────────────────────────────
console.log("\n=== 7. Shadowing — inner name hides outer name ===");

const shadowMe = "global value";

function shadowDemo() {
    const shadowMe = "function-level shadow"; // shadows the global `shadowMe`
    console.log(shadowMe); // Output: "function-level shadow" — inner found first in chain

    {
        const shadowMe = "block-level shadow"; // shadows the function-level one
        console.log(shadowMe); // Output: "block-level shadow"
    }

    console.log(shadowMe); // Output: "function-level shadow" — block is gone
}

shadowDemo();
console.log(shadowMe); // Output: "global value" — global was never touched

/*
 * ============================================================
 *  CONCLUSION — Key Variable Scoping Takeaways
 * ============================================================
 *
 *  1. var is function-scoped — it leaks through all block boundaries
 *     (`if`, `for`, `while`, `{}`), which frequently causes unintended bugs.
 *  2. let and const are block-scoped — they respect every `{}` boundary,
 *     enabling tighter, more predictable control over variable lifetime.
 *  3. The scope chain is traversed outward at run time: current scope →
 *     enclosing scopes → global scope.  The first match wins.
 *  4. Shadowing is legal but risky — a same-named inner binding hides the
 *     outer one, making the outer inaccessible by that name in that block.
 *  5. TDZ for let/const turns a silent `undefined` read (var) into an explicit
 *     ReferenceError — making mistakes detectable earlier.
 *  6. var allows silent re-declaration in the same scope; let/const prevent
 *     it with a SyntaxError at parse time.
 *  7. Default to const → use let when re-assignment is needed → avoid var
 *     in modern JavaScript.
 * ============================================================
 */
