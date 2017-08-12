import UIKit
import Darwin

// Protocol is just like java interface. one difference is we can also write sinatures of computed properties.
// Another difference between java's interface and Protocol is that we can not add constants
protocol Protocol01 {
    // Impemetor of this protocol must make this property.
    // "{get set}" specify that when accessed this variable throught this protocol, user of this protocol will be able to set
    // and get this variable;
    var var01:String {get set};
    
    // This is not posible. Compilation error.
    // let var02:String;
    
    // This variable will only be getable.
    // Note: "get" alone is possible. But "set" alown is compilation error. JL the rule of computational properties.
    // in other words, this is just read only variable.
    var var03:String {get}
    
    // This is not possible. Compilation error
    // var var04:String {set};
    
    // function defination works the say way it works in Java's interface
    func function01PrintVars();
}

class Class01 : Protocol01 {

    var var01:String;
    var var03:String;
    
    init() {
        var01 = "value01";
        var03 = "value03";
    }
    
    func function01PrintVars() {
        print("var01 = \(var01), var03 = \(var03)");
    }
}


var protocol01Var01:Protocol01 = Class01();

protocol01Var01.var01 = "Value01Changed";
// Not posible, becuase its a read only property
// protocol01Var01.var03 = "Value03Changed";
protocol01Var01.function01PrintVars();


print("protocol01Var01 is Class01 = \(protocol01Var01 is Class01)");

