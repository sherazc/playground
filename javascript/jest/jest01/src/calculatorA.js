/**
 * This method depends on callback operation.
 * 
 * To unit test it we will have to create mock callback function
 * 
 * @param {*} num1 
 * @param {*} num2 
 * @param {*} operationCallBack 
 */

module.exports = (num1, num2, operationCallBack) => {
    console.log(`calculatorA, ${num1} ${num2}`);
    let result = operationCallBack(num1, num2);
    if (result) {
        return `calculatorA = ${result}`;
    }
}