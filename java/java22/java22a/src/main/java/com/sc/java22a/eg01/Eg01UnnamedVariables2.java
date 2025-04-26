package com.sc.java22a.eg01;

import java.util.Map;

public class Eg01UnnamedVariables2 {
    public static void main(String[] args) {
        Map<String, Integer> map = Map.of("a", 1, "b", 2, "c", 3);

        // Before JDK 22
        map.forEach((k, v) -> System.out.println(v)); // unused variable k

        // JDK 22
        map.forEach((_, v) -> System.out.println(v)); // unused variable named as _
    }
}
