package com.sc.java17a.eg07_sealed_pattern_matching_switch;

/**
 * This feature only works in JDK 17 preview.
 *
 * To run this example use this command
 *
 * $ java --enable-preview --source 18 SealedPatternMatchingSwitchDefaultNotRequired.java
 *
 * I have JDK 18 installed that's why I used --source 18
 */

public class SealedPatternMatchingSwitchDefaultNotRequired {

    public static void main(String[] args) {
        Odd oddNumber = getOdd();

        switch (oddNumber) {
            case One one -> System.out.println(1);
            case Three three -> System.out.println(3);
            // default -> System.out.println("default"); // Default is not required because we covered all cases
        }
    }

    private static Odd getOdd() {
        int num = ((int) (Math.random() * 100)) % 2;
        if (num == 0) {
            return new One();
        } else {
            return new Three();
        }
    }

}

sealed interface Odd permits One, Three {}
final class One implements Odd {}
final class Three implements Odd {}
