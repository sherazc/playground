package com.sc.optional.eg01_of_off_nullable_get;

/*
Optional class is created to use in the techniques to avoid
NullPointerException

Optional.of() is used is when we are sure the value will not be null

Optional.ofNullable() is used when we are not sure
the value will be null or not
*/

import java.util.Optional;

public class App {
    public static void main(String[] args) {
        String name = "Sheraz";
        Optional<String> optional1 = Optional.of(name);
        handelStringOptional(optional1);

        System.out.println("=============");

        name = null;
        Optional<String> optional2 = Optional.ofNullable(name);
        handelStringOptional(optional2);
    }

    static private void handelStringOptional(Optional<String> optional) {
        /*
        Method 1: To check optional and get value of
        out of optional
        */
        if (optional.isPresent()) {
            System.out.println(optional.get());
        } else {
            System.out.println("Optional<String> is empty");
        }

        /*
        Method 2: To check optional and get value of
        out of optional using Consumer lambda.

        Optional automatically get() the value out and pass
        it to Consumer.
        */
        optional.ifPresent(s -> System.out.println(s));
    }
}
