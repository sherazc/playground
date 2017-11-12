module.exports = (num1, num2, operationCallBack) => {
    console.log(`calculatorA, ${num1} ${num2}`);
    let result = operationCallBack(num1, num2);
    if (result) {
        return `calculatorA = ${result}`;
    }
}