package com.sc.j16;

public class Eg01_instanceof_pattern_matching {
    public static void main(String[] args) {
        var object = getObject();

        // Before Java 16
        if (object instanceof String) {
            String string = (String) object;
            System.out.println("Got String: " + string.toUpperCase());
        } else if (object instanceof Integer) {
            Integer integer = (Integer) object;
            System.out.println("Got Integer: " + integer * integer);
        }

        // In Java 16
        if (object instanceof String string) {
            System.out.println("Got String: " + string.toUpperCase());
        } else if (object instanceof Integer integer) {
            System.out.println("Got Integer: " + integer * integer);
        }

        // In Java 16 - using variable in if check
        if (object instanceof String string && string.length() > 1) {
            System.out.println("Got String: " + string.toUpperCase());
        } else if (object instanceof Integer integer && integer > 1) {
            System.out.println("Got Integer: " + integer * integer);
        }
    }


    public static Object getObject() {
        if (System.currentTimeMillis() % 2 == 0) {
            return Integer.valueOf(100);
        } else {
            return "Hundred";
        }
    }
}
