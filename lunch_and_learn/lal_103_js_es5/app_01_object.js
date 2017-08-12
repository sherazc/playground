// ES5 Objects
var myObject = {
    var1: 50,
    function1: function () {
        return this.var1 * 2;
    }
};

myObject.var2 = 100;

myObject.function2 = function(myName) {
    console.log("Hi " + myName);
};

console.log(myObject.var1);
myObject.function1();

console.log(myObject.var2);
myObject.function2("Sheraz");
