import UIKit
import Darwin


func sumIt() -> ((Int, Int) -> Int)  {

    func sum(num1:Int, num2:Int) -> Int {
        return num1 + num2;
    }
    
    return sum;
}

let getValue = sumIt();

print("getValue(2, 3) = \(getValue(2, 3))");