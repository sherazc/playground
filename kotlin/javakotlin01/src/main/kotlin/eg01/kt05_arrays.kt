fun main(args: Array<String>) {
    // Creating Array. Any type Array
    var array1 = arrayOf(1, 1.23, "Sheraz", 'A')

    // Loop over array
    for (element in array1) {
        println(element)
    }
    println("===============")

    // Loop over array's indexes
    for (elementIndex in array1.indices) {
        println(array1[elementIndex])
    }

    println("===============")

    println("array1.size = ${array1.size}")

    println("array1.contains(\"Sheraz\") = ${array1.contains("Sheraz")}")
    println("array1.indexOf(\"Sheraz\") = ${array1.indexOf("Sheraz")}")
    println("array1.first() = ${array1.first()}")
    println("array1.last() = ${array1.last()}")


    println("===============")
    // Generate Array
    val array2: Array<String> = Array(5, {index -> "Element $index"})

    array2.forEach { element -> println(element) }

}