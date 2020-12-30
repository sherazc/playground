package eg04_collection

fun main() {
    val pair = "k1" to "v1"
    val map = mapOf(pair, "k2" to "v2", Pair("k3", "v3"))

    // Map stream lambda iteration
    map
            .filter { (k, v) -> k != "k1" && v != "v1"}
            .forEach { (k, v) -> println("$k = $v") }

    // Map loop iteration
    for ((k, v) in map) {
        println("$k = $v")
    }
}
