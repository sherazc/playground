use mydb

db.employee.drop();

db.employee.save({name: "aaa", salary: 1111});
db.employee.save({name: "bbb", salary: 2222});
db.employee.save({name: "ccc", salary: 3333});
db.employee.save({name: "ddd", salary: 4444});
db.employee.save({name: "eee", salary: 5555});

// $and operator
// $and is somewhat less popular operator
db.employee.find({$and : [{name: {$gt: "b"}}, {salary: {$lt: 5555}}]});

// because the same query can be written as:
db.employee.find({name: {$gt: "b"}, salary: {$lt: 5555}});

// $or operator
db.employee.find({$or : [{name: {$gt: "d"}}, {salary: {$gt: 4444}}]});
