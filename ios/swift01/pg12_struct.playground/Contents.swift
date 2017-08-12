import UIKit
import Darwin


// Struct are similar to classes
// Simple datatype when you dont need to inherit
// Used to model simple datastructures

struct MyStruct01 {
    var var01String: String;
    var var02Double: Double;
    // NOTE: static constants and variables can not be accessed in non static function
    static let let01Constant: Double = 4321.1234;
    // NOTE: we can name member properties same as static variable and constants
    let let01Constant: Double = 1234.4321;
    
    func displayVars () -> String {
        return "var01String = \(var01String), var02Double = \(var02Double), var03ComputedProperty = \(var03ComputedProperty), let01Constant = \(let01Constant)";
    }

    // When Struct is initilized/contructed we have assign values to all the variables in the Stuct. BUT NOT COMPUTED PROPERTIES.
    // Computed properties must have "get" block. Which means its value will could be obtained using some of the calculation in "get" block
    // Outside Struct computed properties are used as normal variable.
    // Optionaly we can also define "set" block. This block will be used when we have to do some calculation when assigning value to this property
    var var03ComputedProperty: Double {
        set (p){
            var02Double += (p + 10);
        }
 
        get {
            return var02Double + 10;
        }
    }
}


var myStruct01a = MyStruct01(var01String: "Hello", var02Double: 10.55);
var myStruct01b = MyStruct01(var01String: "World", var02Double: 50.66);


print("myStruct01a.displayVars() = \(myStruct01a.displayVars())");

print("myStruct01b.displayVars() = \(myStruct01b.displayVars())");


myStruct01b.var03ComputedProperty = 50;

// Notice changes made to var02Double and var03ComputedProperty
print("After myStruct01b.var03ComputedProperty = 50;")
print("myStruct01b.displayVars() = \(myStruct01b.displayVars())");