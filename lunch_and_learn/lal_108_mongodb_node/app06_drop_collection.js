import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

// Drop Collection
MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    db.collection("person").drop((error, result) => {
        if (error) throw error;
        console.log("Dropped Collection", result);
        db.close();
    });
});
