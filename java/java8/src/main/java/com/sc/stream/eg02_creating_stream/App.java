package com.sc.stream.eg02_creating_stream;

import java.util.Arrays;
import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        // Stream.of() Method
        Stream<Integer> streamA = Stream.of(1, 2, 3);

        // From List
        Stream<Integer> streamB = Arrays.asList(1, 2, 3).stream();

        // From Builder
        Stream.Builder<Integer> streamCBuilder = Stream.builder();
        streamCBuilder.accept(1);
        streamCBuilder.accept(2);
        streamCBuilder.accept(3);
        Stream<Integer> streamC = streamCBuilder.build();
    }
}
