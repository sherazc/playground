package eg01_basic_language

import java.util.*

fun main(args: Array<String>) {
    // Defining lambdas
    val sumA: (Int, Int) -> Int = {a: Int, b: Int ->
        // Multi line lambda body
        val result = a + b
        // there is no return keyword. Last line is returned.
        result
    }

    println(sumA(1, 2))

    val sumB: (Int, Int) -> Int = {a: Int, b: Int -> a + b }
    println(sumB(1, 2))

    val sumC = {a: Int, b: Int -> a + b }
    println(sumC(1, 2))

    // Functions with lambda arguments
    fun calculate1(a: Int, b: Int, c: (Int, Int) -> Int) {
        println(c(a, b))
    }

    calculate1(1, 3, { a, b -> a + b })
    // Could be written like this if lambda is the last argument
    calculate1(1, 3) { a, b -> a + b }

    fun calculate2(a: Int, c: (Int, Int) -> Int, b: Int) {
        println(c(a, b))
    }
    // above syntax is not possible if lambda is not the last argument
    calculate2(1,  { a, b -> a + b }, 3)

    // Using builtin kotlin java functions that expects lambda
    val strings = listOf("a", "b", "c")
    println(Collections.max((strings), { a, b -> a.compareTo(b) }))
    println(Collections.max(strings) { a, b -> a.compareTo(b) })
}
