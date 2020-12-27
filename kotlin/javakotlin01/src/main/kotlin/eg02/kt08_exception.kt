package eg02

import java.lang.Exception

fun main(args: Array<String>) {
    try {
        val a = 3 / 0;
    } catch (e: Exception) {
        e.printStackTrace();
    }
}

