package eg02_oop

class EmptyClass

class ClassWithBody {}

class ClassWithProperties {
    // By default each property is private
    // Each property gets public getter and setter
    val a = 10
}

class PrimaryConstructor constructor()

class PrimaryConstructorNoKeyword()

class ClassPropertyValuePassedInPrimaryConstructor(a: Int)

class ClassPropertyDefaultValue(a: Int = 10)

class InitializeProperties(a:Int = 10) {
    val b:Int = a * 2
}

class InitializePrimaryConstructor(a: Int = 10) {
    val b: Int
    init {
        b = a * 2;
        println("InitializePrimaryConstructor initialized")
    }
}

class ClassWithFunction {
    fun f1() {}
}

class SecondaryConstructor {
    constructor(a: Int)
}

// Secondary constructor have to call primary
class SecondaryConstructorCallPrimary(a: Int) {
    var b:Int = 0

    constructor(a: Int, b:Int) : this(a) {
        this.b = b
    }
}

fun main() {
    // Create object from class
    val obj = SecondaryConstructorCallPrimary(10, 20)
    println("SecondaryConstructorCallPrimary.b = ${obj.b}")
}
