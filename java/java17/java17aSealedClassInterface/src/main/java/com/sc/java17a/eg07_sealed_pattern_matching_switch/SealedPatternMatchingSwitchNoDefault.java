package com.sc.java17a.eg07_sealed_pattern_matching_switch;

import java.util.Random;

public class SealedPatternMatchingSwitchNoDefault {

    public static void main(String[] args) {
        Odd oddNumber = getOdd();

        switch (oddNumber) {
            case One one -> System.out.println(1);
            case Three three -> System.out.println(3);
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
