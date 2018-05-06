package com.sc.java9.eg04_stream_break_takeWhile;

import java.util.Arrays;
import java.util.List;

public class App {
    public static void main(String[] args) {
        List<Integer> source = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("======= Java 8 loop break =======");
        for (Integer integer : source) {
            if (integer > 3) {
                break;
            }
            System.out.println(integer);
        }

        System.out.println("======= Java 9 Stream.takeWhile() =======");
        source.stream().takeWhile(i -> i <= 3).forEach(System.out::println);

    }
}
