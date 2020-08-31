package com.sc.async.eg04_runAsync;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {
        // Create, Start, Define
        CompletableFuture
                .runAsync(() -> System.out.println("Started"))
                .thenRunAsync(() -> System.out.println("Running..."))
                .thenRunAsync(() -> System.out.println("Done!"));

        // Sleeping so that non blocking tasks complete
        MyThreadUtils.sleep(2000);
    }
}
