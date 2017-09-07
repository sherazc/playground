import express from "express";
import bodyParser from "body-parser";
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (request, response) => {
    let pageData = {
        pageTitle: "Create User"
    };
    response.render("./pages/user_register", pageData);
});

app.post("/", (request, response) => {
    let pageData = {
        pageTitle: "Confirm Create User",
        userEmail: request.body.email,
        userRole: request.body.userRole
    };
    console.log(request.body);
    response.render("./pages/user_register_confirm", pageData);
});

app.listen(8080, () => console.log("Server Started on port 8080"));
