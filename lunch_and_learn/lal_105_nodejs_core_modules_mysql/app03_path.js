import path from "path";

let path01String = "//home/./mypath//../mypath/myfile.log";

console.log("path.normalize() = " + path.normalize(path01String));
console.log("path.dirname() = " + path.dirname(path01String));
console.log("path.basename() = " + path.basename(path01String));
console.log("path.extname() = " + path.extname(path01String));