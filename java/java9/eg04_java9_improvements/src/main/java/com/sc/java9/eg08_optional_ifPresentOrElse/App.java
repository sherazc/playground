package com.sc.java9.eg08_optional_ifPresentOrElse;

import java.util.Optional;

public class App {
    public static void main(String[] args) {

        printOptionalValue(Optional.of(4));
        printOptionalValue(Optional.empty());
    }


    private static void printOptionalValue(Optional optional) {
        /*
        Java 9 have Optional.ifPresentOrElse()
         */

        optional.ifPresentOrElse(System.out::println, () -> System.out.println("Empty Optional"));
    }
}
