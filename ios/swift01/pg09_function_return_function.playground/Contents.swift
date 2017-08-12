import UIKit
import Darwin

func average(nums: Int...) -> Double {
    var sum = 0;
    
    for num in nums {
        sum += num;
    }
    
    return Double(sum) / Double(nums.count);
}

func sum(nums: Int...) -> Double {
    var sum = 0;
    
    for num in nums {
        sum += num;
    }
    
    return Double(sum);
}

func domath(mathOption: String) -> (Int...) -> Double {
    if (mathOption == "average") {
        return average;
    } else {
        return sum;
    }
}

var math01average = domath("average");
var math02sum = domath("sum");

print("math01average(1,2,3,4,5) = \(math01average(1,2,3,4,5))");
print("math02sum(1,2,3,4,5) = \(math02sum(1,2,3,4,5))")


