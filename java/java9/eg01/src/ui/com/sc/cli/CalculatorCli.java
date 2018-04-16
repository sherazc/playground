package com.sc.cli;

import java.text.MessageFormat;

public class CalculatorCli {

    public static void main(String[] args) {
        if (args.length < 3) {
            System.out.println("Invalid command. e.g.");
            System.out.println(CalculatorCli.class.getName() + " 2 + 3");
        }
    }
}
