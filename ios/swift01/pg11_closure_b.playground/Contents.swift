import UIKit

// Closure are same as normal function. But closure are assigned to variables. 
// If a function is assigned to variable then it could be used as closure
// Function can be assigned to closure but closure can not be assigned to function
// Closure could be used as the function
// Unlike function, closure's parameters and return(signature) are defined within{} followed by "in" keyword


// ###### function version
func sayHelloWorldFunction() {
    print("Hello World Function");
}
sayHelloWorldFunction();

// ###### Closure version
var sayHelloWorldClosure: () -> () = {
    // below line is optional if parameters are not being used and have no return
    // () -> () in
    print("Hello World Closure");
}
sayHelloWorldClosure();

// Assigning function to variable
sayHelloWorldClosure = sayHelloWorldFunction;
sayHelloWorldClosure();



// ###### concat function version
func concatStringFuction(str1:String, str2:String) -> String {
    return str1 + str2;
}

// ###### concat Closure version 1
var concatStringClosure: (String,String) -> String;
concatStringClosure = {
    a, b -> String in
    return a + b;
}

// ###### concat Closure version 2. single line. 
// Result from last statement is returned and we dont have to use "return" keyword
concatStringClosure = {
    a, b -> String in a + b;
}

// ###### concat Closure version 3. using parameters index numbers
concatStringClosure = {
    $0 + $1;
}

// ###### Another example of using parameter index
var hasPrefixAndSuffix: (String, String, String) -> Bool  = {
    $0.hasPrefix($1) && $0.hasSuffix($2);
}


var resultHasPrefixAndSuffix = hasPrefixAndSuffix("aaa bbb ccc", "aaa", "ccc");
print("resultHasPrefixAndSuffix = \(resultHasPrefixAndSuffix)");
