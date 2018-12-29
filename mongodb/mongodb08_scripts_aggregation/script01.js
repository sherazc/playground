use agg

show collections

// aggregate([]) with Empty array returns all documents, just like find with no query.
db.persons.aggregate([]);
db.persons.find({});

/*********************
* $match - Works just like find()'s query
**********************/
db.persons.aggregate([
    {$match: {gender: "male"}}, // Stage 1
    {$match: {age: {$gt: 30}}}, // Stage 2
]);

db.persons.aggregate([
    {$match: {$and: [{gender: "male", age: {$gt: 30}, eyeColor: "brown"}]}} // Stage 1
]);


// Below 2 shows that find() works similar to aggregate() One $match stage
db.persons.aggregate([
    {$match: {tags: {$size: 2}}} // Stage 1
]);

db.persons.find({tags: {$size: 2}});


/*********************
* $group - Works like SQL "group by" clause
**********************/
// Grouping single field
db.persons.aggregate([
    {$group: {"_id": "$age"}}
]);

// Grouping multiple fields
db.persons.aggregate([
    {$group: {"_id": {age: "$age", gender: "$gender"}}}
]);

// Grouping nested document fields
db.persons.aggregate([
    {$group: {"_id": "$company.location.country"}}
]);

// Grouping nested document object
db.persons.aggregate([
    {$group: {"_id": "$company.location"}}
]);



db.persons.aggregate([
    {$group: {"_id": "$age", count: {$sum: 1}}}
]);



/*********************
* $lookup - Works like SQL "left outer join" clause
**********************/
use cdb
    
db.user.aggregate([
    {
        $lookup: {
            from: "company",
            localField: "companyId",
            foreignField: "_id",
            as: "company"
        }
    },
    {$unwind: "$company"}
]);