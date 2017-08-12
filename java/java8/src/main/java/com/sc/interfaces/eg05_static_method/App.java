package com.sc.interfaces.eg05_static_method;

interface I {
    static void show() {
        System.out.println("I");
    }
}

public class App {
    public static void main(String[] args) {
        I.show();
    }
}
