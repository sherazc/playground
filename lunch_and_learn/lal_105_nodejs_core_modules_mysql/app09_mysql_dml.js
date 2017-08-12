let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "LAL"
});

connection.connect();

let newProfileObject = {
    NAME: "Profile Object",
    SALARY: 400
};

// Set Object
let query1 = connection.query('INSERT INTO USER_PROFILE SET ?', newProfileObject, function (error, result) {
    console.log("Insert query: ", query1.sql);
    console.log("Inserted ID: ", result.insertId);
    console.log("Ending");
});

// Set individual items
let query2 = connection.query('INSERT INTO USER_PROFILE SET NAME=?, SALARY=?', ["Profile Individual",200], function (error, result) {
    console.log("Insert query: ", query2.sql);
    console.log("Inserted ID: ", result.insertId);
    console.log("Ending");
});

connection.end();
