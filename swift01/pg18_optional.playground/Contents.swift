// ################## OPTIONAL ##################
// "nil" is just like null in java


//Normal variables can not be assigned "nil"
var myVar01:String = "value01";

// Below line is compilation error.
// myVar01 = nil;

// To make variable that could be assigned nil, we have to use ? when declaring them
var myVar02:String? = "value02"
myVar02 = nil;
var myVar03:String? = nil;

var myVar04:String?


myVar02 = "value02 changed"

// Whenever an optional value is created, variable value is wrapped in "Optional()"
print("Optional myVar02 = \(myVar02)")

// Compilation error. Optional variable can only be assigned to other optional variables
// myVar01 = myVar02;

// To get the value out of Optional() we use ! and then it can be assigned to non optional variables
myVar01 = myVar02!

// This could be Compilation/Runtime error. If we get the value out of optional and its nil then it will throw somthing similar to NullPointerException
// myVar01 = myVar03!


// we could use check for nil just like we do in java
if myVar03 == nil {
    print("myVar03 is nil");
} else {
    print("myVar03 is nil")
}

// Binding optional value: is to check and assign value to a constant and run a block of code. It is done like:
if let myVar05 = myVar03 {
    print("Optional myVar05 = \(myVar05)")
} else {
    print("Optional myVar03 can not be assigned to myVar05 because its nil")
}


// ################## IMPLICITLY UNWRAPPED OPTIONAL ##################
// These are normal optional. While using them we dont have to use write exclamation mark
var myVar06:String!;

print("myVar06 == nil = \(myVar06 == nil)")

myVar06 = "value06"






