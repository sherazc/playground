package com.sc.async.eg10_thenCompose;

import java.util.concurrent.CompletableFuture;

public class App {
    public static void main(String[] args) {
        /*
         completableFuture A ---F-
                                   \
                                    -- completableFuture B --F-F-F
        */
        completableFutureA(2)
                .thenCompose(App::completableFutureB)
                .thenApply(i -> i + 5)
                .thenAccept(System.out::println);
    }

    private static CompletableFuture<Integer> completableFutureA(int value) {
        return CompletableFuture.supplyAsync(() -> value * 2);
    }

    private static CompletableFuture<Integer> completableFutureB(int value) {
        return CompletableFuture.supplyAsync(() -> value * 10);
    }
}
