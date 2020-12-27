package eg01_basic_language

fun main(args: Array<String>) {
    // it. For single argument lambda, "it" can be used and not specify variable name
    fun calculate1(a: Int, b: (Int) -> Int) = println("calculate1 = ${b(a)}")
    calculate1(2) { i -> i * 2 }
    calculate1(2) { it * 2 }

    // _. Underscore could be used for argument that are not used in lambda
    fun calculate2(a: Int, b: Int, c: Int, total: (Int, Int, Int) -> Int) = println("calculate2 = ${total(a, b, c)}")
    val doubleMiddle = { _: Int, i: Int, _: Int -> i * 2 } // Underscore for first and last
    calculate2(1, 2, 3, doubleMiddle)
    calculate2(1, 2, 3) { _, i, _ -> i * 2 }
}
