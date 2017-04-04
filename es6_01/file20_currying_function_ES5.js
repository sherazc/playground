/*
Currying function is a technique in functional programming.
It is used when we have to collect a function's arguments over different
steps of our application and when all of them are collected then run the
function's body on all of them, and may be return result of them.

Initial functions just collect arguments and return a function. But the
last one have the function's body.

Here is how we can do in ES5.
*/

var curriedFunction = function (a) {
    a += 3;
    return function (b) {
        b += 2;
        return function (c) {
            return a + b + c;
        }
    }
};

// 2 + 3 + 4 + 2 + 6 = 17
console.log("One line = ", curriedFunction(2)(4)(6));

var i = 10;
var step2 = curriedFunction(i);
var j = i - 3;
var step3 = step2(j);
var k = 50 / i;
var finalResult = step3(k);
console.log("Multiple lines = ", finalResult);
