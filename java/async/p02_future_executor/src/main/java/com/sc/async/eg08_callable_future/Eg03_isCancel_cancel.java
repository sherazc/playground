package com.sc.async.eg08_callable_future;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import com.sc.async.common.MyThreadUtils;

public class Eg03_isCancel_cancel {

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Future<String> squareFuture = executorService.submit(() -> {
            MyThreadUtils.sleep(2000);
            System.out.println("Task about to return result");
            return "Task done";
        });

        // Future.cancel() can be used to stop task.
        // E.g. Task takes 2 seconds to complete and we have created 1 second timeout
        int timeoutCount = 0;
        while (!squareFuture.isDone()) {
            MyThreadUtils.sleep(500);
            timeoutCount++;
            if (timeoutCount > 2) {
                // mayInterruptIfRunning = true will throw InterruptedException
                squareFuture.cancel(false);
                break;
            }
            System.out.println("Waiting for Future to be done...");
        }
        if (squareFuture.isCancelled()) {
            System.out.println("Task timout. It was canceled.");
        } else {
            System.out.println("Task result: " + squareFuture.get());
        }

        executorService.shutdown();
    }
}
