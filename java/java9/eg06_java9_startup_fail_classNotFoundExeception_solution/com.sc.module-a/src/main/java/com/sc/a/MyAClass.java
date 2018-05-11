package com.sc.a;

import com.sc.b.MyBClass;

import java.util.Scanner;

public class MyAClass {
    public static void main(String[] args) {
        while (true) {
            System.out.println("Who should work. A or B?");
            String workerName = new Scanner(System.in).nextLine();
            if ("a".equalsIgnoreCase(workerName)) {
                new MyAClass().aWork();
            } else if  ("b".equalsIgnoreCase(workerName)) {
                new MyBClass().bWork();
            }
        }
    }

    public void aWork() {
        System.out.println("A is working");
    }
}
