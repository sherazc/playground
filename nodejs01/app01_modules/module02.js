function divide(num1, num2) {
    result = num1 / num2;
    console.log("Divide: " + result);
    return result;
}


module.exports = {
    value2: "This is value 2",

    multiply: function (num1, num2) {
        result = num1 * num2;
        console.log("Multiply: " + result);
        return result;
    }
};