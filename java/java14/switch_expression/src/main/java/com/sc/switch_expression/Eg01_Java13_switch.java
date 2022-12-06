package com.sc.switch_expression;

public class Eg01_Java13_switch {
    public static void main(String[] args) {
        WeekDay day = WeekDay.FRIDAY;

        // Print day char length
        switch (day) {
            case MONDAY:
            case FRIDAY:
            case SUNDAY:
                System.out.println(6);
                break;
            case TUESDAY:
                System.out.println(7);
                break;
            case THURSDAY:
            case SATURDAY:
                System.out.println((int) Math.pow(2, 3));
                break;
            case WEDNESDAY:
                int three = 1 + 2;
                System.out.println(three * three);
                break;
        }
    }
}
