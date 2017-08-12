package com.sc.lambda.eg10_method_reference;

import java.util.function.Consumer;

public class App01InstanceMethod {

    public static void main(String[] args) {
        Consumer<String> consumerLambda = s -> System.out.println(s);
        Consumer<String> consumerMethodReference = System.out::println;

        consumerLambda.accept("Consumer Lambda");
        consumerMethodReference.accept("Consumer Method Reference");

        App01InstanceMethod app01InstanceMethod = new App01InstanceMethod();

        Calculate calculateAddMethodReference = app01InstanceMethod::add;
        Calculate calculateSubtractMethodReference = app01InstanceMethod::subtract;

        Calculate calculateAddLambda = (a, b) -> app01InstanceMethod.add(a, b);
        Calculate calculateSubtractLambda = (a, b) -> app01InstanceMethod.subtract(a, b);

        System.out.println("calculateAddLambda " + calculateAddLambda.performCalculation(10, 20));
        System.out.println("calculateSubtractLambda " + calculateSubtractLambda.performCalculation(5, 3));

        System.out.println("calculateAddMethodReference " + calculateAddMethodReference.performCalculation(10, 20));
        System.out.println("calculateSubtractMethodReference " + calculateSubtractMethodReference.performCalculation(5, 3));

    }

    int add(int num1, int num2) {
        return num1 + num2;
    }

    int subtract(int num1, int num2) {
        return num1 + num2;
    }

    interface Calculate {
        int performCalculation(int a, int b);
    }
}
