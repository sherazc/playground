package com.sc.junit.service;

public class Subtract implements Calculation {

    @Override
    public int perform(int num1, int num2) {
        return num1 - num2;
    }
}
