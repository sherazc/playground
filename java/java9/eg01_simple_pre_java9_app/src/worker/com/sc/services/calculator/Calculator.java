package com.sc.services.calculator;


import com.sc.services.calculator.math.Add;
import com.sc.services.calculator.math.Subtract;

public class Calculator {
    public int calculate(int a, char operation, int b) {
        int result = 0;
        switch (operation) {
            case '+':
                result = new Add().add(a, b);
                break;
            case '-':
                result = new Subtract().subtract(a, b);
                break;
            default:
                throw new RuntimeException("Operation not implemented " + operation);
        }

        return result;
    }
}