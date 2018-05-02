package com.sc.stream.eg05_parallel_stream;

import java.util.Arrays;
import java.util.List;

/*
Parallel Streams let operations to run on multi cores
*/
public class App {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Sheraz", "Tariq", "Chaudhry", "John");
        names.parallelStream()
                .filter(name -> name.contains("a"))
                .forEach(name -> System.out.println(name));
    }
}
