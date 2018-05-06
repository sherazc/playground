package com.sc.java9.eg05_stream_continue_dropWhile;

import java.util.Arrays;
import java.util.List;

public class App {
    public static void main(String[] args) {
        List<Integer> source = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("======= Java 8 loop continue =======");
        for (Integer integer : source) {
            if (integer < 3) {
                continue;
            }
            System.out.println(integer);
        }

        System.out.println("======= Java 9 Stream.dropWhile() =======");
        source.stream().dropWhile(i -> i < 3).forEach(System.out::println);

    }
}
