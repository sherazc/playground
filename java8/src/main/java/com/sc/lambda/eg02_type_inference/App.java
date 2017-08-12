package com.sc.lambda.eg02_type_inference;

public class App {
    public static void main(String[] args) {
        StringLengthInterface version1 = (String s) -> {return s.length();};
        StringLengthInterface version2 = (s) -> {return s.length();};
        StringLengthInterface version3 = s -> {return s.length();};
        StringLengthInterface version4 = s -> s.length();

        System.out.println(version1.getLength("Hello World"));
        System.out.println(version2.getLength("Hello World"));
        System.out.println(version3.getLength("Hello World"));
        System.out.println(version4.getLength("Hello World"));
    }

    interface StringLengthInterface {
        int getLength(String string);
    }
}
