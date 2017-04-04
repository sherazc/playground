package com.sc.interfaces.eg01_default;

/*
Java 8 can have default implementation of method.
It is optional for implementing class to override the method

Because of this Java 8 was able to add method to core java interfaces
without breaking Java 7 application and are backward compatible

e.g. java.util.Collection have default stream() method. Implementors of
java.util.Collection don't have to define stream() method.
*/
interface I {
    default void show() {
        System.out.println("I");
    }
}

class C implements I {}

class D implements I {
    @Override
    public void show() {
        System.out.println("D");
    }
}

public class App {
    public static void main(String[] args) {
        new C().show();
        new D().show();
    }
}
