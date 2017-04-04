var http = require("http");
var fs = require("fs");

function myRequestDispatcher(request, response) {
    const requestUrl = request.url;
    console.log("User made request to " + requestUrl);

    if (request.method == 'GET' && (requestUrl == "/" || requestUrl == "/home")) {
        response.writeHead(200, "Content-Type: text/html");
        fs.createReadStream("./my_html_file.html").pipe(response);
        // Investigate: For some reason I get blank page if I do response.end();
        // Maybe fs takes care of ending response.
        // response.end();
    } else {
        my404RequestHandler(response);
        response.end();
    }

}

function my404RequestHandler(response) {
    response.writeHead(404, "Content-Type: text/plain");
    response.write("Error 404: Page not found.");
}


http.createServer(myRequestDispatcher).listen(3000);
console.log("Server running.\nhttp://localhost:3000\nhttp://localhost:3000/home\nhttp://localhost:3000/bad_page_name");

