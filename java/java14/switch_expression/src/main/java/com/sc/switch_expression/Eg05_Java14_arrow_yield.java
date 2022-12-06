package com.sc.switch_expression;

public class Eg05_Java14_arrow_yield {
    public static void main(String[] args) {
        var day = WeekDay.FRIDAY;

        // Yield is required only in multiline blocks
        int numCharacters = switch (day) {
            case MONDAY, FRIDAY, SUNDAY -> 6;
            case TUESDAY -> 7;
            case THURSDAY, SATURDAY -> (int) Math.pow(2, 3);
            case WEDNESDAY -> {
                int three = 1 + 2;
                yield three * three;
            }
            default -> throw new IllegalStateException("Unknown day: " + day);
        };

        System.out.println(numCharacters);
    }
}
