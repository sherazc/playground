import express from "express";

let app = express();

app.get("/", (request, response) => {
    response.send("Hello World");
});

app.listen(8080);