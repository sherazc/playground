// Just like forEach() and map(), reduce() is also an
// array function that runs on all elements of an array.

let sum = function(numbersArray) {
    // as reduce() iterates over array, previous and current array item
    // is passed to the function.
    return numbersArray.reduce(function (previousNumber, currentNumber) {
        return previousNumber + currentNumber;
    });
};

let numbers = [30, 20, 50, 40];
let result = sum(numbers);

console.log(result);
