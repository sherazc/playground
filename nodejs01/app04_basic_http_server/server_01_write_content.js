var http = require("http");

function myOnRequest(request, response) {
    console.log("A user made a request " + request.url);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Here is some data.");
    // Investigate: If I don't end response then browser loads page forever.
    response.end();
}

http.createServer(myOnRequest).listen(3000);
console.log("Server is running...\nhttp://localhost:3000");
