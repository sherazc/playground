package eg01_basic_language

fun main() {
    data class Kt21Employee(var id: Long?, var name: String)

    /**
     * with
     *
     * runs some code on the object
     *
     * do not return anything
     *
     * has implicit "this" keyword
     *
     * e.g. use it for logging or debugging
     */

    val e1 = Kt21Employee(100, "emp1")

    with(e1, {
        println(this.id)
        println(name)
    })


    with(e1) {
        println(id)
        println(name)
    }

    fun processEmp(e: Kt21Employee) {
        println(e.id)
        println(e.name)
    }

    with(e1) { processEmp(this) }
}

