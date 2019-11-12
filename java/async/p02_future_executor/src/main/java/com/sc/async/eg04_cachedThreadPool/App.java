package com.sc.async.eg04_cachedThreadPool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@SuppressWarnings("Duplicates")
public class App {

    public static void main(String[] args) {

        ExecutorService executorService = Executors.newCachedThreadPool();

        for (int i = 0; i < 10; i++) {
            executorService.execute(
                    () -> System.out.println("Thread: " + Thread.currentThread().getName()));
        }

        System.out.println("Done. Main Thread: " + Thread.currentThread().getName());
    }
}
