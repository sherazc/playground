package com.sc.cli;

import com.sc.services.calculator.Calculator;

import java.text.MessageFormat;

public class CalculatorCli {

    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Invalid command. e.g.");
            System.out.println(CalculatorCli.class.getName() + " 2 + 3");
            return;
        }

        int numA = Integer.parseInt(args[0]);
        char operation = args[1].charAt(0);
        int numB = Integer.parseInt(args[2]);

        int result = new Calculator().calculate(numA, operation, numB);

        System.out.println(MessageFormat.format("{0} {1} {2} = {3}", numA, operation, numB, result));
    }
}
