fun main(args: Array<String>) {
    var printSpace = {it: Any -> print("$it ")};

    var nums = 1..10;
    nums.forEach(printSpace)

    println("\n==================")
    for (i in nums) {
        printSpace(i)
    }

    println("\n==================")
    // Find out why can't run loops over ClosedRange
    var alphas = "A".."Z";
    println("alphas.contains(\"S\") " + alphas.contains("S"));
    println("\"C\" in alphas " + "C" in alphas);

    println("\n==================")
    10.downTo(5).forEach(printSpace)

    println("\n==================")
    2.rangeTo(20).step(2).reversed().forEach(printSpace)

    println("\n==================")

    var age = 22
    // when is like "if".
    // It's is used to compare single value, list of comma separated values, or ranges
    when(age) {
        13 -> print("You just became teenager")
        22,33,44 -> println("You are an adult");
        in 1..5 -> println("You are a child")
        else -> println("I don't know your age")
    }
}