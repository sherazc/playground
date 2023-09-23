package com.sc.java10.project01;

import java.util.Optional;

public class Eg05_optional_orElseThrow {
    public static void main(String[] args) {
        Optional<Integer> optional = Optional.empty();

        // In case if optional must not be empty
        // Works and implemented exactly same as Optional.get()
        System.out.println(optional.orElseThrow());
    }
}
