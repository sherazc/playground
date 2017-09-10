this.name = "Sheraz";

function myFunction(greeting, lastName) {
    console.log(greeting + " " + this.name + " " + lastName);
}

var myObject = {name: "Tariq"}

myFunction.call();
myFunction.call(myObject);
myFunction.call(this);
myFunction.call(this, "Hello");
myFunction.call(this, "Hello", "Chaudhry");
