import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

// Find
MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    let query = {name: "Sheraz", salary: {$gt: 50}};
    let cursor = db.collection("person").find(query);
    
    cursor.toArray((error, resultArray) => {
        if (error) throw error;
        console.log(resultArray);
        cursor.close();
        db.close();
    });
});
