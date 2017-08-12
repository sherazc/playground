// import http from "http";
let http = require("http");
let fs = require("fs");

const engine = (request, response) => {
    console.log(request.url);
    if (request.url.indexOf("/rest") > -1) {
        let myObject = {
            name: "My Name",
            age: 30
        };
        response.writeHead(200, {"Content-Type": "application/json"});
        // Can not send back object. It has to be String
        response.end(JSON.stringify(myObject));
    } else if (request.url.indexOf("/profile") > -1) {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(fs.readFileSync("./views/static_profile.html").toString());
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.end(fs.readFileSync("./views/static_home.html").toString());
    }
};

let server = http.createServer(engine);
server.listen(8080, () => {
    console.log("Server started. Listening on port 8080.");
});
