/*
Function Composition (using builtin function):

Below 2 methods show functional and non-function method of
transforming array data.
*/
var employees = [
    {name: "Sheraz", officeLocation: "Atlanta"},
    {name: "Tariq", officeLocation: "Alpharetta"},
    {name: "Chaudhry", officeLocation: "Atlanta"},
    {name: "Abrar", officeLocation: "Roswell"}
];

// Non-Functional approach = uses state and loop
var nonFunctionalTransformedEmployees = [];
for(var i = 0; i < employees.length; i++) {
    nonFunctionalTransformedEmployees.push(employees[i].name + " works at " + employees[i].officeLocation);
}

// Functional approach = uses standalone function
var employeeDetail = function (employee) {
    return  employee.name + " works at " + employee.officeLocation;
};
var functionalTransformedEmployees = employees.map(employeeDetail);

console.log("nonFunctionalTransformedEmployees =", nonFunctionalTransformedEmployees);
console.log("functionalTransformedEmployees =", functionalTransformedEmployees);
