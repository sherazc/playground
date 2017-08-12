let mysql = require("mysql");

// Connection Config
let connectionConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "LAL"
};

// Create Connection Factory
let connection = mysql.createConnection(connectionConfig);

// Connect
connection.connect((error) => {
    if (error) {
        console.log("Error connecting.", error);
    } else {
        console.log("Connected to DB");
    }
});

// Query
connection.query('SELECT 1', function (error, results, fields) {
    if (error) {
        console.log(error.code); // 'ECONNREFUSED'
        console.log(error.fatal); // true
    } else {
        console.log("Database hit successful");
    }
});

// End Connection
connection.end((error) => {
    if (error) {
        console.log("Error disconnecting.", error);
    } else {
        console.log("Disconnected DB");
    }
});