package com.sc.async.eg09_thenCombine;

import java.util.concurrent.CompletableFuture;

public class App {
    public static void main(String[] args) {

        /*
         completableFuture B ---F---
                                     \ merge result of B in A's Stage
         completableFuture A ---F--------F-F----
        */
        completableFutureA(2)
                .thenCombine(completableFutureB(4), App::mergeResults)
                .thenApply(i -> i - 20)
                .thenAccept(System.out::println);
    }

    private static Integer mergeResults(Integer a, Integer b) {
        return a + b;
    }

    private static CompletableFuture<Integer> completableFutureA(int value) {
        return CompletableFuture.supplyAsync(() -> value * 2);
    }

    private static CompletableFuture<Integer> completableFutureB(int value) {
        return CompletableFuture.supplyAsync(() -> value * 10);
    }
}
