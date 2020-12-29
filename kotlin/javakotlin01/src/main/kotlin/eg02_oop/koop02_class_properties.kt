package eg02_oop

class Person {
    // field: is a reserved variable name like it
    // value: is a convention. We can name it anything
    var publicReadWriteProp: Int = 10;

    val finalPublicProp = 10

    var customGetterSetter: Int = 0
        get() = field
        set(value) {
            field = value
        }

    var customGetterSetterWithBody: Int = 45
        get() {
            println("Getter called $field")
            return field
        }
        set(value) {
            field = value
            println("Getter called $field")
        }


    private val privateFinal: Int = 30

    var readOnlyProp: Int = 17
        get() = field
        private set(value) {
            field = value
        }
}

fun main() {
    val p = Person()
    // Setter and getter are called because of below assignment and statement
    p.customGetterSetterWithBody = 50
    println("p.customGetterSetter = ${p.customGetterSetterWithBody}")
}
