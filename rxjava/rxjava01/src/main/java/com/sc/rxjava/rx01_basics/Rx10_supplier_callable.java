package com.sc.rxjava.rx01_basics;


import com.sc.rxjava.MyUtils;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.functions.Supplier;

import java.util.concurrent.Callable;

public class Rx10_supplier_callable {
    public static void main(String[] args) {
        // Callable<T> and Supplier<T> could be used for
        // lazy Evaluation of source when creating Observable.
        // Which means source method will not be executed until subscribed.

        Callable<Integer> callable = () -> {
            if (true) throw new Exception("Something bad happened");
            return 0;
        };

        // NOTE: this is io.reactivex.rxjava3.functions.Supplier<T>.
        // It could throw Exception unlike java.util.function.Supplier<T>
        Supplier<Integer> supplier = () -> {
            if (true) throw new Exception("Something bad happened");
            return 0;
        };

        // TODO: Find out what is the difference between fromCallable() an fromSupplier()
        Observable.fromCallable(callable)
                .subscribe(MyUtils.createObserver("Callable"));

        Observable.fromSupplier(supplier)
                .subscribe(MyUtils.createObserver("Supplier"));

        // This is not lazy be of that Observable will never be created
        // Observable.just(1 /0);
    }
}
