package com.sc.j16;

record Eg03_Record() {
    public static final int HUNDRED = 100;

    private static int counter = 0;

    Eg03_Record {
        Eg03_Record.counter++;
    }

    public static int getCounter() {
        return counter;
    }

    public int add(int a, int b) {
        return a + b;
    }
}

public class Eg03_Record_StaticMethodVariable {
    public static void main(String[] args) {
        var eg03 = new Eg03_Record();
        System.out.println(Eg03_Record.getCounter());
        System.out.println(Eg03_Record.HUNDRED);
        System.out.println(eg03.add(1, 2));

    }
}
