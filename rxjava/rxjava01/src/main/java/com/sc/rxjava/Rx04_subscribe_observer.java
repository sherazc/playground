package com.sc.rxjava;

import io.reactivex.rxjava3.annotations.NonNull;
import io.reactivex.rxjava3.core.Observable;
import io.reactivex.rxjava3.core.Observer;
import io.reactivex.rxjava3.disposables.Disposable;


public class Rx04_subscribe_observer {

    public static void main(String[] args) {

        /*
        We can subscribe an event as

        io.reactivex.rxjava3.functions.Consumer
        or
        io.reactivex.rxjava3.core.Observer
         */
        Observable.just(1, 2, 3)
                .subscribe(createObserver());
    }

    private static Observer<Integer> createObserver() {
        // Note Observer is an interface and there are many
        // implementations of Observer
        return new Observer<Integer>() {
            @Override
            public void onSubscribe(@NonNull Disposable d) {
                System.out.println("onSubscribe() disposable = " + d);
            }

            @Override
            public void onNext(@NonNull Integer integer) {
                System.out.println("onNext integer = " + integer);
            }

            @Override
            public void onError(@NonNull Throwable e) {
                System.out.println("onError() e = " + e);
            }

            @Override
            public void onComplete() {
                System.out.println("onComplete()");
            }
        };
    }
}
