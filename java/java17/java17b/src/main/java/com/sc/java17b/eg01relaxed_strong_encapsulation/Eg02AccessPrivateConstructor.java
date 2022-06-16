package com.sc.java17b.eg01relaxed_strong_encapsulation;

import java.lang.constant.ConstantDescs;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.util.Arrays;


/**
 * "Relaxed Strong Encapsulation" has been removed in JDK17
 *
 * This example tries to access String.value using reflection
 * - Which is a private constructor
 * - Is not part of current module
 *
 * This example will not run on JDK17.
 *
 * But in JDK16 it can run by opening java.base/java.lang.constant
 *
 *
 * $ java --add-opens java.base/java.lang.constant=ALL-UNNAMED Eg02AccessPrivateConstructor.java
 */
public class Eg02AccessPrivateConstructor {
    public static void main(String[] args) throws ReflectiveOperationException {
        Constructor<ConstantDescs> constructor = ConstantDescs.class.getDeclaredConstructor();
        constructor.setAccessible(true);
        ConstantDescs constantDescs = constructor.newInstance();
    }
}
