// ES5 Classes
var MyClass = function(constructorVar1) {
    var privateVar = "My Private Value. " + constructorVar1;

    var privateFunction = function (a, b) {
        return a + b
    };

    this.publicVar = "My Public Values";

    this.publicFunction = function (a, b) {
        return privateFunction(10, 20) + a + b;
    };

    this.getPrivateVar = function () {
        return privateVar
    };
};

var myClassVar = new MyClass("Sheraz");

console.log(myClassVar.publicVar);
console.log(myClassVar.getPrivateVar());
console.log(myClassVar.publicFunction(30, 40));
