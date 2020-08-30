package com.sc.async.eg01_define_start_blocking;

import java.util.concurrent.CompletableFuture;

public class App {
    public static void main(String[] args) {
        // Create
        CompletableFuture<Integer> completableFuture = new CompletableFuture<>();

        // Define tasks pipeline
        // These tasks block main thread
        completableFuture
                .thenApply(i ->  i * 2)
                .thenAccept(System.out::println)
                .thenRun(() -> System.out.println("Done!"));

        // Start
        completableFuture.complete(10);
    }
}
