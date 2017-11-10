use bookmarks
db
db.links.drop();
/*
ObjectId() is embedded with: 
    - Time that ObjectId() was created on. 
    - Host name of the mashine where the record was saved
    - Process Id
    - And a random incrementing number
*/

// To get timestamp from the ObjectId we can use get
new ObjectId().getTimestamp();

db.links.insert({});
// We can call getTimestamp() on saved record's ObjectId. 
// This will return us time that this document was saved on
db.links.findOne()._id.getTimestamp();
var linkId = db.links.find()[0]._id;
linkId.getTimestamp();

// To create our own auto increment
var index = 100;
db.links.insert({_id: ++index, title: "auto_inc a", url: "www.url_a.com"});
db.links.insert({_id: ++index, title: "auto_inc b", url: "www.url_b.com"});
db.links.insert({_id: ++index, title: "auto_inc c", url: "www.url_c.com"});

db.links.count();
db.links.find();
