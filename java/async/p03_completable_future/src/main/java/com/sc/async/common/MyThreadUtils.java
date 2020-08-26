package com.sc.async.common;

public class MyThreadUtils {
    public static final void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
