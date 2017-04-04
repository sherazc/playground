import UIKit
import Darwin

// print("myStruct01b.displayVars() = \(myStruct01b.displayVars())");

// Note: all properties of struct and class must be initialized. Other than computed properties;

/**
Swift have three access controll
public, internal, private
By default class variables and functions are internal. Internal are like java's friendly.
*/

class Animal {

    // If a class property is not initialized inline then it must be initialized in init/constructor
    var name: String;
    var age: Int;
    var sound: String = "No Sound";
    var legs: Int {get{return 0}}
    
    // private variable/functions are visible in the file. Unlike java private variables/function are visible outside class but not out side file.
    private var displayCount = 0;
    
    // init is constructor;
    // if not contructor is defined then a default is automatically created just like java
    init () {
        // "self" is just like "this" in java
        self.name = "No Name";
        // just like java we dont have to give self if it is not needed
        age = 0;
    }
    
    // Overloading multiple constructor
    init (name: String, age: Int, sound: String) {
        self.name = name;
        self.age = age;
        self.sound = sound;
    }
    
    // final function works just like java's final
    // private variable/functions are visible in the file. Unlike java private variables/function are visible outside class but not out side file.
    private final func addDisplayCount() -> (Int) {
        displayCount += 1;
        return displayCount;
    }
    
    // NOTE: if no return putting "->()" is optional
    func displayStatus()->() {
        self.addDisplayCount();
        print("name=\(name),age=\(age),sound=\(sound),displayCount=\(displayCount)");
    }
    
    // NOTE: over loading works just like java. No special keyword
    func displayStatus(customMessage:String) {
        print(customMessage);
        self.displayStatus();
    }
}


// Child class
class Dog: Animal {

    var color: String;
    
    // just like java super constructor should be called
    init(color: String) {
        self.color = color;
        // Before calling "super.init()" all the self class variables should be initialized.
        super.init();
    }
    
    // overriding parent constructor must be prefixed with "override" keyword.
    override init (name: String, age: Int, sound: String) {
        self.color = "No color";
        super.init(name: name, age: age, sound: sound);
    }
    
    init (name: String, age: Int, sound: String, color: String) {
        self.color = color;
        super.init(name: name, age: age, sound: sound);
    }
    
    // overriding parent method must be prefixed with "override" keyword.
    override func displayStatus() {
        super.displayStatus();
        print("color=\(color)");
    }
}



var animal01:Animal = Animal(name: "name01", age: 10, sound: "sound01");
var animal02:Animal = Dog(name: "name02", age: 20, sound: "sound02", color: "color02");
// NOTE: "as!" keyword is used to typecast. "as!" means force typecast
var dog01FromAnimal02: Dog = animal02 as! Dog;


//JL java's instance of
print("animal01 is Animal = \(animal01 is Animal)");
print("animal02 is Animal = \(animal02 is Animal)");
print("dog01FromAnimal02 is Animal = \(dog01FromAnimal02 is Animal)");

print("animal01 is Dog = \(animal01 is Dog)");
print("animal02 is Dog = \(animal02 is Dog)");
print("dog01FromAnimal02 is Dog = \(dog01FromAnimal02 is Dog)");

// Call function JL java
animal01.displayStatus();
animal02.displayStatus();
dog01FromAnimal02.displayStatus();

// Note we can access private function because we are in the same file
print("private function animal01.addDisplayCount() = \(animal01.addDisplayCount())")



func printStatusOfAnimal(animal: Animal) {
    animal.displayStatus();
}

animal02.displayCount += 100;

printStatusOfAnimal(animal01);
printStatusOfAnimal(animal02);
printStatusOfAnimal(dog01FromAnimal02);
