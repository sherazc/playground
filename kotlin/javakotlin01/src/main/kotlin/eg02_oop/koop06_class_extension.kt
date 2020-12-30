package eg02_oop

// In Kotlin classes are not closed for modification even after declaration
// class MyClass just have single method
class MyClass {
    fun m1() = println("MyClass.m1()")
}

// Add another function to MyClass after class declaration
fun MyClass.m2() {
    println("MyClass.m2()")
}

fun main() {
    val myClass = MyClass()
    myClass.m1()
    myClass.m2()

    // Add isMyName() function to java.lang.String class
    fun String.isMyName() = run { this.equals("Sheraz", true) }

    println(""""sheraz".isMyName() = ${"sheraz".isMyName()}""")
    println(""""Abrar".isMyName() = ${"Abrar".isMyName()}""")
}
