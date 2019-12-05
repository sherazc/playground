package com.sc.async.eg07_stop_task;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import com.sc.async.common.MyTask;

public class Eg03_AwaitTermination {
    public static void main(String[] args) throws Exception {
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.execute(new MyTask("Task1", 3)); // task takes 3 seconds
        executorService.execute(new MyTask("Task2", 3)); // task takes 3 seconds

        executorService.shutdown();

        // BLOCKS main thread for AT LEAST 30 seconds or less till all tasks are complete
        // This would make sure statements below will execute after both tasks
        // that takes 6 second are complete.
        executorService.awaitTermination(30, TimeUnit.SECONDS);

        // If there was no awaitTermination() then these statements would have executed
        // while tasks were running.
        System.out.println("executorService.isShutdown() = " + executorService.isShutdown());
        System.out.println("executorService.isTerminated() = " + executorService.isTerminated());
    }
}
