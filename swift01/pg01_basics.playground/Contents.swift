/**
 * Basics
 */


import UIKit
// Darwin contains C libraries
import Darwin

// var is to create variable
// swift will determine by the initial value the data type of variable
var str1 = "Hello, playground"
// line below is an error becuase of wrong datatype
// str1 = 1


// let is used to create constants
let strConstant = "I can't change"


// We cant spacify data type after the variable name
var str2: String = "String variable"
let myInt: Int = 100;
let myUInt64: UInt64 = 200;

var maxInt: Int = Int.max
var maxUInt: UInt64 = UInt64.max

print("str1 = \(str1)");

print(myInt);


// Few other datatypes:
// Int
// UInt // Unsigned Integer
// Double Float
// String 
// Bool


// we can also find Max values using following:

print("Max Float \(FLT_MAX)");

print("Max Double \(DBL_MAX)");

// 6 decimal digits precision
let precisionFloat: Float = 1.999999 + 0.0000005;

print("Float Precision = ", precisionFloat);


let precisionDouble: Double = 1.9999999999999999 + 0.00000000000000005;

print("Double Precision = ", precisionDouble);

// String concatinate

let myString = "String 1 " + " String 2";

let myString2 = myString + " String 3";






