package com.sc.lambda.lambda.eg10_method_reference;

public class App03StaticMethod {
    public static void main(String[] args) {
        Process lambdaConsumer = s -> App03StaticMethod.greet(s);
        Process methodReferenceConsumer = App03StaticMethod::greet;
        lambdaConsumer.run("Sheraz");
        methodReferenceConsumer.run("Chaudhry");
    }

    private static void greet(String name) {
        System.out.println("Hi I am " + name);
    }

    interface Process {
        void run(String string);
    }
}
