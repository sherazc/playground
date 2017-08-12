(function() {
    this.name = "Chaudhry";

    let person = {
        name: "Sheraz",
        regularFunction: function () {
            return `regularFunction(). Hi I am ${this.name}`;
        },
        // Technically short function are exactly same as regular function
        shortFunction() {
            return `shortFunction(). Hi I am ${this.name}`;
        },
        arrowFunction: () => {
            //console.log(this);
            // "this" in arrow function is lexical scope
            // Which means this in arrow function belong to parent scope
            // Below line will produce (arrowFunction(). Hi I am Chaudhry)
            return `arrowFunction(). Hi I am ${this.name}`;
        }
    };
    console.log(person.regularFunction());
    console.log(person.shortFunction());
    console.log(person.arrowFunction());
})();
