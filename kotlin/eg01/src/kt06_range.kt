fun main(args: Array<String>) {
    var printSpace = {it: Any -> print("$it ")};

    var nums = 1..10;
    nums.forEach(printSpace)

    println("\n==================")
    var alphas = "A".."Z";
    println("alphas.contains(\"S\") " + alphas.contains("S"));
    println("\"C\" in alphas " + "C" in alphas);

    println("\n==================")
    10.downTo(5).forEach(printSpace)

    println("\n==================")
    1.rangeTo(20).step(2).forEach(printSpace)

    println("\n==================")
}