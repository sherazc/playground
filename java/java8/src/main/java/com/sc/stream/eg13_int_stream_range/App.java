package com.sc.stream.eg13_int_stream_range;

import java.util.stream.IntStream;
import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        System.out.println("========= IntStream.range() =========");
        IntStream.range(0, 5).forEach(System.out::println);
        System.out.println("========= IntStream.rangeClosed() =========");
        IntStream.rangeClosed(0, 5).forEach(System.out::println);

        /*
        IntStream.range() runs in sequence.
        That's what this is not possible using IntStream.range(). But solved in Java 9
         */
        System.out.println("========= Java 7 fori - adding 2 every loop step =========");
        for (int i = 0; i < 5; i = i + 2) {
            System.out.println(i);
        }

        /*
        Java 8 Stream solution is Stream.iterate(). Java 9 have better iterate method to handle it.
         */
        System.out.println("========= Java 8 Stream.iterate() ========");
        Stream.iterate(0, i -> i + 2).limit(3).forEach(System.out::println);
    }
}
