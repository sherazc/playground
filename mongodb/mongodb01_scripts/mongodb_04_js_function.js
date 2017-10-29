function insertData(dbName, colName, num) {
    var col = db.getSiblingDB(dbName).getCollection(colName);
    for (i = 0; i < num; i++) {
        col.insert({
            name : "name" + i,
            age : 100 + i
        });
        // print(col);
        // print(col.count());
    }
}

insertData("mydb", "testdata", 20);

print("Total records: " + db.testdata.count());

db.testdata.find();
