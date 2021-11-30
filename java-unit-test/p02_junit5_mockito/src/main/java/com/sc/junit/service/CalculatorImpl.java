package com.sc.junit.service;

public class CalculatorImpl implements Calculator {

    @Override
    public int calculate(int num1, int num2, Calculation calculation) {
        return calculation.perform(num1, num2);
    }
}
