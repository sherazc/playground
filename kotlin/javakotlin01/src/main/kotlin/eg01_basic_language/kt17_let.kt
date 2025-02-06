package eg01_basic_language

fun main() {
    /**
     *
     * let   = Transform or operate on a nullable object (?.let)
     * apply = Configure an object (setting multiple properties)
     * run   = Perform operations and return a computed value
     * also  = Use for logging or additional actions (without modifying the object)
     * with	 = Work with an object’s properties without extending it
     *
     *
     * all the above functions take lambda as the only or last argument.
     * So because of that, we do not need to put parenthesis ()
     **/


    /**
     * let
     *
     * used to transform and create something new
     *
     * the last line in lambda is the return statement
     *
     * has implicit "it" keyword
     */

    val name1 = "abc"
    val name1Transformed = name1.let { it + "xyz" }
    println(name1Transformed)


    /**
     * let
     *
     * could be used on nullable value
     *
     * used for null check
     */
    val name2: String? = null;
    val name2NullCheck = name2.let { it ?: "no name" } // if name2 == null then return "no name" else return name2
    println(name2NullCheck)


    /**
     * let
     *
     * let with the List
     */
    val numbers = listOf(1, 2, 3, 4, 5, 6)
    val result = numbers.filter { it % 2 == 0 } // Filter for even numbers
        .let {
            // it here is a List<Int>
            println("Filtered numbers: $it")

            // sum() is a function on List<Int>
            it.sum() // Perform an operation on the filtered list
        }

    println("Sum of even numbers: $result")


    /**
     * let
     *
     * let with the List
     */
    val numbers2: List<Int?> = listOf(1, 2, null, 4, 5, null)
    val filteredNumbers = numbers2.filter { it != null }
        .let { nonNullNumbers ->
            nonNullNumbers.filter { it?.mod(2) == 0 } // Filter for even numbers
        }

    println(filteredNumbers) // Output: [2, 4]

    /**
     * let
     *
     * let with Object
     */
    data class Kt17Employee(var id: Long?, var name: String)
    val e1 = Kt17Employee(100, "emp1")

    val e2 = e1.let { Kt17Employee(it.id?.plus(2), it.name + 2) }

    println(e2)
}