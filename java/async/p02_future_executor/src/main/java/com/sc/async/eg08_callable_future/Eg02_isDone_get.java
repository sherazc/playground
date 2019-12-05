package com.sc.async.eg08_callable_future;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import com.sc.async.common.MyThreadUtils;

public class Eg02_isDone_get {
    private static ExecutorService executorService = Executors.newSingleThreadExecutor();

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        Future<Integer> squareFuture = calculateSquare(2);

        // Future.get() blocks current thread.
        // We can use Future.isDone() to check if future is done.
        while (!squareFuture.isDone()) {
            MyThreadUtils.sleep(500);
            System.out.println("Calculating...");
        }

        System.out.println("Square of 2 is " + squareFuture.get());
        executorService.shutdown();
    }

    private static Future<Integer> calculateSquare(int number) {
        return executorService.submit(() -> {
            MyThreadUtils.sleep(2000);
            return number * number;
        });
    }
}
