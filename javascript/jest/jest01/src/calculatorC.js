/**
 * This method depends on local (module local/private scope) method.
 * 
 * TODO: Research how can we mock local methods.
 * 
 * @param {*} num1 
 * @param {*} num2 
 */
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