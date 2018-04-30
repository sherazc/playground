package com.sc.java9.eg02_try_with_resource;

public class App {
    public static void main(String[] args) {
        try(MyResource myResource = new MyResource()) {
            System.out.println("Java 7: Resource created in try parenthesis.");
        }

        MyResource myResource = new MyResource();
        try(myResource) {
            System.out.println("Java 9: Resource could be created outside try parenthesis.");
        }
    }
}

class MyResource implements AutoCloseable {
    public void close() {
        System.out.println("MyResource.close() called.");
    }
}