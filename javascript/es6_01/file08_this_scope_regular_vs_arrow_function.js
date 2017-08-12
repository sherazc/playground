let person = {
    name: "Sheraz",
    hobbies: ["computer", "internet", "game"],
    regularFunction1: function () {
        this.hobbies.forEach(function(hobby) {
            // "this" reference to global scope
            // global scope do not have name variable defined so it will be "undefined"
            console.log(`${this.name} likes ${hobby}`);
        });
    },
    arrowFunction: function() {
        this.hobbies.forEach((hobby) => {
            // "this" inside arrow belong to its grand parent scope/lexical scope
            // scope one above its parent contain name = "Sheraz"
            console.log(`${this.name} likes ${hobby}`);
        });
    },
    regularFunction2: function() {
        // A trick used in ES5 to handle problem in regularFunction1() is by passing "this" to a variable
        // and then using that variable wherever we had to use "this"
        var self = this;
        this.hobbies.forEach(function(hobby) {
            console.log(`${self.name} likes ${hobby}`);
        });
    }
};

console.log("regularFunction1() =============");
person.regularFunction1();
console.log("arrowFunction() =============");
person.arrowFunction();
console.log("regularFunction2() =============");
person.regularFunction2();
