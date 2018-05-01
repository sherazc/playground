package com.sc.stream.eg06_update_source_after_create_stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/*
Streams do not start working until terminal is called.
So this means we can modify source collection while building
stream operation.

NOTE: all stream intermediate operations return a new type of stream,
so the next intermediate should be performed on the new type of the stream

Final source items: 1,2,3,4,5,6,7

Stream Operations:
Step 1 filter: 2,4,6
Step 2 multiply: 20,40,60
Step 3 mapToInt: 20,40,60

Terminal:
sum: 120
*/
public class App {
    public static void main(String[] args) {
        List<Integer> source = new ArrayList<>(Arrays.asList(1,2));
        Stream<Integer> stream = source.stream();
        source.add(3);
        Stream<Integer> filteredStream = stream.filter(i -> i % 2 == 0);
        source.add(4);
        Stream<Integer> multipliedMapStream = filteredStream.map(i -> i * 10);
        source.add(6);
        IntStream integerStream = multipliedMapStream.mapToInt(i -> i);
        source.add(7);
        System.out.println("Total: " + integerStream.sum());
    }
}
