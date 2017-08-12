// enum EnumName: EnumType {
//  case enum1
// }

// enum is just like java's enum. We can also create functions inside enum.
// But we can't create var inside enum. Enums unlike class can't inherit
// enums are always pass by value
// each enum case could have its own associated value.
// Associated values could of of different types in the same enum

enum Color: Int {
    // By Default enum type Int. Their index starts from 0
    case blue
    case red
    // We can override its associated value
    case yellow = 200
    // Since we overrided associated value thats why next value will be plus 1. which is 201
    case green
    
    // optionally we could create a constructor
    // but if we create constructor then we have to assign self to some enum type other wise its a compilation error
    init () {
        self = .red;
    }
    
    // Overloading constructor just like class
    init(str1: String, d1:Double) {
        self = .blue;
    }
    
    
    func getData() -> String {
        var result: String;
        
        switch(self) {
        case .blue:
            result = "Blue"
        case .red:
            result = "Red"
        case .yellow:
            result = "Yellow"
        case .green:
            result = "Green"
            
        // NOTE: if init/contructor is created and then default will never be used
        default:
            result = "Not found"
            
        }
        return result;
    }
}


let color01 = Color();

let color02 = Color.blue;

let color03 = Color(str1: "Test", d1: 20.22);

print("Color() = \(Color())")
print("Color().rawValue = \(Color().rawValue)")
print("Color().hashValue = \(Color().hashValue)")
print("Color().getData() = \(Color().getData())")

print("Color.yellow = \(Color.yellow)")
print("Color.yellow.rawValue = \(Color.yellow.rawValue)")
print("Color.yellow.hashValue = \(Color.yellow.hashValue)")
print("Color.yellow.getData() = \(Color.yellow.getData())")

print("Color.green = \(Color.green)")
print("Color.green.rawValue = \(Color.green.rawValue)")
print("Color.green.hashValue = \(Color.green.hashValue)")
print("Color.green.getData() = \(Color.green.getData())")






