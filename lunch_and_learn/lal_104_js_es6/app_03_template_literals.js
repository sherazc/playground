// Three methods to initialize Strings
var firstName = "Sheraz";
let middleName = 'Tariq';
const lastName = `Chaudhry`;

// Template literals can be multi-lines and
// can inject variables just like JSP expression language
let name = `My name
is ${firstName} ${middleName.substr(0, 1)} ${lastName}`;

console.log(name);
