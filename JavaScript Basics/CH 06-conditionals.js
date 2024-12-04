/* 
 *  Conditional Operators
 */

/*
 *  All the expressions within the if/else if statements are evaluated as boolean expressions
 *  Strings by default are evaluated as "true"
*/

// If-Else Statement
console.log("If-Else Example:");
let score = 85;

// There can be multiple "if" and "else if" statements and only one "else" statement per block

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B"); // Output: "Grade: B"
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// Switch Statement
console.log("\nSwitch Example:");
let day = 3; // 1: Monday, 2: Tuesday, 3: Wednesday, etc.

switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday"); // Output: "Wednesday"
        break;
    case 4:
        console.log("Thursday");
        break;
    case 5:
        console.log("Friday");
        break;
    default:
        console.log("Invalid day");
        break;
}

// Ternary Operator
console.log("\nTernary Operator Example:");
let age = 20;
let access = (age >= 18) ? "Access Granted" : "Access Denied";
console.log(access); // Output: "Access Granted"

// Nested If-Else
console.log("\nNested If-Else Example:");
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot outside.");
} else {
    if (temperature >= 20) {
        console.log("It's a pleasant day."); // Output: "It's a pleasant day."
    } else {
        console.log("It's cold outside.");
    }
}

// Logical Operators in Conditionals
console.log("\nLogical Operators in Conditionals:");
let isMember = true;
let discount = isMember && age > 18 ? "10% Discount" : "No Discount";
console.log(discount); // Output: "10% Discount"

// Nullish Coalescing with Conditionals
console.log("\nNullish Coalescing Example:");
let username = null;
console.log(username ?? "Guest User"); // Output: "Guest User"

// Combining Conditionals with Functions
console.log("\nCombining Conditionals with Functions:");

function checkEligibility(voterAge) {
    if (voterAge >= 18) {
        return "Eligible to Vote";
    } else {
        return "Not Eligible to Vote";
    }
}

console.log(checkEligibility(21)); // Output: "Eligible to Vote"
console.log(checkEligibility(16)); // Output: "Not Eligible to Vote"
