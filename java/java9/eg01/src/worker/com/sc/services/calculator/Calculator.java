package com.sc.services.calculator;


import com.sc.services.calculator.math.Add;
import com.sc.services.calculator.math.Subtract;

public class Calculator {
    public int calculate(int a, int b, boolean addNumbers) {
        return addNumbers ? new Add().add(a, b) : new Subtract().subtract(a, b);
    }
}