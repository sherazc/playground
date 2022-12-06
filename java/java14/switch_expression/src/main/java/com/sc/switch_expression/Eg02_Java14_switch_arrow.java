package com.sc.switch_expression;

public class Eg02_Java14_switch_arrow {
    public static void main(String[] args) {
        var day = WeekDay.FRIDAY;

        // No need for break
        switch (day) {
            case MONDAY, FRIDAY, SUNDAY -> System.out.println(6);
            case TUESDAY -> System.out.println(7);
            case THURSDAY, SATURDAY -> System.out.println((int) Math.pow(2, 3));
            case WEDNESDAY -> {
                int three = 1 + 2;
                System.out.println(three * three);
            }
            default -> throw new IllegalStateException("Unknown day: " + day);
        }
    }
}
