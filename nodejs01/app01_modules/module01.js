var value1 = "This is value 1";

function add(num1, num2) {
    result = num1 + num2;
    console.log("Add: " + result);
    return result;
}

function substract(num1, num2) {
    result = num1 - num2;
    console.log("Substract: " + result);
    return result;
}

module.exports.add = add;
module.exports.value1 = value1;