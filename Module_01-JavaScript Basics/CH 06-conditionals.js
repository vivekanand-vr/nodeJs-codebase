/*
 * ============================================================
 *  CH 06 - Conditionals in JavaScript
 * ============================================================
 *
 *  THEORY:
 *  -------
 *  Conditionals allow a program to make decisions and execute
 *  different blocks of code depending on whether conditions are
 *  true or false.
 *
 *  JavaScript provides four main conditional constructs:
 *    1. if / else if / else   — most common; handles any expression
 *    2. switch                — best for matching one value against
 *                               multiple specific cases
 *    3. Ternary operator (?:) — compact single-expression if-else
 *    4. Nullish coalescing(??) — default value for null/undefined
 *
 *  TRUTHY vs FALSY:
 *  ----------------
 *  Every JS expression evaluates to truthy or falsy when used
 *  in a condition. The six FALSY values are:
 *    false, 0, "" (empty string), null, undefined, NaN
 *  Everything else is TRUTHY (including "0", [], {}, -1, Infinity).
 *
 *  KEY POINTS:
 *  -----------
 *  - An if/else block can have any number of `else if` branches,
 *    but only ONE `else` at the end.
 *  - switch uses strict equality (===) internally for case matching.
 *  - switch cases FALL THROUGH by default if `break` is omitted —
 *    this can be intentional or a bug.
 *  - Ternary should only be used for simple expressions.
 *    Avoid deeply nested ternaries; use if-else for clarity.
 *  - Short-circuit evaluation with && and || is a common pattern
 *    for conditional execution in JSX / functional code.
 * ============================================================
 */

// ─── 1. if / else if / else ─────────────────────────────────────

console.log("If-Else Example:");
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B"); // Output: Grade: B  (85 ≥ 80 is the first matching branch)
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// ─── 2. TRUTHY / FALSY in CONDITIONS ───────────────────────────

console.log("\nTruthy / Falsy Values:");

// FALSY values — these are the only six
if (!false)     console.log("false     is falsy");   // ✅
if (!0)         console.log("0         is falsy");   // ✅
if (!"")        console.log('"" (empty) is falsy');  // ✅
if (!null)      console.log("null      is falsy");   // ✅
if (!undefined) console.log("undefined is falsy");   // ✅
if (!NaN)       console.log("NaN       is falsy");   // ✅

// TRUTHY examples that beginners often mistake as falsy
if ("0")       console.log('"0" is TRUTHY');   // ✅ non-empty string
if ([])        console.log("[] is TRUTHY");    // ✅ empty array is an object
if ({})        console.log("{} is TRUTHY");    // ✅ empty object
if (-1)        console.log("-1 is TRUTHY");    // ✅ any non-zero number
if (Infinity)  console.log("Infinity is TRUTHY"); // ✅

// ─── 3. switch STATEMENT ───────────────────────────────────────

console.log("\nSwitch Example:");
let day = 3; // 1 = Monday, 2 = Tuesday, …

switch (day) {
    case 1: console.log("Monday");    break;
    case 2: console.log("Tuesday");   break;
    case 3: console.log("Wednesday"); break; // Output: Wednesday
    case 4: console.log("Thursday");  break;
    case 5: console.log("Friday");    break;
    case 6: console.log("Saturday");  break;
    case 7: console.log("Sunday");    break;
    default: console.log("Invalid day number");
}

// switch uses STRICT equality (===) — type matters
let val = "3";
switch (val) {
    case 3:
        console.log("Matched number 3");   // NOT reached — "3" !== 3
        break;
    case "3":
        console.log("Matched string '3'"); // Output: Matched string '3'
        break;
}

// ─── 4. INTENTIONAL FALL-THROUGH in switch ─────────────────────

console.log("\nSwitch Fall-Through (intentional):");
let month = 4; // April

switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
        console.log("31 days"); break;
    case 4:
    case 6:
    case 9:
    case 11:
        console.log("30 days"); break; // Output: 30 days (April = month 4)
    case 2:
        console.log("28 or 29 days"); break;
    default:
        console.log("Invalid month");
}

// ─── 5. ACCIDENTAL FALL-THROUGH (missing break — a bug) ────────

console.log("\nAccidental Fall-Through (bug demo):");
let x = 1;
switch (x) {
    case 1:
        console.log("Case 1"); // Output: Case 1
        // ← no break! falls through to case 2
    case 2:
        console.log("Case 2"); // Output: Case 2  ← also runs, even though x !== 2
        break;
    case 3:
        console.log("Case 3"); // NOT reached
}

// ─── 6. TERNARY OPERATOR ───────────────────────────────────────

console.log("\nTernary Operator:");
let age = 20;
let access = (age >= 18) ? "Access Granted" : "Access Denied";
console.log(access); // Output: Access Granted

// Nested ternary — keep it shallow for readability
let temperature = 35;
let weather = (temperature > 35) ? "Hot" :
              (temperature > 20) ? "Warm" :
              (temperature > 10) ? "Cool" : "Cold";
console.log(weather); // Output: Warm  (35 is NOT > 35, but IS > 20)

// ─── 7. NESTED if-else ─────────────────────────────────────────

console.log("\nNested If-Else:");
let temp2 = 25;

if (temp2 > 30) {
    console.log("It's hot outside.");
} else {
    if (temp2 >= 20) {
        console.log("It's a pleasant day."); // Output: It's a pleasant day.
    } else {
        console.log("It's cold outside.");
    }
}

// ─── 8. LOGICAL OPERATORS AS CONDITIONALS ──────────────────────

console.log("\nLogical Short-Circuit as Conditional:");

let isMember = true;
let userAge  = 22;

// && acts like: do the right side ONLY IF the left is truthy
isMember && console.log("Member perks unlocked!"); // Output: Member perks unlocked!

// || acts like: do the right side ONLY IF the left is falsy
let nickname = null;
let displayName = nickname || "Anonymous";
console.log(displayName); // Output: Anonymous

// Combined pattern used in React / JSX: condition && <Component />
let isLoggedIn = true;
isLoggedIn && console.log("Show dashboard"); // Output: Show dashboard

// ─── 9. NULLISH COALESCING (??) WITH CONDITIONALS ──────────────

console.log("\nNullish Coalescing (??):");
let userName = null;
console.log(userName ?? "Guest User"); // Output: Guest User

let itemCount = 0;
// ?? won't replace 0 (not null/undefined), but || would:
console.log(itemCount ?? "No items");  // Output: 0   ← correct behavior
console.log(itemCount || "No items");  // Output: No items ← wrong for this use-case

// ─── 10. COMBINING CONDITIONALS WITH FUNCTIONS ─────────────────

console.log("\nConditionals in Functions:");

function getGrade(s) {
    if (s >= 90) return "A";
    if (s >= 80) return "B";
    if (s >= 70) return "C";
    if (s >= 60) return "D";
    return "F";
}

console.log(getGrade(95)); // Output: A
console.log(getGrade(73)); // Output: C
console.log(getGrade(50)); // Output: F

function checkEligibility(voterAge) {
    return (voterAge >= 18) ? "Eligible to Vote" : "Not Eligible to Vote";
}

console.log(checkEligibility(21)); // Output: Eligible to Vote
console.log(checkEligibility(16)); // Output: Not Eligible to Vote

/*
 * ============================================================
 *  CONCLUSION / KEY TAKEAWAYS
 * ============================================================
 *
 *  1. Use if/else when conditions involve ranges or complex logic.
 *     Use switch when matching one variable against discrete values.
 *  2. JavaScript's six falsy values: false, 0, "", null, undefined, NaN.
 *     Empty arrays [] and empty objects {} are TRUTHY.
 *  3. switch uses === internally — "3" and 3 are NOT equal in a switch.
 *  4. Always add break in each switch case unless fall-through is
 *     intentional (and comment it to be explicit).
 *  5. The ternary operator is best for simple two-path decisions.
 *     Deeply nested ternaries hurt readability — use if/else instead.
 *  6. ?? (nullish coalescing) is safer than || for default values
 *     when 0, false, or "" are expected and valid input values.
 *  7. Short-circuit evaluation (&&, ||) can substitute simple if
 *     statements in functional/declarative contexts.
 * ============================================================
 */
