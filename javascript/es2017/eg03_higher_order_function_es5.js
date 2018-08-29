var helloFunction = function(name) {
    return "Hello " + name;
};

var bannerFunction = function(fn) {
    return function(name) {
        var helloFunctionResult = fn.apply(this, [name]);
        return "====\n" + helloFunctionResult + "\n====";
    }
};

var bannerHelloFunction = bannerFunction(helloFunction);
var bannerHelloFunctionResult = bannerHelloFunction("Sheraz");

console.log(bannerHelloFunctionResult);