
let addIt = require("./addIt");

module.exports = (num1, num2, operator) => {
    console.log(`Calculating ${num1} ${operator} ${num2}`);
    let result;
    switch (operator) {
        case '+':
            result = addIt(num1, num2);
            break;
        default:
            break;
    }
    if (result) {
        return `calculatorB = ${result}`;
    } 
}