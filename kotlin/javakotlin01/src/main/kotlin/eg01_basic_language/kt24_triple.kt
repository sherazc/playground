package eg01_basic_language

fun main() {
    val colors = Triple("Red", "Green", "Blue")
    println(colors.first) // Output: Red
    println(colors.second) // Output: Green
    println(colors.third) // Output: Blue


    // Destructuring
    val (color1, color2, color3) = Triple("Red", "Green", "Blue")
    println(color1) // Output: Red
    println(color2) // Output: Green
    println(color3) // Output: Blue
}

