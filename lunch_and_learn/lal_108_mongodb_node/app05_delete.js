import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

// Delete
MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    let query = {name: "Sheraz"};
    db.collection("person").deleteMany(query, (error, result) => {
        if (error) throw error;
        console.log("Deleted records", result.result);
        db.close();
    });
});
