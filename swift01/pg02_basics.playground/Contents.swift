/**
 * Type Casting
 */

import UIKit
import Darwin;

var myInt1: Int = 100;
var myFloat1: Float = 10.99;
var myBool1: Bool = true;

var myInt2: Int = Int(myBool1)
myInt2 = Int(myFloat1)


var myFloat2: Float = Float (myInt1);
myFloat2 = Float(myBool1)

print("myInt1 to Bool: \(Bool(myInt1))")
print("myFloat1 to Bool: \(Bool(myFloat1))")

let myAgeString = "6.25"
// let myAgeInt = myAgeString.toInt()
let myAgeFloat = (myAgeString as NSString).floatValue;

/**
 * Random
 */

// Random Number generator
print(arc4random());

// Random Number Between 0 and 10
print(arc4random() % 11);


var age = 50;
if age < 18 {
    print("You cant drive")
} else if (age > 100) && (age < 150) {
    print("You are too old")
} else {
    print("I dont know")
}


/**
 * Switch
 */

let number = "one"

switch number {
    case "One", "one":
        print("this is one")
        fallthrough // fallthrough also check next case.
    case "1", "one":
        print("this is also one")
    case "two":
        print("this is two");
    default:
        print("not one")
}


let testScore = 95

switch testScore {
case 90...100:
    print("A");
case 80...89:
    print("B");
case 70...79:
    print("C")
default:
    print("Bad score")
}













