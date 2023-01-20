package com.sc.rxjava.rx01_basics;

import com.sc.rxjava.MyUtils;
import io.reactivex.rxjava3.core.Observable;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Rx08_future_observable {
    public static void main(String[] args) {

        Callable<String> task = () -> "task " + (int) (Math.random() * 100);

        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Future<String> future = executorService.submit(task);

        Observable<String> observable = Observable.fromFuture(future);
        observable.subscribe(MyUtils.createObserver("Future"));

        executorService.shutdown();
    }
}
