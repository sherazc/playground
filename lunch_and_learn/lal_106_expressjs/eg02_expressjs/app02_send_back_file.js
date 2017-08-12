import express from "express";

let app = express();

app.get("/", (request, response) => {
    response.sendfile("./app02.html");
});

app.listen(8080);
