package com.sc.interfaces.eg03_parent_default;

/*
If parent class has the same method as interface's default
method then parent's method will take precedence
*/
class C {
    public void show() {
        System.out.println("C");
    }
}

interface I {
    default void show() {
        System.out.println("I");
    }
}

class D extends C implements I {}

public class App {
    public static void main(String[] args) {
        new D().show();
    }
}
