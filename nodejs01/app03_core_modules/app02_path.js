var path = require("path");

var path01String = "/home/mypath/myfile.log";

console.log(path.normalize(path01String));
console.log(path.dirname(path01String));
console.log(path.basename(path01String));
console.log(path.extname(path01String));