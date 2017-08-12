import express from "express";

// Create application object
let app = express();

// Define a route and send respose back
app.get("/", (request, response) => {
    response.send("Hello World");
});

// Start the express app by listening on a port
// Optionally write a callback that will run on startup
app.listen(8080, () => {
    console.log("Server started on port 8080");
});