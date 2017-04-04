package com.sc.optional.eg02_empty;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/*
To create Optional with no values

Instead of doing:
Optional.ofNullable(null)

We can do:
Optional.empty();
*/

public class App {

    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        System.out.println(getListFirstElement(list));

        list.add("Sheraz");
        System.out.println(getListFirstElement(list));
    }

    static private Optional<String> getListFirstElement(List<String> list) {
        return list.isEmpty() ? Optional.empty() : Optional.of(list.get(0));
    }
}
