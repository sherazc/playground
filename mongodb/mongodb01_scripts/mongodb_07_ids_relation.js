// DB setup
use bookmarks
db
db.links.drop();
db.users.drop();
db.users.insert({name: "user1"});
db.users.insert({name: "user2"});

var user1Reference = db.users.findOne({name: "user1"});

var user1ObjectIdReference = user1Reference._id;

printjson(user1ObjectIdReference);

function insertLink(index, userObjectId) {
    db.links.insert({
        title: "Title " + index, 
        url: "url " + index,
        tags: ["tag" + (index * 10), "tag" + (index * 20), "tag" + (index * 30)],
        userId: userObjectId
     });
}

// Inserts half with referece and half with no user reference.
for (i=1; i<=10; i++) {
    if (i % 2 == 0) {
        insertLink(i, user1ObjectIdReference);
    } else {
        insertLink(i, null);
    }
}


// This query returns all link
db.links.find();
// This query returns that contains userId of 
db.links.find({userId: user1ObjectIdReference});