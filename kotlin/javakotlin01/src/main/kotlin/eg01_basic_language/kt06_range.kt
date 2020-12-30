fun main() {
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
    for(i in 1 until 10) {
        printSpace(i)
    }

    println("\n==================")
    for(i in 1 until 10 step 2) {
        printSpace(i)
    }

    println("\n==================")
    for(i in 10 downTo 1 step 2) {
        printSpace(i)
    }
}
