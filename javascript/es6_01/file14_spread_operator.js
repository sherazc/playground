let numbers = [7,2,4,6];
console.log(...numbers);

// When "..." spread operator used pass array values then it could be used
// in methods that do not expect an array. e.g. Math.max()
console.log(Math.max(...numbers));

// or function that expects less or equal number of parameters.
let mySum = (a, b, c) => a + b + c;
// Note: numbers array have 4 elements and mySum() expects 3 elements.
console.log(mySum(...numbers));
