import monk from "monk";

let db = monk("localhost:27017/mydb");
let personCollection = db.get("person");

const personObject = {
    name: "Sheraz",
    salary: 250
};

let insertPromise = personCollection.insert(personObject);

insertPromise.then((insertedDocument) => {
    console.log("Inserted document", insertedDocument);
}).catch((error) => {
    console.error("Failed to insert", error);
}).then(() => db.close());
