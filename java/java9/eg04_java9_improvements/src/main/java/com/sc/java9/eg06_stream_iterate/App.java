package com.sc.java9.eg06_stream_iterate;

import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        /*
        IntStream.range() runs in sequence.
        That's what this is not possible using IntStream.range(). But solved in Java 9
         */
        System.out.println("========= Java 7 fori - adding 2 every loop step =========");
        for (int i = 0; i < 5; i = i + 2) {
            System.out.println(i);
        }

        /*
        Java 8 Stream solution is Stream.iterate().
         */
        System.out.println("========= Java 8 Stream.iterate() ========");
        Stream.iterate(0, i -> i + 2).limit(3).forEach(System.out::println);

        /*
        Java 9 Stream.iterate() have predicate because of which we don't have to use limit().
         */
        System.out.println("======= Java 9 Stream.iterate() =======");
        Stream.iterate(0, i -> i < 5, i -> i + 2).forEach(System.out::println);
    }
}
