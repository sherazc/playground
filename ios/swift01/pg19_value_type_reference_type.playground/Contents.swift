// https://developer.apple.com/swift/blog/?id=10

// Types in swift are value type and reference type.
// When value type are assigned from one variable to another their values are copied
// When Reference type are assigned from one variable to another their reference is assigned

// Value type are struct, enum, or tuple Int, Float, String
// Reference type are Classes

// Notice both variable have different values
var myVar01 = "value01";
var myVar02 = myVar01;
myVar01 = "Value01 Changed"
print("myVar01 = \(myVar01)");
print("myVar02 = \(myVar02)");


// Notice both variable have same values
class MyClass01 {
    var myVar: String = "";
}

var myVar03 = MyClass01();
var myVar04 = myVar03;

myVar03.myVar = "myVar03.myVar value";

print("myVar03.myVar = \(myVar03.myVar)");
print("myVar04.myVar = \(myVar04.myVar)");
