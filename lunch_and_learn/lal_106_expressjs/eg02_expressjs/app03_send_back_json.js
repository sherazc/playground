import express from "express";

let app = express();

// Redirects to /user-profile
app.get("/", (request, response) => {
    // All http status codes
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
    // http://expressjs.com/tr/api.html#res.redirect
    response.redirect(301, "/user-profile");
});

app.get(["/user-profile", "/user-profile/:userName"], (request, response) => {
    let myUser = {name: "Sheraz", salary: 100};
    if (request.params.userName) {
        myUser.name = request.params.userName;
        myUser.message = "Hello " + request.params.userName;
    }
    // http://expressjs.com/tr/api.html#res.json
    response.json(myUser);
});

app.listen(8080);
