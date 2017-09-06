import express from "express";
import bodyParser from "body-parser";
let app = express();

// https://www.npmjs.com/package/body-parser
// http://expressjs.com/tr/api.html#req.body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/user_register.html");
});

app.post("/", (request, response) => {
    console.log(request.body);
    console.log("Email =", request.body.email);
    console.log("Password =", request.body.password);
    response.sendFile(__dirname + "/user_register_confirm.html");
});

app.listen(8080, () => console.log("Server Started on port 8080"));
