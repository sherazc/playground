// https://www.youtube.com/watch?v=QWD2hmU0n6Y&index=9&list=PLeDLOqc74eyo47KPYROQBKSo1KxuMGTt1
use mydb
db.employee.drop();
db.employee.save({name: "aaa", phone: {work: 11, home: 111}});
db.employee.save({name: "bbb", phone: {work: 22, home: 222}});
db.employee.save({name: "ccc", phone: {work: 33, home: 333}});

// This find will work because sub object field order is 
// the same as it was inserted in.
printjson(db.employee.findOne({phone: {work: 11, home: 111}}));

// This will not return any result because order of the sub
// object is different from the query field order.
// This is because this query find and matches byte by byte in BSON.
// This kind of query is known as "query by example"
printjson(db.employee.findOne({phone: {home: 111, work: 11}}));

// Even this will not return any result because phone field's sub object do 
// not match query's phone's sub object
printjson(db.employee.findOne({phone: {work: 11}}));

// To handle this we can use dot notation in the quoted field name path
printjson(db.employee.findOne({"phone.home": 111, "phone.work": 11}));
printjson(db.employee.findOne({"phone.work": 11}));
printjson(db.employee.findOne({"phone.home": 111}));

