// DB Setup
use office
db.employee.drop();
db.department.drop();

/*
Generating data:
Insert 10 department and 100 employees

*/
for (i=1; i <= 10; i++) {
    var num = i * 10
    db.department.insert({
        name: "department " + num,
        departmentNumber: num
    });    
}

for (i=1; i <= 100; i++) {
    db.employee.insert({
        name: {
            first: "first" + i,
            last: "last" + i
            },
        email: "email" + i + "@domain.com",
        departmentNumber: [i % 5 * 10, i % 10 * 10],
        salary: i * 1000
    }); 
}

// find() method returns a cursor to the selected records
db.department.find();
db.employee.find();

// findOne() menthod returns a single object
// This is the reason why we can add field name after it. We cant do this with find() method. Even if it return a single Object.
db.department.findOne();
db.department.findOne().name;

// Giving an array index number also returns a single object not a cursor.
// Thats why we can add field name to it.
db.employee.find()[50];
db.employee.find()[50].name;

// Return all the employee records that contains departmentNumber array that contains 10
db.employee.find({departmentNumber:10});
db.employee.find({departmentNumber:10}).count();

// Find by first and last name
db.employee.find({name: {first: "first1", last: "last1"}});

// Get object reference in first find and using it next find
var department80Object = db.department.findOne({name: "department 80"});
db.employee.find({departmentNumber: department80Object.departmentNumber});

// There are 10 employees in below criteria but still getting one employee
db.employee.findOne({departmentNumber: department80Object.departmentNumber});

var department80Object = db.department.find({name: "department 80"})[0];
db.employee.find({departmentNumber: department80Object.departmentNumber});
