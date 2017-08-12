var var1 = "module_a var1";

var myObject01 = {
    var2: "module_a var2",
    func1: function () {
        console.log(var1 + " " + this.var2);
    }
};

module.exports.myObj1 = myObject01;