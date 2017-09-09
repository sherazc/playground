this.name = "Sheraz";

function myFunction(greeting) {
    console.log(greeting + " " + this.name);
}

function executeMyFunction(func) {
    this.name = "Muhammad";
    func("AOA");
}

executeMyFunction(myFunction);
executeMyFunction(myFunction.bind(this));
executeMyFunction(myFunction.bind(this, ["Hello"]));
