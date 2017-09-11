import MongoClient from "mongodb";

const URL = "mongodb://localhost:27017/mydb";

// Insert
MongoClient.connect(URL, (error, db) => {
    if (error) throw error;
    let myPerson = {
        name: "Sheraz",
        salary: 200
    };
    db.collection("person").insert(myPerson, (error, result)=> {
        if(error) throw error;
        console.log("inserted record", result);
        db.close();
    });
});