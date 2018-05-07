package com.sc.java9.eg07_optional_to_stream;

import java.util.Optional;
import java.util.stream.Stream;

public class App {
    public static void main(String[] args) {
        /*
        In Java 9 Optional can be converted to Stream.
         */
        System.out.println("========= Optional.stream() =========");
        System.out.println(Optional.of(10).stream().count());
        System.out.println(Optional.empty().stream().count());

        System.out.println("========= Stream to function =========");
        /*
        Because of this we can do this
        */
        process(Stream.of(1, 2, 3));
        process(Stream.empty().findFirst().stream());

        System.out.println("Done");
    }

    private static void process(Stream stream) {
        stream.forEach(System.out::println);
    }
}
