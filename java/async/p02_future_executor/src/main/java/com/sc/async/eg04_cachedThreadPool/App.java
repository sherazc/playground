package com.sc.async.eg04_cachedThreadPool;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class App {
    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> System.out.println("Thread: " + Thread.currentThread().getName());

        ScheduledExecutorService executorService = Executors.newScheduledThreadPool(3);

        // Run after 10 second
        executorService.schedule(task, 10, TimeUnit.SECONDS);

        // Start after 15 seconds and then run every 10 second
        executorService.scheduleAtFixedRate(task, 15, 10, TimeUnit.SECONDS);

        // Start after 15 seconds and then run every 10 second after previous task is complete
        executorService.scheduleWithFixedDelay(task, 15, 10, TimeUnit.SECONDS);

        Thread.sleep(20000);
        executorService.shutdown();
        System.out.println("Done. Main Thread: " + Thread.currentThread().getName());
    }
}
