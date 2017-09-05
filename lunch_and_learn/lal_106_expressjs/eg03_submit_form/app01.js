import express from "express";

let app = express();

app.get("/", (request, response) => {
    response.redirect(301, "/users");
});

app.get("/users", (request, response) => {
    response.sendFile(__dirname + "/user_register.html");
});

app.listen(8080, () => console.log("Server Started on port 8080"));