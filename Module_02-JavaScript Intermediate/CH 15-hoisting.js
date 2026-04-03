/*
 * ============================================================
 *  HOISTING
 * ============================================================
 *
 * DEFINITION:
 *   Hoisting is the result of JavaScript's two-phase execution model:
 *   1. PARSE / COMPILATION PHASE — the engine scans the entire scope,
 *      registers all `var`, `let`, `const`, `function`, and `class`
 *      declarations, and lays out the memory for them.
 *   2. EXECUTION PHASE — code runs top-to-bottom; variables get assigned
 *      their values when the assignment statement is reached.
 *
 *   The colloquial phrase "declarations are moved to the top" is a helpful
 *   mental model, but physically no code moves.  The engine simply KNOWS
 *   about the name before it sees the assignment.
 *
 * HOISTING SUMMARY TABLE:
 *   Declaration           Hoisted?   Initial value in hoist   TDZ?
 *   ─────────────────────  ───────    ─────────────────────    ────
 *   var x;                 YES        undefined                NO
 *   let x;                 YES        <TDZ — unreadable>       YES
 *   const x = ...;         YES        <TDZ — unreadable>       YES
 *   function foo() {}      YES        full function body        NO
 *   var foo = function()   YES(var)   undefined (not fn)        NO
 *   class Foo {}           YES        <TDZ — unreadable>       YES
 *
 * KEY BEHAVIORS:
 *   • var → declaration hoisted, value is `undefined` until assignment runs.
 *   • let/const → declaration hoisted into TDZ; reading before declaration
 *     line throws ReferenceError (NOT undefined).
 *   • function declaration → FULLY hoisted — both name AND body.
 *     You can call it BEFORE its textual position in the code.
 *   • function expression (var fn = function(){}) → only `var fn` hoists
 *     (as undefined); calling before assignment throws TypeError.
 *   • class declaration → hoisted into TDZ, just like `let`.
 *
 * IMPORTANT POINTS:
 *   1. var hoisting produces `undefined` — a silent, often confusing value.
 *   2. let/const TDZ converts the silent `undefined` into a detectable error.
 *   3. Function declarations are fully hoisted — enabling forward calls.
 *   4. Function EXPRESSIONS are NOT fully hoisted — name is undefined until
 *      the assignment line; calling them early throws TypeError.
 *   5. Class declarations are in TDZ (like let) — using before declaration
 *      throws ReferenceError.
 *   6. Within the same scope, function declarations and var declarations
 *      are both hoisted, with function declarations winning over var.
 *   7. Hoisting happens per-scope — each function/block creates its own
 *      hoisting context.
 * ============================================================
 */

// ─── 1. VAR HOISTING — initialized to undefined ─────────────────────────────
console.log("=== 1. var hoisting — undefined before assignment ===");

function varHoisting() {
    console.log(hoistedVar); // Output: undefined — name is known, value is not yet set
    var hoistedVar = "I am hoisted!";
    console.log(hoistedVar); // Output: "I am hoisted!"
}

// Engine rewrites the above as:
// function varHoisting() {
//   var hoistedVar;            // ← hoisted to top of function scope
//   console.log(hoistedVar);   // undefined
//   hoistedVar = "I am hoisted!";
//   console.log(hoistedVar);   // "I am hoisted!"
// }

varHoisting();

// ─── 2. LET AND CONST — hoisted into TDZ ───────────────────────────────────
console.log("\n=== 2. let/const — hoisted but in Temporal Dead Zone ===");

function letConstHoisting() {
    // console.log(hoistedLet);   // ReferenceError: Cannot access before initialization
    // console.log(hoistedConst); // ReferenceError: Cannot access before initialization

    let   hoistedLet   = "I exist after my declaration";
    const hoistedConst = "Me too";

    console.log(hoistedLet);   // Output: "I exist after my declaration"
    console.log(hoistedConst); // Output: "Me too"
}

letConstHoisting();

// ─── 3. FUNCTION DECLARATION — FULLY HOISTED ────────────────────────────────
console.log("\n=== 3. Function declarations — fully hoisted (name + body) ===");

// Called BEFORE the declaration — works because function declarations are fully hoisted:
console.log(hoistedFunction()); // Output: "I am a hoisted function declaration!"

function hoistedFunction() {
    return "I am a hoisted function declaration!";
}

// Still works after declaration too:
console.log(hoistedFunction()); // Output: "I am a hoisted function declaration!"

// ─── 4. FUNCTION EXPRESSION — only the var name hoists ─────────────────────
console.log("\n=== 4. Function expressions — NOT fully hoisted ===");

console.log(typeof hoistedFuncExpression); // Output: "undefined" — var hoisted, fn not yet
// hoistedFuncExpression(); // TypeError: hoistedFuncExpression is not a function

var hoistedFuncExpression = function() {
    return "I am NOT hoisted like a function declaration!";
};

console.log(hoistedFuncExpression()); // Output: "I am NOT hoisted like a function declaration!"

// Arrow function expression — same behavior
// console.log(arrowExpr()); // TypeError
var arrowExpr = () => "arrow function expression";
console.log(arrowExpr()); // Output: "arrow function expression"

// ─── 5. CLASS DECLARATION — TDZ (like let) ─────────────────────────────────
console.log("\n=== 5. Class declarations — hoisted into TDZ ===");

try {
    const earlyInstance = new HoistedClass(); // ReferenceError — class is in TDZ
} catch (e) {
    console.log(e.constructor.name + ": " + e.message);
    // Output: "ReferenceError: Cannot access 'HoistedClass' before initialization"
}

class HoistedClass {
    constructor(name) { this.name = name; }
    greet() { return `Hello from ${this.name}`; }
}

const instance = new HoistedClass("World");
console.log(instance.greet()); // Output: "Hello from World"

// ─── 6. FUNCTION DECLARATION WINS OVER VAR IN SAME SCOPE ────────────────────
console.log("\n=== 6. Function declaration wins over var in hoisting order ===");

function hoistOrder() {
    // Both `var foo` and `function foo` are hoisted.
    // Function declaration takes precedence over var declaration.
    console.log(typeof foo); // Output: "function" — not "undefined"

    var foo = "I am var";
    console.log(foo);        // Output: "I am var" — assignment overwrites the fn

    function foo() { return "I am a function"; }
    console.log(foo);        // Output: "I am var" — assignment still in effect
}

hoistOrder();

// ─── 7. ORDER MATTERS — TDZ in the same block ──────────────────────────────
console.log("\n=== 7. Hoisting is per-scope — each function has its own context ===");

function orderMatters() {
    console.log(declaredLater); // Output: undefined — var hoisted with no value
    var declaredLater = "Now I have a value";
    console.log(declaredLater); // Output: "Now I have a value"

    // let in TDZ:
    try {
        console.log(letDeclaredLater); // ReferenceError
    } catch (e) {
        console.log(e.constructor.name + ": " + e.message);
        // Output: "ReferenceError: Cannot access 'letDeclaredLater' before initialization"
    }
    let letDeclaredLater = "I was in TDZ";
    console.log(letDeclaredLater); // Output: "I was in TDZ"
}

orderMatters();

// ─── 8. PRACTICAL — why hoisting matters for mutual recursion ───────────────
console.log("\n=== 8. Mutual recursion — works because function decls fully hoist ===");

function isEven(n) {
    if (n === 0) return true;
    return isOdd(n - 1); // isOdd is known before its textual definition
}

function isOdd(n) {
    if (n === 0) return false;
    return isEven(n - 1);
}

console.log(isEven(6)); // Output: true
console.log(isOdd(7));  // Output: true

/*
 * ============================================================
 *  CONCLUSION — Key Hoisting Takeaways
 * ============================================================
 *
 *  1. Hoisting is a consequence of JS's parse phase — all declarations are
 *     registered before any code runs, so the engine knows every name in
 *     each scope before execution begins.
 *  2. `var` is hoisted and initialized to `undefined`; this creates a silent
 *     "the variable exists but has no value" state that causes subtle bugs.
 *  3. `let` and `const` are hoisted but land in the Temporal Dead Zone.
 *     Accessing them before the declaration line is an explicit, catchable
 *     ReferenceError — far better than a silent `undefined`.
 *  4. Function DECLARATIONS are fully hoisted (name + body) — they can be
 *     called before their textual position in the source file.
 *  5. Function EXPRESSIONS (var fn = function(){}) only hoist the `var` name;
 *     calling before the assignment throws a TypeError.
 *  6. Class declarations behave like `let` — they hoist into TDZ, so using
 *     a class before its declaration throws a ReferenceError.
 *  7. When both a `var` and a `function` declaration share the same name in
 *     the same scope, the function declaration wins during hoisting, but a
 *     later var assignment overwrites it during execution.
 * ============================================================
 */
