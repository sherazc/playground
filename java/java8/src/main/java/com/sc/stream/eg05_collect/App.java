package com.sc.stream.eg05_collect;

import java.util.stream.Collectors;
import java.util.stream.Stream;

public class App {

    public static void main(String[] args) {
        System.out.println("========= collect(Collectors.toList()) =========");
        Stream.of(1, 2, 3).collect(Collectors.toList()).forEach(System.out::println);

        System.out.println("========= collect(Collectors.toSet()) =========");
        Stream.of(1, 2, 3).collect(Collectors.toSet()).forEach(System.out::println);


        /*
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


        System.out.println("========= collect(supplier, accumulator, combiner) =========");
        StringBuilder result2 = Stream.of("a", "b", "c").parallel()
                .collect(StringBuilder::new, StringBuilder::append, StringBuilder::append);
        System.out.println(result2);





    }
}
