package eg01_basic_language
fun main(args: Array<String>) {
    fun calculate1(a: Int, b: (Int) -> Int) =  println("calculate1 = ${b(a)}")
    fun calculate2(a: Int, b: Int, c: (Int, Int) -> Int) =  println("calculate2 = ${c(a, b)}")


}
