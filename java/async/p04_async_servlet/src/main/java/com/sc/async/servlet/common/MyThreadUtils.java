package com.sc.async.servlet.common;

public class MyThreadUtils {
    public static final void sleep(long millis) {
        try {
            System.out.println("Sleeping for " + millis + " milli seconds");
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
