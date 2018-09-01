// Compose function
function compose(a, b) {
    return function(c) {
        return a(b(c))
    }
}

// Function A
let fnA = function (n) {
    return n + ", A";
};

// Function B
let fnB = function (n) {
    return n + ", B";
};

// Creating composed function
let composedFunction = compose(fnA, fnB);

// Calling composed function
let composedFunctionResult = composedFunction("XYZ");
console.log(composedFunctionResult);
