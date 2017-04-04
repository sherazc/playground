import Foundation


func multiply(num1:Double, num2:Double)->Double {
    return num1 * num2;
}

class CalculatorService {
    
    private var accumulator = 0.0;
    
    var result: Double {
        get {
            return accumulator;
        }
    }
    
    // We are declaring it optional because we will only need it if we are performing binary operation. Otherwise it will be nil
    private var pending: PendingBinaryOperationInfo?;
    
    
    // struct are exactly like a class.
    // struct are passed by value unlike class's Objects
    // By default classes get empty arguments constructor
    // By default struts get all arguments constructor
    private struct PendingBinaryOperationInfo{
        var binaryFunction: (Double, Double) -> Double;
        var firstOperend: Double;
    }
    
    // enum is just like java's enum. We can also create functions inside enum.
    // But we can't create var inside enum. Enums unlike class can't inherit
    // enums are always pass by value
    // each enum case could have its own associated value.
    // Associated values could of of different types in the same enum
    enum Operation {
        case Constant(Double);
        case UnaryOperation(Double -> Double);
        case BinaryOperation((Double, Double) -> Double);
        case Equals;
        
        
        // Line below is compile error. "Enums may not contain stored properties"
        //let testVar = "testValue";
    }
    
    
    // Here we are declaring and initializing Dictionary
    // Dictionary are just like java's Map
    private var operations: Dictionary<String, Operation> = [
        // private var operations = [
        "π": Operation.Constant(M_PI),
        "e": Operation.Constant(M_E), // M_E
        "√" : Operation.UnaryOperation(sqrt),
        "cos": Operation.UnaryOperation(cos),
        "±": Operation.UnaryOperation({-$0}),
        "✖️": Operation.BinaryOperation(multiply),
        "➕": Operation.BinaryOperation({$0 + $1}),
        "➖": Operation.BinaryOperation({$0 - $1}),
        "➗": Operation.BinaryOperation({$0 / $1}),
        "=": Operation.Equals
    ];
    
    
    
    
    func setOperand(operand: Double) {
        accumulator = operand;
    }
    
    func performOperation(symbol:String) {
        
        // operations[symbol] returns optional but if we do "if let" it unwraps it in its block
        if let operationToBePerformed = operations[symbol] {
            switch operationToBePerformed {
                
                // Note different variation of using enum defined within this class. Could be used with "EnumName." or ".". Because we are switching on Operation
                // Note we are getting enum's associated values
            case Operation.Constant(let associatedConstantValue):
                accumulator = associatedConstantValue;
                break;
            case .UnaryOperation(let associatedUnaryFunction):
                accumulator = associatedUnaryFunction(accumulator);
                break;
            case .Equals:
                executePendingBinaryOperation();
                break;
            case .BinaryOperation(let binaryFunctionToBePerformed):
                executePendingBinaryOperation();
                pending = PendingBinaryOperationInfo(binaryFunction: binaryFunctionToBePerformed, firstOperend: accumulator);
                break;
            }
        }
    }
    
    private func executePendingBinaryOperation() {
        if (pending != nil) {
            accumulator = pending!.binaryFunction(pending!.firstOperend, accumulator);
            pending = nil;
        }
    }
}









