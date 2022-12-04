package com.sc.j16;

// Creates immutable class
record Eg02_Record01(int x, int y) {

    // Compact Constructor
    // x and y are implicitly passed in
    Eg02_Record01 {
        System.out.printf("x = %d, y = %d\n", x, y);
    }

    // Default/No Args constructor
    public Eg02_Record01() {
        // This must be called
        this(0, 0);
    }

    // Overloaded constructor
    public Eg02_Record01(int i, int j, int k, int l) {
        this(i + j, k + l);
    }
}

public class Eg02_Record_Constructor {
    public static void main(String[] args) {
        new Eg02_Record01();
        new Eg02_Record01(1, 2);
        new Eg02_Record01(1, 2, 3, 4);
    }
}
