package com.sc.async.eg02_cpu_intensive_task;


import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class App {
    public static void main(String[] args) {

        int numberOfCpuCores = Runtime.getRuntime().availableProcessors();
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfCpuCores);

        for (int i = 0; i < 10; i++) {
            executorService.execute(
                    () -> System.out.println("CPU intensive: " + Thread.currentThread().getName()));
        }

        System.out.println("Done. Main Thread: " + Thread.currentThread().getName());
    }
}
