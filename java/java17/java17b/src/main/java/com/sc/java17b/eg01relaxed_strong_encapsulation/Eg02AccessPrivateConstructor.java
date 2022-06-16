package com.sc.java17b.eg01relaxed_strong_encapsulation;

import java.lang.constant.ConstantDescs;
import java.lang.reflect.Constructor;


/**
 * "Relaxed Strong Encapsulation" has been removed in JDK17
 * --illegal-access=permit is removed in JDK17
 *
 * This example tries to create instance of ConstantDescs using reflection
 * - Which is a private constructor
 * - Is not part of current module
 *
 * In JDK16 it was possible to run it using this command
 * $ java --illegal-access=permit Eg02AccessPrivateConstructor.java
 *
 * To run in JDK17 we have to open java.base/java.lang.constant
 * $ java --add-opens java.base/java.lang.constant=ALL-UNNAMED Eg02AccessPrivateConstructor.java
 */
public class Eg02AccessPrivateConstructor {
    public static void main(String[] args) throws ReflectiveOperationException {
        Constructor<ConstantDescs> constructor = ConstantDescs.class.getDeclaredConstructor();
        constructor.setAccessible(true);
        ConstantDescs constantDescs = constructor.newInstance();
    }
}
