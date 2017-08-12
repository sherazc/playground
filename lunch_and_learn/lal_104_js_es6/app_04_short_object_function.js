let person = {
    firstName: `Sheraz`,
    lastName: 'Chaudhry',
    sayName1: function() {
        return `sayName1() My name is ${this.firstName} ${this.lastName}.`;
    },
    // No function keyword used
    sayName2() {
        return `sayName2() My name is ${this.firstName} ${this.lastName}.`;
    }
};

console.log(person.sayName1());
console.log(person.sayName2());
