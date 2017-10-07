import mysql from "mysql";

let connectionConfig = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "employeedb"
 };
 
 export default class BaseDao {
    connect() {
        let connection = mysql.createConnection(connectionConfig);
        
        connection.connect((error) => {
           if (error) {
               console.log("Error connecting.", error);
           } else {
               console.log("Connected to DB");
           }
        });
        return connection
    }

    endConnection(connection) {
        connection.end((error) => {
            if (error) {
                console.log("Error disconnecting.", error);
            } else {
                console.log("Disconnected DB");
            }
         });         
    }
 }