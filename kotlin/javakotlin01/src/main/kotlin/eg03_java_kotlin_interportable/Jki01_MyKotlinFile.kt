// if not given then file name will be class name
@file:JvmName("MyKotlinFile")
package eg03_java_kotlin_interportable

// Creates overloaded functions because of default and nullable
@JvmOverloads
fun add(a:Int? = 5, b:Int? = 10) = b?.let { a?.plus(it) }

class MyKotlinClass {

    @JvmOverloads
    fun add(a:Int? = 5, b:Int? = 10) = b?.let { a?.plus(it) }
}
