package com.sc.stream.eg04_stream_methods;

import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {

        // Find if all elements match
        boolean allMatch = Stream.of(2, 4, 6).allMatch(i -> i % 2 == 0);
        System.out.println("allMatch=" + allMatch);

        // Find if any of Stream Element match
        boolean anyMatch = Stream.of(2, 4, 6).anyMatch(i -> i == 2);
        System.out.println("anyMatch=" + anyMatch);

        // Concat 2 Streams
        Stream<Integer> concatStream = Stream.concat(Stream.of(1, 2), Stream.of(3, 4));
        System.out.println("========= Concat Stream ========");
        concatStream.forEach(System.out::println);
    }
}
