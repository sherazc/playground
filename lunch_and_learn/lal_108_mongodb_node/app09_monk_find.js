import monk from "monk";

let db = monk("localhost:27017/mydb");
let personCollection = db.get("person");

let query = {salary: {$lt: 1000}};

let findPromise = personCollection.find(query);

findPromise.then((foundDocuments) => {
    console.log("Found Documents", foundDocuments);
}).catch((error) => {
    console.error("Failed", error);
}).then(() => db.close());
