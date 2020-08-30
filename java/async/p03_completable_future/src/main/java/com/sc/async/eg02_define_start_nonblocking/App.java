package com.sc.async.eg02_define_start_nonblocking;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        // Create
        CompletableFuture<Integer> completableFuture = new CompletableFuture<>();

        // Define tasks pipeline
        // These tasks will not block main thread
        completableFuture
                .thenApplyAsync(i ->  i * 2)
                .thenAcceptAsync(System.out::println)
                .thenRunAsync(() -> System.out.println("Done!"));

        // Start
        completableFuture.complete(10);

        // Sleeping so that non blocking tasks complete
        MyThreadUtils.sleep(2000);
    }
}
