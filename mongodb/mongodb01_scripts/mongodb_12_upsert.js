use mydb

db.employee.drop();
db.employee.save({name: "aaa", salary: 1111, age: 10});
db.employee.save({name: "bbb", salary: 2222, age: 20});
db.employee.save({name: "ccc", salary: 3333, age: 30});

// This command will have no effect. Because there is no
// document name "eee"
db.employee.update({name: "eee"}, {$set : {salary: 4444, age: 40}});

// However if we add third parameter "{upsert: true}" then this command will 
// add a new record if it can not find the criteria.
// upsert works like save or update.
db.employee.update({name: "eee"}, {$set: {salary: 4444, age: 40}}, {upsert: true})

printjson(db.employee.findOne({name : "eee"}));

// Edge case: upsert sometimes do not insert values give in the criteria query
// if its not a concrete value. 
// E.g. if we query for (age > 50) the age could be any number above 50,
// but it is going to insert values specified in $set
db.employee.update({age: {$gt: 50}}, {$set: {salary: 5555}}, {upsert: true});

printjson(db.employee.findOne({salary : 5555}));

// And example of an update
db.employee.update({name: "bbb"}, {$set: {age: 123}}, {upsert: true});

printjson(db.employee.findOne({name : "bbb"}));
