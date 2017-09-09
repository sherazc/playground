var theGlobalObject = this;
theGlobalObject.name = "Sheraz";

function myFunction() {
    // this.name = "Override all names";
    // console.log(this);
    console.log(this.name);
}

var myObjectA = {
    name: "Tariq",
    aMyFunction1: myFunction.bind(theGlobalObject),
    aMyFunction2: myFunction
}

myObjectA.myObjectB = {
    name: "Chaudhry",
    bMyFunction1: myFunction.bind(myObjectA),
    bMyFunction2: myFunction,
}

function executeMyFunction(func) {
    this.name = "Muhammad";
    func();
}

console.log("===== 1 =====");
myFunction();

console.log("===== 2 =====");
myObjectA.aMyFunction1();

console.log("===== 3 =====");
myObjectA.aMyFunction2();

console.log("===== 4 =====");
myObjectA.myObjectB.bMyFunction1();

console.log("===== 5 =====");
myObjectA.myObjectB.bMyFunction2();

console.log("===== 6 =====");
executeMyFunction(myFunction);

console.log("===== 7 =====");
executeMyFunction(myFunction.bind(this));

console.log("===== 8 =====");
executeMyFunction(myFunction.bind(myObjectA));
