import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

// Update
MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    let query = {name: "Sheraz"};
    let newPerson = {$set: {salary: 300}}
    db.collection("person").updateMany(query, newPerson, (error, result) => {
        if (error) throw error;
        console.log("Updated records", result.result);
        db.close();
    });
});
