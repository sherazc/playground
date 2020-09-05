package com.sc.async.eg11_whenComplete;

import java.util.concurrent.CompletableFuture;

import com.sc.async.common.MyThreadUtils;

public class App {
    public static void main(String[] args) {

        CompletableFuture
                .supplyAsync(() -> (int)(Math.random() * 10))
                .thenApplyAsync(i -> i * i)
                .whenCompleteAsync(App::peekState) // whenComplete with no side effects.
                .thenApplyAsync(App::findEven)
                .whenCompleteAsync(App::peekState) // Another whenComplete
                .exceptionallyAsync(throwable -> handleException(throwable))
                .thenAcceptAsync(System.out::println);

        MyThreadUtils.sleep(2000);
    }

    private static Integer handleException(Throwable throwable) {
        return -1;
    }

    private static Integer findEven(Integer integer) {
        if(integer % 2 == 1) {
            throw new RuntimeException("Not Even Number");
        }
        return integer;
    }

    private static void peekState(Integer integer, Throwable throwable) {
        if (integer != null) {
            System.out.println("Current stage result: " + integer);
        } else {
            System.out.println("Current stage exception: " + throwable);
        }
    }
}
