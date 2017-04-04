// print("myString.asArray = \(myString.asArray)");

// Instead of using Hardcoded types we can use Generics when using types in funciton and classes.
// swift Generics are almost same as java generics

// T is generic type in this
func printAnyArray<T>(values: [T]) {
    var index = 0;
    for value in values {
        index += 1;
        print("printAnyArray index=\(index), value=\(value)");
    }
}

printAnyArray(["a", "b", "c"]);
printAnyArray([1,2,3]);
// printAnyArray("astring".characters);

print("====================");

// T is any type that extends SequenceType. Array and String both extend SequenceType. So same function can work with Array and String. 
// In swift String is sequence of character
func printAnySequence<T: SequenceType>(values: T) {
    var index = 0;
    for value in values {
        index += 1;
        print("printAnySequence index=\(index), value=\(value)");
    }
}

printAnySequence(["a", "b", "c"]);
printAnySequence([1,2,3]);

// This would have worked in versions before Swift 2. Not sure how to make it work. Need more research on Swift String
// printAnySequence("myname");
// printAnySequence("myname".characters);


print("====================");

func areTheyEqual<T : Equatable> (val1 val1: T, val2: T) -> Bool {
    return val1 == val2;
}

print("areTheyEqual(val1: 100, val2: 100) = \(areTheyEqual(val1: 100, val2: 100))");
print("areTheyEqual(val1: \"value1\", val2: \"value2\") = \(areTheyEqual(val1: "value1", val2: "value2"))");
print("areTheyEqual(val1: \"value1\", val2: \"value1\") = \(areTheyEqual(val1: "value1", val2: "value1"))");


print("====================");

func compareVal1GreaterThanVal2<T : Comparable> (val1 val1: T, val2: T) -> Bool {
    return val1 > val2;
}


print("compareVal1GreaterThanVal2(val1: 200, val2: 100) = \(compareVal1GreaterThanVal2(val1: 200, val2: 100))");
print("compareVal1GreaterThanVal2(val1: \"value2\", val2: \"value1\") = \(compareVal1GreaterThanVal2(val1: "value2", val2: "value1"))");
print("compareVal1GreaterThanVal2(val1: \"b\", val2: \"a\") = \(compareVal1GreaterThanVal2(val1: "b", val2: "a"))");
