var showArguments = function() {
    // "arguments" is array link object that contains
    // all the arguments passed to a function.
    // It indexes all its values.
    console.log(arguments);

};
showArguments(2,3,4);

var argumentsToArray = function () {
// since "arguments" is not an array but actually an object
// so we have to use different techniques to convert it to an array
// e.g.
    var argumentsArray = [];
    for (var argument in arguments) {
        // TODO: find how this is working
        argumentsArray[argument] = arguments[argument];
    }
    return argumentsArray
};

console.log(argumentsToArray(2,4,5));