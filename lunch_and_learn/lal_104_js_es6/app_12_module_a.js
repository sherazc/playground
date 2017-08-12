let var1 = "module_a var1";

let myObject01 = {
    var2: "module_a var2",
    func1: function () {
        console.log(var1 + " " + this.var2);
    }
};

// There can one variable as default export
export default class MyClassA {
    processMyClassA() {
        console.log("Processing MyClassA");
    }
}

// There can be multiple non default export
export {myObject01};