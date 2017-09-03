import express from "express";

let app = express();

app.get(["/", "/*", "/:userName"], (request, response) => {
    let myUser = {name: "Sheraz", salary: 100};
    if (request.params.userName) {
        myUser.name = request.params.userName;
        myUser.message = "Hello " + request.params.userName;
    }
    response.json(myUser);
});

app.listen(8080);
