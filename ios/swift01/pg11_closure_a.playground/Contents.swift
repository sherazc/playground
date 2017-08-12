import UIKit
import Darwin

// Closure are anonymous function that you assign to variable
// This is what the closure looks like
/*
{(param1: ParamType, param2: ParamType) -> ReturnType in
    statements
    return returnTypeValue;
}
*/

// var closureName: ReceivesArguments -> ReturnResult {ReceivesArgumentsNames in Defination}
var square: Int -> Int = { num in
    return num * num;
}


print("square(5) = \(square(5))");

let squareCopy = square;

print("squareCopy(5) = \(squareCopy(5))");


// Closure that receives nothing and returns nothing
// NOTE: if closure dont accecpt any arguments and dont return anything then we dont have to give ": () -> ()"
var sayGoodbye: () -> () = {
    print("Goodbye!!!");
}

sayGoodbye();


// Closure that have no attributes and return something
// NOTE: closure dont have to write "return" keyword. result from the last statement will be returned
var sayHappyBirthday: () -> (String) = {
    "Happy Birthday!!!"
}


print("sayHappyBirthday() = \(sayHappyBirthday())");


// Unlike function, closures can reference variable defined outside their scope

var myInt01 = 5;

print("Before modifyMyInt01() myInt01 = \(myInt01)");

var modifyMyInt01 = {
    myInt01 += 10;
}

modifyMyInt01();

print("After modifyMyInt01() myInt01 = \(myInt01)");



// Run closure on each item of array
// This example runs on each item of array makes square of it convert it to String and return String array
let myNums = [1, 2, 3, 4, 5];


let myNumsToSquare = myNums.map { (num: Int) -> String in
    "\(num * num)"
};

let myNumsSquareStringArray = myNumsToSquare;

print("myNumsSquareStringArray = \(myNumsSquareStringArray)");







