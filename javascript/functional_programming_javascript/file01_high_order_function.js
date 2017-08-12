/*
Higher Order functions:
Functions can be assigned to variables and passed around just like any other value.
*/
var myFunc01 = function () {
    console.log("Hello World");
};

var myFunc02 = myFunc01;

function myFunc03(value) {
    return value;
}

var myFunc04 = myFunc03(myFunc02);

myFunc04();