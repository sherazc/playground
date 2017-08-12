let person = {
    name: "Sheraz",
    age: 20,
    // named it "personLocation" instead of "location" so that it will
    // not get confused by browser location object
    personLocation: "Atlanta"
};

// In ES5 to create a new variable from the object's property, we do:
let name1 = person.name;
let age1VarName = "age";
let age1 = person[age1VarName];
let personLocation1 = person["personLocation"];
console.log(name1, age1, personLocation1);

// In ES6 we can use destructuring
// Below line will create a new variable "name2" and put the value of person.name in it.
let {name: name2} = person;
// Or to get multiple object properties in new variable
let {age: age2, personLocation: personLocation2} = person;
console.log(name2, age2, personLocation2);

// We can also use shorthand version.
// This line will create same name variables as they are in person object.
let {name, age, personLocation} = person;
console.log(name, age, personLocation);

let {["name"]:name3, ["age"]: age3, ["personLocation"]: personLocation3} = person;
console.log(name3, age3, personLocation3);

// This syntax can be used to dynamically set property name
let name4VarName = "name";
let age4VarName = "age";
let personLocation4VarName = "personLocation";
let {[name4VarName]: name4, [age4VarName]: age4, [personLocation4VarName]: personLocation4} = person;
console.log(name4, age4, personLocation4);
