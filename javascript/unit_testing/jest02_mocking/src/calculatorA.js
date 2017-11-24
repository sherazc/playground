/**
 * This method depends on callback operation.
 * 
 * To unit test it we will have to create mock callback function
 */
module.exports = (num1, num2, operationCallBack) => {
    return `calculatorA = ${operationCallBack(num1, num2)}`;
};