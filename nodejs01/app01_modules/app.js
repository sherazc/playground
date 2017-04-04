var module01Dependency = require("./module01");
var module02Dependency = require("./module02");

module01Dependency.add(3, 4);

// This is error because this is not part of the module.export object.
//module01Dependency.substract(10, 2);
console.log("module01Dependency.value1 = " + module01Dependency.value1);

module02Dependency.multiply(6, 2);
console.log("module02Dependency.value2 = " + module02Dependency.value2);

// This is also an error.
// module02Dependency.divide(4, 2);