package eg01_basic_language

fun main() {
    try {
        val a = 3 / 0;
    } catch (e: Exception) {
        e.printStackTrace();
    }
}
