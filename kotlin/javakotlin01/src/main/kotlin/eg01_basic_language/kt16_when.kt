package eg01_basic_language

fun main() {
    val age:Any = 22
    // when is like "if".
    // It's is used to compare
    // single value, list of comma separated values, ranges, or check type
    when(age) {
        13 -> {
            print("You just became teenager")
            print("Multi line")
        }
        22,33,44 -> println("You are an adult");
        in 1..5 -> println("You are a child")
        is String -> println(age.length) // Note age is type casted
        else -> println("I don't know your age")
    }

    val day = 1
    val dayName = when(day) {
        1 -> "Sunday"
        2 -> "Monday"
        else -> "I don't know"
    }
    println(dayName)
}
