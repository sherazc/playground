package com.sc.switch_expression;

public class Eg03_Java13_return_value {
    public static void main(String[] args) {

        int numCharacters;
        var day = WeekDay.FRIDAY;

        switch (day) {
            case MONDAY:
            case FRIDAY:
            case SUNDAY:
                numCharacters = 6;
                break;
            case TUESDAY:
                numCharacters = 7;
                break;
            case THURSDAY:
            case SATURDAY:
                numCharacters = (int) Math.pow(2, 3);
                break;
            case WEDNESDAY:
                int three = 1 + 2;
                numCharacters = three * three;
                break;
            default:
                throw new IllegalStateException("Unknown day: " + day);
                // break;
        }
        System.out.println(numCharacters);
    }
}
