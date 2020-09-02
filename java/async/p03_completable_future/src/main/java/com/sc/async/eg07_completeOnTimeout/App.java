package com.sc.async.eg07_completeOnTimeout;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        CompletableFuture
                .supplyAsync(() -> longRunningTask())
                .completeOnTimeout(200, 1000, TimeUnit.MILLISECONDS)
                .thenAccept(System.out::println);

        MyThreadUtils.sleep(2000);
    }

    private static Integer longRunningTask() {
        MyThreadUtils.sleep(5000);
        return 100;
    }
}
