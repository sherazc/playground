package com.sc.lambda_stream.eg04_cant_reuse_stream;

import java.util.stream.IntStream;
import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        IntStream intStream = Stream.of(1, 2, 3, 4, 5).mapToInt(i -> i);
        /*
        Once a terminal operation is called on a stream, it
        can't be reused. sum() is a terminal operation.
         */
        System.out.println(intStream.sum());
        // Line below will throw exception.
        System.out.println(intStream.sum());
    }
}