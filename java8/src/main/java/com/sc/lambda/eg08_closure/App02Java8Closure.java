package com.sc.lambda.eg08_closure;

/*
Example below shows partial support of closure in Java 8.

For explanation look at App01Java7Closure example
*/
public class App02Java8Closure {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;

        doProcess(a, i -> {
            // Line below is compilation error
            // b = 30;
            System.out.println(i + b);
        });

        // Line below is compilation error
        // b = 40;
        a = 50;

    }

    private static void doProcess(int i, Process process) {
        process.execute(i);
    }

    interface Process {
        void execute(int i);
    }
}