package com.sc.lambda.eg06_util_function_consumer;

import java.util.function.Consumer;

public class App {
    public static void main(String[] args) {
        greet("Sheraz", name -> System.out.println("Hi my name is " + name + "."));
        greet("Chaudhry", name -> System.out.println("Hi, I am " + name + "."));
    }

    private static void greet(String name, Consumer<String> nameConsumer) {
        nameConsumer.accept(name);
    }
}
