use mydb
db.employee.drop();
db.employee.save({name: "aaa", salary: 1111});
db.employee.save({name: "bbb", salary: 2222});
db.employee.save({name: "ccc", salary: 3333});
db.employee.save({name: "ddd", salary: 4444});
db.employee.save({name: "eee", salary: 5555});

/*
 * This method requires you to initialize a query.
 */
function random_id(obj_id_slice1, obj_id_slice2, count) {
    var v = obj_id_slice2 + Math.floor(Math.random() * (count + 1));
    return ObjectId(obj_id_slice1 + v.toString(16));
}

var count = db.employee.count();
var first_obj_id = db.employee.find().sort({ _id: 1 }).limit(1)[0]._id.valueOf();

var first_obj_id_slice1 = first_obj_id.slice(0, 11);
var first_obj_id_slice2 = parseInt(first_obj_id.slice(11, 24), 16);

/*
 * The query.
 */
var document = db.employee.findOne({ _id: { $gte: random_id(first_obj_id_slice1, first_obj_id_slice2, count) } });

printjson(document);
