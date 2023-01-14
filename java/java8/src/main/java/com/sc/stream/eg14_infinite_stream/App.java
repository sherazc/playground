package com.sc.stream.eg14_infinite_stream;

import java.util.UUID;
import java.util.function.Supplier;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        // Has a starting point as seed
        // could also be used as step loop
        // Could be used as replacement for index or IntStream.range()
        Stream.iterate(100, i -> ++i) // Infinite Stream
                .limit(10) // Must limit to end loop
                .forEach(System.out::println);


        // generate new on every iteration
        Supplier<String> uuidSupplier = UUID.randomUUID()::toString;
        Stream.generate(uuidSupplier)
                .skip(10)
                .limit(5)
                .forEach(System.out::println);
    }
}
