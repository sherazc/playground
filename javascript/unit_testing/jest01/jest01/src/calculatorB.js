let addIt = require("./addIt");

/**
 * This method depends on external module method.
 * 
 * To test it we will have to mock require/imported module.
 * 
 * @param {*} num1 
 * @param {*} num2 
 * @param {*} operator 
 */

module.exports = (num1, num2, operator) => {
    console.log(`calculatorB, ${num1} ${operator} ${num2}`);
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