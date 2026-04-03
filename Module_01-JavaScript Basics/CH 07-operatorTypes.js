/*
 * ============================================================
 *  CH 07 - Operator Types (Unary, Binary, Ternary)
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  Operators are classified by the number of OPERANDS they act on:
 *
 *    UNARY   — 1 operand   e.g.  !true,  ++x,  typeof x
 *    BINARY  — 2 operands  e.g.  a + b,  a && b,  a === b
 *    TERNARY — 3 operands  e.g.  condition ? exprA : exprB
 *                          (the only ternary operator in JS)
 *
 *  UNARY OPERATORS (key ones):
 *  ---------------------------
 *    +x         — convert x to a number (unary plus)
 *    -x         — negate x (unary minus)
 *    !x         — logical NOT (flip truthiness)
 *    !!x        — double NOT — reliable boolean conversion
 *    ++x        — pre-increment  (increment THEN return new value)
 *    x++        — post-increment (return current value THEN increment)
 *    --x        — pre-decrement
 *    x--        — post-decrement
 *    typeof x   — returns type string
 *    delete o.p — removes a property from an object
 *    void expr  — evaluates expr, always returns undefined
 *    ~x         — bitwise NOT
 *
 *  KEY POINTS:
 *  -----------
 *  - Pre-increment (++x) changes the value BEFORE it's used in the expression.
 *    Post-increment (x++) uses the CURRENT value first, THEN changes it.
 *  - `delete` only works on object properties, not regular variables.
 *  - `void 0` is a reliable way to get `undefined` (older JS trick).
 *  - The ternary operator is the ONLY operator with three operands in JS.
 *  - Operator PRECEDENCE determines which operator is evaluated first
 *    when multiple operators appear in one expression (e.g. * before +).
 * ============================================================
 */

// ─── 1. UNARY OPERATORS ────────────────────────────────────────

console.log("Unary Operators:");

// Unary Plus (+) — converts operand to a number
console.log(+"42");     // Output: 42     (string "42" → number 42)
console.log(+true);     // Output: 1      (true  → 1)
console.log(+false);    // Output: 0      (false → 0)
console.log(+null);     // Output: 0      (null  → 0)
console.log(+undefined);// Output: NaN    (undefined cannot become a number)
console.log(+"hello");  // Output: NaN    (non-numeric string)

// Unary Minus (-) — negates the value (also coerces to number first)
let num = 5;
console.log(-num);      // Output: -5
console.log(-"3");      // Output: -3  (coercion + negation)

// Logical NOT (!)
let isTrue = true;
console.log(!isTrue);   // Output: false
console.log(!0);        // Output: true   (0 is falsy)
console.log(!"");       // Output: true   ("" is falsy)
console.log(!null);     // Output: true   (null is falsy)

// Double NOT (!!) — converts any value to its boolean equivalent
console.log(!!1);       // Output: true
console.log(!!0);       // Output: false
console.log(!!"hello"); // Output: true
console.log(!!"");      // Output: false
console.log(!!null);    // Output: false
console.log(!!undefined);// Output: false

// typeof — unary type-check operator (returns a string)
let value = 100;
console.log(typeof value); // Output: number

// ─── 2. INCREMENT / DECREMENT — PRE vs POST ─────────────────────

console.log("\nPre vs Post Increment/Decrement:");

let count = 10;
console.log(++count); // Output: 11  (pre-increment: increment first, return new value)
console.log(count++); // Output: 11  (post-increment: return current value 11, THEN increment to 12)
console.log(count);   // Output: 12  (count is now 12)

let dec = 10;
console.log(--dec); // Output: 9   (pre-decrement: decrement first, return new value)
console.log(dec--); // Output: 9   (post-decrement: return current 9, THEN decrement to 8)
console.log(dec);   // Output: 8

// Common gotcha — using post-increment inside expressions:
let a = 5;
let b = a++ + 10;  // b = 5 + 10 = 15, THEN a becomes 6
console.log(b);    // Output: 15
console.log(a);    // Output: 6

// ─── 3. delete OPERATOR ────────────────────────────────────────

console.log("\ndelete Operator:");
let obj = { name: "Alice", age: 25, city: "NYC" };
console.log(obj);           // Output: { name: 'Alice', age: 25, city: 'NYC' }

delete obj.age;             // removes the 'age' property
console.log(obj);           // Output: { name: 'Alice', city: 'NYC' }
console.log(obj.age);       // Output: undefined  (property no longer exists)

// delete on a variable — throws in strict mode, silently fails otherwise
let x = 10;
// delete x;          // returns false in non-strict; TypeError in strict mode
console.log(x);    // Output: 10  (variable NOT deleted)

// ─── 4. void OPERATOR ──────────────────────────────────────────

console.log("\nvoid Operator:");
console.log(void 0);          // Output: undefined
console.log(void "anything"); // Output: undefined
console.log(void (2 + 2));    // Output: undefined  (expression is evaluated but result discarded)

// Common use: void 0 as a safe way to get undefined (avoids undefined being redefined)

// ─── 5. BINARY OPERATORS ───────────────────────────────────────

console.log("\nBinary Operators:");

let p = 10, q = 5;

// Arithmetic (binary)
console.log(p + q);  // Output: 15
console.log(p - q);  // Output: 5
console.log(p * q);  // Output: 50
console.log(p / q);  // Output: 2
console.log(p % q);  // Output: 0
console.log(p ** 2); // Output: 100

// Comparison (binary — return boolean)
console.log(p > q);   // Output: true
console.log(p < q);   // Output: false
console.log(p >= q);  // Output: true
console.log(p <= q);  // Output: false
console.log(p == q);  // Output: false
console.log(p != q);  // Output: true

// Logical (binary — short-circuit, return an OPERAND)
console.log((p > q) && (q > 0)); // Output: true  (both truthy)
console.log((p < q) || (q > 0)); // Output: true  (right side is truthy)

// Bitwise (binary — operate on 32-bit representations)
console.log(p & q);  // Output: 0   (1010 & 0101 = 0000)
console.log(p | q);  // Output: 15  (1010 | 0101 = 1111)
console.log(p ^ q);  // Output: 15  (1010 ^ 0101 = 1111)

// Assignment (binary)
let c = 20;
c += 10;
console.log(c); // Output: 30

// ─── 6. TERNARY OPERATOR ───────────────────────────────────────

console.log("\nTernary Operator:");
let ageCheck = 18;
let message = (ageCheck >= 18) ? "Eligible to vote" : "Not eligible to vote";
console.log(message); // Output: Eligible to vote

// Chained ternary (use sparingly — prefer if/else for more than two levels)
let marks = 75;
let grade = (marks >= 90) ? "A+" :
            (marks >= 80) ? "A"  :
            (marks >= 70) ? "B"  : "C";
console.log(grade); // Output: B  (75 ≥ 70 is the first match from the bottom up)

// ─── 7. OPERATOR PRECEDENCE (brief) ────────────────────────────

console.log("\nOperator Precedence:");
// Higher precedence operators are evaluated first.
// Common ranking (high → low): ** > unary > * / % > + - > comparisons > && > || > ?? > ternary > assignment

console.log(2 + 3 * 4);   // Output: 14  (* before +)
console.log((2 + 3) * 4); // Output: 20  (parentheses override precedence)
console.log(!false || true && false); // Output: true
// Evaluated as: (!false) || (true && false)
//              = true    || false = true

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Pre-increment (++x) returns the NEW value after incrementing.
 *     Post-increment (x++) returns the ORIGINAL value, then increments.
 *     Mixing them inside expressions is error-prone — keep it simple.
 *  2. Unary + is the fastest way to convert a value to a number,
 *     but it returns NaN for non-numeric strings — check your input.
 *  3. !! (double NOT) is the idiomatic way to convert any value
 *     to a strict boolean in JavaScript.
 *  4. `delete` removes object properties (not variables). It returns
 *     true on success and false when the property can't be deleted.
 *  5. `void expr` always returns undefined — useful for hyperlinks
 *     (href="javascript:void(0)") or safely getting undefined.
 *  6. The ternary operator is the ONLY one in JS with three operands.
 *     Its conditional power is best used for simple a/b choices.
 *  7. Understanding operator precedence prevents subtle bugs.
 *     When in doubt, use parentheses () to make the intent explicit.
 * ============================================================
 */
