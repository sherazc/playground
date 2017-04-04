/*
With extention we can add function and variables to already created Classes
*/

// Because of doing this whenever a normal String is created, then all the extention variable and functions will be added to it.
extension String {
    
    // var variableName:VariableType {block that creates and return the variable}
    var lenthPlusTen:Int {
        return self.characters.count + 10;
    }
    
    // This will result in compilation error
    // var test:Int = 100;
    
    var asArray:[Character] {
        var result: [Character] = [Character]()
        
        for char in self.characters {
            result.append(char);
        }
        
        return result;
    }
    
    // There is not change function sentex.
    func letterOccerence(theChar: Character) -> Int {
        
        var result = 0;
        for char in self.characters {
            if (char == theChar) {
                result += 1;
            }
        }
        
        return result;
    }
}

// This is a normal Stirng but have extension in behavior
let myString = "I am writing a very long sentance.";

let aCount = myString.letterOccerence("a");

print("myString.letterOccerence(\"a\") = \(myString.letterOccerence("a"))");

print("myString.asArray = \(myString.asArray)");

print("myString.lenthPlusTen = \(myString.lenthPlusTen)");

//###################################
class MyClass01{}

extension MyClass01 {
    func printHelloWorld() {
        print("Hello World");
    }
}

var myClass01Var01 = MyClass01();

myClass01Var01.printHelloWorld();








