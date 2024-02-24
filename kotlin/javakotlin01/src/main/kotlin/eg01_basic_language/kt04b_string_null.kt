fun main() {

    // https://kotlinlang.org/docs/null-safety.html#safe-calls
    // Note null can be a val instead of var
    val myNullValue: String? = null

    // toString() can be called on null.
    // in that case it will return "null"
    // https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/to-string.html
    val myNullValueString = myNullValue.toString().uppercase();
    println(myNullValueString);

    // To have it return empty String
    val myEmptyValueString = myNullValue.orEmpty();
    println("myEmptyValueString = $myEmptyValueString");

    // To have it return something else
    val myEmptyString = myNullValue ?: "Empty";
    println("myEmptyValueString = $myEmptyString");

    // to convert nullable to non nullable value use !!
    var myName: String? = null;
    myName = "Sheraz"

    var myFirstName: String = myName!!
    println(myFirstName)

}
