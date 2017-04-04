package com.sc.interfaces.eg02_diamond_problem;

/*
We know Multiple inheritance could cause Diamond Problem.
In Java we could implement multiple interface. Because of this
we could again get into Diamond Problem.

To handle this issue if a class implement 2 or more interfaces,
and more than 2 of them contain same default methods then implementing
class must define the method, otherwise we will get compilation error
*/

interface I {
    default void show() {
        System.out.println("I");
    }
}

interface J {
    default void show() {
        System.out.println("J");
    }
}

class C implements I, J {
    // Removing the method below will cause compilation error
    @Override
    public void show() {
        System.out.println("C");
    }
}

class D implements I {}

public class App {
    public static void main(String[] args) {
        new C().show();
        new D().show();
    }
}
