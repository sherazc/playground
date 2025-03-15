package eg01_basic_language

fun main() {
    val numberRange1: IntRange = 1..10
    val numberRange2: IntRange = 1.rangeTo(10)
    val charRange1: CharRange = 'a'..'z'

    for (x in numberRange2) {
        println("numberRange2 x = $x")
    }
    numberRange1.forEach { print(it) }
    charRange1.forEach { print(it) }

    val numberRange3: IntProgression = 10 downTo 5 step  2

    for (x in numberRange3) {
        println("numberRange3 x = $x")
    }

    val numberRange4: IntProgression = 5..10 step  2

    for (x in numberRange4) {
        println("numberRange4 x = $x")
    }

    val numberRange5: IntProgression = 1 until 5 step 2
    numberRange5.forEach { println("numberRange5 num = $it") }

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


    val charRange2 = 'z' downTo 'j' step 2
    charRange2.forEach { println("charRange2 char = $it") }

    val startChar = 'G'
    val endChar = 'T'
    (startChar until endChar step 3).forEach { println("charRange3 char = $it") }
}

