package com.sc.stream.eg06_stream_of;

import java.util.Arrays;
import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        Stream<Integer> streamFromList = Arrays.asList(1, 2, 3).stream();
        /*
        An easy way to create inline stream of object is to use
        static method Stream.of(T ...values)
         */
        Stream<Integer> streamFromStreamOf = Stream.of(1,2,3);
    }
}
