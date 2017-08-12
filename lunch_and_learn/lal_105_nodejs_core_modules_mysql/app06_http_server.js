// import http from "http";
let http = require("http");

// Engine
const engine = (request, response) => {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.end("<h1>Node.js http</h1>");
};

// Create Server
let server = http.createServer(engine);

// Start Server
server.listen(8080, () => {
    console.log("Server started. Listening on port 8080.");
});
