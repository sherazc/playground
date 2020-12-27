package eg02

@Throws(MyException::class)
fun main(args: Array<String>){
    try {
        val a = 3 / 0
    } catch (e: ArithmeticException) {
        throw MyException(e.toString())
    }
}

class MyException(message:String): Exception(message)
