// This example demonstrate different techniques to pass closure to a function

// This method takes in a String, 2 numbers and a closure
// String and two number have default value
// Important Note!!! closure parameter is the one and last required parameter. Thats why Technique 7 works
func performMathOperation(
        operationTypeMessage:String = "NoOperand",
        num1:Double = 0,
        num2:Double = 0,
        operation: (Double, Double) -> Double) {
    
    let mathOperationResult = operation(num1, num2);
    print("\(num1) \(operationTypeMessage) \(num2) = \(mathOperationResult)");
    print("=====================");
}


func addFunction(num1:Double, num2:Double) -> Double {
    return num1 + num2;
}

var addVariableClosure = {
    (n1:Double, n2:Double) -> Double in
    return n1 + n2;
};

// =======================
print("Technique 1: Pass in method name as a closure");
performMathOperation("add", num1: 10, num2: 20, operation: addFunction);


// =======================
print("Technique 2: Pass in closure variable name.");
performMathOperation("add", num1: 10, num2: 20, operation: addVariableClosure);



// =======================
print("Technique 3: In line closure. All variables, types and return are specified");
performMathOperation("minus", num1: 200, num2: 50, operation: {
    (n1:Double, n2:Double) -> Double in
    return n1 - n2;
});

// =======================
print("Technique 4: No types specified. No return type.");
performMathOperation("multiply", num1: 3, num2: 10, operation: {
    (n1, n2) in
    return n1 * n2;
});

// =======================
print("Technique 5: No types specified. No return type. No \"return\" keyword");
performMathOperation("divide", num1: 8, num2: 4, operation: {
    (n1, n2) in
    n1 / n2;
});

// =======================
print("Technique 6: No types specified. No return type. No \"return\" keyword. No variable names");
performMathOperation("add", num1: 15, num2: 5, operation: {$0 + $1;});


// =======================
print("Technique 7: No types specified. No return type. No \"return\" keyword. No variable names. SPECIAL SENTAX");
print("We are able to do this because \'performMathOperation\' only have one required parameter which is a closure parameter");
print("And is the last parameter in function definition");
performMathOperation {$0 + $1;};

