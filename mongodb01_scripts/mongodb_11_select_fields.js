use mydb

db.employee.drop();
db.employee.save({name: "aaa", salary: 1111});
db.employee.save({name: "bbb", salary: 2222});
db.employee.save({name: "ccc", salary: 3333});
db.employee.save({name: "ddd", salary: 4444});
db.employee.save({name: "eee", salary: 5555});

// $and is somewhat less popular operator
db.employee.find(
    {salary: {$gt: 3333}}, // First argument is the query where clause
    {_id: false, name: true} // This argument tells what field to be selected
    // VERY IMPORTANT: fields other than _id can not have mix of inclusion an exclusion.
);
