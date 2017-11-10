// when we use "use <db name>" command then "db" variable gets the
// reference to the given database. From here onwords whenever
// scripts uses "db" in its command, it means that database.
use bookmarks
db
db.links.drop();
db.links.count();
// inserting an empty object insert object with just "_id" field
db.links.insert({});
db.links.find();
db.links.insert(
    {
        title: "Link 1",
        url: "http://www.google.com",
        meta: ["Windows", "OSX", "Linux"],
        savedOn: new Date(),
    }
);

var myDocument = {};
myDocument.title = "Link 2";
myDocument.url = "http://www.yahoo.com";
myDocument.meta = ["Windows", "OSX", "Linux"];
myDocument.savedOn = new Date();
myDocument.browser = {};
myDocument.browser.name = "Chrome"
myDocument.browser.version = 12;

// if you just write name of a variable then it's content are printed.
myDocument;

// printjson() function prints content of a variable in json format
printjson(myDocument);

// save() method works like "insert or update". Inserts if _id is missing.
// Updates if _id is present.
db.links.save(myDocument);


// This line will call printjson on each object in db.links
db.links.find().forEach(printjson);

// if we insert "_id" manually then mongodb do not auto generates "ObjectId()"
db.links.insert({
    _id: 10,
    title: "Link3",
    url: "www.microsoft.com"
});

// Seems like _id can be of any data type even an object.
db.links.insert({
    _id: {
            myName: "myUniqueName",
            myValue: "myUniqueValue"
        },
    title: "Link3",
    url: "www.microsoft.com"
});
