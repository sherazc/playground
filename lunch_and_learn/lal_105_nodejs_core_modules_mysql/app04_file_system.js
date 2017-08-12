import fs from "fs";

let fileName = "file01.log";
// Write
fs.writeFileSync(fileName, "Content in the file.");
console.log("File Ceated: " + fileName);

// Read
let fileContent = fs.readFileSync(fileName).toString();
console.log("File Reading: " + fileName);
console.log("File Content: " + fileContent);

// Delete - unlink is alias of rm
fs.unlinkSync(fileName);
console.log("File Deleted: " + fileName);