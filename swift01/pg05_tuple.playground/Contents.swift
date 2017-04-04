import UIKit
import Darwin

// Tuples group multiple values into one variable. Kind of like json/enum/map.



var tuple01 = (
    key1 : "value1",
    key2 : "value2",
    key3 : 10.55,
    key4 : 100
);

print("tuple01.key1 = \(tuple01.key1)");
print("tuple01.0 = \(tuple01.0)");

tuple01.key2 = "new value 2";

print("tuple01.1 = \(tuple01.1)");

// =======

let tuple02 = (10, "mystring", 50.44);


print("tuple02.0 = \(tuple02.0)");

