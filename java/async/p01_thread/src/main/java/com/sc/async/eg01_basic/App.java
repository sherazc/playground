package com.sc.async.eg01_basic;

public class App {
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            var thread = new Thread(new Task());
            thread.start();
        }

        for (int i = 0; i < 10; i++) {
            var thread = new Thread(
                    () -> System.out.println("Lambda Thread: " + Thread.currentThread().getName())
            );
            Runtime.getRuntime().exit(0);
            thread.start();
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
