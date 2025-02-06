package eg01_basic_language

fun main() {
    data class Kt20Employee(var id: Long?, var name: String)

    /**
     * also
     *
     * runs some code on the object
     *
     * implicitly returns the original object
     *
     * has implicit "it" keyword
     *
     * No use to nullable value. Instead, "let" should be used.
     *
     * e.g. use it for logging or debugging
     */

    val e1 = Kt20Employee(100, "emp1")

    val e2 = e1.also {
        println(it.id)
        println(it.name)
    }

    println(e1 == e2)
}