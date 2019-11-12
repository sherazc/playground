package com.sc.async.eg01_executor;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {
    public static void main(String[] args) {

        ExecutorService executorService = Executors.newFixedThreadPool(3);

        for (int i = 0; i < 10; i++) {
            executorService.execute(new Task());
        }

        System.out.println("Done. Main Thread: " + Thread.currentThread().getName());
    }

    private static class Task implements Runnable {
        @Override
        public void run() {
            System.out.println("Runnable Thread: " + Thread.currentThread().getName());
        }
    }
}
