package eg02

fun main(args: Array<String>) {
    try {
        val a = 3 / 0;
    } catch (e: Exception) {
        e.printStackTrace();
    }
}
