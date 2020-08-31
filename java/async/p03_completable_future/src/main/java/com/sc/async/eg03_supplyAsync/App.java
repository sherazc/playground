package com.sc.async.eg03_supplyAsync;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        // Create, Start, Define
        CompletableFuture
                .supplyAsync(() -> 100)
                .thenApplyAsync(i ->  i * 2)
                .thenAcceptAsync(System.out::println)
                .thenRunAsync(() -> System.out.println("Done!"));

        // Sleeping so that non blocking tasks complete
        MyThreadUtils.sleep(2000);
    }
}
