import UIKit
import Darwin

// Single argument function
func sayHello(name: String) {
    
    // NOTE: we cant do this below. All argument are final.
    // name = "Changed";
    print("Hello \(name)");
}

sayHello("name1");


// Multiple arguments function
// returns a value
// also giving default value
// Also note first argument. num1 will be the lable that will be passed in by the caller and num4 will be used as the variable name
func sumNumber(num1 num4: Int = 10, num2: Int = 20, num3: Int = 30) -> Int {
    return num4 + num2 + num3;
}


print("sumNumber() \(sumNumber())");

// Note: I am changing arguments order
print("sumNumber(num3:300,  num2: 200) \(sumNumber(num3:300,  num2: 200))");

// you can change order or arguments but you have to give their labels
print("sumNumber(100, num3:300,  num2: 200) \(sumNumber( num3:300,  num2: 200, num1:100))");

// Variable number of arguments
func addAllFunction(nums:Int...) -> Int {
    var result = 0;
    for num in nums {
        result += num;
    }
    return result;
}

print("addAllFunction(1, 2, 3, 4, 5) \(addAllFunction(1, 2, 3, 4, 5))");

// Inout function
// By default values passed by value and are final which means that argument value cant be changed. 
// To pass values by reference we have use use "inout" and when calling the function we have to give "&" before the variable name.
func modifyValues(inout makeUpper makeUpper: String, inout makeLower: String, inout addTen: Int, inout divideByTwo: Float) {
    makeUpper = makeUpper.uppercaseString;
    makeLower = makeLower.lowercaseString;
    addTen += 10;
    divideByTwo /= 2;
}


var myMakeUpper = "sad";
var myMakeLower = "HAPPY";
var myAddTen = 30;
var myDivideByTwo:Float = 5;

print("Before myMakeUpper = \(myMakeUpper)");
print("Before myMakeLower = \(myMakeLower)");
print("Before myAddTen = \(myAddTen)");
print("Before myDivideByTwo = \(myDivideByTwo)");

modifyValues(makeUpper: &myMakeUpper, makeLower: &myMakeLower, addTen: &myAddTen, divideByTwo: &myDivideByTwo);

print("After myMakeUpper = \(myMakeUpper)");
print("After myMakeLower = \(myMakeLower)");
print("After myAddTen = \(myAddTen)");
print("After myDivideByTwo = \(myDivideByTwo)");


// Call function and give a value is error because function is looking for references.
// modifyValues(makeUpper: "sad", makeLower: "HAPPY", addTen: 30, divideByTwo: 5);



// Return Tuple. Return multiple values
func multipleNumbers(number : Int) -> (x2:Int, x3:Int) {
    return (number * 2, number * 3);
}

var multipleNumbersResult = multipleNumbers(5)
print("multipleNumbers(5) = \(multipleNumbersResult)");
print("multipleNumbersResult.x2 = \(multipleNumbersResult.x2)");
print("multipleNumbersResult.x3 = \(multipleNumbersResult.x3)");
