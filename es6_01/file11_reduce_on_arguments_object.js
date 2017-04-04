// Array function e.g. Array.reduce() can't run on function's arguments object.
// There are 2 methods to handle it in ES5.
// To run array function on arguments we can convert arguments object to array.
console.log("sum1() ======== ES5");
let sum1 = function () {
    let numbers = [];
    for(var argument in arguments) {
        numbers[argument] = arguments[argument];
    }
    return numbers.reduce(function (prevNum, currNum) {
        return prevNum + currNum;
    });
};
console.log(sum1(1,3,5,7));

console.log("sum2() ======== ES5");
let sum2 = function () {
    // call(arguments Object, callback method)
    return Array.prototype.reduce.call(arguments, function (prevNum, currNum) {
        return prevNum + currNum;
    })
};
console.log(sum2(1,3,5,7));

// In ES6 we can do use arrow function
console.log("sum3() ======== ES6");
let sum3 = function () {
    // call(arguments Object, callback method)
    return Array.prototype.reduce.call(arguments, (prevNum, currNum) => {
        return prevNum + currNum;
    })
};
console.log(sum3(1,3,5,7));
