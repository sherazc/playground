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
        System.out.println("========= Stream.concat() ========");
        concatStream.forEach(System.out::println);

        // Count
        System.out.println("========= Stream.count() ========");
        System.out.println(Stream.of(2, 4, 6).count());

        // Distinct
        System.out.println("========= Stream.distinct() ========");
        Stream.of(2, 2, 3, 3).distinct().forEach(System.out::println);

        // Empty. Make a new stream empty
        System.out.println("========= Stream.empty() ========");
        System.out.println(Stream.empty().count());

        // filter
        System.out.println("========= Stream.filter() ========");
        Stream.of(2, 4, 6).filter(i -> i > 2).forEach(System.out::println);


        // findAny(). Observation: Parallel return random number. Sequential returns first element
        System.out.println("========= Stream.findAny() ========");
        System.out.println(Stream.of(2, 4, 6).parallel().findAny().get());

        // findFirst().
        System.out.println("========= Stream.findFirst() ========");
        System.out.println(Stream.of(2, 4, 6).findFirst().get());

    }
}
