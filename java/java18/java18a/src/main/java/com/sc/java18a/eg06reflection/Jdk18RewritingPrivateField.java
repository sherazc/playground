package com.sc.java18a.eg06reflection;

import java.lang.invoke.MethodHandles;
import java.lang.invoke.VarHandle;
import java.lang.reflect.Field;

public class Jdk18RewritingPrivateField {
    public static void main(String[] args) throws NoSuchFieldException, IllegalAccessException {

        /**
         * To get private field value we have to "open package"
         *
         * E.g. To get private field value one of these 2 methods can be used
         *
         * To run this example, add these as VM option:
         * --add-opens java.base/java.lang=ALL-UNNAMED
         *
         *
         * In JDK 18's proposal https://openjdk.java.net/jeps/416
         *
         * They are rewriting private field access using "MethodHandles"
         */

        // ============ Method 1
        String string = "Sheraz";
        Field field = String.class.getDeclaredField("value");
        field.setAccessible(true);
        byte[] value1 = (byte[]) field.get(string);
        System.out.println(new String(value1));

        // ============ Method 2
        VarHandle handle =
                MethodHandles.privateLookupIn(String.class, MethodHandles.lookup())
                        .findVarHandle(String.class, "value", byte[].class);
        byte[] value2 = (byte[]) handle.get(string);
        System.out.println(new String(value2));

    }
}
