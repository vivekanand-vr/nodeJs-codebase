/**
 * Higher-order functions in JavaScript are functions that meet at least one of the following criteria: 
 *  
 *  -> Accept one or more functions as arguments: This allows for the behavior of the higher-order function to be customized by the functions passed into it. 
 *     A common example is the Array.prototype.map() method, which takes a callback function and applies it to each element of an array, 
 *     returning a new array with the results.
 * 
 *  -> Return a function as a result: This enables the creation of function factories or the application of function composition, 
 *     where a function can generate or modify other functions.
 */

// Takes a function as an argument
const numbers = [1, 2, 3];
const doubledNumbers = numbers.map(function(num) {
    return num * 2;
});
console.log(doubledNumbers); // Output: [2, 4, 6]


// Returns a function as a result
function createMultiplier(factor) {
  return function(number) {
      return number * factor;
  };
}

const multiplyBy5 = createMultiplier(5);
console.log(multiplyBy5(10)); // Output: 50