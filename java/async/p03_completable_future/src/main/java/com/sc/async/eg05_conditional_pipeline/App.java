package com.sc.async.eg05_conditional_pipeline;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        // Create
        CompletableFuture<Integer> completableFuture = new CompletableFuture<>();
        int condition = ((int) (Math.random() * 10)) % 2;

        // Defining
        CompletableFuture<Integer> modifiedCompletableFuture;
        if (condition == 0) {
            modifiedCompletableFuture = pipelineA(completableFuture);
        } else {
            modifiedCompletableFuture = pipelineB(completableFuture);
        }

        modifiedCompletableFuture
                .thenAcceptAsync(System.out::println)
                .thenRunAsync(() -> System.out.println("Done!"));

        // Start
        completableFuture.complete(10);

        // Sleeping so that non blocking tasks complete
        MyThreadUtils.sleep(2000);
    }

    private static CompletableFuture<Integer> pipelineA(CompletableFuture<Integer> completableFuture) {
        return completableFuture.thenApplyAsync(i -> i * 3);
    }

    private static CompletableFuture<Integer> pipelineB(CompletableFuture<Integer> completableFuture) {
        return completableFuture.thenApplyAsync(i -> i * 2);
    }
}
