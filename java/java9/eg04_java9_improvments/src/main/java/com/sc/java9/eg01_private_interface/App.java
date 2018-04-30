package com.sc.java9.eg01_private_interface;

public class App {
    public static void main(String[] args) {
        MyService myService = new MyService(){};
        System.out.println("5 double = " + myService.doubleIt(5));
        System.out.println("5 triple = " + MyService.tripleIt(5));
    }
}

// Java 8 added default and static methods
interface MyService {
    static int tripleIt(int num) {
        return num * 3;
    }

    default int doubleIt(int num) {
        return num * this.getTwo();
    }

    // Java 9 interfaces can also have private methods
    private int getTwo() {
        return 2;
    }
}
