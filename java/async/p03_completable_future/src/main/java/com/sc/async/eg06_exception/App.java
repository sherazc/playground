package com.sc.async.eg06_exception;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        CompletableFuture
                .supplyAsync(() -> produceValue())
                .exceptionally(throwable -> handleException())
                .thenApply(i -> i * 2)
                .thenAccept(System.out::println);

        MyThreadUtils.sleep(1000);
    }

    private static Integer produceValue() {
        throw new RuntimeException();
    }

    private static Integer handleException() {
        return 100;
    }
}
