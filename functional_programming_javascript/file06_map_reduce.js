/*
To run this example run the following commands:
$ npm install
$ ./node_modules/.bin/babel-node --presets es2015 file06_map_reduce.js
*/
import fs from "fs";

/*
The example below will create a object with person name as key
and array of order for that person
*/


/*
3 lines of code below:
- Read file content
- Trim the content
- split each file line into separate array element
- convert each line into array of by splitting it on tab character

Final result is of these 3 lines is 2 dimensional array of each
tab separated value. Each line contains there values:
element[0] = person name
element[1] = item name
element[2] = price
element[3] = quantity

*/
let fileDataArray = fs.readFileSync("data_files/orders.csv", "utf8").trim().split("\r").map(function (line) {
    return line.trim().split("\t");
});

let personsOrders = fileDataArray.reduce((previousOrderResults, orderLineItem) => {
    // in the first iteration, line below will return an empty array
    // in the iterations after first line below will return previous orders array
    previousOrderResults[orderLineItem[0]] = previousOrderResults[orderLineItem[0]] || [];

    // Next order data is pushed in the array
    previousOrderResults[orderLineItem[0]].push({
        name: orderLineItem[1],
        price: orderLineItem[2],
        quantity: orderLineItem[3]
    });


    return previousOrderResults;
}, {}); // Empty object is this initial/starting object that will be modified

console.log(JSON.stringify(personsOrders, null, 2));


