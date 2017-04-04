import UIKit
import Darwin;


// Declaring prepopulated Arrays
let array01String: Array<String> = ["value01", "value02", "value03"];

let array02Int: Array<Int> = [10, 20, 30];

print("array02Int[1] = \(array02Int[1])")


// Declaring empty Arrays
var array03String = [String]();

// Adding items to Arrays
array03String.append("value01");
array03String.append("value02");
array03String.append("value03");

// Array total items
print("array03String.count = \(array03String.count)");



// Adding item at specific index. And pushing other items
array03String.insert("valueA", atIndex: 1);

// Replacing item
array03String[1] = "valueB";


// Remove an item by index. Note all the remove method return values that they remove.
let valueRemoved01 = array03String.removeAtIndex(1);
array03String.removeLast();
array03String.removeFirst();
array03String.removeAll()

print("valueRemoved01 = \(valueRemoved01)");

array03String.append("value01");
array03String.append("value02");
array03String.append("value03");


// Find a value in Array
let foundIndex01 = array03String.indexOf("valueA");
let foundIndex02 = array03String.indexOf("value03");

print("foundIndex01 = \(foundIndex01)");
print("foundIndex02 = \(foundIndex02)");

if let foundIndex03 = array03String.indexOf("value02") {
    print("foundIndex03 = \(foundIndex03)");
    array03String.removeAtIndex(foundIndex03);

} else {
    print("Element not found.");
}



// Sort Array ascending
array03String.sort();
// optionally you can use array03String.sort(<);


// Sort Array descending
array03String.sort(>);


// Reverse array
var array03Reverse = array03String.reverse()

print("array03Reverse = \(array03Reverse)");

// Multi dimensional array. The more the square bracket
var array04MultiInt: [[Int]] = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]

print("array04MultiInt[2][1] = \(array04MultiInt[2][1])");


// Looping over Arrays
for row in array04MultiInt {
    for column in row {
        print("row:column \(row):\(column)");
    }
}




