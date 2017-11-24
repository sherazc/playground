module.exports = (num1, num2, operationCallBack) => {
    return `calculatorA = ${operationCallBack(num1, num2)}`;
};