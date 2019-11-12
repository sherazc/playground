package com.sc.async.eg03_io_intensive_task;


import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SuppressWarnings("Duplicates")
public class App {
    public static void main(String[] args) {

        ExecutorService executorService = Executors.newFixedThreadPool(200);

        for (int i = 0; i < 10; i++) {
            executorService.execute(
                    () -> System.out.println("IO intensive: " + Thread.currentThread().getName()));
        }

        System.out.println("Done. Main Thread: " + Thread.currentThread().getName());
    }
}
