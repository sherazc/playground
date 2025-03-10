package eg01_basic_language

fun main() {
    val person = Pair("John Doe", 30)
    println(person.first) // Output: John Doe
    println(person.second) // Output: 30


    // Destructuring
    val (name, age) = Pair("John Doe", 30)
    println(name) // Output: John Doe
    println(age)  // Output: 30
}

