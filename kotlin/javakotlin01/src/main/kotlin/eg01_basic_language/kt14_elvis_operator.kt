package eg01_basic_language

fun main() {
    val s:String? = "Sheraz"

    // inline if expression
    val l1 = if (s == null) -1 else s.length
    println(l1)

    // Above if expression can be written with "?:" elvis operator
    val l2 = s?.length ?: -1
    println(l2)
}
