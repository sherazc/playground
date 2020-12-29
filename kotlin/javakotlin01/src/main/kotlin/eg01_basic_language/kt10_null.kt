package eg01_basic_language

fun main() {
    val a:String? = null
    val b = a?.length; // Find length if a is not null
    println("length of a = $b")

    try {
        val c = a!!.toUpperCase(); // Run toUpperCase even if a is null
    } catch (e: NullPointerException) {
        e.printStackTrace()
    }
}
