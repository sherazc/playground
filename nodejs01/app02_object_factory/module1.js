// Notice mainModule is just simply a function variable.
var mainModule = require("./module_main");

// We run this function to create a new object then we use that object
var mainModuleObject = mainModule();
mainModuleObject.mainModuleVar01 = "mainModuleObject.mainModuleVar01 = Module1";
mainModuleObject.mainModuleFunction01();

