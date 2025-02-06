package eg01_basic_language

fun main() {
    data class Kt19Employee(var id: Long?, var name: String)

    /**
     * run
     *
     * combine functionality of both "let" and "apply"
     *
     * like "apply" used to update insides of Object
     * like "let" returns transformed value
     *
     * has implicit "this" keyword
     *
     * could be used on object or without an object
     *
     * No use to nullable value. Instead, "let" should be used.
     */
    val e1 = Kt19Employee(100, "emp1")

    val e1Concatenated = e1.run {
        this.id = this.id!! + 1
        name = "Employee1" // property is modified without the use of "this"
        id.toString() + name // the last line is return value
    }

    println(e1Concatenated)

    val fullName = run {
        val first = "Sheraz"
        val last = "Chaudhry"
        "$first $last"
    }
    println(fullName)
}