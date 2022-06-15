package com.sc.java17a.eg07_sealed_pattern_matching_switch;

/**
 * This feature only works in JDK 17 preview.
 *
 * To run this example use this command
 *
 * $ java --enable-preview --source 18 SealedPatternMatchingSwitchDefaultRequired.java
 *
 * I have JDK 18 installed that's why I used --source 18
 */

public class SealedPatternMatchingSwitchDefaultRequired {

    public static void main(String[] args) {
        Even evenNumber = getEven();

        switch (evenNumber) {
            case Two one -> System.out.println(1);
            // case Four four -> System.out.println(4);

            // Default is now required
            // Because compiler recognizes that not all possible cases are available
            default -> System.out.println("default");
        }
    }

    private static Even getEven() {
        int num = ((int) (Math.random() * 100)) % 2;
        if (num == 0) {
            return new Two();
        } else {
            return new Four();
        }
    }

}

sealed interface Even permits Two, Four {}
final class Two implements Even {}
final class Four implements Even {}
