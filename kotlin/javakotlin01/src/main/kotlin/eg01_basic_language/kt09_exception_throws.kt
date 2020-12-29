package eg01_basic_language

@Throws(MyException::class)
fun main(){
    try {
        val a = 3 / 0
    } catch (e: ArithmeticException) {
        throw MyException(e.toString())
    }
}

class MyException(message:String): Exception(message)
