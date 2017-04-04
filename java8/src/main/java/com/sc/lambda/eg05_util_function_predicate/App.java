package com.sc.lambda.eg05_util_function_predicate;

import java.util.function.Predicate;

public class App {
    public static void main(String[] args) {
        int[] numbers = {500, 200, 800, 100, 400, 300, 900, 700};

        for (int number : numbers) {
            printNumber(number, num -> num > 500);
        }
    }

    private static void printNumber(Integer number, Predicate<Integer> condition) {
        if (condition.test(number)) {
            System.out.println(number);
        }
    }
}