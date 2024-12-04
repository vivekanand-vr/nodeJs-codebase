/* 
 *  Printing Values on the Console
 */

// Prints in new line
console.log(12);
console.log("vivekannad"); 

// Prints each item in a new line
console.log(true, 12, "vivek");

// console.log is defined internally in javascript and returns 'undefined'
console.log(console.log(10)); // undefined

// Prints evertyhing in the same line (Only works in Node.js)
process.stdout.write("Hello "); 
process.stdout.write("Vicky"); 