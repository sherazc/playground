package com.sc.async.common;

public class MyTask implements Runnable {
    private String name;
    private int iteration;

    public MyTask(String name, int iteration) {
        this.name = name;
        this.iteration = iteration;
    }

    @Override
    public void run() {
        for (int i = 0; i < iteration; i++) {

            System.out.println(name + " running: " + i
                    + " Thread: " + Thread.currentThread().getName());

            MyThreadUtils.sleep(1000L);
        }
    }
}

