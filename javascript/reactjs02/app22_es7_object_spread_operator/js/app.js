/*
NOTE:
spread operator in object is supported by ES7/ES2016
will not work in ES6/ES2015

http://stackoverflow.com/questions/36666433/node-5-10-spread-operator-not-working
https://github.com/sebmarkbage/ecmascript-rest-spread

As an alternative in ES6 we can user Object.assign()
=================
Spread operator... in object can be used
to create a new object by coping another object.
*/
var defaultPerson = {
    name: "No Name",
    location: "No Location",
    age: 100
};

var personA = {
    ...defaultPerson,
    age: 50
};

var personB = {
    ...personA,
    name: "Sheraz",
    salary: 1000
};

console.log("defaultPerson", defaultPerson);
console.log("personA", personA);
console.log("personB", personB);
