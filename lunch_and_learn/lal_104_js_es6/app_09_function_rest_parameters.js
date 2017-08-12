// "...arg" rest parameter turns function arguments object to real array
console.log("sum1() ========");
let sum1 = function (...argumentsRest) {
    console.log(argumentsRest);
    return argumentsRest.reduce((prevNum, currNum) => prevNum + currNum);
};
console.log(sum1(2,4,6,8));

console.log("multiply1() ========");
// Rest parameter should always be the last function argument

// This is error because rest parameter should be the last parameter.
// let multiply = (...numbers, multiplier) => {
// Also there can only be one rest parameter in function
let multiply1 = (multiplier, ...numbers) => {
    // NOTE: Look at the output of "console.log(arguments);" when combination
    // of regular parameter and rest parameter are specified.
    //console.log(arguments);
    console.log(multiplier, numbers);
};
multiply1(2,3,4,5);

console.log("multiply2() ========");
let multiply2 = (multiplier, ...numbers) => {
    return numbers.map((number) => multiplier * number);
};
console.log(multiply2(2,3,4,5));
