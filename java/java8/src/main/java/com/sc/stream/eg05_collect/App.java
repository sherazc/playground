package com.sc.stream.eg05_collect;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class App {

    public static void main(String[] args) {
        /*
        Stream.collect(): takes in 3 parameters

        supplier: Initializes objects which can collect Stream elements.
        accumulator: Runs over each element of the Stream. Receives current collector and current stream element
        combiner: Only used in parallel stream. For parallel stream, stream will be distributed in multiple chunks.
                  Each chunk will be given its own supplier and accumulator. Once each chunk is accumulated into
                  collector, then these collectors are passed to combiner.
         */
        System.out.println("========= collect(supplier, accumulator, combiner) =========");
        StringBuilder result = Stream.of("a", "b", "c").parallel().collect(
                () -> new StringBuilder(), // supplier
                (supplier, streamElement) -> supplier.append(streamElement), // accumulator
                (parallelStreamResult1, parallelStreamResult2) -> parallelStreamResult1.append(parallelStreamResult2) // combiner
                );
        System.out.println(result);


        /*
        Method reference example similar to previous example
         */
        System.out.println("========= collect(supplier, accumulator, combiner) =========");
        StringBuilder result2 = Stream.of("a", "b", "c").parallel()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
        System.out.println(result2);


        /*
        Built-in collectors in Collectors static methods
         */
        System.out.println("========= collect(Collectors.joining()) =========");
        String result3 = Stream.of("a", "b", "c").parallel().collect(Collectors.joining());
        System.out.println(result3);

        System.out.println("========= collect(Collectors.toList()) =========");
        Stream.of("a", "b", "c").collect(Collectors.toList()).forEach(System.out::println);

        System.out.println("========= collect(Collectors.toSet()) =========");
        Stream.of("a", "b", "c").collect(Collectors.toSet()).forEach(System.out::println);




    }
}
