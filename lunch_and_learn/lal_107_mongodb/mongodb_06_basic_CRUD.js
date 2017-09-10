db.person.insert({
    name: "Sheraz",
    salary: 100
});

db.person.find({});

db.person.update({}, {
    name: "Sheraz",
    salary: 200
});

db.person.remove({});
