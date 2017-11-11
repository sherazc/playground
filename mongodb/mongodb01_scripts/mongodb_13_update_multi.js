use mydb
db.employee.drop();
db.employee.save({name: "aaa", salary: 1111, age: 10});
db.employee.save({name: "bbb", salary: 2222, age: 20});
db.employee.save({name: "ccc", salary: 3333, age: 30});

// By default update only effect first record it finds.
db.employee.update({}, {$set: {age: 50}});

// update() will only update multiple records if {multi: true} is specified
db.employee.update({}, {$set: {age: 50}}, {multi: true});

db.employee.find();
