this.name = "Sheraz";

function myFunction(greeting, lastName) {
    console.log(greeting + " " + this.name + " " + lastName);
}

var myObject = {name: "Tariq"}

myFunction.apply();
myFunction.apply(myObject);
myFunction.apply(this);
myFunction.apply(this, ["Hello"]);
myFunction.apply(this, ["Hello", "Chaudhry"]);
