package com.sc.async.eg07_stop_task;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import com.sc.async.common.MyTask;

public class Eg01_Shutdown {
    public static void main(String[] args) {
        // Single Threaded Pool
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        executorService.execute(new MyTask("Task1", 3));
        // Task2 is queued before shutdown(). It will start and finish execution
        executorService.execute(new MyTask("Task2", 3));

        System.out.println("executorService.isShutdown() = " + executorService.isShutdown());
        executorService.shutdown();
        System.out.println("executorService.isShutdown() = " + executorService.isShutdown());

        // Adding Task3 will throw RejectedExecutionException because shutdown() is already called
        executorService.execute(new MyTask("Task3", 3));
    }
}
