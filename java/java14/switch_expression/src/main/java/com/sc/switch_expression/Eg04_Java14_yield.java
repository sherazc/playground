package com.sc.switch_expression;

public class Eg04_Java14_yield {
    public static void main(String[] args) {
        var day = WeekDay.FRIDAY;

        // No need for break. Used yield to return value
        // instead to assigning it to another variable

        // if colon: is used then all cases should have colon
        // and if arrow -> is used then all cases should use arrow.
        int numCharacters = switch (day) {
            case MONDAY, FRIDAY, SUNDAY:
                yield 6;
            case TUESDAY:
                yield 7;
            case THURSDAY, SATURDAY:
                yield (int) Math.pow(2, 3);
            case WEDNESDAY:
                int three = 1 + 2;
                yield three * three;
            default: // Here IDE is able to recognize that default is useless. Because we have covered all cases.
                throw new IllegalStateException("Unknown day: " + day);
        }; // NOTE: semicolon because it is a statement not expression.

        System.out.println(numCharacters);
    }
}
