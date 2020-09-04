package com.sc.async.eg08_orTimeout;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        CompletableFuture
                .supplyAsync(() -> longRunningStage()) // Takes longer than timeout
                .orTimeout(1000, TimeUnit.MILLISECONDS) // Throws TimeoutException on timeout
                .exceptionally(throwable -> handleException(throwable))
                .thenAccept(i -> System.out.println("Done " + i));

        MyThreadUtils.sleep(2000);
    }

    private static Integer handleException(Throwable throwable) {
        System.out.println("Handling Exception. " + throwable.getClass().getName());
        return 200;
    }

    private static Integer longRunningStage() {
        MyThreadUtils.sleep(5000);
        return 100;
    }
}
