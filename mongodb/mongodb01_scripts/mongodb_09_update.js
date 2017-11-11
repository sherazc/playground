use mydb
db.employee.drop();

db.employee.insert({name: "emp1", salary:1000});
db.employee.insert({name: "emp2", salary:2000});

var emp1Record = db.employee.findOne({name: "emp1"});
emp1Record.salary = 2500;

// #################### save()

// "save()" function does insert or update 
// if object contains _id then it updates otherwise it insert
// save() insert or update single object
db.employee.save(emp1Record);

printjson(db.employee.findOne({name: "emp1"}));

db.employee.find();


// #################### update()
// To update multiple object we use update()
// update(filter, object to update with)
// Below command update all records, sets salary=1500 where salary < 1500 
db.employee.update({salary: {$lt: 1500}}, {$set: {salary: 1500}}, {multi: true});

