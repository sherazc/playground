// let add =  require("./module_a");
// let subtract=  require("./module_b");

//const add  = require("./module-a");
// const subtract = require("./module-b");
import add from "./module_a";
import subtract from "./module_b";

let myvar = 10;

console.log(myvar);
//console.log(add.add(3, 2));
//console.log(subtract.subtract(3, 2));
console.log(add(3, 2));
console.log(subtract(3, 2));
