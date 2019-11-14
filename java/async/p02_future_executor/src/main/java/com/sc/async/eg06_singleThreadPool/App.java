package com.sc.async.eg06_singleThreadPool;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {

    public static void main(String[] args)  {

        Runnable goodTask = () -> System.out.println("Good Task " + Thread.currentThread().getName());
        Runnable badTask = new Runnable() {
            @Override
            public void run() {
                throw new RuntimeException("Bad Task");
            }
        };

        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.execute(goodTask);
        executorService.execute(badTask);
        executorService.execute(goodTask);

        executorService.shutdown();
        System.out.println("Done. Main Thread: " + Thread.currentThread().getName());
    }
}
