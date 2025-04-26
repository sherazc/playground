package com.sc.java22a.eg01;

public class Eg01UnnamedVariables1 {
    public static void main(String[] args) {
        // Before JDK 22
        try {
            int number = Integer.parseInt("1");
        } catch (NumberFormatException e) { // Unused variable e
            System.err.println("Not a number");
        }

        // JDK 22
        try {
            int number = Integer.parseInt("1");
        } catch (NumberFormatException _) { // Unused variable could be named as _
            System.err.println("Not a number");
        }
    }
}
