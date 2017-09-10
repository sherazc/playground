// Exact match
db.person.find({name: "Sheraz", salary: 100});

// Comparison < ($lt), > ($gt), <= ($lte), >= ($gte), 
db.person.find({salary: {$lt: 200}});

// In ($in), Not In ($nin) 
db.person.find({name: {$in: ["Sheraz", "Chaudhry"]}});

// And ($and), Or ($or)
db.person.find({$or: [
    {name: "Sheraz"},
    {salary: {$gt: 50}}
]});



