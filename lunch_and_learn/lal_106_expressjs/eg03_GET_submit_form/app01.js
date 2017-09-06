import express from "express";
import bodyParser from "body-parser";
let app = express();

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/user_register.html");
});

app.get("/users", (request, response) => {
    // http://expressjs.com/tr/api.html#req.query
    console.log(request.query);
    console.log("Email =", request.query.email);
    console.log("Password =", request.query.password);
    response.sendFile(__dirname + "/user_register_confirm.html");
});

app.listen(8080, () => console.log("Server Started on port 8080"));
