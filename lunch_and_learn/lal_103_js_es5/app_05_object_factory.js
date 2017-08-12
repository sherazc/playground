function myObjectFactory(salary) {
    return {
        name: "PersonA",
        age: 10,
        salary: salary,
        annualSalary: function () {
            return this.salary * 12;
        },
        toString: function() {
            return "name=" + this.name + ", age="
                + this.age + ", salary=" + this.salary
                + ", annualSalary=" + this.annualSalary();
        }
    };
}

var profileA = myObjectFactory(100);
var profileB = myObjectFactory(200);

profileB.name = "Sheraz";

console.log(profileA.toString());
console.log(profileB.toString());