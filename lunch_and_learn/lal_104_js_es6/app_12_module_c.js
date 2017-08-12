import MyClassA, {myObject01} from "./app_12_module_a";
import myObj2, {func2, func3} from "./app_12_module_b";

let myClassAInstance = new MyClassA();
myClassAInstance.processMyClassA();

console.log(myObject01.var2);

myObject01.func1();

console.log("myObj2 =",  myObj2);
func2();
func3();
