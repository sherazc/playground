import monk from "monk";

let db = monk("localhost:27017/mydb");
let personCollection = db.get("person");

const query = {name: "Sheraz"}

let deletePromise = personCollection.remove(query);

deletePromise.then((deleteResult) => {
    console.log("Deleted Documents", deleteResult.result);
}).catch((error) => {
    console.error("Failed", error);
}).then(() => db.close());
