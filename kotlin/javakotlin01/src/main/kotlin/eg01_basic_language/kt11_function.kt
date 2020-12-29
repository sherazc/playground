package eg01_basic_language

fun main() {
    fun sum(a: Int, b: Int = 10, c: Int = 20): Int {
        fun addAB() = a + b // Functions can be created within a function
        fun addResultC() = addAB() + c // single line function
        return addResultC()
    }

    fun printResult(x: Int): Unit = println("The result is $x") // Unit is same as void in java

    val result = sum(5)

    printResult(result)
}
