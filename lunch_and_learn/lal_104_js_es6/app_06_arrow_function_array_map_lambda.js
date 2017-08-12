let numbersArray = [1,2,3,4,5];
// map() array function runs a function on each element of array.
// map() returns array of returns forEach() do not return anything.
// And its
// ES5 method
let doubleArray1 = numbersArray.map(function (number) {
    return number * 2;
});

// ES6 arrow function method
let doubleArray2 = numbersArray.map(number => number * 2);

console.log(doubleArray1);
console.log(doubleArray2);

