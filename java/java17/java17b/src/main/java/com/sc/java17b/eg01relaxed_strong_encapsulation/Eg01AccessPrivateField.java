package com.sc.java17b.eg01relaxed_strong_encapsulation;

import java.lang.reflect.Field;
import java.util.Arrays;


/**
 * "Relaxed Strong Encapsulation" has been removed in JDK17
 * --illegal-access=permit is removed in JDK17
 *
 * This example tries to access String.value using reflection
 * - Which is a private field
 * - Is not part of current module
 *
 * In JDK16 it was possible to run it using this command
 * $ java --illegal-access=permit Eg01AccessPrivateField.java
 *
 * To run in JDK17 we have to open java.base/java.lang
 * $ java --add-opens java.base/java.lang=ALL-UNNAMED Eg01AccessPrivateField.java
 */
public class Eg01AccessPrivateField {
    public static void main(String[] args) throws ReflectiveOperationException {
        byte[] value = getStringPrivateValue("Sheraz");
        System.out.println(Arrays.toString(value));
    }


    private static byte[] getStringPrivateValue(String string) throws ReflectiveOperationException {
        Field VALUE = String.class.getDeclaredField("value"); // Access to private filed in JDK17 is not allowed
        VALUE.setAccessible(true);
        return (byte[]) VALUE.get(string);
    }
}
