use mydb

db.dropDatabase();

function insertData(dbName, collectionName, num) {
    var collection = db.getSiblingDB(dbName).getCollection(collectionName);
    for (i = 0; i < num; i++) {
        collection.insert({
            name : "name" + i,
            age : 100 + i
        });
    }
}

insertData("mydb", "names_data", 20);

print("Total records: " + db.names_data.count());

db.names_data.find();
