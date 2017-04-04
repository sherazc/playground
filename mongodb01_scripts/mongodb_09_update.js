use mydb
db.employee.drop();

db.employee.insert({name: "emp1", salary:1000});
db.employee.insert({name: "emp2", salary:2000});

var emp1Record = db.employee.findOne({name: "emp1"});
emp1Record.salary = 2500;

// "save()" function does insert or update 
db.employee.save(emp1Record);

printjson(db.employee.findOne({name: "emp1"}));
