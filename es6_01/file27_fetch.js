let fetch = require("node-fetch");

/*
 NPM node-fetch
 https://www.npmjs.com/package/node-fetch

 Using Fetch API
 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

 Fetch Response object
 https://developer.mozilla.org/en-US/docs/Web/API/Response
 */

let serviceUrl = "http://dashboard.masjidhamzah.com/salat_time.php";

fetch(serviceUrl).then((response) => {
    // Parsing response to JSON
    response.json().then((responseJson) => {
        console.log("Received response and parsed its body to JSON: ", responseJson);
    }, (responseJsonError) => {
        console.error("Error parsing JSON. ", responseJsonError);
    });
}, (responseError) => {
    console.error("Error accessing service URL. ", responseError);
});

fetch(serviceUrl).then((response) => {
    // Trying to get body text of response
    response.text().then((responseJson) => {
        console.log("Received response text: ", responseJson);
    });
});