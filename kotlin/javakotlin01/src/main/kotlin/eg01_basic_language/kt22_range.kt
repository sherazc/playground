package eg01_basic_language

fun main() {
    val numberRange1: IntRange = 1..10
    val numberRange2: IntRange = 1.rangeTo(10)
    val charRange1: CharRange = 'a'..'z'

    numberRange1.forEach { print(it) }
    charRange1.forEach { print(it) }



    for (i in 1..5) {
        println(i) // Prints 1, 2, 3, 4, 5
    }


    val x = 3
    if (x in 1..5) {
        println("x is in range")
    }

    for (i in 5 downTo 1) {
        println(i) // Prints 5, 4, 3, 2, 1
    }

    for (i in 1..10 step 2) {
        println(i) // Prints 1, 3, 5, 7, 9
    }

    for (i in 1 until 5) {
        println(i) // Prints 1, 2, 3, 4
    }


}

