class A {
    fun m1() = println("A.m1()")
}

fun A.m2() {
    println("A.m2()")
}

fun main() {
    val a = A()
    a.m1();
    a.m2()

    fun String.isMyName() = run { this.equals("Sheraz", true) }
}
