import {add, subtract} from "./services";

class Calculator {
}

Calculator.prototype.add = add;
Calculator.prototype.subtract = subtract;

let calculator = new Calculator();

console.log(calculator.add(3, 2));
console.log(calculator.subtract(3, 2));
