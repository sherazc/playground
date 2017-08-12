// This is how we use Math.max().
console.log(Math.max(4,7,2,6,9));
// Math.max() can't take in an Array. It will throw a NaN exception.

const numbersArray = [4, 7, 2, 6, 9];
console.log(Math.max(numbersArray));

// In ES5 to pass-in array to an to a function that cant take array we can use apply().
// apply(thisContext, argumentsArray) is same as call().
// apply takes an array of arguments and passes it to the method
// that is being applied.

// We do this when in the method like max we don't know number of arguments until run time.
console.log(Math.max.apply(null, numbersArray));