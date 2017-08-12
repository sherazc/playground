var fs = require("fs");

var fileName = "file01.log";

fs.writeFileSync(fileName, "Content in the file.");
console.log("File Ceated: " + fileName);

var fileContent = fs.readFileSync(fileName).toString();
console.log("File Reading: " + fileName);
console.log("File Content: " + fileContent);

fs.unlinkSync(fileName);
console.log("File Deleted: " + fileName);