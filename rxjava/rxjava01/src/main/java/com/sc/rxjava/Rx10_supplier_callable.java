package com.sc.rxjava;

import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observable;

import java.util.concurrent.Callable;
import java.util.function.Supplier;

public class Rx10_supplier_callable {
    public static void main(String[] args) {
        // Callable<T> and Supplier<T> could be used for
        // lazy Evaluation of source when creating Observable.
        // Which means source method will not be executed until subscribe.

        // Callable<T> can be used when source could throw an Exception
        Callable<Integer> callable = () -> {
            if (true) throw new Exception("Something bad happened");
            return 0;
        };

        // Supplier<T> can be used when source could throw an RuntimeException
        // TODO: find why io.reactivex.rxjava3.functions.@NonNull is required here
        io.reactivex.rxjava3.functions.@NonNull Supplier<Object> supplier = () -> 1 /0;

        Observable.fromCallable(callable)
                .subscribe(MyUtils.createObserver("Callable"));


        Observable.fromSupplier(supplier)
                .subscribe(MyUtils.createObserver("Supplier"));


        // This is not lazy be of that Observable will never be created
        // Observable.just(1 /0);

    }
}
