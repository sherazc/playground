package eg02_oop

// Functional Interface.
// Note both keywords "fun interface"
fun interface I1 {
    fun f1(v: String)
}

fun main() {
    // Lambda to create from functional interface Object.
    val a = I1 {v -> println("$v Functional interface body")}
    a.f1("One")

    // Lambda to create from functional interface Object with single parameter function.
    val b = I1 { println("$it Functional interface body") }
    b.f1("Two")

    // Multi line function that create function interface object
    fun c(name: String): I1 {
        return I1 { println("$name, $it Functional interface body") }
    }
    c("Three").f1("Four")

    // Single line function that create function interface object
    fun d(name: String)= I1 { println("$name, $it Functional interface body") }
    d("Five").f1("Six")
}
