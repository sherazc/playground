package com.sc.lambda.eg07_wrapping_composing;

/*
Wrapping is a technique we can use to surround lambda with pre or post code.

In the example we are going to handle exception by using wrapping.

Wrapper method takes in a lambda and return the same kind of lambda
*/
import java.util.function.BiConsumer;

public class App {

    public static void main(String[] args) {
        // This is our actual logic
        BiConsumer<Integer, Integer> divideLambda =
                (num1, num2) -> System.out.println(num1 + " / " + num2 + " = " + (num1 / num2));

        // This is wrapper for our logic
        BiConsumer<Integer, Integer> divideLambdaWrapper = lambdaWrapper(divideLambda);

        /*
        Instead of passing in our actual logic that is in divideLambda,
        we are passing in divideLambdaWrapper.
         */
        executeLambda(4, 2, divideLambdaWrapper);
        executeLambda(4, 0, divideLambdaWrapper);
        executeLambda(4, 4, divideLambdaWrapper);
    }

    private static void executeLambda(Integer num1, Integer num2, BiConsumer<Integer, Integer> consumer) {
        consumer.accept(num1, num2);
    }

    private static BiConsumer<Integer, Integer> lambdaWrapper(BiConsumer<Integer, Integer> consumer) {
        return (num1, num2) -> {
            try {
                consumer.accept(num1, num2);
            } catch (ArithmeticException e) {
                System.out.println("Exception caught in lambdaWrapper. " + e);
            }
        };
    }
}
