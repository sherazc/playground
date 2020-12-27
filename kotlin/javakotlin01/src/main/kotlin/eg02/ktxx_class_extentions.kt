class a;

fun a.test() {
    println("Testing")
}

fun main(args: Array<String>) {
    val nums = 1..10

    val t = a();

    t.test();

    // nums.filter(i -> i > 5)
    // filter((i) -> i%2 == 0)

    // For single parameter functions it can be used
}

fun myNewFunction() {
    println("testing another time")
}
