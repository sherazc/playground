package eg01_basic_language

fun main() {
    data class Kt18Employee(var id: Long?, var name: String)

    /**
     * apply
     *
     * used to update insides of Object
     * returns itself. So do not need to create new variable
     *
     * has implicit "this" keyword
     *
     * instead of "it", "this" could be used
     */
    val e1 = Kt18Employee(100, "emp1")
    val e2 = e1.apply {  }
    val e3 = e2.apply { this.name = "Emp1"}
    val e4 = e3.apply { id = 111}

    println(e1 == e4)
    println(e1.hashCode())
    println(e4.hashCode())
    println(e1)
    println(e4)

    /**
     * No use to run on null value
     */
    val a: Kt18Employee? = null
    println(a.apply { this?.name = "" })

}