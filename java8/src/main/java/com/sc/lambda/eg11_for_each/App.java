package com.sc.lambda.eg11_for_each;

import java.util.Arrays;
import java.util.List;

public class App {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Sheraz", "Tariq", "Chaudhry");
        names.forEach(s -> System.out.println("Hi I am " + s));
    }
}
