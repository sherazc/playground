package com.sc.jee;

import java.util.Arrays;
import java.util.stream.Collectors;

public class MyService {
    public int add(int a, int b) {
        return a + b;
    }

    public int substract(int a, int b) {
        return a - b;
    }

    public String getMessage() {
        return "Hello Sheraz";
    }

    public String multiMessage(String message, int times) {
        StringBuilder stringBuilder = new StringBuilder(message);
        for (int i = 1; i < times; i++) {
            stringBuilder.append(" ").append(message);
        }
        return stringBuilder.toString();
    }

    public double yearlySalary(Profile profile) {
        return profile.getSalary() * 12;
    }

    public String concat(String[] strings) {
        return Arrays.stream(strings).map(s -> s).collect(Collectors.joining(", "));
    }
}
