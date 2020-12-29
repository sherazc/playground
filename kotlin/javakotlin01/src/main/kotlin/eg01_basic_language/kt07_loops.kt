fun main() {
    // For loop
    for (i in 1..10) {
        print(i)
    }
    println()

    for (i in 1..10) {
        if (i < 4) {
            continue;
        } else if (i > 8 ) {
            break;
        }

        print(i)
    }
}
