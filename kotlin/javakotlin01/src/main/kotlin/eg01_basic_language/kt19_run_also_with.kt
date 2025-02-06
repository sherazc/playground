package eg01_basic_language

fun main() {
    data class Kt18Employee(var id: Long?, var name: String)

    /**
     * run
     *
     * like apply used to update insides of Object
     *
     * has implicit "this" keyword
     *
     * returns transformed value
     *
     * No use to nullable value. Instead, "let" should be used.
     */
    val e1 = Kt18Employee(100, "emp1")

}