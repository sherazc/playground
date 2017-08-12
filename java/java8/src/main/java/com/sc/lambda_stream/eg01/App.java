package com.sc.lambda_stream.eg01;

import java.util.Arrays;
import java.util.List;

public class App {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Sheraz", "Tariq", "Chaudhry", "John");

        /*
        There are 3 parts of the stream.
        1. Source: e.g. "names"
        2. Operation(s): e.g. filter(name -> name.contains("a"))
        3. Terminator/Terminal/End: e.g. forEach(name -> System.out.println(name))

        We can have single source, multiple operations and single Terminator.
        If we don't define terminator operation will never get executed.

        Terminator is what what causes the stream to start performing operation
        on the source
         */
        names.stream()
                .filter(name -> name.contains("a"))
                .forEach(name -> System.out.println(name));
    }
}
