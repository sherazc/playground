module.exports = (num1, num2) => {
    console.log(`calculatorC, ${num1} ${num2}`);
    let result = localAddIt(num1, num2);
    if (result) {
        return `calculatorC = ${result}`;
    } 
}

let localAddIt = (a, b) => {
    console.log(`localAddIt ${a} + ${b}`);
    return a + b;
}