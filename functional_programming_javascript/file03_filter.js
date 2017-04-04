/*
Function Composition (using builtin function):

Below 2 methods show functional and non-function method of
filtering

Functional method uses function composition
*/
var employees = [
    {name: "Sheraz", officeLocation: "Atlanta"},
    {name: "Tariq", officeLocation: "Alpharetta"},
    {name: "Chaudhry", officeLocation: "Atlanta"},
    {name: "Abrar", officeLocation: "Roswell"}
];

/*
Non-Functional method:
In non-functional approach we have to create variable outside
the loop to maintain the state. This approach is more error prone
*/
var nonFunctionalEmployees = [];
for(var i = 0; i < employees.length; i++) {
    if (employees[i].officeLocation === "Atlanta") {
        nonFunctionalEmployees.push(employees[i]);
    }
}

/*
Functional method:
In functional approach we don't maintain state variable.
We can avoid iterator loops because of which its less error prone.
*/
var isAtlanta = function (employee) {
    return employee.officeLocation === "Atlanta";
};
var functionalEmployees = employees.filter(isAtlanta);

console.log("nonFunctionalEmployees =", nonFunctionalEmployees);
console.log("functionalEmployees =", functionalEmployees);
