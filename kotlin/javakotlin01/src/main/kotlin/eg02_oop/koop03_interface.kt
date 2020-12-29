package eg02_oop

interface A {
    fun a1()
    fun a2() {
        println("Interface A function f2")
    }
}

interface B {
    var b1: Int
    fun b2()
}

// C inherits A and B
interface C : A, B

// D implements A, B, and C
class D: A, B, C {
    override fun a1() {
        println("a1")
    }

    override var b1: Int = 20;

    override fun b2() {
        println("b2")
    }
}

fun main() {
    val x = D();
    x.a1()
    x.a2()
    println(x.b1)
}
