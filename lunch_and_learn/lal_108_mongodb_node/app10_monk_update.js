import monk from "monk";

let db = monk("localhost:27017/mydb");
let personCollection = db.get("person");

const newObject = {$set: {salary: 500}};
const query = {name: "Sheraz"}

let updatePromise = personCollection.update(query, newObject, {multi: true});

updatePromise.then((updateResult) => {
    console.log("Updated Documents", updateResult);
}).catch((error) => {
    console.error("Failed", error);
}).then(() => db.close());
