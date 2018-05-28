class Employee {}

Employee.schema = {
    name: "Employee",
    properties: {
        emp_name: "Test",
        salary: 0.0
    }
};

let emp = new Employee();

console.log(emp.schema);
