// import monk function from monk mondule
import monk from "monk";

// connect to db
// returned db is a promise
let db = monk("localhost:27017/mydb");

db.then((successDb) => {
    console.log(`
    Successfully connected
    Both db are reference to same.
    (db === successDb) = ${db === successDb}`);
    successDb.close();
}, (error) => {
    console.log("Error Occured");
}).catch((exception) => {
    console.log("Failed to connect", exception);
});