import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    console.log(`Connected to ${URL}`);
    db.close();
});