/*
Here is how we can do curring function in ES6.

1st function takes in an argument, modify it and return function.
2nd function takes in an argument keeps it and return function.
3rd function takes in an argument sums all 3 arguments and return its result
*/
let curriedFunction = (a) => {
    a += 3;
    return (b) => (c) => {
        return a + b + c;
    };
};

// 2 + 3 + 4 + 6 = 15
console.log("One line = ", curriedFunction(2)(4)(6));

var i = 10;
var step2 = curriedFunction(i);
var j = i - 3;
var step3 = step2(j);
var k = 50 / i;
var finalResult = step3(k);
console.log("Multiple lines = ", finalResult);
