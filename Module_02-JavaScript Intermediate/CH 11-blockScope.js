/*
 * ============================================================
 *  BLOCK SCOPE
 * ============================================================
 *
 * DEFINITION:
 *   A block is any code enclosed in curly braces `{}` — if/else bodies,
 *   loop bodies, standalone blocks, etc.  Variables declared with `let`
 *   or `const` are block-scoped: they only exist inside the `{}` where
 *   they are declared.  `var` IGNORES block boundaries (it is function-
 *   or globally-scoped).
 *
 * KEY DIFFERENCES:
 *   Declaration   Scope       Hoisted?   TDZ?   Re-declare?   Re-assign?
 *   ──────────    ──────────  ────────   ─────  ───────────   ──────────
 *   var           function    YES(undef) NO     YES           YES
 *   let           block       YES(TDZ)   YES    NO            YES
 *   const         block       YES(TDZ)   YES    NO            NO ¹
 *   ¹ const object/array contents can be mutated; the binding cannot.
 *
 * TEMPORAL DEAD ZONE (TDZ):
 *   `let` and `const` are hoisted to the top of their block, but accessing
 *   them before the declaration line throws a ReferenceError.  The interval
 *   from the start of the block to the declaration line is the TDZ.
 *
 * THE CLASSIC VAR-IN-LOOP CLOSURE BUG:
 *   Using `var` in a for-loop shares ONE variable across all iterations.
 *   Callbacks that capture `i` see only the FINAL value of `i`.
 *   Using `let` creates a NEW binding per iteration — each callback
 *   captures its own independent copy.
 *
 * IMPORTANT POINTS:
 *   1. `let` and `const` are block-scoped — they die when their `{}` closes.
 *   2. `var` inside a block leaks into the enclosing function (or global) scope.
 *   3. TDZ makes "hoist & safe" impossible for let/const: accessing before
 *      declaration is always a ReferenceError, never a silent `undefined`.
 *   4. The for-loop `let` creates a fresh binding on each iteration.
 *   5. `const` must be initialized at declaration; it cannot be re-assigned.
 *   6. A standalone `{}` block can be used deliberately to limit scope.
 *   7. Block scope enables safer, more predictable variable management
 *      compared to function-scope-only (`var`) programming.
 * ============================================================
 */

// ─── 1. LET AND CONST ARE CONFINED TO THEIR BLOCK ──────────────────────────
console.log("=== 1. let/const are block-scoped ===");

function showBlockScope() {
    if (true) {
        let   blockLet   = "I am scoped to this if-block";
        const blockConst = "I am also scoped to this if-block";
        console.log(blockLet);   // Output: "I am scoped to this if-block"
        console.log(blockConst); // Output: "I am also scoped to this if-block"
    }

    // Both are gone here:
    // console.log(blockLet);   // ReferenceError: blockLet is not defined
    // console.log(blockConst); // ReferenceError: blockConst is not defined
}

showBlockScope();

// ─── 2. VAR LEAKS OUT OF BLOCKS ────────────────────────────────────────────
console.log("\n=== 2. var leaks out of blocks ===");

function varVsLet() {
    if (true) {
        var   varVariable = "I am NOT block-scoped (function-scoped)";
        let   letVariable = "I am block-scoped";
    }

    console.log(varVariable); // Output: "I am NOT block-scoped (function-scoped)"
    // console.log(letVariable); // ReferenceError — let stays in the block
}

varVsLet();

// ─── 3. BLOCK SCOPE IN LOOPS ────────────────────────────────────────────────
console.log("\n=== 3. let in for-loops ===");

for (let i = 0; i < 3; i++) {
    console.log("Inside loop: i =", i); // Output: 0, 1, 2
}
// console.log(i); // ReferenceError — i is dead after the loop

// ─── 4. THE CLASSIC VAR-IN-LOOP CLOSURE BUG ────────────────────────────────
console.log("\n=== 4. var-in-loop closure bug ===");

const varCallbacks = [];
for (var j = 0; j < 3; j++) {
    varCallbacks.push(function() { return j; }); // all capture the SAME `j`
}
// By the time callbacks run, j === 3 (loop ended)
console.log(varCallbacks[0]()); // Output: 3  — bug: expected 0
console.log(varCallbacks[1]()); // Output: 3  — bug: expected 1
console.log(varCallbacks[2]()); // Output: 3  — bug: expected 2

// ─── 5. LET-IN-LOOP FIXES THE CLOSURE BUG ──────────────────────────────────
console.log("\n=== 5. let-in-loop — each iteration has its own binding ===");

const letCallbacks = [];
for (let k = 0; k < 3; k++) {
    letCallbacks.push(function() { return k; }); // each captures its OWN `k`
}
console.log(letCallbacks[0]()); // Output: 0  — correct
console.log(letCallbacks[1]()); // Output: 1  — correct
console.log(letCallbacks[2]()); // Output: 2  — correct

// ─── 6. TEMPORAL DEAD ZONE (TDZ) ───────────────────────────────────────────
console.log("\n=== 6. Temporal Dead Zone ===");

function tdzDemo() {
    // console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
    let tdzVar = "I am safe now";
    console.log(tdzVar); // Output: "I am safe now"
}
tdzDemo();

// TDZ even in same scope — accessing before textual declaration:
{
    // typeof in TDZ also throws — unlike undeclared where typeof returns "undefined"
    try {
        console.log(typeof earlyAccess); // ReferenceError (not "undefined"!)
    } catch(e) {
        console.log(e.constructor.name + ": " + e.message);
        // Output: ReferenceError: Cannot access 'earlyAccess' before initialization
    }
    let earlyAccess = "defined";
}

// ─── 7. CONST — single assignment, mutable content ─────────────────────────
console.log("\n=== 7. const — re-assignment blocked, mutation allowed ===");

const arr = [1, 2, 3];
arr.push(4);           // OK — mutating the array content
console.log(arr);      // Output: [1, 2, 3, 4]

// arr = [5, 6];       // TypeError: Assignment to constant variable — re-binding blocked

const obj = { x: 1 };
obj.y = 2;             // OK — mutating the object
console.log(obj);      // Output: { x: 1, y: 2 }

// ─── 8. STANDALONE BLOCKS FOR DELIBERATE SCOPE LIMITING ────────────────────
console.log("\n=== 8. Standalone blocks ===");

{
    let tempResult = Math.random() * 100;
    console.log("Temp computation:", tempResult.toFixed(2));
    // tempResult only exists here — no leaking into surrounding scope
}
// console.log(tempResult); // ReferenceError

/*
 * ============================================================
 *  CONCLUSION — Key Block Scope Takeaways
 * ============================================================
 *
 *  1. `let` and `const` are block-scoped — they are created and destroyed
 *     with the enclosing `{}`.  This is the expected behavior in most modern
 *     languages and prevents many common bugs.
 *  2. `var` is NOT block-scoped — it leaks to the enclosing function (or
 *     global) scope regardless of how many `{}` it appears inside.
 *  3. TDZ means accessing a `let`/`const` variable before its declaration
 *     line is always a ReferenceError — unlike `var` which silently returns
 *     `undefined`.  This makes bugs detectable at the right point.
 *  4. The var-in-loop closure bug is one of the most infamous JS gotchas.
 *     Always use `let` in for-loops when the counter is captured by callbacks.
 *  5. `const` prevents re-binding the variable name, but object/array
 *     contents can still be mutated — use `Object.freeze()` for deep immutability.
 *  6. Standalone blocks `{}` can be used deliberately to limit scope to the
 *     smallest useful region, improving readability and reducing accidents.
 *  7. Prefer `const` by default, use `let` when re-assignment is needed,
 *     and avoid `var` in modern JavaScript.
 * ============================================================
 */
