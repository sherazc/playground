import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

// Find
MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    let cursor = db.collection("person").find({});
    
    cursor.toArray((error, resultArray) => {
        if (error) throw error;
        console.log(resultArray);
        db.close();
    });
});
