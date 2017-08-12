/*
Function composition:
Use one or more functions to make another function.
*/
var price = 100;

function addTax(priceBeforeTax) {
    return priceBeforeTax * 1.07;
}

function displayTotal(calculateTax, priceBeforeTax) {
    console.log(calculateTax(priceBeforeTax));
}

displayTotal(addTax, price);
