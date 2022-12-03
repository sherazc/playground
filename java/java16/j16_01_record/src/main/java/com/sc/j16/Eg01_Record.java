package com.sc.j16;

// Creates immutable class
record Eg01_Record_Point(int x, int y) {}

public class Eg01_Record {
    public static void main(String[] args) {
        var eg01 = new Eg01_Record_Point(1, 2);

        // Getters
        System.out.println(eg01.x());
        System.out.println(eg01.y());

        // Builtin toString, hashCode, equals
        System.out.println(eg01.toString());
        System.out.println(eg01.hashCode());
        System.out.println(eg01.equals(new Eg01_Record_Point(1, 2)));
    }
}
