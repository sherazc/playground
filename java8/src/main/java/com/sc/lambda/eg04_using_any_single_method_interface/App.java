package com.sc.lambda.eg04_using_any_single_method_interface;

import java.util.*;

public class App {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Sheraz", "Tariq", "Chaudhry");
        System.out.println("Before Sort" + names);
        Collections.sort(names, (name1, name2) -> name1.compareTo(name2));
        System.out.println("After Sort" + names);

    }
}
