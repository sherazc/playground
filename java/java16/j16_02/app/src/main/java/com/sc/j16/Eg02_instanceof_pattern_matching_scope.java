package com.sc.j16;

public class Eg02_instanceof_pattern_matching_scope {


    public static void main(String[] args) {
        new Eg02_instanceof_pattern_matching_scope().start("method argument");
    }

    String s = "class property";

    void start(Object o) {
        // String s = "method variable"; // compiler error

        System.out.println("1. " + s);
        if (o instanceof String s) {
            System.out.println("2. " + s);
            System.out.println("3. " + this.s);
        }
    }
}
