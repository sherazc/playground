package com.sc.async.eg05_conditional_pipeline;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        CompletableFuture<Integer> completableFuture = new CompletableFuture<>();
        int condition = ((int) (Math.random() * 10)) % 2;

        if (condition == 0) {
            pipelineA(completableFuture);
        } else {
            pipelineB(completableFuture);
        }

        completableFuture.complete(10);


        // Sleeping so that non blocking tasks complete
        MyThreadUtils.sleep(2000);
    }

    private static void pipelineA(CompletableFuture<Integer> completableFuture) {
        completableFuture
                .thenApplyAsync(i -> i * 3)
                .thenAcceptAsync(System.out::println)
                .thenRunAsync(() -> System.out.println("Done A!"));
    }

    private static void pipelineB(CompletableFuture<Integer> completableFuture) {
        completableFuture
                .thenApplyAsync(i -> i * 2)
                .thenAcceptAsync(System.out::println)
                .thenRunAsync(() -> System.out.println("Done B!"));
    }
}
