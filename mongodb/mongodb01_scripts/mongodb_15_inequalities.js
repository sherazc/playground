use mydb
db.employee.drop();
db.employee.save({name: "aaa", salary: 1111});
db.employee.save({name: "bbb", salary: 2222});
db.employee.save({name: "ccc", salary: 3333});
db.employee.save({name: "ddd", salary: 4444});
db.employee.save({name: "eee", salary: 5555});
db.employee.save({name: 42, salary: 5555});

// Note both of these queries do not return record that has name=42
// This is because these queries ((i.e. range type comparision) ) do not 
// span accross datatypes
db.employee.find({name: {$lt: "d"}});
db.employee.find({name: {$gt: "d"}});
db.employee.find({name: {$eq: "42"}});

// But this will return record that has name=42
db.employee.find({name: {$eq: 42}});
db.employee.find({name: {$lt: "d", $gt: "aaa"}});