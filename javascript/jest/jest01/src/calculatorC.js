module.exports = (num1, num2, operator) => {
    console.log(`Calculating ${num1} ${num2}`);
    let result = localAddIt(num1, num2);
    if (result) {
        return `calculatorB = ${result}`;
    } 
}

let localAddIt = (a, b) => {
    console.log(`localAddIt ${a} + ${b}`);
    return a + b;
}