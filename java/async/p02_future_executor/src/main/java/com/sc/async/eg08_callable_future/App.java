package com.sc.async.eg08_callable_future;

import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) throws Exception {
        Callable<String> task = () -> {
            System.out.println("Task Running...");
            MyThreadUtils.sleep(1000);
            return "task " + (int) (Math.random() * 100);
        };

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Future<String> future1 = executorService.submit(task);
        Future<String> future2 = executorService.submit(task);
        executorService.shutdown();
        System.out.println("Future 1 result: " + future1.get());
        System.out.println("Future 2 result: " + future2.get());
    }
}
