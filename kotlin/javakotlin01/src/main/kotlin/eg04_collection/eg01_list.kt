package eg04_collection

fun main() {
    val list = listOf(100, 200, 300)

    // List stream lambda iteration
    list.filter { it > 150 }.forEach { println(it) }

    // List loop iteration
    for (i in list) {
        println(i)
    }

    // List index iteration
    for (index in list.indices) {
        println(list[index])
    }
}
