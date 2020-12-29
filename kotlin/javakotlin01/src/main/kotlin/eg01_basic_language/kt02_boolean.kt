fun main() {
    val age = 14;

    val ageIsInt = age is Int

    if (ageIsInt) {
        println("ageIsInt = $ageIsInt")
    }

    val grade = 'A';

    println("grade is Char ${grade is Char}")
}
