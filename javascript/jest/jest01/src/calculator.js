let addIt = require("./addIt");

module.exports = (num1, num2, operation) => {
    console.log(`Calculating ${num1} ${operation} ${num2}`);
    let result;
    switch (operation) {
        case '+':
            result = addIt(num1, num2);
            break;
        default:
            break;
    }
    return result;
}