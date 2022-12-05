package com.sc.j16;

sealed interface Eg05_SealedInterface permits Eg05_Record01, Eg05_Record02 {
    int x();
}

record Eg05_Record01(int x) implements Eg05_SealedInterface {}

record Eg05_Record02(int x, int y) implements Eg05_SealedInterface {}

public class Eg05_Java17_Record_Sealed_Interfaces {
    public static void main(String[] args) {
        Eg05_SealedInterface a = new Eg05_Record01(1);
        System.out.println(a.x());
    }
}
