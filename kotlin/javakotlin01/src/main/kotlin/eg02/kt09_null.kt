package eg02

import java.lang.NullPointerException

fun main(args: Array<String>) {
    val a:String? = null
    val b = a?.length; // Find length if a is not null
    println("length of a = $b")

    try {
        val c = a!!.toUpperCase(); // Run toUpperCase even if a is null
    } catch (e: NullPointerException) {
        e.printStackTrace()
    }
}
