// Function
var helloFunction = function(name) {
    return "Hello " + name;
};

// Higher order function - Because it could take in a function and could return a function
var bannerFunction = function(fn) {
    return function(name) {
        var helloFunctionResult = fn.apply(this, [name]);
        return "====\n" + helloFunctionResult + "\n====";
    }
};

// Combining functions to create a new function
var bannerHelloFunction = bannerFunction(helloFunction);

// Calling the combined function.
var bannerHelloFunctionResult = bannerHelloFunction("Sheraz");
console.log(bannerHelloFunctionResult);
