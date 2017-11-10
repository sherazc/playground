// shows all the databases
show dbs

// switches current database
use mydb

// shows currnt selected database
db

// Mongo Shell command
// shows help
help

var emp1 = {
    name: "name1", 
    salary: 1000, 
    address: {
        street: "100 Street",
        city: "city 01",
        state: "state 01",
        zip: 10000
    },
    projects: ["project01a", "project01b", "project01c"],
    hiredate: new Date(1999,5,24,11,33,30,0),
    department: "IT"
};

var emp2 = {
    name: "name2", 
    salary: 2000, 
    address: {
        street: "200 Street",
        city: "city 02",
        state: "state 02",
        zip: 20000
    },
    projects: ["project02a", "project02b", "project02c"],
    hiredate: new Date('Aug 29 2014')
};

// inserts variables in employee collection
db.employee.insert(emp1);
db.employee.insert(emp2);

// insert BSON in employee collection
db.employee.insert( {name: "name3"});

// selects all records in employee collection
db.employee.find();

show collections

db.employee.drop();

// Mongo Shell command
// shows all collections (or in other words shows a tables)

