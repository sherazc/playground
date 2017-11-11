use mydb

db.employee.drop();
db.employee.save({name: "aaa", salary: 1111});
db.employee.save({name: "bbb", salary: 2222});
db.employee.save({name: "ccc", salary: 3333});
db.employee.save({name: "ddd", salary: 4444});
db.employee.save({name: "eee", salary: 5555});


db.employee.find(
    {salary: {$gt: 3333}}, // First argument is filter
    {name: true} // This argument tells what field to be selected
);

db.employee.find(
    {salary: {$gt: 3333}}, 
    // by default _id always gets selected. We have to trun it off explictly
    {_id: false, name: true} 
);