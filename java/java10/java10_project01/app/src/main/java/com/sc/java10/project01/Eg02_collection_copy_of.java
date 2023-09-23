package com.sc.java10.project01;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class Eg02_collection_copy_of {
    public static void main(String[] args) {
        List<Integer> originalInts = new ArrayList<>();
        originalInts.add(1);
        originalInts.add(2);

        List<Integer> ints2UnmodifiableCopy = List.copyOf(originalInts);

        originalInts.set(0, 3); // changing original list. Copy stays untouched.

        System.out.println(originalInts);
        System.out.println(ints2UnmodifiableCopy);

//        Other copyOf methods
//        Set.copyOf();
//        Map.copyOf()
    }
}
