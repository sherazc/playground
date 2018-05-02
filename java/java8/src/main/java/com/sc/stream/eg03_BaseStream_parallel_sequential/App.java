package com.sc.stream.eg03_BaseStream_parallel_sequential;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

/*
Parallel Streams let operations to run on multi cores
*/
public class App {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        System.out.println("========== Parallel Stream Output ==========");
        numbers.stream().parallel().forEach(System.out::println);

        System.out.println("========== Sequential Stream Output ==========");
        numbers.stream().sequential().forEach(System.out::println);
    }
}
