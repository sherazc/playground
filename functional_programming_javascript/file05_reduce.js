/*
reduce() takes in 2 arguments:
- First one takes in callback for each iteration.
- Initial object/value that will be become final value.

Final object created will be returned.

Callback takes in 2 arguments:
- last iteration result object
- current iteration input array element
Callback returns current iteration result object.

In the example below we will find the total of all orders
*/

var orders = [
    {amount: 100},
    {amount: 200},
    {amount: 300},
    {amount: 400}
];

// Non functional approach.
var totalNonFunctional = 0;
for (i = 0; i < orders.length; i++) {
    totalNonFunctional += orders[i].amount;
}

var initialResult = 0;
var finalResultTotalFunctional = orders.reduce(function (lastIterationResult, currentIterationOrder) {
    var currentIterationResult = lastIterationResult + currentIterationOrder.amount;
    return currentIterationResult;
}, initialResult);


console.log("totalNonFunctional =", totalNonFunctional);
console.log("finalResultTotalFunctional =", finalResultTotalFunctional);
