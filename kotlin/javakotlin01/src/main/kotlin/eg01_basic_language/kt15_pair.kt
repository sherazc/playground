package eg01_basic_language

fun main() {
    // Pair is used to pass around or return couple of values

    val p1 = Pair("a", "b")
    println(p1)

    val p2 = "k1" to "v1"
    println(p2)

    fun nextTwo(i: Int) = Pair(i + 1, i + 2)
    val p = nextTwo(10)
    println(p)
    println(p.first)
    println(p.second)
}
