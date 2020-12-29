package eg02_oop

// "data class" creates equals() method on primary constructor class fields
data class Employee(val firstName:String, val lastName:String)

fun main() {
    val e1 = Employee("Sheraz", "Chaudhry")
    val e2 = Employee("Sheraz", "Chaudhry")

    // == Runs equals method
    println("e1 == e2 = ${e1 == e2}")

    // === Checks reference
    println("e1 === e2 = ${e1 === e2}")
}
