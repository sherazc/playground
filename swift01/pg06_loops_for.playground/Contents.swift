import UIKit
import Darwin


// NOTE: ++ and -- is depricated
// NOTE: this type of loop is depricated
for var i:Int = 1; i <= 100; i += 1 {
    if Bool(i % 2) {
        continue;
    }
    if (i > 10) {
        break;
    }
    print("even i = \(i)");
}

// NOTE: this is recomended for loop
for i in 0...100 {
    if !Bool(i % 2) {
        continue;
    }
    if (i > 10) {
        break;
    }
    print("odd i = \(i)");
}

for i in -3...3 {
    print("negative to positive i = \(i)");
}


for i in (1...5).reverse() {
    print("reverse i = \(i)");
}


for i in 50.stride(to: 10, by: -10) {
    print("stride i = \(i)");
}

// cycle through characters
var myQuote = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

var numberOfAs:Int = 0;

for singleChar in myQuote.characters {
    if (singleChar == "a") {
        numberOfAs += 1;
    }
}

print("numberOfAs = \(numberOfAs)");


// cycle through array
var array01: Array<String> = ["value1", "value2", "value3"]

for value in array01 {
    print("array value = \(value)");
}

// cycle through dictionary
var dictionary01:Dictionary<String, String> = ["key1":"value1", "key2":"value2", "key3":"value3"];

for (dictionaryKey, dictionaryValue) in dictionary01 {
    print("Dictionary Key Value =  \(dictionaryKey) = \(dictionaryValue)");
}






