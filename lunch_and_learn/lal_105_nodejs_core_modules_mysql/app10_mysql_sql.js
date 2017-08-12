let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "LAL"
});

connection.connect();

let query = connection.query('SELECT * FROM USER_PROFILE WHERE SALARY > ?', 10, function (error, result) {
    result.forEach(record => {
        console.log(`${record.ID} | ${record.NAME} | ${record.SALARY}`);
    });
});

connection.end();
