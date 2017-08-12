let http = require("http");
let url = require("url");

let httpMain = (request, response) => {
    console.log("A user made a request " + request.url);
    let urlParts = url.parse(request.url, true);
    switch (urlParts.pathname) {
        case "/":
            responseHelp(response);
            break;
        case "/help":
            responseHelp(response);
            break;
        case "/emp-data":
            responseEmployeeData(request, response);
            break;

    }
    response.end();
};


let responseHelp = (response) => {
    let makeHelpLink = (linkValue) => {
        return `<a href="${linkValue}">${linkValue}</a><br/>`;
    };

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(makeHelpLink("/emp-data"));

};


let responseEmployeeData = (request, response) => {
    let count = 10;
    let userRequestCount = getParameterValue(request, "count");
    if (userRequestCount != null) {
        count = Number.parseInt(userRequestCount);
    }

    let data = [];

    for (let i = 0; i < count; i++) {
        data.push({id: i, name: "name" + i, empLocation: "location" + i});
    }

    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(data), "UTF-8");
};

let getParameterValue = (request, parameterName) => {
    let urlParts = url.parse(request.url, true);
    return urlParts.query[parameterName];
};

http.createServer(httpMain).listen(3000);
console.log("Server is running...\nhttp://localhost:3000");