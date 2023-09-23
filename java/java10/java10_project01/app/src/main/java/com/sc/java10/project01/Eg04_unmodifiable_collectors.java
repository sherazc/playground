package com.sc.java10.project01;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Eg04_unmodifiable_collectors {
    public static void main(String[] args) {
        List<Integer> list =
                IntStream.rangeClosed(1, 3).boxed().collect(Collectors.toUnmodifiableList());

        Set<Integer> set =
                IntStream.rangeClosed(1, 3).boxed().collect(Collectors.toUnmodifiableSet());

        Map<Integer, String> map =
                IntStream.rangeClosed(1, 3)
                        .boxed()
                        .collect(Collectors.toUnmodifiableMap(Function.identity(), String::valueOf));
    }
}
